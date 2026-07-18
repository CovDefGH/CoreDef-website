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
    image: media.edimCover,
    description:
      "EDIM is a physics-based framework that identifies and corrects calculational bias in predictive models. It reduces prediction error and keeps results aligned with real-time plant data.",
    linkLabel: "Explore EDIM",
    href: "/solutions/edim",
  },
  {
    icon: Radio,
    heading: "Secure Communications",
    image: media.enadoxCover,
    description:
      "ENADOX provides secure communication across denied, degraded, intermittent, and low-bandwidth (DDIL) environments. Redundancy is built into the data itself.",
    linkLabel: "Explore ENADOX",
    href: "/solutions/enadox",
  },
];

// FR-HOME-6 — critical infrastructure visual strip.
const INFRASTRUCTURE = [
  { image: media.homeEnergy, caption: "Energy" },
  { image: media.homeDefense, caption: "Defense" },
  { image: media.homeFinance, caption: "Finance" },
  { image: media.homeAi, caption: "AI" },
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
    description: "Response times measured in single-digit milliseconds.",
  },
  {
    icon: Globe2,
    heading: "Global Operations",
    description:
      "Headquarters in Lexington, KY. Expansion planned across the Americas, EMEA, and APAC.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — FR-HOME-1/2. Full-bleed video, transparent nav overlaid (see
          NavBar), text on a directional gradient scrim: darkest left, where
          the copy sits, fading lighter to the right so the footage reads. */}
      <section className="relative -mt-[calc(4rem_+_env(safe-area-inset-top))] min-h-dvh overflow-hidden">
        <HeroVideo
          src={media.heroVideo.src}
          poster={media.heroVideo.poster}
          alt="Nuclear power plant operations footage."
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,10,25,.88) 0%, rgba(5,10,25,.70) 40%, rgba(5,10,25,.30) 100%)",
          }}
        />
        <div className="from-ink/70 absolute inset-0 bg-gradient-to-t to-transparent" />

        <div className="relative mx-auto flex min-h-dvh max-w-6xl items-center px-4 pt-[calc(4rem_+_env(safe-area-inset-top))] pb-[env(safe-area-inset-bottom)] md:px-6">
          <div className="max-w-2xl">
            {/* Sized with vmin (= min(vw, vh)) so the hero compresses on short
                viewports (small laptops, resized windows) the same way it
                already did on narrow ones — one fluid scale, no breakpoint
                that only accounts for width. */}
            <h1 className="text-[clamp(1.5rem,7vmin,3rem)] leading-[1.05] font-semibold text-white md:font-bold">
              Precision analytics
              <br />
              for critical infrastructure.
              <span className="text-accent mt-[clamp(0.375rem,1.5vmin,0.75rem)] block text-[clamp(1.125rem,5vmin,2.25rem)]">
                Resilient communications
                <br />
                for contested environments.
              </span>
            </h1>

            <p className="mt-[clamp(0.75rem,3vmin,1.5rem)] max-w-[500px] text-[clamp(0.8rem,2.4vmin,1.125rem)] leading-snug text-white/85">
              Core Defenses builds EDIM, a predictive analytics platform for
              nuclear plants, and ENADOX, a secure communications platform for
              defense and industrial operations.
            </p>

            <div className="mt-[clamp(1rem,3.5vmin,2rem)] flex flex-wrap gap-[clamp(0.5rem,2vmin,0.75rem)]">
              <CTALink href="/solutions" compact>
                Explore Solutions
              </CTALink>
              <CTALink href="/contact" variant="ghost" compact>
                Contact Us
              </CTALink>
            </div>

            <p className="mt-[clamp(1rem,3.5vmin,2rem)] text-[clamp(0.6rem,1.8vmin,0.75rem)] tracking-widest text-white/60 uppercase">
              Energy &middot; Defense &middot; Finance &middot; AI
            </p>
          </div>
        </div>
      </section>

      {/* Core Capabilities — FR-HOME-3 (EDIM first) */}
      <Reveal as="section" className="border-line bg-surface border-y">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="text-ink text-3xl font-bold">Core Capabilities</h2>
          <p className="text-ink-muted mt-3 max-w-2xl">
            Two platforms: EDIM for predictive analytics, ENADOX for secure
            communications in degraded conditions.
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
          We build for sectors that depend on accurate data and secure
          operations: energy, defense, finance, and AI.
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
              Industries we serve.
            </h2>
            <p className="text-ink-muted mt-2 text-sm">
              Energy, nuclear, defense, government, utilities, manufacturing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTALink href="/industries" variant="secondary">
              Industries
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
