"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Timer, Globe2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScrollScene } from "@/components/immersive/HeroScrollScene";
import { media } from "@/content/media";

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  id: string;
  title: string;
  copy: string;
  image: { src: string; alt: string };
  href: string;
  action: string;
  align?: "left" | "right";
  artifact: React.ReactNode;
};



const AtomArtifact = (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#7bc8ff] w-full h-full">
    <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(30 50 50)" />
    <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(90 50 50)" />
    <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(150 50 50)" />
    <circle cx="50" cy="50" r="4" fill="currentColor" />
    <circle cx="50" cy="50" r="8" strokeDasharray="2 2" />
  </svg>
);

const RadarArtifact = (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#7bc8ff] w-full h-full">
    <circle cx="50" cy="50" r="45" strokeDasharray="2 4" />
    <circle cx="50" cy="50" r="30" />
    <circle cx="50" cy="50" r="15" strokeDasharray="4 2" />
    <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="1 3" />
    <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="1 3" />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
  </svg>
);

const GridArtifact = (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#7bc8ff] w-full h-full">
    <rect x="10" y="10" width="80" height="80" strokeDasharray="4 4" />
    <line x1="30" y1="10" x2="30" y2="90" opacity="0.5" />
    <line x1="50" y1="10" x2="50" y2="90" opacity="0.5" />
    <line x1="70" y1="10" x2="70" y2="90" opacity="0.5" />
    <line x1="10" y1="30" x2="90" y2="30" opacity="0.5" />
    <line x1="10" y1="50" x2="90" y2="50" opacity="0.5" />
    <line x1="10" y1="70" x2="90" y2="70" opacity="0.5" />
    <circle cx="50" cy="50" r="10" />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
  </svg>
);

const gridItems = [
  { image: media.homeEnergy, caption: "Energy", href: "/industries" },
  { image: media.homeDefense, caption: "Defense", href: "/industries" },
  { image: media.homeFinance, caption: "Finance", href: "/industries" },
  { image: media.homeAi, caption: "AI", href: "/industries" },
];

const chapters: Chapter[] = [
  {
    id: "edim",
    title: "Improving the Best Estimate.",
    copy: "EDIM is a physics-based methodology for data assimilation that identifies, corrects, and traces discrepancies between calculational and measured observations, improving prediction accuracy and operational efficiency.",
    image: media.operations,
    href: "/solutions/edim",
    action: "Explore EDIM",
    artifact: AtomArtifact,
  },
  {
    id: "enadox",
    title: "Redundancy built into the data itself.",
    copy: "ENADOX is a data-centric transformative layer that embeds redundancy into the data itself, enabling resilient, self-healing communications across autonomous systems and contested environments.",
    image: media.comms,
    href: "/solutions/enadox",
    action: "Explore ENADOX",
    align: "right",
    artifact: RadarArtifact,
  },
];

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

      // Grid cards reveal (skiper104 style)
      const gridCards = gsap.utils.toArray<HTMLElement>(".grid-card-reveal");
      if (gridCards.length) {
        gsap.fromTo(
          gridCards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".grid-cards-container",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Image reveal (skiper71 style)
      const imageReveals = gsap.utils.toArray<HTMLElement>(".image-reveal-container");
      imageReveals.forEach((container) => {
        gsap.fromTo(
          container,
          { clipPath: "inset(15% 10% 15% 10%)", scale: 1.1 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 90%",
              end: "center 60%",
              scrub: 1,
            },
          }
        );
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


      {chapters.map((chapter) => (
        <section id={chapter.id} key={chapter.id} className="immersive-chapter">
          <div className="immersive-chapter-sticky">
            <Image
              src={chapter.image.src}
              alt={chapter.image.alt}
              fill
              sizes="100vw"
              className="immersive-chapter-image object-cover will-change-[transform]"
            />
            <div className="absolute inset-0 bg-[#07101a]/45" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,18,.84)_0%,rgba(4,10,18,.36)_55%,rgba(4,10,18,.58)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#040a12] to-transparent" />

            {/* Decorative GSAP-style shape (technical/nuclear artifact) */}
            <div className="chapter-decor absolute top-[25%] left-[60%] h-64 w-64 opacity-[0.04] pointer-events-none mix-blend-screen md:left-[75%] will-change-[transform]">
              {chapter.artifact}
            </div>

            <div
              className={`relative mx-auto flex h-full max-w-[1440px] flex-col px-4 pt-[calc(clamp(2rem,10vh,16rem)_+_env(safe-area-inset-top))] pb-[clamp(2rem,8vh,10rem)] md:px-8 ${chapter.align === "right" ? "md:items-end" : "md:items-start"}`}
            >
              <div className="immersive-copy mt-auto max-w-3xl will-change-[transform,opacity]">
                <h2 className="text-[clamp(2rem,min(6.5vw,12vh),8rem)] leading-[0.92] font-semibold tracking-[-.045em] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[#7bc8ff]/40">
                  {chapter.title}
                </h2>
                <p className="mt-[clamp(1rem,4vh,3rem)] max-w-2xl text-[clamp(1rem,2.5vmin,1.5rem)] leading-relaxed text-white/80 font-light text-justify">
                  {chapter.copy}
                </p>
                <Link
                  href={chapter.href}
                  className="group mt-[clamp(1rem,4vh,2rem)] inline-flex items-center gap-3 border-b border-[#7bc8ff] pb-2 text-sm font-medium text-white transition-colors hover:border-white"
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

      <section className="border-y border-slate-200 bg-[#eaf0f5] text-[#0c1723]">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-4xl leading-[.98] font-semibold tracking-[-.045em] md:text-5xl">
              Engineered for environments where failure is not an option.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#405063] md:text-xl text-justify">
              Two platforms: EDIM for predictive analytics, ENADOX for secure communications in degraded conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-20 flex flex-col items-center text-center">
            <h2 className="text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[.94] font-semibold tracking-[-.05em] text-[#0c1723]">
              Industries we serve.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#3b4754] md:text-lg text-justify">
              We build for sectors that depend on accurate data and secure
              operations: energy, defense, finance, and AI.
            </p>
            
            <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link href="/industries" className="rounded-xl border border-slate-200 bg-white py-3 px-6 text-base font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0052ff] hover:bg-blue-50/30 hover:text-[#0052ff] hover:shadow-md">
                Industries
              </Link>
              <Link href="/global" className="rounded-xl border border-slate-200 bg-white py-3 px-6 text-base font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0052ff] hover:bg-blue-50/30 hover:text-[#0052ff] hover:shadow-md">
                Global Operations
              </Link>
              <Link href="/careers" className="rounded-xl border border-slate-200 bg-white py-3 px-6 text-base font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0052ff] hover:bg-blue-50/30 hover:text-[#0052ff] hover:shadow-md">
                Careers
              </Link>
            </div>
          </div>

          <div className="grid-cards-container grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
            {gridItems.map((item) => (
              <Link
                href={item.href}
                key={item.caption}
                className="grid-card-reveal group relative block h-[280px] md:h-[360px] overflow-hidden rounded-2xl bg-slate-100 shadow-sm will-change-[transform,opacity]"
              >
                <div className="image-reveal-container absolute inset-0 will-change-[transform]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 will-change-[transform] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                      {item.caption}
                    </h3>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
