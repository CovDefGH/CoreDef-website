// Re-mounts on every navigation → runs the page-fade enter animation.
// CSS-only (see globals.css); no-op under prefers-reduced-motion.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
