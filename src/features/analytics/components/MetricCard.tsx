import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { formatCompact, formatCurrency, formatPercent } from "@/lib/format";
import type { Metric } from "@/types";

interface MetricCardProps {
  metric: Metric;
  index?: number;
}

export function MetricCard({ metric, index = 0 }: MetricCardProps) {
  const positive = metric.delta >= 0;
  // For churn, lower is better — invert color.
  const goodWhenDown = metric.id === "churn";
  const isGood = goodWhenDown ? !positive : positive;

  const formatted =
    metric.format === "currency"
      ? formatCurrency(metric.value)
      : metric.format === "percent"
        ? `${metric.value.toFixed(1)}%`
        : formatCompact(metric.value);

  const data = metric.spark.map((v, i) => ({ i, v }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {metric.label}
        </span>
        <div
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
            isGood ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          }`}
        >
          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span className="font-mono">{formatPercent(metric.delta)}</span>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="font-mono text-3xl font-semibold tracking-tight tabular-nums">
          {formatted}
        </div>
        <div className="h-10 w-24 opacity-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`spark-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="var(--color-primary)"
                strokeWidth={1.5}
                fill={`url(#spark-${metric.id})`}
                isAnimationActive
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
