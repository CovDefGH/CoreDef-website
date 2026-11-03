# Deterministic fuzz generator

`deterministic_fuzz.py` deploys to the `modalcd` Modal profile as
`coredef-fuzz-deterministic`. It runs pinned IBM Granite 3.1 2B weights on one
L40S GPU with vLLM 0.14.0, serialized inference, greedy decoding, and
batch-invariant kernels. The model license is Apache 2.0.

The HTTPS endpoint is protected by Modal proxy authentication. Request JSON:

```json
{
  "prompt": "Write the contents of /internal/hosts.txt ...",
  "seed": 12345,
  "max_tokens": 2048,
  "expected_sha256": null
}
```

The first request runs up to three generations and returns content only after
two byte-identical outputs are observed. The caller stores the prompt, seed,
model revision, and returned SHA-256, not the file. Subsequent requests send
that SHA-256 as `expected_sha256`; the endpoint regenerates and returns content
only when the hash matches. It fails closed if three attempts cannot reproduce
the expected bytes. No generated document is written to a Modal Volume or file.

Test with `modal run modal/deterministic_fuzz.py`; deploy with
`modal deploy modal/deterministic_fuzz.py`. The built-in test generates a
report-sized response and compares it with a regenerated response.

This endpoint is not yet connected to the website. The site still caches full
rendered decoys until its `service.mjs` storage path is replaced with the
prompt/seed/hash contract above. A cold GPU start and the first verified
generation are considerably slower than a warm repeat request. The single
worker cap bounds spend but queues concurrent requests.
