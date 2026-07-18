import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CTALink } from "@/components/ui/CTALink";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "About",
  description:
    "Core Defenses is a technology-driven small business specializing in advanced analytics, artificial intelligence, and cybersecurity solutions for high-reliability industries, including nuclear energy.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <Reveal as="section" className="max-w-3xl">
        <h1 className="text-ink text-4xl font-bold md:text-5xl">
          About Core Defenses
        </h1>
        <p className="text-ink-muted mt-6 text-lg leading-relaxed">
          At Core Defenses, we are a technology-driven small business
          specializing in advanced analytics, artificial intelligence, and
          cybersecurity solutions for high-reliability industries, including
          nuclear energy. Our mission is to bridge the gap between
          calculational modeling and real-world decision-making by delivering
          scalable, explainable, and regulatory-compliant technologies. With
          expertise in physics-based modeling, uncertainty quantification, and
          AI/ML-driven predictive intelligence, we develop cutting-edge
          software solutions that enhance operational safety, performance, and
          security.
        </p>
        <p className="text-ink-muted mt-6 text-lg leading-relaxed">
          We believe our products embody our commitment to the goal of energy
          resilience—the strategic approach to anticipate, absorb, adapt to,
          and rapidly recover from severe disruptions. Since our founding, we
          have raised over $5M to develop our products, using a combination of
          non-dilutive grants, pilot projects, and revenue from our extensive
          network of customers and collaborators including national
          laboratories, nuclear fuel vendors, and federal agencies. We are
          also advised by a team of business and technical experts from
          industry and academia, who facilitate our breakthroughs and expand
          our outreach into the broader energy sector.
        </p>
      </Reveal>

      <div className="border-line relative mt-12 aspect-[21/9] overflow-hidden border md:mt-16">
        <Image
          src={media.controlRoom.src}
          alt={media.controlRoom.alt}
          fill
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="object-cover"
        />
      </div>

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
