# Development Roadmap

**Project:** Core Defenses Corporate Website
**Status:** Draft v1.0

---

## Phase 0 — Foundations (complete except legal/compliance sign-off)

- [x] Design system tokens defined (`DESIGN.md`).
- [x] High-fidelity HTML prototypes for: Home/Mission, EDIM, ENADOX, Global/Locations, Contact/Secure
      Communications, Careers.
- [x] Product bootstrap prompt and initial documentation set (this `docs/` folder).
- [x] Resolve Open Decisions from `TECHNICAL-DESIGN.md` §10 (icon system, theme direction, Secure Login
      scope, live-data scope) — see CHANGELOG "Decided" entry (2026-07-12). CRM/email provider still open.
- [ ] Legal/compliance review of EDIM and ENADOX public messaging.
- [ ] Confirm real certification status (ISO 27001, SOC2, NIST CSF, FedRAMP) before it appears live —
      currently shown as target posture, flagged in CHANGELOG Phase 2c.

**Exit criteria:** all Open Decisions resolved and documented; stakeholders sign off on light-vs-dark
theme direction. — **Met** (light theme confirmed).

## Phase 1 — Engineering Setup (complete)

- [x] Scaffold Next.js 15 App Router project per `TECHNICAL-DESIGN.md` folder structure.
- [x] Design tokens in `src/styles/tokens.css` (Tailwind v4 `@theme` — supersedes the planned
      `tailwind.config.ts`).
- [x] Stand up shared layout (NavBar, Footer) as real components.
- [x] Configure ESLint, Prettier, TypeScript strict mode, CI pipeline (GitHub Actions).
- [x] Set up Vercel project; deployed to production.

**Exit criteria:** an empty-but-structured app deploys to a preview URL with working nav/footer shell. — **Met.**

## Phase 2 — Core Pages (complete)

- [x] Build Home/Mission from prototype (video hero, capability sections).
- [x] Build Solutions overview page.
- [x] Port EDIM page into real components + content model (`content/products/edim.ts`).
- [x] Port ENADOX page into real components + content model (`content/products/enadox.ts`).
- [x] Standardize the footer component.

**Exit criteria:** Home, Solutions, EDIM, and ENADOX pass functional tests in `TEST-PLAN.md` §4. — Built
and manually verified in-browser; formal `TEST-PLAN.md` §4 pass not yet run.

## Phase 3 — Company & Trust Pages (complete)

- [x] Build Industries page (`content/industries.ts`, 8 sectors).
- [x] Build About page.
- [x] Port Global/Locations page into real components + data-driven office hub model
      (`content/locations.ts`).
- [x] Port Careers page into real components + data-driven job listing model (`content/careers.ts`,
      inline `JobBoard` with department filter).
- [x] Contact page: email + map is the confirmed final approach. A "Transmission Details" submission
      form is not required (client confirmed) and is off the roadmap.

**Exit criteria:** all site sections navigable end-to-end. — **Met.**

## Phase 4 — SEO, Discoverability & Search Optimization

Make the site highly discoverable by traditional search (Google, Bing, DuckDuckGo) and by AI-powered
search, answer engines, and LLMs that read public web content.

- [ ] Unique page titles, descriptive meta descriptions, and canonical URLs on every route.
- [ ] Open Graph and Twitter/X card metadata.
- [ ] `robots.txt` and `sitemap.xml`.
- [ ] Favicon metadata (all required sizes/formats).
- [ ] Correct heading hierarchy (H1 → H2 → H3) and semantic HTML throughout.
- [ ] Descriptive image alt text and optimized internal linking.
- [ ] JSON-LD structured data: Organization, WebSite, Product (EDIM, ENADOX), breadcrumbs where
      applicable.
- [ ] Optimized, crawl-friendly URL structure and navigation.
- [ ] LLM discoverability: clear semantic structure, concise factual copy, one clear primary topic per
      page, machine-readable product and organization data.
- [ ] Verify no regression to page speed, Core Web Vitals, or Lighthouse SEO score while implementing
      the above.

**Exit criteria:** all pages carry complete metadata and structured data; sitemap/robots live; Lighthouse
SEO score and Core Web Vitals hold steady or improve.

## Phase 5 — Launch

- [ ] Final legal/content accuracy sign-off (`TEST-PLAN.md` §5).
- [ ] DNS/domain cutover.
- [ ] Post-launch monitoring (uptime, Core Web Vitals via real-user monitoring).
- [ ] Confirm analytics is privacy-respecting and correctly firing on key pages.

## Phase 6 — Post-Launch / Future Expansion (not yet scoped in detail)

- [ ] Evaluate real telemetry integration for "live stream" panels (currently illustrative) if product
      teams want a genuinely live status feed.
- [ ] Evaluate real interactive mapping provider for Locations page (currently illustrative/static).
- [ ] Evaluate authenticated "Secure Login" portal if a real customer-facing product surface is
      commissioned — this is a substantial scope increase and should be its own PRD, not an add-on to
      the marketing site.
- [ ] Localization, if international markets require it.
- [ ] Case studies / news-and-insights section, if content strategy calls for ongoing publishing.

---

## Sequencing Notes

- Phase 2 (EDIM/ENADOX) can proceed in parallel with Phase 3 (Industries/About/Careers/Global) once
  Phase 1's shared layout and token pipeline are in place: they don't share page-specific logic beyond
  the common component inventory in `UX-NOTES.md` §7.
- Contact is content-only (email + map) by client confirmation. No backend submission handler is
  planned; Phase 5 launch is not blocked on it.
