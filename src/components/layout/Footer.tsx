import Link from "next/link";
import Image from "next/image";

// Single standardized footer (UX-NOTES §6.8/§9) — used on every page, no variants.
// Groups per FR-FOOT-1. Every href resolves to a real route (FR-FOOT-2).
const GROUPS = [
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
  {
    heading: "Compliance",
    links: [
      { href: "/global", label: "ISO 27001" },
      { href: "/global", label: "SOC2 Compliance" },
    ],
  },
  {
    heading: "Operations",
    links: [
      { href: "/industries", label: "Industries" },
      { href: "/contact", label: "Contact Support" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-line bg-surface border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={28}
              className="h-7 w-auto"
            />
            <span className="font-display text-ink text-base font-bold tracking-tight">
              CORE DEFENSES
            </span>
          </div>
          <p className="text-ink-muted mt-4 max-w-xs text-sm">
            Advanced data analytics for critical infrastructure, backed by
            secure communications for mission critical operations.
          </p>
          <p className="text-ink-muted mt-6 text-xs">
            © {new Date().getFullYear()} Core Defenses. All rights reserved.
          </p>
        </div>

        {GROUPS.map(({ heading, links }) => (
          <nav key={heading} aria-label={heading}>
            <h2 className="text-ink text-sm font-semibold">{heading}</h2>
            <ul className="mt-4 space-y-2.5">
              {links.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-ink-muted hover:text-primary text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
