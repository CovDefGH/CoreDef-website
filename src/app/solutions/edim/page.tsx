import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "EDIM — Nuclear Data Analytics",
  description:
    "EDIM reduces nuclear data uncertainty to recover thermal margin — improving reactor economics through better prediction, not conservatism.",
};

export default function EdimPage() {
  return (
    <PageShell
      eyebrow="Nuclear Data Analytics"
      title="EDIM"
      description="Identify and narrow nuclear data uncertainty to reduce the uncertainty penalty on thermal margin — enabling higher allowable power output, longer fuel cycles, and more flexible operation."
    />
  );
}
