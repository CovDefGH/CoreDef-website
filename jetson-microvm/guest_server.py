#!/usr/bin/env python3
"""Real bash sessions inside the networkless Firecracker guest, over vsock."""

import json
import os
import queue
import resource
import secrets
import selectors
import signal
import socket
import subprocess
import threading
import time

PORT = 5000
MAX_OUTPUT = 48_000
MAX_SESSIONS = 6
slots = queue.Queue(MAX_SESSIONS)
for slot_number in range(MAX_SESSIONS):
    slots.put(slot_number)


def send(stream, output, prompt, done=False):
    stream.write((json.dumps({"output": output, "prompt": prompt, "done": done}) + "\n").encode())
    stream.flush()


def limits(slot):
    os.setgroups([])
    os.setgid(2000 + slot)
    os.setuid(2000 + slot)
    resource.setrlimit(resource.RLIMIT_NOFILE, (64, 64))
    resource.setrlimit(resource.RLIMIT_NPROC, (64, 64))
    resource.setrlimit(resource.RLIMIT_FSIZE, (2_000_000, 2_000_000))
    resource.setrlimit(resource.RLIMIT_CORE, (0, 0))
    resource.setrlimit(resource.RLIMIT_AS, (512_000_000, 512_000_000))
    resource.setrlimit(resource.RLIMIT_CPU, (8, 8))


def run_command(proc, command):
    marker = "__COREDEF_END_" + secrets.token_hex(16) + "__"
    suffix = "\nprintf '\\n" + marker + ":%s\\n' \"$PWD\"\n"
    proc.stdin.write((command + suffix).encode())
    proc.stdin.flush()
    selector = selectors.DefaultSelector()
    selector.register(proc.stdout, selectors.EVENT_READ)
    data = bytearray()
    deadline = time.monotonic() + 18
    while time.monotonic() < deadline:
        events = selector.select(max(0, deadline - time.monotonic()))
        if not events:
            break
        chunk = os.read(proc.stdout.fileno(), 4096)
        if not chunk:
            return data.decode("utf8", "replace")[:MAX_OUTPUT], "/srv/vault", True
        data.extend(chunk)
        if len(data) > MAX_OUTPUT + 4096:
            return data[:MAX_OUTPUT].decode("utf8", "replace") + "\n[output truncated]\n", "/srv/vault", True
        pos = data.find(marker.encode())
        if pos >= 0:
            output = data[:pos].decode("utf8", "replace").lstrip("\n")
            remainder = data[pos + len(marker):].decode("utf8", "replace")
            cwd = remainder.split("\n", 1)[0].lstrip(":")
            return output[:MAX_OUTPUT], cwd if cwd.startswith("/") else "/srv/vault", False
    raise TimeoutError("command timed out")


def serve(client, slot):
    proc = None
    account = "app" if slot == 0 else "app" + str(slot)
    home = "/home/app/" + str(slot)
    try:
        with client:
            client.settimeout(330)
            stream = client.makefile("rwb", buffering=0)
            env = {"HOME": home, "USER": account, "LOGNAME": account, "PATH": "/usr/local/bin:/usr/bin:/bin", "TERM": "dumb", "HISTFILE": "/dev/null", "LANG": "C.UTF-8"}
            proc = subprocess.Popen(
                ["/usr/bin/bash", "--noprofile", "--norc", "-s"],
                stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                cwd="/srv/vault", env=env, preexec_fn=lambda: limits(slot), start_new_session=True,
            )
            send(stream, "", account + "@coredef:/srv/vault$ ")
            for raw in stream:
                try:
                    request = json.loads(raw)
                    command = request["command"]
                    if not isinstance(command, str) or len(command) > 200 or any(ord(c) < 32 for c in command):
                        raise ValueError("invalid command")
                    output, cwd, done = run_command(proc, command)
                    send(stream, output, account + "@coredef:" + cwd[:110] + "$ ", done)
                    if done:
                        break
                except TimeoutError:
                    send(stream, "Command timed out.\n", "", True)
                    break
                except (ValueError, KeyError, OSError, BrokenPipeError):
                    break
    except (OSError, BrokenPipeError):
        pass
    finally:
        if proc is not None:
            try:
                os.killpg(proc.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
            proc.wait()
        slots.put(slot)


def main():
    server = socket.socket(socket.AF_VSOCK, socket.SOCK_STREAM)
    server.bind((socket.VMADDR_CID_ANY, PORT))
    server.listen(MAX_SESSIONS)
    while True:
        client, _ = server.accept()
        try:
            slot = slots.get_nowait()
        except queue.Empty:
            client.close()
            continue
        threading.Thread(target=serve, args=(client, slot), daemon=True).start()


if __name__ == "__main__":
    main()
