# Isolated shell honeypot

This is an interactive TCP shell for post-compromise demonstrations. It is **not** an operating-system shell: no command line received from a client is passed to a subprocess, `eval`, or the host filesystem. Every connection gets its own in-memory virtual filesystem. Groq generates directory entries on first listing and file contents on first read; subsequent reads in the same connection use the cached values. If Groq fails or the model budget is reached, the operation reports an I/O error instead of serving a canned file.

The EC2 service listens only on `127.0.0.1:8023`. Reach it with an SSH local forward, then use `client.py` or `nc`. Do not forward it to a public interface. The model key comes from the existing root-only `/etc/coredef-site.env` through systemd.

From the Windows host, open the tunnel in one PowerShell terminal. The script makes a temporary restricted copy of the existing SSH key and deletes it when the tunnel closes:

```powershell
powershell -ExecutionPolicy Bypass -File honeyshell/open-tunnel.ps1
```

In another PowerShell terminal, run:

```powershell
powershell -ExecutionPolicy Bypass -File honeyshell/connect.ps1
```

Try `pwd`, `ls`, `cd <a listed directory>`, `ls`, `cat <a listed file>`, `head -n 5 <file>`, `touch scratch.txt`, `rm scratch.txt`, and `exit`. The generated names vary by session; choose a directory and file shown by `ls`.

Run local tests with `python -m unittest discover -s honeyshell -p 'test_*.py'`. The service needs only the Python standard library. A session allows up to 16 model calls and 100 commands; the process allows at most 30 model calls per minute and 200 per day. A connection closes after five minutes idle.

This service is separate from Cowrie. Cowrie can later expose SSH/Telnet and reuse the same virtual-filesystem behavior through a custom adapter. This demo does not provide an HTTP RCE endpoint or a real reverse shell.
