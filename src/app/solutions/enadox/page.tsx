import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "ENADOX — Secure Communications",
  description:
    "ENADOX enables resilient, secure communication across platforms in denied, degraded, intermittent, and limited-bandwidth environments.",
};

export default function EnadoxPage() {
  return (
    <PageShell
      eyebrow="Secure Communications"
      title="ENADOX"
      description="Secure communication in open and denied environments — resilient networking, cross-platform data transformation, and inbuilt redundancy for mission-critical operations."
    />
  );
}
