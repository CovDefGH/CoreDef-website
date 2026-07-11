import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Core Defenses serves energy, nuclear, defense, industrial, government, utilities, critical infrastructure, and manufacturing sectors.",
};

export default function IndustriesPage() {
  return (
    <PageShell
      eyebrow="Sectors Served"
      title="Industries"
      description="Energy, nuclear, defense, industrial, government, utilities, critical infrastructure, and manufacturing."
    />
  );
}
