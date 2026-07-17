"use client";

import { useState } from "react";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { jobs, departments } from "@/content/careers";

// US-10: client-side department filter over the inline role list. Roles render
// here on-page — no redirect to an external careers site.
export function JobBoard() {
  const [department, setDepartment] = useState("All");

  const visible =
    department === "All"
      ? jobs
      : jobs.filter((job) => job.department === department);

  return (
    <div className="mt-8">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter roles by department"
      >
        {departments.map((dept) => {
          const active = dept === department;
          return (
            <button
              key={dept}
              type="button"
              aria-pressed={active}
              onClick={() => setDepartment(dept)}
              className={
                active
                  ? "border-primary bg-primary border px-4 py-3 text-sm font-medium text-white transition-colors"
                  : "border-line hover:border-accent text-ink border bg-white px-4 py-3 text-sm font-medium transition-colors"
              }
            >
              {dept}
            </button>
          );
        })}
      </div>

      <p className="text-ink-muted mt-6 text-sm">
        {visible.length} open {visible.length === 1 ? "role" : "roles"}
      </p>

      <ul className="mt-4 flex flex-col gap-4">
        {visible.map((job) => (
          <li
            key={job.id}
            className="border-line hover:border-accent flex flex-col gap-4 border bg-white p-6 transition-colors md:flex-row md:items-start md:justify-between"
          >
            <div className="max-w-2xl">
              <h3 className="text-ink text-lg font-bold">{job.title}</h3>
              <p className="text-ink-muted mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <span className="text-primary font-medium">
                  {job.department}
                </span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin aria-hidden size={13} />
                  {job.location}
                </span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Briefcase aria-hidden size={13} />
                  {job.employmentType}
                </span>
              </p>
              <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                {job.description}
              </p>
            </div>
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Apply for ${job.title}`}
              className="border-primary bg-primary hover:border-ink hover:bg-ink inline-flex shrink-0 items-center gap-2 self-start border px-5 py-2.5 text-sm font-medium text-white transition-colors"
            >
              Apply Now
              <ArrowUpRight aria-hidden size={16} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
