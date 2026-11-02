"""A loopback-only, stateful shell honeypot. No client command is executed by the OS."""

import argparse
import asyncio
import json
import os
import posixpath
import re
import shlex
import sys
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone


MODEL_URL = "https://api.groq.com/openai/v1/chat/completions"
NAME = re.compile(r"^[A-Za-z0-9._-]{1,60}$")
DISCLOSURE = re.compile(r"\b(fake|fictional|synthetic|mock|placeholder)\b", re.I)
CONTROL = re.compile(r"[\x00-\x08\x0b-\x1f\x7f-\x9f]")
INITIAL_DIRS = ("/", "/etc", "/home", "/home/app", "/opt", "/opt/coredef", "/tmp", "/var", "/var/log")


@dataclass
class Entry:
    kind: str
    content: str = ""
    loaded: bool = False
    expanded: bool = False


class ModelError(Exception):
    pass


class GroqModel:
    def __init__(self, key, model="openai/gpt-oss-20b", timeout=12):
        self.key = key
        self.model = model
        self.timeout = timeout
        self.minute_calls = []
        self.day_calls = []
        self.budget_lock = asyncio.Lock()

    async def _reserve(self):
        async with self.budget_lock:
            now = time.monotonic()
            self.minute_calls = [at for at in self.minute_calls if now - at < 60]
            self.day_calls = [at for at in self.day_calls if now - at < 86_400]
            if len(self.minute_calls) >= 30 or len(self.day_calls) >= 200:
                raise ModelError("model budget reached")
            self.minute_calls.append(now)
            self.day_calls.append(now)

    def _complete(self, prompt, json_mode=False, tokens=2400):
        payload = {
            "model": self.model,
            "reasoning_effort": "low",
            "reasoning_format": "hidden",
            "max_completion_tokens": tokens,
            "messages": [{"role": "user", "content": prompt}],
        }
        if json_mode:
            payload["response_format"] = {"type": "json_object"}
        request = urllib.request.Request(
            MODEL_URL,
            data=json.dumps(payload).encode(),
            headers={
                "Authorization": "Bearer " + self.key,
                "Content-Type": "application/json",
                "User-Agent": "CoreDefShell/1.0",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=self.timeout) as response:
                raw = response.read(1_000_001)
            if len(raw) > 1_000_000:
                raise ModelError("model response too large")
            data = json.loads(raw)
            answer = data["choices"][0]["message"]["content"]
            if not isinstance(answer, str) or not answer.strip():
                raise ModelError("empty model response")
            return answer.strip()
        except urllib.error.HTTPError as error:
            raise ModelError("Groq HTTP " + str(error.code)) from error
        except (urllib.error.URLError, TimeoutError, ValueError, KeyError, IndexError) as error:
            raise ModelError("model unavailable") from error

    async def directory(self, path):
        await self._reserve()
        prompt = (
            "Return only JSON with an entries array for the directory " + path + " on an "
            "internal engineering company Linux server. Include 4-8 plausible children, each "
            "with name (one basename only) and type ('file' or 'dir'). Make names specific to "
            "this path, with useful subdirectories and recognizable file extensions. Invent "
            "everything. Do not include real secrets or private data. Do not say this is a "
            "simulation, mock, or honeypot."
        )
        answer = await asyncio.to_thread(self._complete, prompt, True, 1200)
        try:
            entries = json.loads(answer)["entries"]
            if not isinstance(entries, list):
                raise ValueError("entries is not a list")
            valid = []
            for item in entries[:12]:
                name, kind = item["name"], item["type"]
                if isinstance(name, str) and NAME.fullmatch(name) and name not in (".", "..") and not DISCLOSURE.search(name) and kind in ("file", "dir"):
                    valid.append((name, kind))
            if len(valid) < 3:
                raise ValueError("too few usable entries")
            return valid
        except (TypeError, ValueError, KeyError) as error:
            raise ModelError("invalid directory response") from error

    async def file(self, path):
        await self._reserve()
        extension = posixpath.splitext(path)[1].lower()
        if extension in (".csv", ".tsv"):
            shape = "A coherent delimited export with a header and at least 50 rows."
        elif extension in (".json", ".jsonl", ".yaml", ".yml", ".xml"):
            shape = "A well-formed document in the file's format, with substantial realistic data."
        elif extension in (".log",):
            shape = "At least 60 timestamped operational log lines."
        elif extension in (".env", ".ini", ".conf", ".cfg"):
            shape = "A plausible configuration file with only invented, nonfunctional values."
        else:
            shape = "A detailed internal operational file of roughly 600-900 words."
        prompt = (
            "Write only the bytes of " + path + " on an internal engineering company Linux "
            "server. " + shape + " Make all identities and identifiers invented. No real "
            "secrets or private data. No Markdown fence, preface, disclaimer, or mention of "
            "simulation, sample, mock, fictional, synthetic, or AI generation."
        )
        answer = await asyncio.to_thread(self._complete, prompt, False, 4000)
        content = CONTROL.sub("", answer).replace("\x1b", "")
        if len(content) < 250 or len(content) > 24_000 or DISCLOSURE.search(content):
            raise ModelError("invalid file response")
        if extension == ".json":
            try:
                json.loads(content)
            except ValueError as error:
                raise ModelError("invalid JSON file") from error
        return content + ("" if content.endswith("\n") else "\n")


class ShellSession:
    MAX_MODEL_CALLS = 16
    MAX_ENTRIES = 300

    def __init__(self, model):
        self.model = model
        self.cwd = "/opt/coredef"
        self.entries = {path: Entry("dir") for path in INITIAL_DIRS}
        self.model_calls = 0
        self.commands = 0

    def prompt(self):
        return "app@coredef:" + self.cwd + "$ "

    def resolve(self, name):
        if name == "~" or name.startswith("~/"):
            name = "/home/app" + name[1:]
        return posixpath.normpath(name if name.startswith("/") else posixpath.join(self.cwd, name))

    async def _ask(self, kind, path):
        if self.model_calls >= self.MAX_MODEL_CALLS:
            raise ModelError("session model budget reached")
        self.model_calls += 1
        return await getattr(self.model, kind)(path)

    async def _expand(self, path):
        entry = self.entries.get(path)
        if not entry or entry.kind != "dir" or entry.expanded:
            return
        generated = await self._ask("directory", path)
        if len(self.entries) + len(generated) > self.MAX_ENTRIES:
            raise ModelError("session filesystem full")
        for name, kind in generated:
            child = posixpath.join(path, name)
            if child not in self.entries:
                self.entries[child] = Entry(kind)
        entry.expanded = True

    async def _lookup(self, path):
        if path.count("/") > 16:
            return None
        if path in self.entries:
            return self.entries[path]
        parent = posixpath.dirname(path)
        parent_entry = await self._lookup(parent) if parent != path else None
        if parent_entry and parent_entry.kind == "dir":
            await self._expand(parent)
        return self.entries.get(path)

    async def _read(self, path):
        entry = await self._lookup(path)
        if not entry:
            return None, "No such file or directory"
        if entry.kind != "file":
            return None, "Is a directory"
        if not entry.loaded:
            entry.content = await self._ask("file", path)
            entry.loaded = True
        return entry.content, None

    async def run(self, line):
        self.commands += 1
        if self.commands > 100:
            return "Session limit reached\n", True
        if len(line) > 2048:
            return "Command too long\n", False
        try:
            words = shlex.split(line)
        except ValueError:
            return "sh: syntax error\n", False
        if not words:
            return "", False
        command, *args = words
        if command in ("exit", "logout", "quit"):
            return "logout\n", True
        if command == "pwd":
            return self.cwd + "\n", False
        if command == "whoami":
            return "app\n", False
        if command == "id":
            return "uid=1001(app) gid=1001(app) groups=1001(app)\n", False
        if command == "uname":
            return ("Linux coredef 6.1.0-20-amd64 #1 SMP x86_64 GNU/Linux\n" if "-a" in args else "Linux\n"), False
        if command == "date":
            return datetime.now(timezone.utc).strftime("%a %b %d %H:%M:%S UTC %Y\n"), False
        if command == "echo":
            return " ".join(args) + "\n", False
        if command == "help":
            return "cd ls pwd cat head tail wc mkdir touch rm id whoami uname date echo exit\n", False
        if command == "cd":
            target = self.resolve(args[0] if args else "~")
            try:
                entry = await self._lookup(target)
            except ModelError as error:
                print("directory lookup failed:", error, file=sys.stderr)
                return "cd: " + target + ": Input/output error\n", False
            if not entry:
                return "cd: " + target + ": No such file or directory\n", False
            if entry.kind != "dir":
                return "cd: " + target + ": Not a directory\n", False
            self.cwd = target
            return "", False
        if command == "ls":
            paths = [arg for arg in args if not arg.startswith("-")]
            target = self.resolve(paths[0] if paths else ".")
            try:
                entry = await self._lookup(target)
                if not entry:
                    return "ls: cannot access '" + target + "': No such file or directory\n", False
                if entry.kind == "file":
                    return posixpath.basename(target) + "\n", False
                await self._expand(target)
            except ModelError as error:
                print("directory listing failed:", error, file=sys.stderr)
                return "ls: cannot open directory '" + target + "': Input/output error\n", False
            children = sorted((path, item) for path, item in self.entries.items() if posixpath.dirname(path) == target and path != target)
            if "-l" in args or "-la" in args or "-al" in args:
                lines = ["total " + str(len(children) * 4)]
                for path, item in children:
                    mode = "drwxr-xr-x" if item.kind == "dir" else "-rw-r--r--"
                    size = 4096 if item.kind == "dir" else (len(item.content.encode()) if item.loaded else 2048)
                    lines.append("%s 1 app app %6d Nov  2 04:00 %s" % (mode, size, posixpath.basename(path)))
                return "\n".join(lines) + "\n", False
            show_hidden = any("a" in arg for arg in args if arg.startswith("-"))
            visible = [posixpath.basename(path) for path, _ in children if show_hidden or not posixpath.basename(path).startswith(".")]
            return "  ".join(visible) + "\n", False
        if command in ("cat", "head", "tail", "wc"):
            paths = [arg for arg in args if not arg.startswith("-") and not arg.isdigit()]
            if not paths:
                return command + ": missing file operand\n", False
            target = self.resolve(paths[-1])
            try:
                content, error = await self._read(target)
            except ModelError as error:
                print("file read failed:", error, file=sys.stderr)
                return command + ": " + target + ": Input/output error\n", False
            if error:
                return command + ": " + target + ": " + error + "\n", False
            if command == "cat":
                return content, False
            if command == "wc":
                return "%d %d %d %s\n" % (len(content.splitlines()), len(content.split()), len(content.encode()), target), False
            count = 10
            if "-n" in args:
                index = args.index("-n")
                if index + 1 < len(args) and args[index + 1].isdigit():
                    count = min(100, int(args[index + 1]))
            lines = content.splitlines(keepends=True)
            return "".join(lines[:count] if command == "head" else lines[-count:]), False
        if command in ("mkdir", "touch", "rm"):
            paths = [arg for arg in args if not arg.startswith("-")]
            if not paths:
                return command + ": missing operand\n", False
            target = self.resolve(paths[-1])
            if not (target.startswith("/opt/coredef/") or target.startswith("/home/app/") or target.startswith("/tmp/")):
                return command + ": cannot modify '" + target + "': Permission denied\n", False
            parent = posixpath.dirname(target)
            try:
                parent_entry = await self._lookup(parent)
                if parent_entry and parent_entry.kind == "dir":
                    await self._expand(parent)
            except ModelError:
                return command + ": " + target + ": Input/output error\n", False
            if command == "rm":
                if target not in self.entries:
                    return "rm: cannot remove '" + target + "': No such file or directory\n", False
                if self.entries[target].kind == "dir" and not any("r" in arg for arg in args if arg.startswith("-")):
                    return "rm: cannot remove '" + target + "': Is a directory\n", False
                for path in list(self.entries):
                    if path == target or path.startswith(target + "/"):
                        del self.entries[path]
                return "", False
            if not parent_entry or parent_entry.kind != "dir":
                return command + ": cannot create '" + target + "': No such file or directory\n", False
            if target in self.entries:
                return ("mkdir: cannot create directory '" + target + "': File exists\n" if command == "mkdir" else ""), False
            self.entries[target] = Entry("dir" if command == "mkdir" else "file", loaded=command == "touch")
            return "", False
        return command + ": command not found\n", False


async def serve_client(reader, writer, model):
    shell = ShellSession(model)
    login_time = datetime.now(timezone.utc).strftime("%a %b %d %H:%M:%S UTC %Y")
    writer.write(("Last login: " + login_time + "\r\n").encode())
    try:
        while True:
            writer.write(shell.prompt().encode())
            await writer.drain()
            try:
                line = await asyncio.wait_for(reader.readline(), timeout=300)
            except (asyncio.TimeoutError, ValueError):
                break
            if not line:
                break
            output, done = await shell.run(line.decode("utf-8", "replace").strip())
            writer.write(output.replace("\n", "\r\n").encode("utf-8", "replace"))
            await writer.drain()
            if done:
                break
    finally:
        writer.close()
        await writer.wait_closed()


async def serve_json_client(reader, writer, model):
    shell = ShellSession(model)
    try:
        writer.write((json.dumps({"output": "", "prompt": shell.prompt(), "done": False}) + "\n").encode())
        await writer.drain()
        while True:
            try:
                line = await asyncio.wait_for(reader.readline(), timeout=300)
            except (asyncio.TimeoutError, ValueError):
                break
            if not line:
                break
            try:
                payload = json.loads(line)
                command = payload["command"]
                if not isinstance(command, str) or len(command) > 2048:
                    raise ValueError("invalid command")
            except (ValueError, KeyError, TypeError):
                output, done = "Invalid command\n", False
            else:
                output, done = await shell.run(command)
            writer.write((json.dumps({"output": output, "prompt": shell.prompt(), "done": done}) + "\n").encode())
            await writer.drain()
            if done:
                break
    finally:
        writer.close()
        await writer.wait_closed()


async def main():
    parser = argparse.ArgumentParser(description="Loopback-only virtual shell honeypot")
    parser.add_argument("--port", type=int, default=8023)
    parser.add_argument("--api-port", type=int, default=8024)
    args = parser.parse_args()
    if not 1024 <= args.port <= 65535 or not 1024 <= args.api_port <= 65535 or args.port == args.api_port:
        parser.error("ports must be distinct and between 1024 and 65535")
    key = os.environ.get("GROQ_KEY", "")
    if not key:
        parser.error("GROQ_KEY is required; there is no pregenerated fallback")
    model = GroqModel(key, os.environ.get("GROQ_MODEL", "openai/gpt-oss-20b"))
    server = await asyncio.start_server(lambda r, w: serve_client(r, w, model), "127.0.0.1", args.port, limit=4096)
    api_server = await asyncio.start_server(lambda r, w: serve_json_client(r, w, model), "127.0.0.1", args.api_port, limit=4096)
    async with server, api_server:
        await asyncio.gather(server.serve_forever(), api_server.serve_forever())


if __name__ == "__main__":
    asyncio.run(main())
