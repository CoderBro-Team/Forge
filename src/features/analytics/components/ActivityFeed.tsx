import { ArrowDownRight, ArrowUpRight, CreditCard, UserPlus, UserX } from "lucide-react";
import { formatCurrency, formatRelativeTime } from "@/lib/format";
import type { ActivityEvent } from "@/types";

interface ActivityFeedProps {
  events: ActivityEvent[];
}

const config = {
  signup: { icon: UserPlus, color: "text-chart-2", bg: "bg-chart-2/10", label: "Signup" },
  upgrade: { icon: ArrowUpRight, color: "text-success", bg: "bg-success/10", label: "Upgrade" },
  payment: { icon: CreditCard, color: "text-primary", bg: "bg-primary/10", label: "Payment" },
  churn: { icon: UserX, color: "text-destructive", bg: "bg-destructive/10", label: "Churn" },
} as const;

export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Recent activity</h3>
          <p className="text-xs text-muted-foreground">Live customer events</p>
        </div>
        <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          View all <ArrowDownRight className="h-3 w-3 -rotate-90" />
        </button>
      </div>
      <ul className="divide-y divide-border">
        {events.map((e) => {
          const c = config[e.type];
          const Icon = c.icon;
          return (
            <li
              key={e.id}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-accent/40"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${c.bg} ${c.color}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="truncate text-sm font-medium">{e.user}</span>
                  <span className="truncate text-xs text-muted-foreground">{e.detail}</span>
                </div>
                <span className="truncate text-xs text-muted-foreground">{e.email}</span>
              </div>
              <div className="flex flex-col items-end text-right">
                {e.amount !== undefined && (
                  <span className="font-mono text-sm font-medium tabular-nums">
                    {formatCurrency(e.amount)}
                  </span>
                )}
                <span className="text-[11px] text-muted-foreground">
                  {formatRelativeTime(e.timestamp)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
