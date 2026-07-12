# Changelog

All notable changes to the Core Defenses website project will be documented in this file.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Decided (2026-07-12 — resolves TECHNICAL-DESIGN.md §10 Open Decisions)

- **Theme:** light ("High-Performance Engineering") confirmed by stakeholders; matches provided logo.
- **Icon system:** Lucide React (Material Symbols retired).
- **"Secure Login":** relabeled to "Request Access," routes to `/contact`.
- **Live data panels:** ship as clearly-illustrative UI (per PRD §4); real telemetry deferred to Phase 6.
- **Email/CRM provider:** still open — must be chosen before Phase 3 contact-form backend (Resend recommended).
- **Nav label:** "About" chosen over prototype's "Defense Tech" (UX-NOTES §9 Q1) — revisit if stakeholders object.

### Phase 2c — Full site build-out + client revisions (2026-07-12)

Built in parallel (multi-agent). All pages now carry real content + imagery.

- **Home:** hero now a muted autoplaying **video** loop (`public/hero.mp4`, bigger panel);
  removed the "System Status: Optimal" chip; generalized copy; multiple images across the page.
- **EDIM:** rebuilt as simple/professional use-case blocks (`FeatureRow`) with photos — the
  thermal-margin story (uncertainty → margin → $300–500M/reactor). Removed the SVG topology gimmick.
- **ENADOX:** rebuilt to Arvind's framing — self-healing redundancy (embedding one sensor's data
  in another), secure comms in DDIL environments (SDR, drone-swarm), resilient mission continuity.
  Removed the "Live Integrity Stream / System Status / Initialize Sequence" gimmicks.
- **Careers:** all open roles now render **inline** with a department filter (`content/careers.ts`,
  8 roles mirrored from covertdefenses.com/careers); Apply Now → Google Form. No external redirect to view roles.
- **Contact:** removed the temporary "scheduled for a later phase" copy — evergreen now.
- **New pages built:** Industries (`content/industries.ts`), About, Global/Locations
  (`content/locations.ts` — Lexington HQ ACTIVE + planned AMER/EMEA/APAC hubs), Solutions overview polished.
- **Imagery:** 1 hero video + 7 owned images sourced (Unsplash/Pixabay) and optimized; manifest at
  `content/media.ts`; policy + provenance in `docs/ASSETS.md`.
- **Motion:** `motion`/motion.dev adopted for hover micro-interactions (`MotionCard`); scroll reveals
  use native CSS scroll-driven animation (`Reveal` → `.cd-reveal`) because motion `whileInView` gated
  content visibility and could ship blank in headless/SEO renderers. Page-transition fade via `template.tsx`.
- **⚠ Perf:** motion.dev in the root provider adds ~40 KB gz to first-load; pages using it report
  ~169 kB (over the 150 kB NFR guardrail). Accepted per client's rich-UX direction; Lighthouse CI in a
  later phase is the real gate — fallback is scoping the provider or dropping to CSS-only hover.
- **⚠ Compliance chips (Global):** ISO 27001 / SOC 2 / NIST CSF / FedRAMP shown as _target_ posture,
  not held certifications — confirm before launch (PRD §10).
- **⚠ Careers employmentType** defaulted to Full-Time (not specified on source) — confirm.

### Phase 2b — Premium UX pass (client `/goal` request, 2026-07-12)

- **Typography:** two-family system — Space Grotesk (display) + Inter (body), both via
  `next/font` (self-hosted, no external request). Headings pick up the display family from one
  `globals.css` rule; body defaults to Inter. Tokens: `--font-display` / `--font-sans`.
- **Hero image:** replaced the prototype terminal panel on Home with an owned, optimized image
  (`public/hero-infrastructure.jpg`, Unsplash) served via `next/image`. **Deviation from FR-HOME-2**
  (which specified a live-style terminal panel) — done on explicit client direction. The
  "System Status: Optimal" credibility chip is retained.
- **Image sourcing policy:** new `docs/ASSETS.md` — royalty-free only (Unsplash/Pexels/Pixabay),
  downloaded into `public/` and served through `next/image`, never runtime-hotlinked. Provenance
  table maintained there.
- **Contact section** (`/contact`): live Google Maps place embed (client-provided `cid`,
  `output=embed` → iframe-safe, no Maps API key, NFR-SEC-2), email card (`info@covertdefenses.com`),
  ASTeCC operations address, and a careers cross-link. The full validated "Transmission Details"
  form (FR-CONTACT) still waits on the email/CRM provider decision — Phase 3.
- **Careers section** (`/careers`): recruitment hero, Engineering Impact cards (FR-CAR-2, incl. the
  `< 5ms` quantified claim), "Apply Now" → client Google Form, "View All Open Roles" →
  covertdefenses.com/careers. Data-driven job-listing model (FR-CAR-3/4) remains Phase 3.
- **Motion:** native CSS only — scroll-driven reveals (`animation-timeline: view()`) and a
  navigation fade (`app/template.tsx`), both gated on `prefers-reduced-motion: no-preference` and
  visible-by-default (SRS §2.3, no-JS safe). Chose this over adding the `motion`/motion.dev runtime:
  zero bundle, keeps the <150 KB budget, more accessible. Can swap in motion.dev later if richer
  choreography is wanted. The other suggested libraries (reactbits, aceternity, skiper-ui,
  shadcnblocks, unlumen) were treated as inspiration only — no dependencies added.
- **a11y:** `prefers-reduced-motion` respected on all status-pulse indicators (`motion-reduce`).
  Resolves Copilot review on PR #1.
- **⚠ Brand/domain mismatch (needs a stakeholder call):** the site brands as "Core Defenses" but
  the client-provided contact email and careers links are `@covertdefenses.com` /
  covertdefenses.com. Data used as given; confirm which brand name is canonical before launch.
- Retired the now-unused `TerminalPanel` component.

### Phase 1 (complete)

- Next.js 15 App Router scaffold (`src/`), TypeScript strict, Tailwind v4.
- Single design-token source: `src/styles/tokens.css` (Tailwind v4 `@theme` replaces the
  planned `tailwind.config.ts` + generated-CSS pair — one file serves both roles).
- Shared layout shell: `NavBar` (active state + mobile collapse, FR-NAV-1..4) and one
  standardized `Footer` (FR-FOOT-1/2; §6.8 discrepancy resolved before first use).
- Route stubs for the full sitemap with unique per-page metadata (NFR-SEO-2).
- ESLint + Prettier (+tailwindcss plugin) + GitHub Actions CI; deployed to Vercel.
- Note: `DESIGN.md` and the HTML prototypes referenced by this doc set were not present in
  the repo; tokens were reconstructed from UX-NOTES.md §3 with stakeholder sign-off.

### Added

- Initial documentation set: PRD, SRS, Technical Design, User Stories, UX Notes, Test Plan, Roadmap.
- Design system definition (`DESIGN.md`) — "High-Performance Engineering," light theme, Space Grotesk
  typography, Electric Blue / Sentinel Cyan / Deep Slate palette.
- High-fidelity prototypes:
  - Home / Mission page
  - EDIM product detail page
  - ENADOX product detail page
  - Global / Locations page
  - Secure Communications / Contact page
  - Careers page

### Known Issues / Deviations from Original Brief

- Prototype theme is light; original brief specified a dark navy/charcoal theme. See
  `docs/UX-NOTES.md` §1 (Design System Decision Record) — unresolved, pending stakeholder decision.
- Nav label inconsistency: prototype uses "Defense Tech," brief implies "About." Unresolved — see
  `docs/UX-NOTES.md` §4.
- Footer link groupings differ slightly between product pages (EDIM/ENADOX) and other pages
  (Global/Careers). Needs standardization — see `docs/UX-NOTES.md` §6.8/§9.
- Icon system inconsistency: prototypes use Google Material Symbols; brief specifies Lucide Icons.
  Unresolved — see `docs/TECHNICAL-DESIGN.md` §10.
- All "live" data panels (System Topology, Live Integrity Stream, Compliance Stream) are currently
  static/illustrative, not connected to real backend data. Must be explicitly confirmed as illustrative
  in production copy, or scoped as a real integration in a later phase.
- Placeholder imagery is served from an external Google-hosted CDN URL in the prototypes; must be
  replaced with owned, optimized assets before launch.

### Not Yet Started

- Industries page (no prototype yet; spec exists in `docs/UX-NOTES.md` §6.7).
- About page (no prototype or copy yet).
- Products/Solutions overview page (no prototype yet).
- Real contact form backend integration (CRM/email provider not yet selected).
- Real mapping integration for Locations page.

---

## Versioning Note

This project has not yet been tagged with a release version. The first tagged release should occur at
the end of Phase 5 in `docs/ROADMAP.md`, once the Release Sign-off Checklist in `docs/TEST-PLAN.md`
§10 passes in full. Until then, all work is tracked under `[Unreleased]`.
