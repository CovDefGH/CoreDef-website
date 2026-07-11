# UX Documentation

**Project:** Core Defenses Corporate Website
**Status:** Draft v1.0

---

## 1. Design System Decision Record

**Original brief** (see project bootstrap prompt) called for a **dark theme** — deep navy, charcoal,
black, with steel blue/slate/muted cyan secondary and electric blue accent — in the visual register of
Palantir, Anduril, and Covert Defenses.

**What has actually been built** (`DESIGN.md`, "High-Performance Engineering") is a **light,
high-contrast white theme** — same Electric Blue (#0052FF) and Sentinel Cyan (#00D1FF) accent logic,
but on a white/cool-slate surface rather than navy/black, with Deep Slate (#0F172A) reserved for text
and structural elements rather than the background.

**Rationale for the pivot** (as expressed in `DESIGN.md`): the light theme targets a "clinical
efficiency" read — security analysts and infrastructure engineers doing extended data analysis benefit
from a well-lit, high-readability surface rather than a dark stealth-ops aesthetic. This is a valid
alternative interpretation of "engineering precision," but it is a different brand feeling than the
brief's explicit dark-theme direction.

**Recommendation:** confirm with stakeholders before Phase 2 which direction is canonical. If dark mode
is reinstated, the token structure in `DESIGN.md` already supports a `dark:` variant (visible in the
prototype's `dark:bg-surface` classes), so a theme switch is a token swap, not a rebuild — but the
`dark:` values currently just reuse the light tokens and would need real dark-mode values authored.

This document proceeds using the **current, built light theme** as the system of record, since it is
what exists in working prototypes today.

## 2. Brand Personality

Precision, transparency, high-performance reliability. Audience: security analysts and infrastructure
engineers who need clarity during extended data review, not consumers who need to be sold excitement.
Style family: Modern Corporate / Technical, Minimalist influence. Emotional target: clinical
efficiency — every element serves a functional purpose, like a well-lit professional laboratory.

## 3. Design Tokens (summary — full source in `DESIGN.md`)

- **Primary** `#0052FF` (Electric Blue) — primary actions, critical status.
- **Secondary** `#00D1FF` (Sentinel Cyan) — data viz, highlights, interactive states.
- **Tertiary** `#0F172A` (Deep Slate) — high-contrast text and structure.
- **Neutral** `#F8FAFC` (Cool Slate) — surface layering, borders, background depth.
- **Typography**: Space Grotesk across all roles (headline/body/label) — geometric, technical,
  legible.
- **Shape**: Sharp (0-radius) corners everywhere except status pips and avatars — communicates
  rigidity/precision over friendliness.
- **Elevation**: tonal layers and 1px outlines, not drop shadows. Hover state = border-color shift
  (Slate → Sentinel Cyan), not a "lift."
- **Grid**: 12-col desktop (24px gutter, 64px margin) / 8-col tablet / 4-col mobile, 4px baseline,
  8px spacing rhythm.

## 4. Information Architecture

```
Home (Mission)
├── Solutions
│   ├── EDIM
│   └── ENADOX
├── Industries
├── About            (Defense Tech / company narrative — nav label TBD, see note below)
├── Careers
├── Global           (Locations)
└── Contact          (Secure Communications form)
```

**Note:** current prototype nav uses the label "Defense Tech" where the original brief specifies
"About." Confirm final nav labeling — "Defense Tech" reads more product/capability-oriented, "About"
reads more corporate/company-oriented. Both are defensible; pick one before finalizing IA copy.

## 5. Sitemap (URL structure)

```
/                     Home / Mission
/solutions            Products overview
/solutions/edim       EDIM product detail
/solutions/enadox     ENADOX product detail
/industries           Industries served
/about                Company narrative, leadership, mission depth
/careers              Careers
/global               Locations / operations hubs
/contact              Secure Communications / Contact
```

## 6. Page-Level Wireframe Descriptions

### 6.1 Home / Mission

- Fixed top nav (brand + 5 links + Secure Login CTA).
- Hero: two-column on desktop — left: eyebrow status chip, H1 (two-line, second line accent-colored),
  supporting paragraph, two CTAs (primary filled, secondary outlined); right: "Live Stream" terminal
  panel with simulated log lines and a blinking cursor.
- Core Capabilities: section header + two-column capability blocks (OT/ICS Safeguards, Nuclear
  Analytics), each with icon swatch, heading, description, and a "Detail Specs" / "View Protocol" text
  link; a supporting screenshot-style image sits between them.
- Trust row: three icon + heading + one-line description items (Zero-Trust Architecture, Microsecond
  Latency, Global Deployment) in a horizontal row, stacking on mobile.
- Footer (see §6.8).

### 6.2 Solutions — EDIM

- Hero header: eyebrow chip ("Endpoint/Nuclear Data Analytics" label), H1, supporting paragraph,
  left-aligned on desktop.
- Bento grid: large System Topology panel (8 cols) + two stacked stat cards (4 cols: Detection
  Latency, Resource Footprint).
- Full-width Core Specifications table below the bento grid, two-column label/value rows with
  alternating row shading.
- Footer.

### 6.3 Solutions — ENADOX

- Hero header: eyebrow ("Enterprise Telemetry"), H1 ("ENADOX System"), two header-right actions
  (secondary "View Logs," primary "Initialize Sequence").
- Bento grid: large Live Integrity Stream panel with embedded data-viz image (8 cols) + right column
  (4 cols) stacking a System Status card (pulsing status dot, headline state, description) above a
  Core Metrics card (Encryption Depth, Throughput, Latency rows).
- Footer.

### 6.4 Contact / Secure Communications

- Page header: H1 "Secure Communications," supporting paragraph noting monitored/logged transmissions.
- Two-column layout: left — "Transmission Details" form card (Name, Email, Category select, message
  textarea, submit action with a TLS status microcopy); right — stacked "PGP Public Key" card (key
  block + download action) above a "Command Nodes" card (1–2 hub locations).
- Footer.

### 6.5 Global / Locations

- Page header: H1 "Global Strategy & Operations Hubs," supporting paragraph.
- Full-width illustrative map panel with labeled node pins and a center overlay card ("Interactive
  Threat Vector Map — Real-time data stream initialization required" or production-appropriate
  copy once map is live).
- Four-column "Strategic Operations Hubs" cards below the map: city/country, region tag chip,
  description, 1–2 specialty tags, status row with active indicator dot.
- "Global Defense Compliance" panel: left — heading + description + certification chips (ISO 27001,
  SOC2 Type II, NIST CSF, FedRAMP High); right — terminal-style compliance-check log panel.
- Footer (multi-column: Legal / Compliance / Operations link groups, per FR-FOOT).

### 6.6 Careers

- Hero: centered "Mission Active" chip, H1 ("Engineer the Shield"), supporting paragraph, two CTAs
  (View Open Missions, Our Engineering Culture).
- "Engineering Impact" section: 2x2-ish asymmetric card grid — a larger card with photo + description
  (Distributed Sentinel Systems), a stat card (< 5ms Global Latency Target), a stat-emphasis card
  (Zero Trust Architecture), and a card pairing description text with a terminal-style log snippet
  (Precision Tooling).
- "Active Missions" section: header + filter control, then a list of job rows (title, location +
  employment type meta line, Apply Now button per row).
- Footer.

### 6.7 Industries (not yet prototyped — spec for build)

- Header: H1, supporting paragraph on critical-infrastructure risk generally.
- Grid or stacked list of industry entries (Energy, Nuclear, Defense, Industrial, Government,
  Utilities, Critical Infrastructure, Manufacturing), each with a short description and a link to the
  most relevant product page.
- Footer.

### 6.8 Footer (shared across all pages)

- Brand mark + copyright/tagline line spanning full width.
- Three or four link columns depending on page (Legal, Compliance, Operations at minimum; product
  pages use a simpler two-column variant per current prototypes — **standardize to one footer
  component with consistent columns before launch**, current EDIM/ENADOX prototypes show a
  slightly different footer link grouping than the Global/Careers prototypes).

## 7. Component Inventory

| Component                 | Used on                                | Notes                                                                    |
| ------------------------- | -------------------------------------- | ------------------------------------------------------------------------ |
| NavBar (fixed)            | All pages                              | Active-link underline state; collapses to hamburger < `md`               |
| Hero (split)              | Home                                   | Text + live terminal panel                                               |
| Hero (header-only)        | EDIM, ENADOX, Careers, Global, Contact | Eyebrow chip + H1 + paragraph, optional header-right actions             |
| Capability Card           | Home, Industries                       | Icon + heading + description + text link                                 |
| Bento Panel (large)       | EDIM, ENADOX                           | Glass/outline container, min-height enforced, houses illustrative visual |
| Stat Card                 | EDIM, Careers                          | Icon + label + large numeric value + one-line description                |
| Status Card               | ENADOX                                 | Pulsing dot + headline state + description                               |
| Metrics/Spec Table        | EDIM, ENADOX                           | Label/value rows, zebra striping                                         |
| Terminal/Sentinel Monitor | Home, Global, Careers                  | Monospace simulated log lines                                            |
| Office Hub Card           | Global                                 | City, region chip, description, specialty tags, status                   |
| Compliance Chip           | Global, Footer                         | Rounded/sharp tag with cert name                                         |
| Job Listing Row           | Careers                                | Title, meta line, Apply Now button                                       |
| Contact Form              | Contact                                | RHF + Zod validated fields                                               |
| PGP Key Panel             | Contact                                | Code block + download action                                             |
| Footer                    | All pages                              | Standardize per §6.8 note                                                |

## 8. Responsive Strategy

- **Mobile-first** build order: base styles target ≤375px, then progressively enhanced at `md` (768px)
  and `lg`/`xl` (1024px/1440px) breakpoints, matching the grid system in §3.
- Bento grids (`md:col-span-8` / `md:col-span-4` patterns already used in prototypes) collapse to
  `grid-cols-1` below `md` — verified pattern, keep consistent across all future bento layouts.
- Nav collapses to hamburger below `md`; ensure the mobile menu itself follows the same sharp-corner,
  outline-based elevation logic as desktop overlays (§ Elevation & Depth in `DESIGN.md`).

## 9. Open UX Questions

1. Confirm nav label: "Defense Tech" vs. "About" (see §4 note).
2. Confirm whether "Secure Login" is real or should be relabeled (see `TECHNICAL-DESIGN.md` Open
   Decisions).
3. Standardize the footer component — current prototypes show two slightly different footer link
   groupings (product pages vs. Global/Careers pages).
4. Confirm dark-theme direction per §1.
