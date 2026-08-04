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
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <Reveal as="section">
          <h1 className="text-ink text-3xl font-bold md:text-4xl">
            Industries</h1>
          <p className="text-ink-muted mt-6 text-justify text-lg">
            Energy, nuclear, defense, and industrial operators depend on
            accurate data and secure communications. A compromised data point or
            an intercepted channel can cause an outage, a safety incident, or
            mission failure. Core Defenses builds verifiable analytics and
            secure communications for these sectors.
          </p>
        </Reveal>

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

        <Reveal as="section" className="mt-12 md:mt-16">
          <h2 className="text-ink text-2xl font-semibold">
            Use Cases
          </h2>
          <div className="mt-6 grid auto-rows-[minmax(200px,auto)] gap-6 md:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, i) => {
              let bentoClass = "";
              if (i === 0) bentoClass = "md:col-span-2 lg:col-span-3 lg:row-span-2 min-h-[300px]";
              else if (i === 1) bentoClass = "md:col-span-1 lg:col-span-1 lg:row-span-1";
              else if (i === 2) bentoClass = "md:col-span-1 lg:col-span-2 lg:row-span-1";
              else if (i === 3) bentoClass = "md:col-span-2 lg:col-span-2 lg:row-span-1";
              
              return (
                <MotionCard
                  key={industry.name}
                  className={`border-line bg-surface hover:border-accent flex flex-col border p-6 transition-colors ${bentoClass}`}
                >
                  <h3 className="text-ink text-2xl font-bold">{industry.name}</h3>
                  <div className="bg-primary h-0.5 w-8 mt-3 mb-3 opacity-50" />
                  <p className="text-ink-muted flex-1 text-justify">
                    {industry.description}
                  </p>
                  <Link
                    href={industry.productHref}
                    className="text-primary hover:text-ink mt-6 inline-flex items-center text-sm font-medium transition-colors"
                  >
                    Explore {industry.productLabel} &rarr;
                  </Link>
                </MotionCard>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
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
