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
    "EDIM nuclear data analytics and ENADOX secure communications: the Core Defenses platform portfolio.",
};

export default function SolutionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <Reveal as="section">
        <h1 className="text-ink text-4xl font-bold md:text-5xl">Solutions</h1>
        <p className="text-ink-muted mt-5 max-w-2xl text-lg">
          EDIM provides predictive analytics for nuclear operations. ENADOX
          provides secure communications for defense and industrial
          operations.
        </p>
      </Reveal>

      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <div>
          <FeatureRow
            heading={edim.name}
            body={edim.tagline}
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
            heading={enadox.name}
            body={enadox.tagline}
            image={media.comms}
            imageSide="left"
          />
          <div className="mt-6 md:flex md:justify-end">
            <CTALink href={`/solutions/${enadox.slug}`}>
              Explore {enadox.name} →
            </CTALink>
          </div>
        </div>
      </div>
    </div>
  );
}
