# Fuzz response

The website includes the local prototype's decoy generator as a Next.js catch-all route. Existing website pages and public assets keep their normal routes. Unknown paths return the site's 404 response until one visitor makes 10 distinct misses within 60 seconds. After that, roughly 8–12% of eligible unknown paths return a path-specific decoy. A generated path is cached for 24 hours, so opening a scanner hit in a different browser shows the same content.

`/login` is a decoy form independent of path fuzzing. It accepts one credential pair at a jittered interval around every 1,000 attempts per source IP, starting no earlier than attempt 10. The selected pair is stored as a digest for 24 hours and can be entered again from another browser. The resulting cookie opens only the invented `/portal` content. Passwords are not logged or sent to Groq.

On Vercel, Runtime Cache shares the short-lived counters, selected credentials, sessions, and generated documents across functions in one region. The EC2 deployment and local development use an in-memory cache in one process, so a restart clears these values. The cache is not an atomic database: concurrent requests can lose counter increments, and eviction can remove a decoy or session before its TTL. For strict counting and longer retention, use a Redis integration with atomic increments.

## Configuration

Decoy documents require `GROQ_KEY`. Set it in the website host's private environment; keep the key out of Git. Every selected, uncached path asks Groq for a path-specific document or data schema. For tabular files, Groq also supplies names, organization parts, roles, and locations; the renderer expands those values into a context-appropriate number of records. A successful document is cached for 24 hours. If the key is absent, the provider times out, validation fails, or the model budget is exhausted, that request gets the normal 404. No local document template or canned identity list is served. Relevant optional variables:

| Variable                   |              Default | Purpose                                                     |
| -------------------------- | -------------------: | ----------------------------------------------------------- |
| `FUZZ_MIN_DISTINCT_MISSES` |                 `10` | Distinct eligible misses before decoys                      |
| `FUZZ_WINDOW_MS`           |              `60000` | Miss window in milliseconds                                 |
| `DECOY_RATE`               |               `0.10` | Approximate fraction of selected paths                      |
| `DECOY_MAX_PER_DAY`        |                `500` | Maximum new decoy paths per day                             |
| `LOGIN_MIN_ATTEMPTS`       |                 `10` | Earliest selected login attempt                             |
| `LOGIN_SUCCESS_RATE`       |              `0.001` | Mean interval between selected credentials, with 20% jitter |
| `GROQ_MODEL`               | `openai/gpt-oss-20b` | Groq model for path-specific plans                          |
| `GROQ_MAX_PER_MINUTE`      |                 `20` | Approximate provider call budget per minute                 |
| `GROQ_MAX_PER_DAY`         |                `200` | Approximate provider call budget per day                    |

The 404 route and login responses use `Cache-Control: private, no-store`; a CDN therefore does not pin a 404 before a path becomes a decoy. Model calls run only for selected, uncached paths. Failed generations are not cached. This prototype should never be wired to a real authentication system.
