# Technical Design Document

**Project:** Core Defenses Corporate Website
**Status:** Draft v1.0

---

## 1. Architecture Overview

A statically-generated / hybrid-rendered marketing site on **Next.js 15 (App Router)**, deployed on
**Vercel**, with no persistent application database in v1. All product/content data is file-based
(structured JSON/TS content modules) so non-engineers can update copy, job listings, and locations via
pull request without touching layout code.

```
Browser
  │
  ▼
Vercel Edge Network (CDN + Edge Functions)
  │
  ▼
Next.js App Router (RSC + static generation)
  │            │
  ▼            ▼
Content       Contact Form Handler (Route Handler)
Modules             │
(TS/JSON)           ▼
              Email/CRM Webhook (external, e.g. transactional email API or CRM inbox)
```

## 2. Tech Stack

| Layer              | Choice                 | Notes                                                                                                                      |
| ------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Framework          | Next.js 15, App Router | SSG for marketing pages, RSC by default                                                                                    |
| Language           | TypeScript             | strict mode on                                                                                                             |
| Styling            | Tailwind CSS           | tokens sourced from `DESIGN.md` design system                                                                              |
| Components         | shadcn/ui              | headless primitives, styled to design tokens, not default shadcn theme                                                     |
| Animation          | Framer Motion          | scroll-reveal, fade, slide only — no heavy/looping animation                                                               |
| Forms              | React Hook Form + Zod  | client validation; server-side re-validation on submit                                                                     |
| Icons              | Lucide React           | consistent with Material Symbols used in current prototypes — **decide one icon system before build** (see Open Decisions) |
| Deployment         | Vercel                 | preview deployments per PR                                                                                                 |
| Linting/Formatting | ESLint + Prettier      | enforced in CI                                                                                                             |

## 3. Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home / Mission
│   ├── solutions/
│   │   ├── page.tsx                # Products overview
│   │   ├── edim/page.tsx
│   │   └── enadox/page.tsx
│   ├── industries/page.tsx
│   ├── about/page.tsx
│   ├── careers/page.tsx
│   ├── global/page.tsx             # Locations
│   ├── contact/page.tsx
│   └── api/
│       └── contact/route.ts        # form submission handler
├── components/
│   ├── layout/                     # NavBar, Footer, PageShell
│   ├── sections/                   # Hero, CapabilityCard, StatCard, SpecTable, etc.
│   └── ui/                         # shadcn primitives, styled
├── content/
│   ├── careers.ts                  # job listings data model
│   ├── locations.ts                # office/hub data model
│   ├── industries.ts
│   └── products/
│       ├── edim.ts
│       └── enadox.ts
├── lib/
│   ├── validations/                # Zod schemas
│   └── utils.ts
└── styles/
    └── tokens.css                  # generated from DESIGN.md frontmatter
```

## 4. Design Token Pipeline

`DESIGN.md`'s YAML frontmatter (colors, typography, spacing) is the single source of truth. It should
be mechanically translated into:

- `tailwind.config.ts` `theme.extend.colors` / `fontSize` / `spacing` (mirrors what's already
  hand-authored in the current HTML prototypes' inline `tailwind.config`).
- CSS custom properties in `styles/tokens.css` for any non-Tailwind consumers (e.g., raw SVG fills in
  diagrams).

**Do not hand-duplicate token values in component files.** The current prototypes inline the full
palette in a `<script id="tailwind-config">` per page — this does not scale past a handful of pages and
must be consolidated into one config before the third product page is built.

## 5. Content Model

### 5.1 Careers (`content/careers.ts`)

```ts
type JobListing = {
  id: string;
  title: string;
  location: string;
  employmentType: "Full-Time" | "Contract" | "Part-Time";
  department?: string;
  applyUrl: string;
};
```

Adding a role = adding one object to the array. No component change required.

### 5.2 Locations (`content/locations.ts`)

```ts
type OfficeHub = {
  id: string;
  city: string;
  country: string;
  regionTag: "HQ" | "EMEA" | "APAC" | "AMER";
  description: string;
  specialties: string[];
  status: "ACTIVE" | "PLANNED";
  coordinates: { lat: number; lng: number };
};
```

Coordinates support swapping the current illustrative map for a real mapping provider later without a
data migration.

### 5.3 Products (`content/products/edim.ts`, `enadox.ts`)

```ts
type ProductPage = {
  slug: string;
  eyebrow: string;
  name: string;
  tagline: string;
  stats: { label: string; value: string; description: string }[];
  specifications: { label: string; value: string }[];
};
```

## 6. Form Handling

- Client: React Hook Form + Zod schema (`lib/validations/contact.ts`) validates required fields, email
  format, and category selection before submit.
- Server: `app/api/contact/route.ts` re-validates with the same Zod schema (never trust client-only
  validation), then forwards to the configured email/CRM webhook based on the selected inquiry
  category (Business / Government / Partnerships / Careers / General each map to a distinct recipient
  or CRM tag).
- No form payload is persisted in application storage beyond what the downstream email/CRM provider
  retains.

## 7. Integrations (to be finalized — see Open Decisions)

- **Email/CRM delivery** for contact form: candidate providers — Resend, Postmark, or direct CRM
  webhook (HubSpot/Salesforce) depending on sales tooling already in use.
- **Mapping** for Locations page: v1 may ship a static/illustrative map (as in current prototype);
  v2 candidate is Mapbox GL or a lightweight SVG world-map component to avoid heavy third-party JS.
- **Analytics**: privacy-respecting analytics (e.g., Vercel Analytics or Plausible) recommended over
  full behavioral tracking, consistent with the security-forward brand.

## 8. Coding Standards

- TypeScript strict mode; no `any` without an inline justification comment.
- Components are function components; no default exports for shared UI primitives (named exports only)
  to keep refactors and codemods reliable.
- Tailwind classes ordered logically (layout → spacing → typography → color → state) — enforced via
  `prettier-plugin-tailwindcss`.
- No inline `style={{ backgroundImage: ... }}` for production imagery — current prototypes use inline
  background-image URLs from a Google-hosted CDN as placeholders; these must be replaced with owned,
  optimized assets (`next/image`) before launch.
- Every interactive element must have a visible focus state and an accessible name (no icon-only
  buttons without `aria-label`).

## 9. Performance Budget

| Asset type                             | Budget                                            |
| -------------------------------------- | ------------------------------------------------- |
| JS (per route, gzipped)                | < 150KB                                           |
| Hero image (optimized)                 | < 200KB, served via `next/image` responsive sizes |
| Web fonts                              | Space Grotesk subset, `font-display: swap`        |
| Total page weight (excl. fonts cached) | < 1MB on first load                               |

## 10. Open Decisions (must be resolved before Phase 2 build-out)

1. **Icon system**: current prototypes use Google Material Symbols via a webfont link; brief specifies
   Lucide Icons. Pick one — recommend Lucide for bundle-size and tree-shaking reasons, requires
   re-mapping icons used in prototypes (`speed`, `memory`, `security`, `shield`, etc.).
2. **Dark vs. light theme**: original brief specified a dark navy/charcoal theme; current working
   prototype (`DESIGN.md`) is a light "High-Performance Engineering" theme. Confirm final direction
   with stakeholders — see `UX-NOTES.md` §Design System Decision Record.
3. **"Secure Login" button**: confirm whether this is a real authenticated portal (out of scope per
   PRD) or should be relabeled/removed for launch.
4. **Live data visualizations**: confirm all "live stream" / "compliance stream" panels are explicitly
   illustrative in production, or scope a real telemetry integration as a distinct future phase.
5. **CRM/email provider** for contact form routing.
