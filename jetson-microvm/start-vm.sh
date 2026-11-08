#!/bin/sh
set -eu
base="$HOME/coredef-microvm"
cd "$base"
umask 077
mkdir -p run
if [ -S run/firecracker.sock ]; then
  if [ -f run/vm.pid ] && kill -0 "$(cat run/vm.pid)" 2>/dev/null; then
    echo 'Firecracker is already running; inspect the current VM first' >&2
    exit 1
  fi
  rm -f run/firecracker.sock run/guest.vsock
fi
cat > run/vm.json <<EOF
{
  "boot-source": {
    "kernel_image_path": "$base/Image",
    "boot_args": "console=ttyS0 reboot=k panic=1 root=/dev/vda ro init=/init"
  },
  "drives": [{"drive_id":"rootfs","path_on_host":"$base/rootfs.ext4","is_root_device":true,"is_read_only":true}],
  "machine-config": {"vcpu_count":1,"mem_size_mib":1024,"smt":false},
  "vsock": {"guest_cid":3,"uds_path":"$base/run/guest.vsock"}
}
EOF
nohup "$base/landlock-launch" "$base" > run/vm.log 2>&1 < /dev/null &
echo $! > run/vm.pid
sleep 3
if ! kill -0 "$(cat run/vm.pid)" 2>/dev/null; then
  cat run/vm.log >&2
  exit 1
fi
tail -n 15 run/vm.log
