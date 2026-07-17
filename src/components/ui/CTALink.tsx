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
  /** Fluid footprint scaled by vmin (min(vw, vh)), so it shrinks on both
   * narrow and short viewports. Only the Home hero needs this — every other
   * usage keeps the default fixed size. */
  compact?: boolean;
  children: React.ReactNode;
};

export function CTALink({
  href,
  variant = "primary",
  compact = false,
  children,
}: CTALinkProps) {
  const size = compact
    ? "px-[clamp(1rem,4vmin,1.75rem)] py-[clamp(0.5rem,2.2vmin,0.875rem)] text-[clamp(0.8rem,2.4vmin,1rem)]"
    : "px-7 py-3.5 text-base";
  return (
    <Link
      href={href}
      className={`inline-block ${size} font-medium transition-colors ${VARIANTS[variant]}`}
    >
      {children}
    </Link>
  );
}
