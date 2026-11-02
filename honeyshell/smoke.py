"""Manual live check against the loopback-only shell service."""

import socket


def read_prompt(connection):
    data = b""
    while not data.endswith(b"$ "):
        chunk = connection.recv(4096)
        if not chunk:
            raise RuntimeError("shell closed before prompt")
        data += chunk
        if len(data) > 100_000:
            raise RuntimeError("shell response too large")
    return data[: data.rfind(b"app@coredef:")]


def command(connection, line):
    connection.sendall((line + "\n").encode())
    return read_prompt(connection).decode("utf-8", "replace").strip()


with socket.create_connection(("127.0.0.1", 8023), timeout=15) as shell:
    shell.settimeout(30)
    read_prompt(shell)
    listing = command(shell, "ls")
    names = listing.split()
    files = [name for name in names if "." in name and not name.endswith(".")]
    if not files:
        raise RuntimeError("directory listing contained no files")
    for name in files:
        first = command(shell, "cat " + name)
        if "Input/output error" in first:
            continue
        second = command(shell, "cat " + name)
        if first != second or len(first) < 250:
            raise RuntimeError("file content was short or changed in session")
        print("directory_entries=%d file=%s file_bytes=%d stable=%s" % (len(names), name, len(first.encode()), first == second))
        break
    else:
        raise RuntimeError("no generated file could be read")
    for name in [candidate for candidate in names if "." not in candidate]:
        if command(shell, "cd " + name):
            continue
        if command(shell, "pwd") != "/opt/coredef/" + name:
            raise RuntimeError("cd and pwd disagree")
        nested = command(shell, "ls")
        if "Input/output error" in nested or len(nested.split()) < 3:
            raise RuntimeError("nested directory did not generate")
        print("nested_directory=%s nested_entries=%d" % (name, len(nested.split())))
        break
    else:
        raise RuntimeError("no generated directory could be entered")
