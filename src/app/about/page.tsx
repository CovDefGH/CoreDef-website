import type { Metadata } from "next";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { Reveal } from "@/components/motion/Reveal";
import { CTALink } from "@/components/ui/CTALink";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "About",
  description:
    "Core Defenses builds data analytics and secure communications systems for nuclear, energy, defense, and industrial operations.",
};

const VALUES = [
  {
    title: "Precision",
    body: "Uncertainty in our models is quantified and reduced through validated methods, not covered with added margin.",
  },
  {
    title: "Transparency",
    body: "Our methods are documented and our assumptions stated explicitly. Operators and regulators can verify how a result was produced.",
  },
  {
    title: "Reliability",
    body: "Systems are tested against worst-case operating conditions, including degraded sensor input and loss of individual communication links.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <Reveal as="section" className="max-w-3xl">
        <h1 className="text-ink text-4xl font-bold md:text-5xl">
          About Core Defenses
        </h1>
        <p className="text-ink-muted mt-6 text-lg leading-relaxed">
          Core Defenses builds data analytics and secure communications
          systems for nuclear, energy, defense, and industrial operations.
          These are environments where failure has physical consequences, not
          just financial ones.
        </p>
      </Reveal>

      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <FeatureRow
          heading="Methodology"
          body="We are engineers solving problems in domains with strict physical constraints, where an error carries a real-world cost."
          bullets={[
            "Decisions grounded in data and validated models",
            "Methods documented so they can be reviewed and reproduced",
            "Deep experience in nuclear, defense, and industrial systems",
          ]}
          image={media.team}
          imageSide="right"
        />

        <FeatureRow
          heading="High-Consequence Environments"
          body="Nuclear and industrial operators require accurate models to maintain safety margins and operating capacity. Core Defenses builds systems to meet those safety and reliability requirements."
          image={media.nuclear}
          imageSide="left"
        />

        <FeatureRow
          heading="Analytics, backed by secure communications"
          body="EDIM applies a physics-based framework to nuclear predictive models, identifying and correcting calculational bias so predictions track real plant data. ENADOX delivers secure communications for denied and degraded environments, keeping operations connected when standard links fail."
          bullets={[
            "EDIM: physics-based framework correcting calculational bias in nuclear predictive models",
            "ENADOX: secure communications for denied and degraded environments",
          ]}
          image={media.operations}
          imageSide="right"
        />
      </div>

      <Reveal as="section" className="mt-16 md:mt-24">
        <h2 className="text-ink text-2xl font-bold md:text-3xl">
          How we work
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
          We&apos;re hiring engineers to build these systems.
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
