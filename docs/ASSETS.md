# Asset & Image Sourcing Policy

## Imagery

All photographic imagery must come from royalty-free, commercial-use-permitted sources:

- [Unsplash](https://unsplash.com) — Unsplash License (free, commercial use, no attribution required)
- [Pexels](https://www.pexels.com) — Pexels License
- [Pixabay](https://pixabay.com) — Pixabay Content License

Rules:

- Download the asset into `public/` and serve via `next/image` — **never hotlink** a third-party
  CDN at runtime (TECHNICAL-DESIGN.md §8; keeps the perf budget and removes an external dependency).
- Optimize before commit: cap source width at ~1920px, JPEG quality ≤ 80. `next/image` handles
  responsive AVIF/WebP variants from there.
- Record provenance in the table below.

## Current assets

| File                             | Subject                          | Source                                      | License          |
| -------------------------------- | -------------------------------- | ------------------------------------------- | ---------------- |
| `public/hero-infrastructure.jpg` | Nuclear cooling towers, blue sky | Unsplash (photo-1630142895963-6996ae6b3a5b) | Unsplash License |
| `public/logo.png`                | Core Defenses shield mark        | Client-provided                             | Owned            |

## Typography

Loaded via `next/font/google` (self-hosted, `font-display: swap`, no external request):

- **Display / headings:** Space Grotesk (geometric) — `--font-display`
- **Body:** Inter (humanist) — `--font-sans`

Paired on a contrast axis (geometric + humanist) per the impeccable pairing rule. Tokens live in
`src/styles/tokens.css`; heading family is applied globally in `globals.css`, not per-component.
