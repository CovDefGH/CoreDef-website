import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Global Operations",
  description:
    "Core Defenses global strategy and operations hubs, compliance posture, and worldwide deployment footprint.",
};

export default function GlobalPage() {
  return (
    <PageShell
      eyebrow="Worldwide Footprint"
      title="Global Strategy & Operations Hubs"
      description="Operations hubs, regional coverage, and the compliance posture behind them."
    />
  );
}
