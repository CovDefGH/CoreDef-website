#!/usr/bin/env python3
"""Host-side, budgeted model broker. Guest sees only LIST/STAT/READ over vsock."""

import json
import os
import posixpath
import re
import socket
import threading
import time
import urllib.request
import urllib.error
from pathlib import Path

BASE = Path.home() / "coredef-microvm"
SOCKET = BASE / "run/guest.vsock_6000"
MODEL_URL = "https://api.groq.com/openai/v1/chat/completions"
TTL = 300
NAME = re.compile(r"^[A-Za-z0-9._-]{1,60}$")
DISCLOSURE = re.compile(r"\b(fake|fictional|synthetic|mock|placeholder)\b", re.I)
CONTROL = re.compile(r"[\x00-\x08\x0b-\x1f\x7f-\x9f]")
TEXT_EXTENSIONS = {".txt", ".csv", ".tsv", ".json", ".jsonl", ".yaml", ".yml", ".xml", ".log", ".env", ".ini", ".conf", ".cfg", ".md", ".sql"}


def read_key():
    env = BASE / "model.env"
    for line in env.read_text().splitlines():
        if line.startswith("GROQ_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise RuntimeError("GROQ_KEY is not configured")


class Broker:
    def __init__(self):
        self.key = read_key()
        self.model = os.environ.get("GROQ_MODEL", "openai/gpt-oss-20b")
        self.lock = threading.RLock()
        self.entries = {}  # directory path -> (expiry, [(name, kind)])
        self.files = {}  # file path -> (expiry, bytes), RAM only
        self.minute = []
        self.day = []

    def reserve(self):
        now = time.monotonic()
        self.minute = [x for x in self.minute if now - x < 60]
        self.day = [x for x in self.day if now - x < 86_400]
        if len(self.minute) >= 30 or len(self.day) >= 200:
            raise RuntimeError("model budget reached")
        self.minute.append(now)
        self.day.append(now)

    def complete(self, prompt, tokens, json_mode=False):
        payload = {
            "model": self.model, "reasoning_effort": "low", "reasoning_format": "hidden",
            "max_completion_tokens": tokens,
            "messages": [{"role": "user", "content": prompt}],
        }
        if json_mode:
            payload["response_format"] = {"type": "json_object"}
        request = urllib.request.Request(
            MODEL_URL, data=json.dumps(payload).encode(), method="POST",
            headers={"Authorization": "Bearer " + self.key, "Content-Type": "application/json", "User-Agent": "CoreDefShell/1.0"},
        )
        for attempt in range(2):
            self.reserve()
            try:
                with urllib.request.urlopen(request, timeout=16) as response:
                    answer = json.load(response)["choices"][0]["message"]["content"]
                break
            except urllib.error.HTTPError as error:
                if error.code != 429 or attempt:
                    raise
                time.sleep(1)
        if not isinstance(answer, str) or not answer.strip():
            raise RuntimeError("empty model response")
        return answer.strip()

    def directory(self, path):
        now = time.monotonic()
        current = self.entries.get(path)
        if current and current[0] > now:
            return current[1]
        prompt = (
            f"Return only a JSON object with an entries array for the private data directory "
            f"/srv/vault{path if path != '/' else ''} on a midsize engineering company's Linux server. "
            "Include 5-7 plausible children, with two or three data files and the rest subdirectories, "
            "specific to this directory. Each has a basename 'name' and 'type' ('file' or 'dir'). "
            "Use concrete business or operations names. Files must use plain-text formats "
            "such as .txt, .csv, .json, .log, .md, .yaml, or .conf. Do not include archives, "
            "spreadsheets, images, PDFs, or executables. "
            "Omit operating system directories such as bin, etc, usr, proc, dev, sys, and tmp. "
            "All names, identities "
            "and identifiers must be invented. No real secrets, credentials, or private data. "
            "No mention of any simulation, honeypot, or AI generation."
        )
        value = json.loads(self.complete(prompt, 1500, True))["entries"]
        if not isinstance(value, list):
            raise RuntimeError("invalid directory response")
        clean = []
        seen = set()
        for item in value[:12]:
            name, kind = item.get("name"), item.get("type")
            valid_file = kind != "file" or (isinstance(name, str) and (posixpath.splitext(name)[1].lower() in TEXT_EXTENSIONS or name == ".env"))
            if isinstance(name, str) and NAME.fullmatch(name) and name not in (".", "..") and not DISCLOSURE.search(name) and kind in ("file", "dir") and name not in seen and valid_file:
                clean.append((name, kind))
                seen.add(name)
        if len(clean) < 3:
            raise RuntimeError("too few directory entries")
        self.entries[path] = (now + TTL, clean)
        return clean

    def kind(self, path):
        if path == "/":
            return "dir"
        parent, name = posixpath.split(path)
        parent = parent or "/"
        if path.count("/") > 4:
            return None
        if self.kind(parent) != "dir":
            return None
        for child, kind in self.directory(parent):
            if child == name:
                return kind
        return None

    def file(self, path):
        now = time.monotonic()
        current = self.files.get(path)
        if current and current[0] > now:
            return current[1]
        extension = posixpath.splitext(path)[1].lower()
        if extension in (".csv", ".tsv"):
            shape = "A coherent delimited export with a header and at least 50 rows."
        elif extension in (".json", ".jsonl", ".yaml", ".yml", ".xml"):
            shape = "A well-formed document in the file's format with substantial realistic data."
        elif extension == ".log":
            shape = "At least 60 timestamped operational log lines."
        elif extension in (".env", ".ini", ".conf", ".cfg"):
            shape = "A plausible configuration file with only invented, nonfunctional values."
        else:
            shape = "A detailed internal operational file of roughly 600-900 words."
        prompt = (
            f"Write only the contents of {path} on a private engineering company Linux server. "
            + shape + " Make all identities, identifiers, and values invented and nonfunctional. "
            "No actual secrets, private data, Markdown fence, preface, disclaimer, or mention of "
            "simulation, sample, mock, fictional, synthetic, or AI generation."
        )
        minimum_length = 40 if extension in (".json", ".env", ".ini", ".conf", ".cfg") else 150
        for attempt in range(2):
            answer = CONTROL.sub("", self.complete(prompt, 4000, extension == ".json")).replace("\x1b", "")
            valid = minimum_length <= len(answer) <= 24_000 and not DISCLOSURE.search(answer)
            if valid and extension == ".json":
                try:
                    json.loads(answer)
                except ValueError:
                    valid = False
            if valid:
                break
            if attempt:
                raise RuntimeError("invalid file response")
        content = (answer + ("" if answer.endswith("\n") else "\n")).encode()
        self.files[path] = (now + TTL, content)
        return content

    def request(self, line):
        verb, sep, path = line.partition(" ")
        if not sep or verb not in ("LIST", "STAT", "READ") or not path.startswith("/") or len(path) > 240 or posixpath.normpath(path) != path or "\x00" in path:
            raise ValueError("invalid request")
        with self.lock:
            now = time.monotonic()
            self.entries = {k: v for k, v in self.entries.items() if v[0] > now}
            self.files = {k: v for k, v in self.files.items() if v[0] > now}
            kind = self.kind(path)
            if verb == "STAT":
                if kind == "file":
                    return ("file " + str(len(self.file(path)))).encode()
                return (kind or "none").encode()
            if kind != ("dir" if verb == "LIST" else "file"):
                raise FileNotFoundError(path)
            if verb == "LIST":
                return "".join(name + "\t" + child_kind + "\n" for name, child_kind in self.directory(path)).encode()
            return self.file(path)


def handle(client, broker):
    with client:
        client.settimeout(20)
        line = bytearray()
        while len(line) < 256 and not line.endswith(b"\n"):
            part = client.recv(1)
            if not part:
                return
            line.extend(part)
        try:
            payload = broker.request(line.decode("utf8", "strict").rstrip("\n"))
            client.sendall(f"OK {len(payload)}\n".encode() + payload)
        except FileNotFoundError:
            client.sendall(b"ERR 2\n")
        except Exception as error:
            print(type(error).__name__, str(error)[:100], flush=True)
            client.sendall(b"ERR 5\n")


def main():
    broker = Broker()
    if SOCKET.exists():
        SOCKET.unlink()
    server = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    server.bind(str(SOCKET))
    SOCKET.chmod(0o600)
    server.listen(16)
    while True:
        client, _ = server.accept()
        threading.Thread(target=handle, args=(client, broker), daemon=True).start()


if __name__ == "__main__":
    main()
