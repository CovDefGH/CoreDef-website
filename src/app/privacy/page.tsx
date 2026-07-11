import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Core Defenses privacy policy.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="Final policy copy requires legal review before launch (TEST-PLAN.md §5)."
    />
  );
}
