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
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <Reveal as="section">
        <h1 className="text-ink text-3xl font-bold md:text-4xl">Solutions</h1>
      </Reveal>

      <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
        <div>
          <FeatureRow
            heading={edim.name}
            body={edim.tagline}
            image={media.edimCover}
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
            image={media.enadoxCover}
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
