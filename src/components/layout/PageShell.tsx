// Shared page container — header pattern per UX-NOTES §7 "Hero (header-only)".
// Phase 1: every route renders this shell; page-specific sections land in Phase 2/3.
type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-primary flex items-center gap-2 text-sm font-medium">
        <span
          aria-hidden
          className="bg-accent inline-block size-1.5 rounded-full"
        />
        {eyebrow}
      </p>
      <h1 className="text-ink mt-4 max-w-3xl text-4xl font-bold md:text-5xl">
        {title}
      </h1>
      <p className="text-ink-muted mt-5 max-w-2xl text-lg">{description}</p>
      {children ?? (
        <div className="border-line bg-surface mt-14 border px-6 py-10">
          <p className="text-ink-muted font-mono text-sm">
            SECTION UNDER CONSTRUCTION — content for this page is scheduled in
            the current build phase. See docs/ROADMAP.md.
          </p>
        </div>
      )}
    </div>
  );
}
