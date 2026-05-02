import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/format";
import type { Plan } from "@/types";

interface PlanCardProps {
  plan: Plan;
  billing: "monthly" | "annual";
  isCurrent: boolean;
  index: number;
  onSelect: (plan: Plan) => void;
}

export function PlanCard({ plan, billing, isCurrent, index, onSelect }: PlanCardProps) {
  const price = billing === "monthly" ? plan.monthly : Math.round(plan.annual / 12);
  const isFree = plan.monthly === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className={`relative flex flex-col rounded-2xl border bg-card p-6 transition-all ${
        plan.highlight
          ? "border-primary/60 glow-primary"
          : "border-border hover:border-foreground/20"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
          Most popular
        </div>
      )}
      {isCurrent && (
        <div className="absolute -top-3 right-4 rounded-full border border-border bg-surface-elevated px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Current
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
      </div>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-mono text-4xl font-semibold tracking-tight tabular-nums">
          {isFree ? "$0" : formatCurrency(price)}
        </span>
        <span className="text-sm text-muted-foreground">/ month</span>
      </div>
      {!isFree && billing === "annual" && (
        <p className="mt-1 text-xs text-success">
          Billed {formatCurrency(plan.annual)} annually · save 20%
        </p>
      )}

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan)}
        disabled={isCurrent}
        className={`mt-8 flex h-10 w-full items-center justify-center rounded-md text-sm font-medium transition ${
          isCurrent
            ? "cursor-default bg-muted text-muted-foreground"
            : plan.highlight
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "border border-border bg-surface text-foreground hover:bg-accent"
        }`}
      >
        {isCurrent ? "Current plan" : plan.cta}
      </button>
    </motion.div>
  );
}
