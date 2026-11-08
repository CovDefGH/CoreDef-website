#!/bin/sh
set -eu
cd "$(dirname "$0")"
auth_file="$HOME/.config/coredef-console/auth.env"
if [ ! -r "$auth_file" ]; then
  echo "Console credentials are not configured at $auth_file" >&2
  exit 1
fi
set -a
. "$auth_file"
set +a
export SHELL_BACKEND_PORT=8025
umask 077
mkdir -p .run
exec /usr/bin/flock -n .run/console.lock "${NODE_BIN:-$HOME/.local/bin/node}" server.mjs >> .run/console.log 2>&1
