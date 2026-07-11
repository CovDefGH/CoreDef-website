type TerminalPanelProps = {
  title: string;
  lines: string[];
  ariaSummary: string;
};

// "Sentinel Monitor" component (UX-NOTES §7). Content is static/simulated —
// always labeled illustrative (FR-HOME-2, US-13, Open Decision 4).
export function TerminalPanel({
  title,
  lines,
  ariaSummary,
}: TerminalPanelProps) {
  return (
    <div
      role="img"
      aria-label={ariaSummary}
      className="border-line bg-ink border font-mono text-xs leading-relaxed"
    >
      <div className="border-line/20 flex items-center justify-between border-b px-4 py-2.5">
        <span className="text-accent font-medium tracking-widest uppercase">
          {title}
        </span>
        <span className="text-white/40">ILLUSTRATIVE DATA</span>
      </div>
      <div aria-hidden className="px-4 py-4 text-white/80">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        <p className="text-accent">
          ▌<span className="sr-only">cursor</span>
        </p>
      </div>
    </div>
  );
}
