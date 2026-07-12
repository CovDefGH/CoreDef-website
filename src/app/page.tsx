import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Timer, Globe2, Atom, Radio } from "lucide-react";
import { CTALink } from "@/components/ui/CTALink";
import { Reveal } from "@/components/motion/Reveal";
import { MotionCard } from "@/components/motion/MotionCard";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { media } from "@/content/media";

// FR-HOME-3 — EDIM featured first per PRD §7 product priority.
const CAPABILITIES = [
  {
    icon: Atom,
    heading: "Nuclear Analytics",
    image: media.nuclear,
    description:
      "EDIM narrows nuclear data uncertainty to reduce the penalty on thermal margin — recovering power output, fuel-cycle length, and operational flexibility that conservatism leaves on the table.",
    linkLabel: "Explore EDIM",
    href: "/solutions/edim",
  },
  {
    icon: Radio,
    heading: "Secure Communications",
    image: media.comms,
    description:
      "ENADOX delivers resilient, secure communication across denied, degraded, intermittent, and low-bandwidth environments — with redundancy built into the data itself.",
    linkLabel: "Explore ENADOX",
    href: "/solutions/enadox",
  },
];

// FR-HOME-6 — critical infrastructure visual strip.
const INFRASTRUCTURE = [
  { image: media.nuclear, caption: "Nuclear" },
  { image: media.energy, caption: "Energy" },
  { image: media.comms, caption: "Communications" },
  { image: media.dataCenter, caption: "Industrial" },
];

const TRUST_SIGNALS = [
  {
    icon: ShieldCheck,
    heading: "Zero-Trust Architecture",
    description: "Every channel authenticated, every payload verified.",
  },
  {
    icon: Timer,
    heading: "Low-Latency Operations",
    description: "Engineered for decisions measured in milliseconds.",
  },
  {
    icon: Globe2,
    heading: "Global Deployment",
    description: "Operations hubs across four regions. See Global.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — FR-HOME-1/2. Full-bleed video with text overlaid on a gradient scrim. */}
      <section className="relative min-h-[560px] overflow-hidden md:min-h-[680px]">
        <HeroVideo
          src={media.heroVideo.src}
          poster={media.heroVideo.poster}
          alt="Nuclear power plant operations footage."
        />
        {/* Scrim: darkest at bottom-left where the text sits, fading toward the top-right. */}
        <div className="from-ink/95 via-ink/60 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="from-ink/80 absolute inset-0 bg-gradient-to-r to-transparent md:to-30%" />

        <div className="relative mx-auto flex min-h-[560px] max-w-6xl items-end px-4 py-16 md:min-h-[680px] md:px-6 md:py-24">
          <div>
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Precision analytics for critical infrastructure.
              <span className="text-accent block">
                Resilient comms for contested environments.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Core Defenses builds analytics and secure communications for
              environments where failure has physical consequences — nuclear,
              energy, defense, and industrial operations. Two products: EDIM
              and ENADOX.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTALink href="/solutions">Explore Solutions</CTALink>
              <CTALink href="/contact" variant="secondary">
                Contact Us
              </CTALink>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities — FR-HOME-3 (EDIM first) */}
      <Reveal as="section" className="border-line bg-surface border-y">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="text-ink text-3xl font-bold">Core Capabilities</h2>
          <p className="text-ink-muted mt-3 max-w-2xl">
            Two platforms, one posture: understand the system precisely, and
            keep it connected when conditions degrade.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {CAPABILITIES.map(
              ({
                icon: Icon,
                heading,
                image,
                description,
                linkLabel,
                href,
              }) => (
                <MotionCard
                  key={heading}
                  className="border-line hover:border-accent border bg-white p-8 transition-colors"
                >
                  <div className="border-line relative mb-6 aspect-[16/9] overflow-hidden border">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="bg-surface border-line inline-flex border p-3">
                    <Icon aria-hidden size={22} className="text-primary" />
                  </span>
                  <h3 className="text-ink mt-5 text-xl font-bold">{heading}</h3>
                  <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                    {description}
                  </p>
                  <Link
                    href={href}
                    className="text-primary hover:text-ink mt-5 inline-block text-sm font-medium transition-colors"
                  >
                    {linkLabel} →
                  </Link>
                </MotionCard>
              ),
            )}
          </div>
        </div>
      </Reveal>

      {/* Critical infrastructure strip — FR-HOME-6 */}
      <Reveal
        as="section"
        className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
      >
        <h2 className="text-ink text-3xl font-bold">Where we operate</h2>
        <p className="text-ink-muted mt-3 max-w-2xl">
          Systems that cannot fail quietly. We build for the sectors that carry
          physical consequence.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INFRASTRUCTURE.map(({ image, caption }) => (
            <li
              key={caption}
              className="border-line relative aspect-[4/5] overflow-hidden border"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="from-ink/70 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-4">
                <p className="text-sm font-semibold text-white">{caption}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Trust row — FR-HOME-7 */}
      <Reveal as="section" className="border-line bg-surface border-y">
        <ul className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-3 md:px-6">
          {TRUST_SIGNALS.map(({ icon: Icon, heading, description }) => (
            <li key={heading} className="flex items-start gap-4">
              <Icon
                aria-hidden
                size={22}
                className="text-primary mt-0.5 shrink-0"
              />
              <div>
                <h3 className="text-ink text-base font-semibold">{heading}</h3>
                <p className="text-ink-muted mt-1 text-sm">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Outbound paths — FR-HOME-8 */}
      <Reveal as="section" className="border-line border-b">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-12 md:px-6">
          <div>
            <h2 className="text-ink text-2xl font-bold">
              Built for your sector.
            </h2>
            <p className="text-ink-muted mt-2 text-sm">
              Energy, nuclear, defense, government, utilities, manufacturing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTALink href="/industries" variant="secondary">
              Industries
            </CTALink>
            <CTALink href="/global" variant="secondary">
              Global Operations
            </CTALink>
            <CTALink href="/careers" variant="secondary">
              Careers
            </CTALink>
          </div>
        </div>
      </Reveal>
    </>
  );
}
