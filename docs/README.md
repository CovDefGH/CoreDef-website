## What's in this repo

```
project/
├── README.md                  ← you are here
├── docs/
│   ├── PRD.md                 Product Requirements Document
│   ├── SRS.md                 Software Requirements Specification
│   ├── TECHNICAL-DESIGN.md    Architecture, stack, data flow, folder structure
│   ├── USER-STORIES.md        Persona-driven stories with acceptance criteria
│   ├── UX-NOTES.md            Design system, IA, sitemap, wireframe descriptions
│   ├── TEST-PLAN.md           QA strategy, test matrix, accessibility & perf gates
│   ├── ROADMAP.md             Phased delivery plan
│   └── CHANGELOG.md           Version history
├── src/                        Application source (Next.js App Router)
├── assets/                     Brand assets, imagery, diagrams
└── deployment/                 CI/CD, environment, and hosting configuration
```

## Products covered by this site

- **EDIM** — Nuclear Data Analytics platform (uncertainty reduction, thermal margin optimization,
  reactor engineering simulation).
- **ENADOX** — Secure Communications platform (resilient comms for denied/DDIL environments,
  software-defined radio, drone swarm links, industrial and military communication).

## Current design system

The visual system is defined in `docs/UX-NOTES.md` and mirrors the tokens already established in the
working prototype (`DESIGN.md` / "High-Performance Engineering"): a **light, high-contrast** theme
built on Space Grotesk, an Electric Blue / Sentinel Cyan / Deep Slate palette, sharp (non-rounded)
geometry, and card-based "bento grid" layouts. This is a deliberate pivot from the original dark-theme
brief — see `docs/UX-NOTES.md` → "Design System Decision Record" for the rationale and how to revert
if a dark mode is reinstated.

## Tech stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui · React Hook Form ·
Zod · Lucide Icons · deployed on Vercel.

## Getting started (once `src/` is scaffolded)

```bash
npm install
npm run dev
```

See `docs/TECHNICAL-DESIGN.md` for environment variables, folder conventions, and coding standards,
and `docs/ROADMAP.md` for the phased build order.

## Status

Planning and design-system phase complete (Phase 0–1). Product page prototypes exist for EDIM,
ENADOX, Mission/Home, Global/Locations, Secure Comms Contact, and Careers. See `docs/ROADMAP.md` for
what's next.
