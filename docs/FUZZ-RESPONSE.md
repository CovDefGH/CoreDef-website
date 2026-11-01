# Fuzz response on Vercel

The website includes the local prototype's decoy generator as a Next.js catch-all route. Existing website pages and public assets keep their normal routes. Unknown paths return the site's 404 response until one visitor makes 10 distinct misses within 60 seconds. After that, roughly 8–12% of eligible unknown paths return a path-specific decoy. A generated path is cached for 24 hours, so opening a scanner hit in a different browser shows the same content.

`/login` is a decoy form independent of path fuzzing. It accepts one credential pair at a jittered interval around every 1,000 attempts per source IP, starting no earlier than attempt 10. The selected pair is stored as a digest for 24 hours and can be entered again from another browser. The resulting cookie opens only the invented `/portal` content. Passwords are not logged or sent to Groq.

Vercel Runtime Cache shares the short-lived counters, selected credentials, sessions, and generated documents across functions in one region. Local development uses the package's in-memory fallback. The cache is not an atomic database: concurrent requests can lose counter increments, and eviction can remove a decoy or session before its TTL. For strict counting and longer retention, use a Redis integration with atomic increments.

## Configuration

The deployed route works with local templates without any environment variables. To use Groq for unfamiliar paths and longer documents, set `GROQ_KEY` in the **CoreDef website Vercel project** for Production and redeploy. Keep the key out of Git. Relevant optional variables:

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

The 404 route and login responses use `Cache-Control: private, no-store`; Vercel's CDN therefore does not pin a 404 before a path becomes a decoy. Model calls run only for selected, uncached paths that need them. If Groq is unavailable or the budget is exhausted, the route uses a local template. This prototype should never be wired to a real authentication system.
