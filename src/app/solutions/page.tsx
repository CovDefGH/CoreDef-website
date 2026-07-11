import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "EDIM nuclear data analytics and ENADOX secure communications — the Core Defenses platform portfolio.",
};

export default function SolutionsPage() {
  return (
    <PageShell
      eyebrow="Platform Portfolio"
      title="Solutions"
      description="Two flagship platforms: EDIM for nuclear data analytics and ENADOX for secure communications in denied environments."
    />
  );
}
