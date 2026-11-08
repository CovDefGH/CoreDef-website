#!/usr/bin/env python3
"""Test the authenticated website -> shell relay -> guest -> FUSE path."""

import http.cookiejar
import json
import shlex
import urllib.parse
import urllib.request
from pathlib import Path

ORIGIN = "http://127.0.0.1:3100"
auth = {}
for line in (Path.home() / ".config/coredef-console/auth.env").read_text().splitlines():
    if "=" in line and not line.lstrip().startswith("#"):
        name, value = line.split("=", 1)
        auth[name.strip()] = value.strip().strip('"').strip("'")
assert auth.get("CONSOLE_USERNAME") and auth.get("CONSOLE_PASSWORD")
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))


def request(path, data, content_type):
    req = urllib.request.Request(
        ORIGIN + path, data=data, method="POST",
        headers={"Origin": ORIGIN, "Content-Type": content_type},
    )
    with opener.open(req, timeout=28) as response:
        return response.status, response.read(100_000).decode()


status, _ = request(
    "/auth/login",
    urllib.parse.urlencode({"username": auth["CONSOLE_USERNAME"], "password": auth["CONSOLE_PASSWORD"]}).encode(),
    "application/x-www-form-urlencoded",
)
assert status == 200
status, greeting = request("/api/shell/sessions", b"{}", "application/json")
assert status == 201, greeting
print("session:", greeting[:300])


def command(text):
    status, body = request("/api/shell/command", json.dumps({"command": text}).encode(), "application/json")
    assert status == 200, body
    response = json.loads(body)
    print(text, "=>", response["output"][:350].replace("\n", "\\n"))
    return response["output"]


command("pwd")
command("id")
entries = command("ls -p")
files = [name for name in entries.splitlines() if name and not name.endswith("/")]
if files:
    command("cat " + shlex.quote(files[0]) + " | head -n 4")
end = urllib.request.Request(ORIGIN + "/api/shell/sessions", method="DELETE", headers={"Origin": ORIGIN})
with opener.open(end, timeout=5) as response:
    assert response.status == 200
