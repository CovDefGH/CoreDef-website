#!/bin/sh
set -eu
base="$HOME/coredef-microvm"
cd "$base"
umask 077
if [ ! -s Image ] || [ ! -s ubuntu.squashfs ]; then
  echo 'Run bootstrap.py first' >&2
  exit 1
fi
if [ "$base" != "$HOME/coredef-microvm" ]; then
  echo 'Unexpected build directory' >&2
  exit 1
fi
gcc -O2 -Wall -Wextra -D_FILE_OFFSET_BITS=64 \
  -I "$base/deps/usr/include" \
  -o "$base/fuse-daemon" "$base/fuse-daemon.c" \
  -L /lib/aarch64-linux-gnu -l:libfuse3.so.3 -pthread
gcc -O2 -Wall -Wextra -o "$base/landlock-launch" "$base/landlock-launch.c"
if [ -d rootfs ]; then
  rm -rf -- "$base/rootfs"
fi
unsquashfs -no-progress -d rootfs ubuntu.squashfs
mkdir -p rootfs/opt/coredef rootfs/srv/vault rootfs/home/app
cp rootfs/etc/os-release rootfs/srv/vault/system-info.txt
chmod 0644 rootfs/srv/vault/system-info.txt
cp guest_server.py rootfs/opt/coredef/guest_server.py
cp fuse-daemon rootfs/opt/coredef/fuse-daemon
cp /lib/aarch64-linux-gnu/libfuse3.so.3 rootfs/usr/lib/aarch64-linux-gnu/libfuse3.so.3
cp guest-init.sh rootfs/init
chmod 0755 rootfs/init
chmod 0755 rootfs/srv rootfs/srv/vault rootfs/opt/coredef/fuse-daemon
for slot in 0 1 2 3 4 5; do
  uid=$((2000 + slot))
  if [ "$slot" = 0 ]; then account=app; else account="app$slot"; fi
  printf '%s:x:%s:%s:CoreDef app:/home/app/%s:/bin/bash\n' "$account" "$uid" "$uid" "$slot" >> rootfs/etc/passwd
  printf '%s:x:%s:\n' "$account" "$uid" >> rootfs/etc/group
done
truncate -s 1G rootfs.ext4
mkfs.ext4 -q -d rootfs -F rootfs.ext4
e2fsck -fn rootfs.ext4 >/dev/null
echo 'guest image ready'
