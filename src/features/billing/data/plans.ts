import type { Invoice, Plan, Subscription } from "@/types";

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Everything you need to validate your idea.",
    monthly: 0,
    annual: 0,
    features: [
      "1 workspace",
      "Up to 3 team members",
      "200 AI messages / month",
      "Basic analytics",
      "Community support",
    ],
    cta: "Current plan",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For founders shipping serious revenue.",
    monthly: 29,
    annual: 290,
    highlight: true,
    features: [
      "Unlimited workspaces",
      "Up to 10 team members",
      "10,000 AI messages / month",
      "Advanced analytics & cohorts",
      "Priority email support",
      "Custom integrations",
    ],
    cta: "Upgrade to Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Scale, security, and a team that has your back.",
    monthly: 499,
    annual: 4990,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Unlimited AI messages",
      "SSO & SCIM",
      "Dedicated success manager",
      "99.99% SLA",
    ],
    cta: "Contact sales",
  },
];

export const currentSubscription: Subscription = {
  planId: "pro",
  status: "active",
  renewsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18),
  seats: { used: 6, total: 10 },
  aiMessages: { used: 4280, total: 10000 },
};

export const invoices: Invoice[] = [
  {
    id: "INV-2026-005",
    date: new Date("2026-04-01"),
    amount: 29,
    status: "paid",
    plan: "Pro Monthly",
  },
  {
    id: "INV-2026-004",
    date: new Date("2026-03-01"),
    amount: 29,
    status: "paid",
    plan: "Pro Monthly",
  },
  {
    id: "INV-2026-003",
    date: new Date("2026-02-01"),
    amount: 29,
    status: "paid",
    plan: "Pro Monthly",
  },
  {
    id: "INV-2026-002",
    date: new Date("2026-01-01"),
    amount: 29,
    status: "paid",
    plan: "Pro Monthly",
  },
  {
    id: "INV-2025-012",
    date: new Date("2025-12-01"),
    amount: 29,
    status: "paid",
    plan: "Pro Monthly",
  },
];
