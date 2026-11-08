#!/bin/sh
set -eu
base="$HOME/coredef-microvm"
cd "$base"
umask 077
mkdir -p run
exec 9> run/ensure.lock
flock -n 9 || exit 0
if ! pgrep -u "$(id -u)" -f '^python3 model_broker.py$' >/dev/null; then
  ( exec 9>&-; setsid -f python3 model_broker.py > run/model.log 2>&1 < /dev/null )
fi
if ! pgrep -u "$(id -u)" -f '^python3 vsock-relay.py$' >/dev/null; then
  ( exec 9>&-; setsid -f python3 vsock-relay.py > run/relay.log 2>&1 < /dev/null )
fi
if [ ! -S run/guest.vsock ] || [ ! -f run/vm.pid ] || ! kill -0 "$(cat run/vm.pid)" 2>/dev/null; then
  ( exec 9>&-; sh start-vm.sh > run/start.log 2>&1 )
fi
