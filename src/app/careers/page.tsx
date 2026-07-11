import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Core Defenses — engineering roles in analytics, secure communications, and critical-infrastructure systems.",
};

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Mission Active"
      title="Engineer the Shield"
      description="We hire engineers who hold the same bar we hold for our systems. Open roles, culture, and benefits land here."
    />
  );
}
