"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ImageSequence } from "@/content/immersive";

gsap.registerPlugin(ScrollTrigger);

type ScrollSequenceProps = {
  className?: string;
  sequence: ImageSequence;
};

const preloadRadius = 4;

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

export function ScrollSequence({ className, sequence }: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef(new Map<number, HTMLImageElement>());
  const frameRef = useRef(0);
  const resizeFrameRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hasDrawnFrame, setHasDrawnFrame] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setEnabled(!motionQuery.matches && sequence.frames.length > 0);

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);
    return () =>
      motionQuery.removeEventListener("change", updateMotionPreference);
  }, [sequence.frames.length]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !visible) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const scrollRoot = container.parentElement?.parentElement ?? container;

    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = (index: number) => {
      const image = imagesRef.current.get(index);
      if (!image?.complete || !image.naturalWidth) return;

      const bounds = container.getBoundingClientRect();
      // Optimize for mobile: force a lower DPR on small screens to prevent GPU lag
      const dpr = window.innerWidth <= 768 ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(bounds.width * dpr));
      const height = Math.max(1, Math.round(bounds.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
      setHasDrawnFrame(true);
    };

    let drawPending = false;
    const queueDraw = () => {
      if (drawPending) return;
      drawPending = true;
      window.requestAnimationFrame(() => {
        drawPending = false;
        draw(frameRef.current);
      });
    };

    const load = (index: number) => {
      const validIndex = clamp(index, 0, sequence.frameCount - 1);
      const existing = imagesRef.current.get(validIndex);

      if (existing) {
        if (existing.complete && validIndex === frameRef.current) queueDraw();
        return;
      }

      const image = new window.Image();
      image.decoding = "async";
      image.onload = () => {
        if (validIndex === frameRef.current) queueDraw();
      };
      image.src = sequence.frames[validIndex];
      imagesRef.current.set(validIndex, image);
    };

    // Preload the initial frames immediately to ensure frame 0 renders before scrolling
    for (let index = 0; index <= preloadRadius; index += 1) {
      load(index);
    }

    const playhead = { frame: 0 };
    const ctx = gsap.context(() => {
      gsap.to(playhead, {
        frame: sequence.frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: scrollRoot,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: () => {
          const nextFrame = playhead.frame;
          frameRef.current = nextFrame;
          for (
            let index = nextFrame - preloadRadius;
            index <= nextFrame + preloadRadius;
            index += 1
          ) {
            load(index);
          }
          
          // LRU Cleanup to prevent memory bloat on mobile
          const maxRadius = preloadRadius * 2;
          for (const key of imagesRef.current.keys()) {
            if (Math.abs(key - nextFrame) > maxRadius) {
              const img = imagesRef.current.get(key);
              if (img) {
                img.src = ""; // Abort any pending network request
              }
              imagesRef.current.delete(key);
            }
          }
          
          queueDraw();
        },
      });
    }, container);

    const queueResize = () => {
      if (resizeFrameRef.current !== null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
      }
      resizeFrameRef.current = window.requestAnimationFrame(() => {
        resizeFrameRef.current = null;
        draw(frameRef.current);
      });
    };

    window.addEventListener("resize", queueResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", queueResize);
      if (resizeFrameRef.current !== null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
      }
    };
  }, [enabled, sequence, visible]);

  return (
    <div ref={containerRef} className={className}>
      <Image
        src={sequence.poster}
        alt={sequence.alt}
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-opacity duration-300 ${
          hasDrawnFrame ? "opacity-0" : "opacity-100"
        }`}
      />
      {enabled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ willChange: "transform" }}
          className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
            hasDrawnFrame ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
