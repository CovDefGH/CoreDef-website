import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";

const GROUPS = [
  {
    heading: "Quick Links",
    links: [
      { href: "/", label: "Mission" },
      { href: "/industries", label: "Industries" },
      { href: "/global", label: "Global Operations" },
      { href: "/careers", label: "Careers" },
    ],
  },
];

export function Footer() {
  const { email } = site;

  return (
    <footer className="border-line bg-surface border-t">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2 md:gap-10 md:px-6 lg:grid-cols-[1.55fr_1fr_1fr] lg:gap-14">
        <div className="lg:pr-8">
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
          <p className="text-ink-muted mt-4 max-w-sm text-sm leading-relaxed">
            Data analytics and secure communications for nuclear, energy,
            defense, and industrial operations.
          </p>
          <p className="text-ink-muted mt-6 text-xs leading-relaxed">
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

        <nav aria-label="Contact">
          <h2 className="text-ink text-sm font-semibold">Contact</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={`mailto:${email}`}
                className="text-ink-muted hover:text-primary text-sm transition-colors"
              >
                {email}
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-ink-muted hover:text-primary text-sm transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
