"use client";
import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import React from "react";

// Drives Lenis from GSAP's own ticker instead of Lenis's independent rAF loop
// (autoRaf: false below), so ScrollTrigger reads scroll position on the exact
// same frame Lenis updates it — no drift/lag between the two.
function GsapTicker() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.08, duration: 1.2, smoothWheel: true, autoRaf: false }}
    >
      <GsapTicker />
      {children}
    </ReactLenis>
  );
}
