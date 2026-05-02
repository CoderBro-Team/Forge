import type { ActivityEvent, Metric, RevenuePoint, UsersPoint } from "@/types";

export const metrics: Metric[] = [
  {
    id: "mrr",
    label: "MRR",
    value: 48230,
    format: "currency",
    delta: 12.4,
    spark: [32, 35, 33, 38, 40, 42, 41, 44, 46, 45, 47, 48],
  },
  {
    id: "users",
    label: "Active Users",
    value: 12840,
    format: "number",
    delta: 8.1,
    spark: [9, 9.5, 10, 10.2, 10.8, 11, 11.5, 11.8, 12.1, 12.3, 12.6, 12.8],
  },
  {
    id: "signups",
    label: "Signups (7d)",
    value: 384,
    format: "number",
    delta: 22.7,
    spark: [40, 38, 45, 50, 55, 58, 62, 60, 65, 70, 72, 75],
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: 2.3,
    format: "percent",
    delta: -0.4,
    spark: [3.2, 3.1, 3.0, 2.9, 2.8, 2.7, 2.6, 2.5, 2.5, 2.4, 2.3, 2.3],
  },
];

export const revenueSeries: RevenuePoint[] = [
  { month: "Jan", mrr: 12400, arr: 148800 },
  { month: "Feb", mrr: 14200, arr: 170400 },
  { month: "Mar", mrr: 16800, arr: 201600 },
  { month: "Apr", mrr: 19500, arr: 234000 },
  { month: "May", mrr: 22300, arr: 267600 },
  { month: "Jun", mrr: 26100, arr: 313200 },
  { month: "Jul", mrr: 29800, arr: 357600 },
  { month: "Aug", mrr: 33500, arr: 402000 },
  { month: "Sep", mrr: 37200, arr: 446400 },
  { month: "Oct", mrr: 41100, arr: 493200 },
  { month: "Nov", mrr: 44800, arr: 537600 },
  { month: "Dec", mrr: 48230, arr: 578760 },
];

export const usersSeries: UsersPoint[] = Array.from({ length: 30 }, (_, i) => {
  const base = 8500 + i * 145;
  const noise = Math.sin(i / 2) * 400 + Math.cos(i / 3) * 250;
  return {
    day: `${i + 1}`,
    active: Math.round(base + noise),
    new: Math.round(40 + Math.sin(i / 2.5) * 20 + i * 0.8),
  };
});

export const activityFeed: ActivityEvent[] = [
  {
    id: "a1",
    type: "upgrade",
    user: "Sarah Chen",
    email: "sarah@acmehq.com",
    detail: "upgraded to Pro",
    amount: 29,
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: "a2",
    type: "signup",
    user: "Marcus Liu",
    email: "marcus@northwind.io",
    detail: "started free trial",
    timestamp: new Date(Date.now() - 1000 * 60 * 22),
  },
  {
    id: "a3",
    type: "payment",
    user: "Priya Patel",
    email: "priya@runway.dev",
    detail: "payment received",
    amount: 290,
    timestamp: new Date(Date.now() - 1000 * 60 * 58),
  },
  {
    id: "a4",
    type: "signup",
    user: "Diego Alvarez",
    email: "diego@stellarbase.com",
    detail: "started free trial",
    timestamp: new Date(Date.now() - 1000 * 60 * 95),
  },
  {
    id: "a5",
    type: "upgrade",
    user: "Hana Suzuki",
    email: "hana@kintsugi.jp",
    detail: "upgraded to Enterprise",
    amount: 499,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: "a6",
    type: "churn",
    user: "Tom Becker",
    email: "tom@oldco.com",
    detail: "cancelled subscription",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: "a7",
    type: "payment",
    user: "Aiko Tanaka",
    email: "aiko@meridian.app",
    detail: "payment received",
    amount: 29,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
];
