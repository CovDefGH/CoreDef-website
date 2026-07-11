import Link from "next/link";

// The two button styles used site-wide (primary filled, secondary outlined).
// Elevation = border shift per DESIGN tokens, never shadow.
const VARIANTS = {
  primary:
    "border border-primary bg-primary text-white hover:border-ink hover:bg-ink",
  secondary: "border border-line bg-white text-ink hover:border-accent",
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
      className={`inline-block px-5 py-2.5 text-sm font-medium transition-colors ${VARIANTS[variant]}`}
    >
      {children}
    </Link>
  );
}
