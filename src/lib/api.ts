/**
 * Unified API client.
 * Mock-first — swap with real backend calls when ready.
 */
import {
  activityFeed,
  metrics,
  revenueSeries,
  usersSeries,
} from "@/features/analytics/data/mockData";
import { currentSubscription, invoices, plans } from "@/features/billing/data/plans";
import type {
  ActivityEvent,
  Invoice,
  Metric,
  Plan,
  RevenuePoint,
  Subscription,
  UsersPoint,
} from "@/types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const api = {
  analytics: {
    async getMetrics(): Promise<Metric[]> {
      await delay(120);
      return metrics;
    },
    async getRevenueSeries(): Promise<RevenuePoint[]> {
      await delay(120);
      return revenueSeries;
    },
    async getUsersSeries(): Promise<UsersPoint[]> {
      await delay(120);
      return usersSeries;
    },
    async getActivity(): Promise<ActivityEvent[]> {
      await delay(120);
      return activityFeed;
    },
  },
  billing: {
    async getPlans(): Promise<Plan[]> {
      await delay(80);
      return plans;
    },
    async getSubscription(): Promise<Subscription> {
      await delay(80);
      return currentSubscription;
    },
    async getInvoices(): Promise<Invoice[]> {
      await delay(80);
      return invoices;
    },
  },
};
