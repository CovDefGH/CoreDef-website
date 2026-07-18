"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTALink } from "@/components/ui/CTALink";
import { HeroScrollScene } from "@/components/immersive/HeroScrollScene";
import { media } from "@/content/media";

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  id: string;
  index: string;
  label: string;
  title: string;
  copy: string;
  image: { src: string; alt: string };
  href: string;
  action: string;
  align?: "left" | "right";
};

const chapters: Chapter[] = [
  {
    id: "edim",
    index: "01",
    label: "Predictive analytics",
    title: "Bring the model closer to the operation.",
    copy: "EDIM identifies and corrects calculational bias, helping predictive models remain aligned with operational data.",
    image: media.operations,
    href: "/solutions/edim",
    action: "Explore EDIM",
  },
  {
    id: "enadox",
    index: "02",
    label: "Secure communications",
    title: "Keep the connection when conditions change.",
    copy: "ENADOX moves data across denied, degraded, intermittent, and limited-bandwidth environments with redundancy built into the data itself.",
    image: media.comms,
    href: "/solutions/enadox",
    action: "Explore ENADOX",
    align: "right",
  },
  {
    id: "industries",
    index: "03",
    label: "Operational environments",
    title: "Engineering for systems with physical consequences.",
    copy: "Our work spans nuclear, energy, defense, and industrial operations—where accuracy, continuity, and disciplined engineering matter.",
    image: media.energy,
    href: "/industries",
    action: "View industries",
  },
];

const industries = ["Nuclear", "Energy", "Defense", "Industrial"];

export function ImmersiveHome() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* useEffect (not useLayoutEffect) — the hero's ScrollTrigger.pin() inserts
     a spacer div that changes the document height. If we measure before the
     hero pin is committed to layout the chapter trigger positions are wrong
     and copy stays invisible. useEffect fires after paint, so the hero
     spacer is settled and measurements are correct. */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (motionQuery.matches) return;

      const chapterEls =
        gsap.utils.toArray<HTMLElement>(".immersive-chapter");
      chapterEls.forEach((chapter) => {
        const image = chapter.querySelector(".immersive-chapter-image");
        const copy = chapter.querySelector(".immersive-copy");

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.06 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        const decor = chapter.querySelector(".chapter-decor");
        if (decor) {
          gsap.to(decor, {
            rotation: 120,
            yPercent: -150,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        /* Copy reveal: use triggered stagger instead of scrub for snappier feel */
        if (copy && copy.children.length > 0) {
          gsap.from(copy.children, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.15,
            immediateRender: false,
            scrollTrigger: {
              trigger: chapter,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      /* Re-measure after all triggers exist so pin offsets are accurate. */
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="immersive-page bg-[#09111d] text-white">
      <HeroScrollScene />

      <section className="border-y border-white/15 bg-[#0d1724]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_auto] md:items-end md:px-6 md:py-14">
          <p className="max-w-2xl text-lg leading-relaxed text-white/82 md:text-2xl">
            Core Defenses develops tools for people who have to make sound
            decisions in complex, consequential operating environments.
          </p>
          <p className="font-mono text-[.66rem] leading-relaxed tracking-[.12em] text-[#7bc8ff] uppercase">
            Analytics / Communications / Infrastructure
          </p>
        </div>
      </section>

      {chapters.map((chapter) => (
        <section id={chapter.id} key={chapter.id} className="immersive-chapter">
          <div className="immersive-chapter-sticky">
            <Image
              src={chapter.image.src}
              alt={chapter.image.alt}
              fill
              sizes="100vw"
              className="immersive-chapter-image object-cover"
            />
            <div className="absolute inset-0 bg-[#07101a]/45" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,18,.84)_0%,rgba(4,10,18,.36)_55%,rgba(4,10,18,.58)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#040a12] to-transparent" />

            {/* Decorative GSAP-style shape (crosshair/target) */}
            <div className="chapter-decor absolute top-[25%] left-[60%] h-64 w-64 opacity-[0.07] pointer-events-none mix-blend-screen md:left-[75%]">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#7bc8ff] w-full h-full">
                <circle cx="50" cy="50" r="48" strokeDasharray="2 4" />
                <circle cx="50" cy="50" r="30" />
                <path d="M50 0 L50 100 M0 50 L100 50" />
              </svg>
            </div>

            <div
              className={`relative mx-auto flex h-full max-w-6xl items-end px-4 py-16 md:px-6 md:py-24 ${chapter.align === "right" ? "md:justify-end" : ""}`}
            >
              <div className="immersive-copy max-w-2xl">
                <p className="flex items-center gap-4 text-xs font-semibold tracking-[0.2em] uppercase">
                  <span className="text-[#7bc8ff]">{chapter.index}</span>
                  <span className="h-px w-8 bg-[#7bc8ff]/50"></span>
                  <span className="text-white/60">{chapter.label}</span>
                </p>
                <h2 className="mt-6 text-[clamp(3rem,6.5vw,6rem)] leading-[0.92] font-semibold tracking-[-.045em] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[#7bc8ff]/40">
                  {chapter.title}
                </h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/80 md:text-xl font-light">
                  {chapter.copy}
                </p>
                <Link
                  href={chapter.href}
                  className="group mt-8 inline-flex items-center gap-3 border-b border-[#7bc8ff] pb-2 text-sm font-medium text-white transition-colors hover:border-white"
                >
                  {chapter.action}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-y border-white/15 bg-[#eaf0f5] text-[#0c1723]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1.2fr_.8fr] md:px-6 md:py-28">
          <div>
            <p className="immersive-kicker text-[#0052ff]">Operating context</p>
            <h2 className="mt-5 max-w-3xl text-4xl leading-[.98] font-semibold tracking-[-.045em] md:text-6xl">
              The environment changes. The engineering has to hold.
            </h2>
          </div>
          <div className="border-l border-[#0c1723]/15 pl-6 md:pt-14">
            <p className="text-base leading-relaxed text-[#405063]">
              Our platforms support people working across interconnected
              physical systems—from plant operations to distributed
              communication links.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#0c1723]/15 pt-6 font-mono text-[.7rem] tracking-[.12em] uppercase">
              {industries.map((industry) => (
                <li key={industry}>{industry}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#09111d]">
        <Image
          src={media.drone.src}
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(0,82,255,.24),transparent_35%),linear-gradient(90deg,#09111d_12%,rgba(9,17,29,.76))]" />
        <div className="relative mx-auto flex min-h-[68vh] max-w-6xl items-end px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-2xl">
            <p className="immersive-kicker">
              Lexington, Kentucky / Global operations
            </p>
            <h2 className="mt-5 text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[.94] font-semibold tracking-[-.05em]">
              Start with the system in front of you.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
              Talk with Core Defenses about predictive analytics, secure
              communications, or the engineering work behind them.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTALink href="/contact">Contact us</CTALink>
              <CTALink href="/careers" variant="ghost">
                Join the team
              </CTALink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
