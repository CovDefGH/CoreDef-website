# Product

## Register

brand

## Users

Security analysts, infrastructure engineers, and technical procurement/decision-makers at nuclear,
energy, defense, and industrial organizations. They land here to evaluate whether EDIM (predictive
analytics) and ENADOX (secure communications) are credible for their operating environment, to check
company legitimacy before an RFP or partnership conversation, or to review open engineering roles.
They read for extended technical detail, not a quick emotional pitch.

## Product Purpose

Corporate/marketing site for Core Defenses. Communicates two product platforms — EDIM (nuclear
predictive analytics correcting calculational bias) and ENADOX (secure communications for denied/
degraded environments) — establishes technical credibility with a scientific/engineering audience, and
drives contact and careers inquiries. Success looks like a visitor from a nuclear utility or defense
contractor reading the site and thinking "this company clearly knows what they're doing," not "nice
website."

## Brand Personality

Precision, transparency, high-performance reliability — "clinical efficiency," like a well-lit
professional laboratory, not a stealth-ops mood board. Every element serves a functional purpose.
Copy is factual and short-sentence (engineering voice), never marketing-flowery or "AI-generated"
sounding — this was explicitly client-driven this session (AMS Corporation used as the writing-style
reference; ams-corp.com's plain, adjective-free, fact-first copy is the target register).

## Anti-references

- Dark stealth-ops aesthetic (Palantir/Anduril-style navy-and-black drama) — considered in the
  original brief, deliberately rejected in favor of a light, high-readability surface.
- AI-marketing copy: philosophical statements ("we believe…"), contrast-aphorisms ("measurement over
  assumption"), flowery adjectives ("mission-critical", "cutting-edge", "world-class"), inspirational
  tone. Explicitly flagged and removed by the client this session.
- Generic SaaS visual clichés: gradient text, glassmorphism, hero-metric templates, eyebrow labels
  above every section, drop-shadow "lift" elevation.

## Design Principles

- Elevation is an outline/border-color shift, never a shadow or lift (NFR-A11Y-2, tokens.css) —
  reinforces "precision instrument," not soft consumer UI.
- Sharp corners everywhere (0-radius) — communicates rigidity and precision over friendliness.
- Copy reads like an engineer wrote it: factual, specific, short sentences, no philosophy or
  emotional persuasion.
- Light "well-lit lab" surface over dark drama — built for extended technical reading, not mood.
- Every visual element earns its place functionally; no decoration for decoration's sake.

## Accessibility & Inclusion

WCAG 2.1 AA across all pages. Full keyboard operability with visible focus states (outline, matching
the border-shift interactive pattern — never a shadow-based focus ring). Minimum 4.5:1 text contrast
against surface colors. All motion gated on `prefers-reduced-motion: no-preference`, with a static/
poster fallback so nothing ships blank for motion-sensitive or no-JS users.
