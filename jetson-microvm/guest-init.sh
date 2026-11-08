#!/bin/sh
set -eu
if ! mountpoint -q /dev; then
  mount -t devtmpfs devtmpfs /dev
fi
mount -t proc proc /proc
mount -t sysfs sysfs /sys
mount -t tmpfs -o mode=1777,size=128m tmpfs /tmp
mount -t tmpfs -o mode=755,size=16m tmpfs /run
mount -t tmpfs -o mode=755,size=128m tmpfs /home/app
for slot in 0 1 2 3 4 5; do
  uid=$((2000 + slot))
  mkdir "/home/app/$slot"
  chown "$uid:$uid" "/home/app/$slot"
  chmod 0700 "/home/app/$slot"
done
hostname coredef-app
/opt/coredef/fuse-daemon -f -o ro,allow_other,default_permissions /srv/vault > /dev/console 2>&1 &
sleep 1
if ! mountpoint -q /srv/vault; then
  echo 'vault mount failed' > /dev/console
  exit 1
fi
echo 'coredef-guest booted' > /dev/console
exec /usr/bin/python3 /opt/coredef/guest_server.py
