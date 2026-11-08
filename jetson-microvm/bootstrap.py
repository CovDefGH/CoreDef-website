#!/usr/bin/env python3
"""Fetch pinned Firecracker bits and an official ARM guest image without root."""

from pathlib import Path
import hashlib
import re
import shutil
import subprocess
import tarfile
import urllib.request

BASE = Path.home() / "coredef-microvm"
VERSION = "v1.17.0"
S3 = "https://s3.amazonaws.com/spec.ccfc.min"
CI = "firecracker-ci/20261105-6ea6634994fa-0/aarch64"
ARTIFACTS = {
    "firecracker-v1.17.0-aarch64.tgz": (
        f"https://github.com/firecracker-microvm/firecracker/releases/download/{VERSION}/firecracker-{VERSION}-aarch64.tgz",
        "e351ebe4f7a16b5873bbd51005d2e6767103cff4d5ebc829df2d3f95a93e2256",
    ),
    "Image-20261105-6ea6634994fa-0": (
        f"{S3}/{CI}/vmlinux-6.18.56",
        "5e1990cd2f6e1c70196955b9405e32a5059f9f0a2c839478bc4f064a08f3a2ff",
    ),
    "ubuntu-20261105-6ea6634994fa-0.squashfs": (
        f"{S3}/{CI}/ubuntu-24.04.squashfs",
        "a99a55c7c30beb235d7a6cc42f75bad59e28851df4c4b00b269e4cb614973fe6",
    ),
}


def download(url, dest, expected):
    if dest.exists() and dest.stat().st_size:
        print("using", dest, flush=True)
    else:
        tmp = dest.with_suffix(dest.suffix + ".part")
        print("downloading", url, flush=True)
        with urllib.request.urlopen(url, timeout=60) as src, tmp.open("wb") as dst:
            shutil.copyfileobj(src, dst)
        tmp.rename(dest)
    with dest.open("rb") as source:
        digest = hashlib.file_digest(source, "sha256").hexdigest()
    if digest != expected:
        raise RuntimeError(f"SHA-256 mismatch for {dest.name}")


def main():
    BASE.mkdir(mode=0o700, exist_ok=True)
    release = BASE / f"firecracker-{VERSION}-aarch64.tgz"
    release_url, release_hash = ARTIFACTS[release.name]
    download(release_url, release, release_hash)
    with tarfile.open(release) as archive:
        member = next(m for m in archive.getmembers() if re.fullmatch(r"release-.*/firecracker-v[\d.]+-aarch64", m.name))
        binary_tmp = BASE / "firecracker.new"
        with archive.extractfile(member) as src, binary_tmp.open("wb") as dst:
            shutil.copyfileobj(src, dst)
    binary_tmp.chmod(0o700)
    binary_tmp.replace(BASE / "firecracker")
    print(subprocess.check_output([BASE / "firecracker", "--version"], text=True).strip(), flush=True)

    kernel_name = "Image-20261105-6ea6634994fa-0"
    root_name = "ubuntu-20261105-6ea6634994fa-0.squashfs"
    kernel_path = BASE / kernel_name
    root_path = BASE / root_name
    for name, path in ((kernel_name, kernel_path), (root_name, root_path)):
        url, expected = ARTIFACTS[name]
        download(url, path, expected)
    for link, target in ((BASE / "Image", kernel_path), (BASE / "ubuntu.squashfs", root_path)):
        if link.exists() or link.is_symlink():
            link.unlink()
        link.symlink_to(target.name)
    print("verified", kernel_name, root_name, flush=True)


if __name__ == "__main__":
    main()
