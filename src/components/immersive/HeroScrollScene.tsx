"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTALink } from "@/components/ui/CTALink";
import GradualBlur from "@/components/ui/GradualBlur";

gsap.registerPlugin(ScrollTrigger);

// 200 frames extracted natively at 24fps from the 4K source clip.
// We used heavy JPEG compression to keep the sequence small while retaining 4K native resolution.
const FRAME_START = 75;
const FRAME_COUNT = 150;
const FRAME_W = 3840;
const FRAME_H = 2160;
// First N frames load eagerly (covers the dwell + early-scrub range); the rest
// load on browser idle time so they don't compete with the eager ones for
// bandwidth/decode time on initial page load.
const EAGER_FRAMES = 24;
const frameSrc = (i: number) =>
  `/immersive/hero/frame-${i.toString().padStart(3, "0")}.jpg`;

const scheduleIdle = (cb: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(cb, { timeout: 2000 });
  } else {
    setTimeout(cb, 200);
  }
};

export function HeroScrollScene() {
  preload(frameSrc(FRAME_START), { as: "image" });

  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  /* useEffect (not useLayoutEffect) — runs after paint so DOM measurements
     are stable and the CSS sticky layout is already committed. */
  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!root || !canvas || !content) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = FRAME_W;
    canvas.height = FRAME_H;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const frameObj = { frame: FRAME_START };

    let lastDrawn = -1;
    const render = (frameValue: number) => {
      // Remove console.log for clean output
      const clamped = Math.min(Math.max(frameValue, FRAME_START), FRAME_COUNT);
      // Skip redundant redraws — onUpdate can fire without the frame value
      // having meaningfully changed.
      if (Math.abs(clamped - lastDrawn) < 0.001) {
        return;
      }

      const lower = Math.floor(clamped);
      const upper = Math.min(lower + 1, FRAME_COUNT);
      const frac = clamped - lower;

      // Bail without marking drawn if the frame isn't loaded yet — lets a
      // later retry (see loadFrame's decode callback) actually redraw once
      // it's ready, instead of the dedup guard silently swallowing it.
      const lowerImg = images[lower - 1];
      if (!(lowerImg?.complete && lowerImg.naturalHeight !== 0)) {
        return;
      }
      lastDrawn = clamped;

      ctx.globalAlpha = 1;
      ctx.drawImage(lowerImg, 0, 0, canvas.width, canvas.height);
      
      // Removed sub-frame cross-fade interpolation: At 24fps native, 
      // frame pacing is tight enough that hard cuts look buttery smooth,
      // and it cuts our GPU canvas drawing operations in exactly half, 
      // instantly eliminating the "laggy" scroll feeling.
    };

    const loadFrame = (i: number) => {
      const img = new window.Image();
      img.src = frameSrc(i);
      // Fallback for browsers where img.decode() might fail or isn't supported.
      img.onload = () => {
        render(frameObj.frame);
      };
      img.decode().then(() => {
        render(frameObj.frame);
      }).catch((e) => {
        console.warn(`[Hero] Frame ${i} decode failed`, e);
      });
      images[i - 1] = img;
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      // Static hero: draw first frame once it loads, no scrub, no fade.
      loadFrame(FRAME_START);
      return;
    }

    for (let i = FRAME_START; i <= FRAME_START + EAGER_FRAMES; i++) loadFrame(i);
    for (let i = FRAME_START + EAGER_FRAMES + 1; i <= FRAME_COUNT; i++) {
      scheduleIdle(() => loadFrame(i));
    }

    render(FRAME_START);

    /* No GSAP pin — the stage div uses CSS `position: sticky; top: 0`
       (the same reliable pattern the chapter sections use). GSAP only
       handles the scroll-scrubbed text/video animations. */
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: timeline,
      });

      // 0 -> 0.02 is a tiny dead zone to prevent accidental micro-scrolls.
      // Hero copy starts fading almost immediately after scroll begins.
      timeline.to(content, { yPercent: -12, opacity: 0, duration: 0.22 }, 0.02);

      // Image sequence begins just after the copy starts fading, and scrubs
      // across the rest of the hero's scroll range.
      timeline.to(
        frameObj,
        {
          frame: FRAME_COUNT,
          onUpdate: () => render(frameObj.frame),
          duration: 0.97,
        },
        0.03,
      );
      timeline.to(canvas, { scale: 1.13, xPercent: -5, yPercent: -2, duration: 0.97 }, 0.03);
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="immersive-hero"
    >
      {/* CSS sticky pin — reliable across all browsers, no GSAP spacer issues */}
      <div
        className="sticky top-0 h-dvh overflow-hidden bg-[#dcebf1]"
      >
        <Image
          src={frameSrc(FRAME_START)}
          alt="Hero background"
          fill
          priority
          className="object-cover object-[58%_45%] will-change-[transform] transform-gpu"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover object-[58%_45%] will-change-[transform] transform-gpu"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,18,28,.73)_0%,rgba(5,18,28,.38)_43%,rgba(5,18,28,.04)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,18,28,.38)_0%,transparent_52%)]" />

        <div ref={contentRef} className="relative z-10 mx-auto flex h-dvh max-w-[1440px] flex-col px-4 pt-[calc(clamp(2rem,10vh,16rem)_+_env(safe-area-inset-top))] pb-[clamp(10rem,15vh,16rem)] md:px-8 will-change-[transform,opacity]">
          <div className="mt-auto max-w-3xl">
            <h1
              className="mt-5 max-w-5xl text-[clamp(2rem,5vmin,6rem)] leading-[1.05] font-semibold tracking-[-.02em] text-white md:font-bold"
            >
              Precision analytics <br className="hidden md:block" /> for critical infrastructure.
              <span className="block text-[#7bc8ff] mt-2 text-[clamp(1.5rem,4vmin,4.5rem)]">
                Resilient communications <br className="hidden md:block" /> for contested environments.
              </span>
            </h1>
            <p
              className="mt-7 max-w-2xl text-[clamp(1rem,2vmin,1.5rem)] leading-relaxed text-white/82 text-justify"
            >
              Core Defenses builds EDIM, a physics-based data assimilation platform for nuclear operations, and ENADOX, a self-healing data protection layer for secure communications in contested and degraded environments.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTALink href="/solutions">Explore Solutions</CTALink>
              <CTALink href="/contact" variant="ghost">
                Contact Us
              </CTALink>
            </div>
          </div>

          <a
            href="#edim"
            onClick={(e) => {
              e.preventDefault();
              lenis?.scrollTo("#edim", { duration: 1.5, offset: 0 });
            }}
            className="group absolute right-4 bottom-[8rem] hidden items-center gap-3 text-xs tracking-[.18em] text-white/70 uppercase hover:text-white md:right-6 md:flex"
          >
            Scroll to enter
            <ArrowDown
              size={15}
              className="transition-transform group-hover:translate-y-1"
            />
          </a>
        </div>

        <GradualBlur
          position="bottom"
          target="parent"
          height="6rem"
          strength={2}
          divCount={5}
          exponential={false}
          zIndex={5}
          opacity={1}
        />
      </div>
    </section>
  );
}
