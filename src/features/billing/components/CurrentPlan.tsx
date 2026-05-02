import { Calendar, Sparkles, Users } from "lucide-react";
import type { Plan, Subscription } from "@/types";

interface CurrentPlanProps {
  subscription: Subscription;
  plan: Plan;
}

function UsageBar({
  used,
  total,
  label,
  icon: Icon,
}: {
  used: number;
  total: number;
  label: string;
  icon: typeof Users;
}) {
  const pct = Math.min(100, (used / total) * 100);
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-mono text-xl font-semibold tabular-nums">
          {used.toLocaleString()}
        </span>
        <span className="text-xs text-muted-foreground">/ {total.toLocaleString()}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function CurrentPlan({ subscription, plan }: CurrentPlanProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Current plan
            </span>
            <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success">
              {subscription.status}
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">{plan.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Renews</span>
          <span className="font-medium">
            {subscription.renewsAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <UsageBar
          used={subscription.aiMessages.used}
          total={subscription.aiMessages.total}
          label="AI messages this cycle"
          icon={Sparkles}
        />
        <UsageBar
          used={subscription.seats.used}
          total={subscription.seats.total}
          label="Team seats"
          icon={Users}
        />
      </div>
    </div>
  );
}
