import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MetricCard } from "@/features/analytics/components/MetricCard";
import { RevenueChart } from "@/features/analytics/components/RevenueChart";
import { UsersChart } from "@/features/analytics/components/UsersChart";
import { ActivityFeed } from "@/features/analytics/components/ActivityFeed";
import { api } from "@/lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Forge" },
      {
        name: "description",
        content: "Real-time MRR, active users, growth, and churn metrics for your startup.",
      },
      { property: "og:title", content: "Dashboard — Forge" },
      { property: "og:description", content: "Real-time MRR, active users, and growth metrics." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const metricsQ = useQuery({ queryKey: ["metrics"], queryFn: api.analytics.getMetrics });
  const revenueQ = useQuery({ queryKey: ["revenue"], queryFn: api.analytics.getRevenueSeries });
  const usersQ = useQuery({ queryKey: ["users"], queryFn: api.analytics.getUsersSeries });
  const activityQ = useQuery({ queryKey: ["activity"], queryFn: api.analytics.getActivity });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back, Alex</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's how Acme is performing today.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="text-muted-foreground">All systems operational</span>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricsQ.data?.map((m, i) => (
          <MetricCard key={m.id} metric={m} index={i} />
        ))}
        {metricsQ.isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[124px] animate-pulse rounded-xl border border-border bg-card"
            />
          ))}
      </div>

      {/* Charts */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {revenueQ.data ? (
            <RevenueChart data={revenueQ.data} />
          ) : (
            <div className="h-[344px] animate-pulse rounded-xl border border-border bg-card" />
          )}
        </div>
        <div>
          {usersQ.data ? (
            <UsersChart data={usersQ.data} />
          ) : (
            <div className="h-[344px] animate-pulse rounded-xl border border-border bg-card" />
          )}
        </div>
      </div>

      {/* Activity */}
      <div className="mt-4">
        {activityQ.data ? (
          <ActivityFeed events={activityQ.data} />
        ) : (
          <div className="h-[400px] animate-pulse rounded-xl border border-border bg-card" />
        )}
      </div>
    </div>
  );
}
