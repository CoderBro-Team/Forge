export interface Metric {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number" | "percent";
  delta: number; // percent change
  spark: number[];
}

export interface RevenuePoint {
  month: string;
  mrr: number;
  arr: number;
}

export interface UsersPoint {
  day: string;
  active: number;
  new: number;
}

export interface ActivityEvent {
  id: string;
  type: "signup" | "upgrade" | "churn" | "payment";
  user: string;
  email: string;
  detail: string;
  amount?: number;
  timestamp: Date;
}

export interface Plan {
  id: "starter" | "pro" | "enterprise";
  name: string;
  description: string;
  monthly: number;
  annual: number;
  highlight?: boolean;
  features: string[];
  cta: string;
}

export interface Subscription {
  planId: Plan["id"];
  status: "active" | "trialing" | "past_due";
  renewsAt: Date;
  seats: { used: number; total: number };
  aiMessages: { used: number; total: number };
}

export interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: "paid" | "pending" | "failed";
  plan: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}
