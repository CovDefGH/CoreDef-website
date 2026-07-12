import type { Metadata } from "next";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { CTALink } from "@/components/ui/CTALink";
import { Reveal } from "@/components/motion/Reveal";
import { media } from "@/content/media";
import { edim } from "@/content/products/edim";
import { enadox } from "@/content/products/enadox";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "EDIM nuclear data analytics and ENADOX secure communications — the Core Defenses platform portfolio.",
};

export default function SolutionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <Reveal as="section">
        <p className="text-primary text-sm font-medium">Platform Portfolio</p>
        <h1 className="text-ink mt-4 text-4xl font-bold md:text-5xl">
          Solutions
        </h1>
        <p className="text-ink-muted mt-5 max-w-2xl text-lg">
          Data analytics for critical infrastructure, backed by secure
          communications for mission-critical operations.
        </p>
      </Reveal>

      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <div>
          <FeatureRow
            eyebrow={edim.eyebrow}
            heading={edim.name}
            body={edim.tagline}
            bullets={edim.stats.map(({ label, value }) => `${label}: ${value}`)}
            image={media.nuclear}
            imageSide="right"
          />
          <div className="mt-6">
            <CTALink href={`/solutions/${edim.slug}`}>
              Explore {edim.name} →
            </CTALink>
          </div>
        </div>

        <div>
          <FeatureRow
            eyebrow={enadox.eyebrow}
            heading={enadox.name}
            body={enadox.tagline}
            bullets={enadox.stats.map(
              ({ label, value }) => `${label}: ${value}`,
            )}
            image={media.comms}
            imageSide="left"
          />
          <div className="mt-6">
            <CTALink href={`/solutions/${enadox.slug}`}>
              Explore {enadox.name} →
            </CTALink>
          </div>
        </div>
      </div>
    </div>
  );
}
