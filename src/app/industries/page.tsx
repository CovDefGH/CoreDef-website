import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MotionCard } from "@/components/motion/MotionCard";
import { Reveal } from "@/components/motion/Reveal";
import { industries } from "@/content/industries";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Core Defenses protects the sectors that underpin modern life: energy, nuclear, defense, government, and critical infrastructure, with verifiable data intelligence and assured communications.",
};

export default function IndustriesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <header className="max-w-3xl">
          <h1 className="text-ink text-4xl md:text-5xl">Industries</h1>
          <p className="text-ink-muted mt-6 text-justify text-lg">
            Energy, nuclear, defense, and industrial operators depend on
            accurate data and secure communications. A compromised data point or
            an intercepted channel can cause an outage, a safety incident, or
            mission failure. Core Defenses builds verifiable analytics and
            secure communications for these sectors.
          </p>
        </header>

        <div className="border-line relative mt-12 aspect-[21/9] overflow-hidden border">
          <Image
            src={media.nuclear.src}
            alt={media.nuclear.alt}
            fill
            sizes="(min-width: 768px) 72rem, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <Reveal as="section" className="mt-16 md:mt-24">
          <h2 className="sr-only">Sectors we serve</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <MotionCard
                key={industry.name}
                className="border-line bg-surface hover:border-accent flex h-full flex-col border p-6 transition-colors"
              >
                <h3 className="text-ink text-xl">{industry.name}</h3>
                <p className="text-ink-muted mt-3 flex-1 text-justify">
                  {industry.description}
                </p>
                <Link
                  href={industry.productHref}
                  className="text-primary hover:text-ink mt-6 inline-flex items-center text-sm font-medium transition-colors"
                >
                  Explore {industry.productLabel} &rarr;
                </Link>
              </MotionCard>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2">
          <div className="border-line relative aspect-[4/3] overflow-hidden border">
            <Image
              src={media.energy.src}
              alt={media.energy.alt}
              fill
              sizes="(min-width: 768px) 36rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="border-line relative aspect-[4/3] overflow-hidden border">
            <Image
              src={media.operations.src}
              alt={media.operations.alt}
              fill
              sizes="(min-width: 768px) 36rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
