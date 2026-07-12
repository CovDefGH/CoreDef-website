"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// FR-NAV-1 primary links. "About" chosen over prototype's "Defense Tech"
// (UX-NOTES §9 open question — flagged for stakeholder confirmation).
const LINKS = [
  { href: "/", label: "Mission" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/global", label: "Global" },
  { href: "/careers", label: "Careers" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-line fixed inset-x-0 top-0 z-40 border-b bg-white">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={31}
            priority
            className="h-8 w-auto"
          />
          <span className="font-display text-ink text-base font-bold tracking-tight">
            CORE DEFENSES
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b-2 pb-1 text-sm transition-colors ${
                    active
                      ? "border-primary text-primary font-medium"
                      : "text-ink-muted hover:border-accent hover:text-ink border-transparent"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            {/* "Secure Login" relabeled per Open Decision 3 — routes to contact */}
            <Link
              href="/contact"
              className="border-primary bg-primary hover:border-ink hover:bg-ink border px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              Request Access
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          className="text-ink p-2 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-line border-t bg-white md:hidden"
        >
          <ul className="px-4 py-3">
            {LINKS.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href} className="border-line border-b last:border-0">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-sm ${
                      active ? "text-primary font-medium" : "text-ink-muted"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="border-primary bg-primary block border px-4 py-2.5 text-center text-sm font-medium text-white"
              >
                Request Access
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
