import type { Metadata } from "next";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { Reveal } from "@/components/motion/Reveal";
import { CTALink } from "@/components/ui/CTALink";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "About",
  description:
    "Core Defenses is an engineering-first organization building advanced data analytics and secure communications for critical infrastructure.",
};

const VALUES = [
  {
    title: "Precision",
    body: "We treat uncertainty as a quantity to be measured and reduced, not a margin to be padded. Better inputs make better decisions.",
  },
  {
    title: "Transparency",
    body: "Our methods are auditable and our assumptions explicit. Operators and regulators should understand why a result holds.",
  },
  {
    title: "Reliability",
    body: "Systems that matter must work when conditions are worst. We engineer for the degraded case, not the demonstration.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <Reveal as="section" className="max-w-3xl">
        <p className="text-primary text-sm font-medium">Company</p>
        <h1 className="text-ink mt-3 text-4xl font-bold md:text-5xl">
          About Core Defenses
        </h1>
        <p className="text-ink-muted mt-6 text-lg leading-relaxed">
          Core Defenses is an engineering-first organization building for
          critical infrastructure: nuclear, energy, defense, and industrial
          environments where failure carries physical, not merely financial,
          consequences. Our work pairs advanced data analytics with secure
          communications so that mission critical operations stay informed and
          connected under real-world conditions.
        </p>
      </Reveal>

      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <FeatureRow
          eyebrow="Engineering-first"
          heading="Rigor before rhetoric"
          body="We are a team of engineers solving hard problems in domains where the physics are unforgiving. Our approach favors measurement over assumption, disciplined analysis over intuition, and results that hold up to independent scrutiny."
          bullets={[
            "Decisions grounded in data and validated models",
            "Methods documented so they can be reviewed and reproduced",
            "Depth in the domains we serve, not breadth for its own sake",
          ]}
          image={media.team}
          imageSide="right"
        />

        <FeatureRow
          eyebrow="Built for consequence"
          heading="Where failure is physical"
          body="Critical infrastructure does not tolerate approximation. A conservative guess costs capacity; an optimistic one costs far more. We build for the environments where the stakes are measured in reliability and safety, and we design our systems to earn the trust that those environments demand."
          image={media.nuclear}
          imageSide="left"
        />

        <FeatureRow
          eyebrow="Two products, one posture"
          heading="Analytics, backed by secure communications"
          body="EDIM applies advanced data analytics to nuclear operations, narrowing the uncertainty in plant measurements to help recover thermal margin that conservative assumptions leave on the table. ENADOX delivers secure communications for denied and degraded environments, keeping mission critical operations connected when conventional links cannot be relied upon. Together they reflect a single posture: precise insight, dependable connection."
          bullets={[
            "EDIM: data analytics for nuclear, recovering thermal margin",
            "ENADOX: secure communications for denied and degraded environments",
          ]}
          image={media.operations}
          imageSide="right"
        />
      </div>

      <Reveal as="section" className="mt-16 md:mt-24">
        <h2 className="text-ink text-2xl font-bold md:text-3xl">
          What we hold to
        </h2>
        <div className="border-line bg-line mt-8 grid gap-px border sm:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="bg-white p-6">
              <h3 className="text-ink text-lg font-semibold">{value.title}</h3>
              <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="mt-16 md:mt-24">
        <h2 className="text-ink text-2xl font-bold md:text-3xl">
          Work with us
        </h2>
        <p className="text-ink-muted mt-4 max-w-2xl leading-relaxed">
          If you build for the environments others avoid, we should talk.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <CTALink href="/careers">Join the team</CTALink>
          <CTALink href="/contact" variant="secondary">
            Contact us
          </CTALink>
        </div>
      </Reveal>
    </div>
  );
}
