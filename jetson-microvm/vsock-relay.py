#!/usr/bin/env python3
"""Loopback-only JSON-shell relay from the Jetson console to the guest vsock."""

import argparse
import socket
import threading
from pathlib import Path


def pump(source, dest):
    try:
        while data := source.recv(65536):
            dest.sendall(data)
    except OSError:
        pass
    finally:
        try:
            dest.shutdown(socket.SHUT_WR)
        except OSError:
            pass


def handle(client, path):
    with client:
        guest = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        try:
            guest.settimeout(5)
            guest.connect(str(path))
            guest.sendall(b"CONNECT 5000\n")
            ack = bytearray()
            while not ack.endswith(b"\n") and len(ack) < 100:
                part = guest.recv(1)
                if not part:
                    return
                ack.extend(part)
            if not ack.startswith(b"OK "):
                return
            guest.settimeout(None)
            upstream = threading.Thread(target=pump, args=(client, guest), daemon=True)
            upstream.start()
            pump(guest, client)
            upstream.join(timeout=1)
        finally:
            guest.close()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--vsock", type=Path, default=Path.home() / "coredef-microvm/run/guest.vsock")
    parser.add_argument("--port", type=int, default=8025)
    args = parser.parse_args()
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(("127.0.0.1", args.port))
    server.listen(8)
    while True:
        client, _ = server.accept()
        threading.Thread(target=handle, args=(client, args.vsock), daemon=True).start()


if __name__ == "__main__":
    main()
