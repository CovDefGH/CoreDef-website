#!/usr/bin/env python3
"""Check separate shell UIDs, private homes, and read-only guest paths."""

import json
import re
import socket


class Shell:
    def __init__(self):
        self.socket = socket.create_connection(("127.0.0.1", 8025), timeout=3)
        self.socket.settimeout(25)
        self.stream = self.socket.makefile("rwb", buffering=0)
        self.greeting = json.loads(self.stream.readline())

    def run(self, command):
        self.stream.write((json.dumps({"command": command}) + "\n").encode())
        return json.loads(self.stream.readline())["output"]

    def close(self):
        self.stream.close()
        self.socket.close()


first = Shell()
second = Shell()
try:
    first_id = first.run("id")
    second_id = second.run("id")
    first_uid = int(re.search(r"uid=(\d+)", first_id).group(1))
    second_uid = int(re.search(r"uid=(\d+)", second_id).group(1))
    assert 2000 <= first_uid <= 2005 and 2000 <= second_uid <= 2005 and first_uid != second_uid
    first.run("printf private > ~/private.txt")
    denied = second.run(f"cat /home/app/{first_uid - 2000}/private.txt")
    assert "Permission denied" in denied, denied
    readonly = first.run("touch /etc/coredef-test")
    assert "Read-only file system" in readonly, readonly
    fuse_readonly = first.run("touch /srv/vault/new.txt")
    assert "Read-only file system" in fuse_readonly or "Permission denied" in fuse_readonly, fuse_readonly
    first.run("rm ~/private.txt")
    print("separate UIDs, private homes, read-only root and FUSE: OK")
finally:
    first.close()
    second.close()
