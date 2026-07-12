import { MotionCard } from "@/components/motion/MotionCard";

type StatCardProps = {
  label: string;
  value: string;
  description: string;
};

// FR-EDIM-3 / US-2: quantified stat with tabular figures per design system.
export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <MotionCard className="border-line hover:border-accent border bg-white p-6 transition-colors">
      <p className="text-ink-muted text-sm">{label}</p>
      <p className="text-ink mt-2 font-mono text-3xl font-bold tabular-nums">
        {value}
      </p>
      <p className="text-ink-muted mt-3 text-sm">{description}</p>
    </MotionCard>
  );
}
