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
    assert run("cat system-info.txt") == run("cat /etc/os-release"), "Underlay file changed"
    detailed = run("ls -la")
    files = [line.split()[-1] for line in detailed.splitlines() if line.startswith("-r") and not line.endswith("system-info.txt")]
    assert files, "No readable generated file appeared"
    filename = shlex.quote(files[0])
    run("cat " + filename + " | head -n 8")
    actual_size = int(re.search(r"\d+", run("cat " + filename + " | wc -c")).group())
    assert actual_size >= 150, actual_size
    stable = run("python3 -c 'import os,sys;f=os.open(sys.argv[1],0);a=os.read(f,30000);os.lseek(f,0,0);print(len(a),a==os.read(f,30000))' " + filename)
    assert re.search(r"\d+ True", stable), stable
    run("cd /etc && pwd")
    run("uname -a")
