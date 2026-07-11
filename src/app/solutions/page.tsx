import type { Metadata } from "next";
import { CTALink } from "@/components/ui/CTALink";
import { edim } from "@/content/products/edim";
import { enadox } from "@/content/products/enadox";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "EDIM nuclear data analytics and ENADOX secure communications — the Core Defenses platform portfolio.",
};

const PRODUCTS = [edim, enadox]; // EDIM first per PRD §7

export default function SolutionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-primary text-sm font-medium">Platform Portfolio</p>
      <h1 className="text-ink mt-4 text-4xl font-bold md:text-5xl">
        Solutions
      </h1>
      <p className="text-ink-muted mt-5 max-w-2xl text-lg">
        Data analytics for critical infrastructure, backed by secure
        communications for mission-critical operations.
      </p>

      <div className="mt-16 space-y-16">
        {PRODUCTS.map((product) => (
          <article
            key={product.slug}
            className="border-line grid border-t pt-10 md:grid-cols-[1fr_2fr] md:gap-12"
          >
            <div>
              <p className="text-primary text-sm font-medium">
                {product.eyebrow}
              </p>
              <h2 className="text-ink mt-2 text-3xl font-bold">
                {product.name}
              </h2>
              <div className="mt-6">
                <CTALink href={`/solutions/${product.slug}`}>
                  Explore {product.name}
                </CTALink>
              </div>
            </div>
            <div>
              <p className="text-ink-muted text-lg">{product.tagline}</p>
              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                {product.stats.map(({ label, value, description }) => (
                  <div key={label}>
                    <dt className="text-ink-muted text-sm">{label}</dt>
                    <dd className="text-ink mt-1 font-mono text-xl font-bold">
                      {value}
                    </dd>
                    <dd className="text-ink-muted mt-1.5 text-sm">
                      {description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
