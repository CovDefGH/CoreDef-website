import Link from "next/link";

// Button styles used site-wide. Elevation = border shift per DESIGN tokens,
// never shadow; corners stay sharp (radius-none) — deliberate brand choice,
// not an oversight, see tokens.css.
const VARIANTS = {
  primary:
    "border border-primary bg-primary text-white hover:border-primary-dark hover:bg-primary-dark hover:text-white",
  secondary: "border border-line bg-white text-ink hover:border-accent",
  // For use over dark imagery (e.g. the Home hero) — glass/frosted look.
  ghost:
    "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/20",
} as const;

type CTALinkProps = {
  href: string;
  variant?: keyof typeof VARIANTS;
  children: React.ReactNode;
};

export function CTALink({ href, variant = "primary", children }: CTALinkProps) {
  return (
    <Link
      href={href}
      className={`inline-block px-7 py-3.5 text-base font-medium transition-colors ${VARIANTS[variant]}`}
    >
      {children}
    </Link>
  );
}
