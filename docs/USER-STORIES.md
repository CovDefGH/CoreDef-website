# User Stories

**Project:** Core Defenses Corporate Website
**Status:** Draft v1.0

Stories are grouped by persona (see `PRD.md` §5). Each includes acceptance criteria sufficient for QA
sign-off (cross-reference `TEST-PLAN.md`).

---

## Persona: Enterprise Security Decision-Maker

**US-1** — As an enterprise security decision-maker, I want to understand within seconds of landing on
the homepage whether Core Defenses operates at the level of rigor my organization requires, so I can
decide whether to keep evaluating.

- AC: Hero section is visible above the fold with no scroll on desktop ≥1440px.
- AC: Hero copy references critical infrastructure and mission-critical reliability without generic
  cybersecurity marketing language.
- AC: A system-status or trust indicator (e.g., "System Status: Optimal") is visible in the hero.

**US-2** — As a decision-maker evaluating EDIM, I want to see quantified performance claims (latency,
resource footprint) so I can compare against incumbent vendors.

- AC: EDIM page presents at least two stat cards with numeric values and one-sentence context each.
- AC: Values are presented in a fixed, legible format (e.g., monospace or tabular figures) consistent
  with the design system's "Sentinel Monitor" component.

**US-3** — As a decision-maker, I want a clear compliance/certification trail before I contact sales.

- AC: Footer or Locations page lists certification badges (ISO 27001, SOC2, etc.) on every page.
- AC: Each certification either links to detail or is clearly labeled as current status.

## Persona: Government / Defense Procurement Contact

**US-4** — As a government procurement contact, I want a dedicated inquiry path for government-related
business so my request routes to the right team.

- AC: Contact page's Clearance Level/Category selector includes a distinct "Government" option.
- AC: Selecting "Government" and submitting routes to the correct internal distribution (see
  `TECHNICAL-DESIGN.md` §6).

**US-5** — As a government contact, I want to see a legitimate, geographically distributed operations
footprint before engaging further.

- AC: Locations page shows at least the current operations hubs (Washington D.C., London, Singapore,
  Tokyo, or equivalent) with region tags and status indicators.
- AC: Each hub has a specific (not generic) description of its function.

**US-6** — As a security-conscious contact, I want the option to encrypt sensitive correspondence.

- AC: Contact page provides a downloadable PGP public key with clear usage instructions.

## Persona: Nuclear / Energy Sector Engineer

**US-7** — As an energy-sector engineer unfamiliar with Core Defenses, I want EDIM's value explained
without requiring nuclear-physics expertise.

- AC: EDIM page copy uses terms like "uncertainty reduction," "thermal margin," and "operational
  efficiency" rather than reactor-internals jargon.
- AC: No claim on the page requires specialist nuclear-engineering background to understand its
  business implication.

**US-8** — As an engineer, I want to see integration and deployment specifics (APIs, compatibility,
data residency) before recommending EDIM internally.

- AC: EDIM page includes a specifications table with Deployment, Compatibility, Data Residency, and
  Integration APIs rows.

## Persona: Prospective Employee (Engineer)

**US-9** — As a prospective engineering hire, I want to understand what kind of engineering problems
I'd actually work on, not generic corporate-culture copy.

- AC: Careers page "Engineering Impact" section includes at least one concrete technical claim (e.g., a
  latency target, a scale statistic) rather than only values statements.
- AC: At least one supporting photograph or visual represents real engineering environment (data
  center, operations floor, etc.), not generic stock-office imagery.

**US-10** — As a prospective hire, I want to browse and filter open roles easily.

- AC: Active Missions (job listings) section lists title, location, and employment type per row.
- AC: A filter control is present and functional (by location and/or department at minimum).
- AC: Each listing has a working "Apply Now" action.

## Persona: Partner / Channel Contact

**US-11** — As a potential partner, I want a distinct inquiry path that won't get routed as a generic
sales lead.

- AC: Contact page category selector includes "Partnerships" as a distinct option from "Business."

## Cross-Cutting / Accessibility Stories

**US-12** — As a keyboard-only user, I want to navigate the entire site without a mouse.

- AC: All interactive elements (nav links, buttons, form fields, filters) are reachable via Tab in a
  logical order with visible focus states.

**US-13** — As a screen-reader user, I want data visualizations to have a meaningful text alternative.

- AC: Every chart/diagram/"live stream" panel has an `aria-label` or adjacent text summary describing
  what it represents, since the visual itself is illustrative rather than the sole data source.

**US-14** — As a mobile user, I want the same information hierarchy as desktop, just reflowed.

- AC: Bento-grid product pages (EDIM, ENADOX) collapse to a single readable column below `md` breakpoint
  without losing any stat cards or specification rows.
