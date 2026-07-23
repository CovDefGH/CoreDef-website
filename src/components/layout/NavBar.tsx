"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Mission" },
  { href: "/solutions", label: "Solutions" },
  { href: "/careers", label: "Careers" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function NavBar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Clicking a link to the page you're already on isn't a real navigation
  // to Next's router (the URL doesn't change), so nothing normally happens —
  // including no scroll-to-top. Intercept that case and do it ourselves.
  const handleNavClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === href) {
        e.preventDefault();
        lenis?.scrollTo(0, { duration: 1.5 });
      }
      setOpen(false);
    };

  // Only the Home hero is a full-bleed dark video; every other page has a
  // white background right under the nav, so only Home gets the transparent
  // treatment. Elsewhere (and once scrolled past the hero) the nav is solid.
  const transparentCapable = pathname === "/";

  useEffect(() => {
    if (!transparentCapable) return;
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentCapable]);

  // Also force solid while the mobile drawer is open — a transparent header
  // let the hero bleed through behind the logo/close icon.
  const solid = !transparentCapable || scrolled || open;

  return (
    <header
      // will-change-transform: gives the fixed header its own compositor
      // layer — prevents a Safari repaint bug where scroll-driven content
      // underneath (.cd-reveal) can leave a stale frame behind it.
      className={`fixed inset-x-0 top-0 z-40 border-b pt-[env(safe-area-inset-top)] transition-[background-color,backdrop-filter,border-color] duration-300 ease-out will-change-transform ${
        solid
          ? "border-line bg-white/95 backdrop-blur-md"
          : "border-transparent bg-transparent backdrop-blur-none"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={handleNavClick("/")}
        >
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={38}
            priority
            className={`h-[38px] w-auto transition-[filter] duration-300 ${solid ? "" : "brightness-0 invert"}`}
          />
          <span
            className={`font-display text-base font-bold tracking-tight transition-colors duration-300 ${solid ? "text-ink" : "text-white"}`}
          >
            CORE DEFENSES
          </span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={handleNavClick(href)}
                  className={`border-b-2 pb-1 text-sm transition-colors ${
                    active
                      ? solid
                        ? "border-primary text-primary font-medium"
                        : "border-accent font-medium text-white"
                      : solid
                        ? "text-ink-muted hover:border-accent hover:text-ink border-transparent"
                        : "border-transparent text-white/80 hover:border-white/60 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            {/* "Secure Login" -> "Request Access" (Open Decision 3) -> "Contact Us" */}
            <Link
              href="/contact"
              onClick={handleNavClick("/contact")}
              className="border-primary bg-primary hover:border-ink hover:bg-ink border px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          className={`-m-1.5 p-3 transition-colors md:hidden ${solid ? "text-ink" : "text-white"}`}
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
                    onClick={handleNavClick(href)}
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
                onClick={handleNavClick("/contact")}
                className="border-primary bg-primary block border px-4 py-2.5 text-center text-sm font-medium text-white"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
