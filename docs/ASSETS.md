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

All imagery is referenced through the manifest `src/content/media.ts` (semantic keys),
never by hardcoded path.

| File                             | Subject                          | Source                                                         | License          |
| -------------------------------- | -------------------------------- | -------------------------------------------------------------- | ---------------- |
| `public/hero.mp4`                | Nuclear power plant footage      | Pexels (video 6534498) — transcoded 1080p/12s/muted via ffmpeg | Pexels License   |
| `public/hero-poster.jpg`         | Hero video poster frame          | Derived from `hero.mp4`                                        | Pexels License   |
| `public/hero-infrastructure.jpg` | Nuclear cooling towers, blue sky | Unsplash (photo-1630142895963-6996ae6b3a5b)                    | Unsplash License |
| `public/data-center.jpg`         | Data-center network cabling      | Unsplash (photo-1744868562210-fffb7fa882d9)                    | Unsplash License |
| `public/operations.jpg`          | Operations-center display wall   | Unsplash (photo-1762846700143-4f3a47400986)                    | Unsplash License |
| `public/comms.jpg`               | Satellite communications dish    | Unsplash (photo-1526666923127-b2970f64b422)                    | Unsplash License |
| `public/drone.jpg`               | Unmanned aerial vehicle          | Unsplash (photo-1514598800938-f7125ea1aa1c)                    | Unsplash License |
| `public/energy.jpg`              | Electricity transmission towers  | Unsplash (photo-1473341304170-971dccb5ac1e)                    | Unsplash License |
| `public/team.jpg`                | Engineers collaborating          | Unsplash (photo-1581091226033-d5c48150dbaa, ThisisEngineering) | Unsplash License |
| `public/logo.png`                | Core Defenses shield mark        | Client-provided                                                | Owned            |

Video note: hero source was a 4K/25s/67 MB clip, transcoded to a 1080p / 12s / muted /
`faststart` H.264 loop (~2 MB) for web delivery. Rendered full-bleed behind the Home hero
copy, under a dark gradient scrim for text contrast. Served via `<video autoplay muted loop
playsinline>` with a poster; `prefers-reduced-motion` renders the poster still only
(see `src/components/sections/HeroVideo.tsx`).

## Typography

- **Display / headings:** Helvetica — native system font stack (`"Helvetica Neue", Helvetica,
  Arial, ...`) applied to `h1`–`h4` in `globals.css`. Not on Google Fonts / no self-hostable
  web-font version exists, so it isn't loaded via `next/font`; renders as real Helvetica on
  macOS/iOS and Arial (metrically near-identical) elsewhere.
- **Body:** Inter (humanist), loaded via `next/font/google` (self-hosted, `font-display: swap`)
  — `--font-sans` (Tailwind `font-sans`).

Tokens live in `src/styles/tokens.css`; heading family is applied globally in `globals.css`,
not per-component.
