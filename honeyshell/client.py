"""Connect to the shell demo through an SSH local port forward."""

import argparse
import socket
import sys


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8023)
    args = parser.parse_args()
    with socket.create_connection((args.host, args.port), timeout=15) as connection:
        connection.settimeout(45)
        pending = b""
        while True:
            while not pending.endswith(b"$ "):
                chunk = connection.recv(4096)
                if not chunk:
                    if pending:
                        sys.stdout.buffer.write(pending)
                        sys.stdout.buffer.flush()
                    return
                pending += chunk
            sys.stdout.buffer.write(pending)
            sys.stdout.buffer.flush()
            pending = b""
            try:
                line = input()
            except (EOFError, KeyboardInterrupt):
                line = "exit"
            connection.sendall((line + "\n").encode())


if __name__ == "__main__":
    main()
