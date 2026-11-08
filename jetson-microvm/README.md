# Jetson shell environment

This directory builds a Firecracker ARM64 guest on the Jetson. Website users get
real Bash processes inside the guest through a loopback-only relay and vsock.
The guest has one vCPU, 1 GiB RAM, a read-only root disk, no virtual network
interface, and RAM-backed writable home/tmp directories. Shell processes run as
separate UIDs 2000-2005 with resource limits and private home directories. The
dynamic `/srv/vault` tree is a FUSE mount.
Its directory listings and text-file bodies are generated on demand by the
host-side Groq broker. Generated bodies live in broker RAM for five minutes;
they are never written to the guest disk.

The Firecracker process is launched with Landlock rules restricting file access
to its own image, runtime sockets, and `/dev/kvm`, plus denying TCP connect/bind.
`landlock-launch --selftest` checks that the VMM cannot read `model.env` or
connect to host TCP. The broker accepts only LIST/STAT/READ requests with
validated paths and has a daily model-call budget. The website's existing
password gate and shell session limits still apply.

The current website console defaults to the EC2 virtual shell on port 8024.
Set `SHELL_BACKEND_PORT=8025` in its launcher only after the Jetson guest passes
the smoke test. The new port stays on `127.0.0.1`.

## Install

1. Run `bootstrap.py` on the Jetson to fetch Firecracker v1.17.0 and the pinned,
   SHA-256-verified 2026-11-05 official ARM64 guest artifacts.
2. Download/extract Ubuntu's `libfuse3-dev` headers into `deps/` with
   `mkdir -p deps && cd deps && apt-get download libfuse3-dev && dpkg-deb -x libfuse3-dev_*.deb .`.
3. Place a `GROQ_KEY=...` line in `model.env` (mode 0600). Do not commit it.
4. Run `fakeroot sh build-guest.sh`, then `sh ensure.sh`.
5. Run `./landlock-launch /home/covdef/coredef-microvm --selftest`,
   `python3 smoke-isolation.py`, and `python3 smoke-console.py`.

`ensure.sh` is installed in the Jetson user crontab to restart the broker,
relay, and VM. The account must retain `/dev/kvm` access after reboot, ideally
through membership in the `kvm` group.

The model key remains outside the guest. The guest can identify that FUSE
and virtualization are in use. This setup demonstrates interception before an
attacker reaches a real application server; it does not transparently redirect
an already-established arbitrary shell on a customer host.
