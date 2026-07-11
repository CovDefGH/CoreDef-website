import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "About",
  description:
    "Core Defenses is an engineering-first organization operating where failure has physical, not just financial, consequences.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Company"
      title="About Core Defenses"
      description="An engineering-first organization operating in environments where failure has physical, not just financial, consequences."
    />
  );
}
