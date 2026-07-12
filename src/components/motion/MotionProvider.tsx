"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

// Dynamically import the feature set so it code-splits into its own async chunk
// (out of first-load JS → keeps the <150KB/route NFR budget). Only the tiny `m`
// core ships in the initial bundle. `strict` forbids `motion.*`; use `m.*`.
const loadFeatures = () => import("./features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
