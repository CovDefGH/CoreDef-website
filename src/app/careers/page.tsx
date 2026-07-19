import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { jobs } from "@/content/careers";
import { Reveal } from "@/components/motion/Reveal";
import { JobBoard } from "./JobBoard";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Core Defenses hires engineers for analytics, secure communications, and critical infrastructure systems. All open roles listed.",
};

export default function CareersPage() {
  const applyUrl = jobs[0].applyUrl;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      {/* Open roles — inline, filterable (US-10) */}
      <Reveal as="section" id="open-roles" className="scroll-mt-24">
        <h1 className="text-ink text-3xl font-bold">Open Roles</h1>
        <p className="text-ink-muted mt-3 max-w-2xl text-justify">
          Every current opening, listed here. Filter by department, then apply
          directly.
        </p>
        <JobBoard />
      </Reveal>

      {/* Recruitment CTA */}
      <Reveal
        as="section"
        className="border-line bg-surface mt-16 flex flex-wrap items-center justify-between gap-6 border p-8"
      >
        <div className="max-w-xl">
          <h2 className="text-ink text-2xl font-bold">
            Don&apos;t see your role?
          </h2>
          <p className="text-ink-muted mt-2 text-justify text-sm">
            Send your application and tell us what you&apos;d like to build.
            We review every application.
          </p>
        </div>
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-primary bg-primary hover:border-ink hover:bg-ink inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium text-white transition-colors"
        >
          Fill Out Our Application
          <ArrowUpRight aria-hidden size={16} />
        </a>
      </Reveal>
    </div>
  );
}
