import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Core Defenses — business, government, partnership, careers, and general inquiries, with secure correspondence options.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Secure Communications"
      title="Contact"
      description="Business, government, partnership, careers, and general inquiries. The secure transmission form ships with Phase 3."
    />
  );
}
