#!/bin/sh
set -eu
entry='* * * * * /home/covdef/fuzz-console/run.sh'
guest_entry='* * * * * /bin/sh /home/covdef/coredef-microvm/ensure.sh'
current="$(crontab -l 2>/dev/null || true)"
if ! printf '%s\n' "$current" | grep -Fqx "$entry"; then
  { printf '%s\n' "$current"; printf '%s\n' "$entry"; } | crontab -
fi
current="$(crontab -l 2>/dev/null || true)"
if ! printf '%s\n' "$current" | grep -Fqx "$guest_entry"; then
  { printf '%s\n' "$current"; printf '%s\n' "$guest_entry"; } | crontab -
fi
nohup /home/covdef/fuzz-console/run.sh >/dev/null 2>&1 </dev/null &
nohup /bin/sh /home/covdef/coredef-microvm/ensure.sh >/dev/null 2>&1 </dev/null &
sleep 2
curl -fsS http://127.0.0.1:3100/healthz
