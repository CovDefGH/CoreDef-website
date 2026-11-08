#!/bin/sh
set -eu
base="$HOME/coredef-microvm"
cd "$base"
exec 9> run/ensure.lock
flock -w 10 9
if [ -f run/vm.pid ] && kill -0 "$(cat run/vm.pid)" 2>/dev/null; then
  kill "$(cat run/vm.pid)"
  sleep 1
fi
fakeroot sh build-guest.sh
( exec 9>&-; sh start-vm.sh )
