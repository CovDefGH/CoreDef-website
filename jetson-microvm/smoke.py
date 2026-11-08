#!/usr/bin/env python3
import json
import re
import shlex
import socket

with socket.create_connection(("127.0.0.1", 8025), timeout=3) as sock:
    sock.settimeout(25)
    stream = sock.makefile("rwb", buffering=0)
    print("greeting:", stream.readline().decode().strip())
    def run(command):
        stream.write((json.dumps({"command": command}) + "\n").encode())
        response = json.loads(stream.readline())
        print(command, "=>", json.dumps(response)[:600])
        return response["output"]

    run("pwd")
    run("id")
    run("ls -p")
    detailed = run("ls -la")
    files = [line.split()[-1] for line in detailed.splitlines() if line.startswith("-r")]
    assert files, "No readable generated file appeared"
    filename = shlex.quote(files[0])
    run("cat " + filename + " | head -n 8")
    listed_size = int(re.search(r"\d+", run("stat -c %s " + filename)).group())
    actual_size = int(re.search(r"\d+", run("wc -c < " + filename)).group())
    assert listed_size == actual_size, (listed_size, actual_size)
    run("cd /etc && pwd")
    run("uname -a")
