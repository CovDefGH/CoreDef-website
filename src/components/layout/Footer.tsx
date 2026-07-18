import Link from "next/link";
import Image from "next/image";
import { CTALink } from "@/components/ui/CTALink";
import { site } from "@/content/site";

const GROUPS = [
  {
    heading: "Solutions",
    links: [
      { href: "/solutions", label: "All Solutions" },
      { href: "/solutions/edim", label: "EDIM" },
      { href: "/solutions/enadox", label: "ENADOX" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/industries", label: "Industries" },
      { href: "/global", label: "Global Operations" },
      { href: "/careers", label: "Careers" },
    ],
  },
];

export function Footer() {
  const { email } = site;

  return (
    <footer className="border-line bg-surface relative overflow-hidden border-t">
      {/* Oversized brand mark bleeding off the corner — same low-opacity
          decorative language as the chapter sections above, scaled down
          for a light background (no mix-blend-screen; that's a dark-bg trick). */}
      <Image
        src="/logo.png"
        alt=""
        aria-hidden
        width={640}
        height={551}
        className="pointer-events-none absolute -right-32 -bottom-40 h-auto w-[560px] max-w-none opacity-[0.05] select-none"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          {/* Brand column — the strong identity anchor */}
          <div className="lg:max-w-sm lg:shrink-0">
            <Image
              src="/logo.png"
              alt=""
              width={64}
              height={55}
              className="h-14 w-auto"
            />
            <h2 className="font-display text-ink mt-5 text-2xl font-bold tracking-tight">
              Core Defenses
            </h2>
            <p className="text-ink-muted mt-4 max-w-sm text-sm leading-relaxed">
              Data analytics and secure communications for nuclear, energy,
              defense, and industrial operations.
            </p>
            <div className="mt-8">
              <CTALink href="/contact">Contact Us</CTALink>
            </div>
            <p className="text-ink-muted mt-10 text-xs leading-relaxed">
              © {new Date().getFullYear()} Core Defenses. All rights reserved.
            </p>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:flex-1">
            {GROUPS.map(({ heading, links }) => (
              <nav key={heading} aria-label={heading}>
                <h3 className="text-ink-muted text-xs font-semibold tracking-[0.08em] uppercase">
                  {heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {links.map(({ href, label }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-ink hover:text-primary text-sm transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label="Contact">
              <h3 className="text-ink-muted text-xs font-semibold tracking-[0.08em] uppercase">
                Contact
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="text-ink hover:text-primary text-sm transition-colors"
                  >
                    {email}
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-ink hover:text-primary text-sm transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
