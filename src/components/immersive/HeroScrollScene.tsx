"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTALink } from "@/components/ui/CTALink";

gsap.registerPlugin(ScrollTrigger);

// 96 frames extracted at fps=96/14 from the 14s source clip, at the source's
// native 1920x1080 (no upscaling — the source master is 1080p, not 4K/1440p,
// so extracting higher would just be upscaling in a different place).
const FRAME_COUNT = 96;
const FRAME_W = 1920;
const FRAME_H = 1080;
// First N frames load eagerly (covers the dwell + early-scrub range); the rest
// load on browser idle time so they don't compete with the eager ones for
// bandwidth/decode time on initial page load.
const EAGER_FRAMES = 16;
const frameSrc = (i: number) =>
  `/immersive/hero/frame-${i.toString().padStart(3, "0")}.jpg?v=5`;

const scheduleIdle = (cb: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(cb, { timeout: 2000 });
  } else {
    setTimeout(cb, 200);
  }
};

export function HeroScrollScene() {
  preload(frameSrc(1), { as: "image" });

  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
    const frameObj = { frame: 1 };

    let lastDrawn = -1;
    const render = (frameValue: number) => {
      const clamped = Math.min(Math.max(frameValue, 1), FRAME_COUNT);
      // Skip redundant redraws — onUpdate can fire without the frame value
      // having meaningfully changed.
      if (Math.abs(clamped - lastDrawn) < 0.001) return;

      const lower = Math.floor(clamped);
      const upper = Math.min(lower + 1, FRAME_COUNT);
      const frac = clamped - lower;

      // Bail without marking drawn if the frame isn't loaded yet — lets a
      // later retry (see loadFrame's decode callback) actually redraw once
      // it's ready, instead of the dedup guard silently swallowing it.
      const lowerImg = images[lower - 1];
      if (!(lowerImg?.complete && lowerImg.naturalHeight !== 0)) return;
      lastDrawn = clamped;

      ctx.globalAlpha = 1;
      ctx.drawImage(lowerImg, 0, 0, canvas.width, canvas.height);

      // Sub-frame interpolation: cross-fade toward the next frame using the
      // tween's fractional progress instead of hard-cutting on whole frames.
      const upperImg = images[upper - 1];
      if (frac > 0.001 && upper !== lower && upperImg?.complete && upperImg.naturalHeight !== 0) {
        ctx.globalAlpha = frac;
        ctx.drawImage(upperImg, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      }
    };

    const loadFrame = (i: number) => {
      const img = new window.Image();
      img.src = frameSrc(i);
      // Once this frame actually finishes loading, retry drawing whatever
      // frame is currently needed — covers the very first paint (frame 1
      // hasn't loaded yet when render(1) first runs) and any frame still
      // in flight when the scrub reaches it.
      img.decode().then(() => render(frameObj.frame)).catch(() => {});
      images[i - 1] = img;
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      // Static hero: draw frame 1 once it loads, no scrub, no fade — never ship blank.
      loadFrame(1);
      return;
    }

    for (let i = 1; i <= EAGER_FRAMES; i++) loadFrame(i);
    for (let i = EAGER_FRAMES + 1; i <= FRAME_COUNT; i++) {
      scheduleIdle(() => loadFrame(i));
    }

    render(1);

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

      // 0 -> 0.12 is a deliberate dead zone: the hero holds still so the
      // page never feels like it drops the visitor mid-sequence.
      // Hero copy starts fading shortly after scroll begins.
      timeline.to(content, { yPercent: -12, opacity: 0, duration: 0.22 }, 0.12);

      // Image sequence begins just after the copy starts fading, and scrubs
      // across the rest of the hero's scroll range.
      timeline.to(
        frameObj,
        {
          frame: FRAME_COUNT,
          onUpdate: () => render(frameObj.frame),
          duration: 0.85,
        },
        0.15,
      );
      timeline.to(canvas, { scale: 1.13, xPercent: -5, yPercent: -2, duration: 0.85 }, 0.15);
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
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover object-[58%_45%] will-change-[transform] transform-gpu"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,18,28,.73)_0%,rgba(5,18,28,.38)_43%,rgba(5,18,28,.04)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,18,28,.38)_0%,transparent_52%)]" />

        <div ref={contentRef} className="relative mx-auto flex h-dvh max-w-6xl flex-col px-4 pt-[calc(6rem_+_env(safe-area-inset-top))] pb-12 md:px-6 md:pb-16 will-change-[transform,opacity]">
          <div className="mt-auto max-w-3xl">
            <h1
              className="mt-5 max-w-4xl text-[clamp(2rem,5vmin,3.5rem)] leading-[1.05] font-semibold tracking-[-.02em] text-white md:font-bold"
            >
              Precision analytics <br className="hidden md:block" /> for critical infrastructure.
              <span className="block text-[#7bc8ff] mt-2 text-[clamp(1.5rem,4vmin,2.75rem)]">
                Resilient communications <br className="hidden md:block" /> for contested environments.
              </span>
            </h1>
            <p
              className="mt-7 max-w-xl text-base leading-relaxed text-white/82 md:text-lg"
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
            className="group absolute right-4 bottom-6 hidden items-center gap-3 text-xs tracking-[.18em] text-white/70 uppercase hover:text-white md:right-6 md:flex"
          >
            Scroll to enter
            <ArrowDown
              size={15}
              className="transition-transform group-hover:translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
