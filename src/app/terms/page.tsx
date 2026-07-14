import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Core Defenses terms of service.",
};

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description="Final terms copy requires legal review before launch (TEST-PLAN.md §5)."
    />
  );
}
