import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { CurrentPlan } from "@/features/billing/components/CurrentPlan";
import { InvoiceTable } from "@/features/billing/components/InvoiceTable";
import { PlanCard } from "@/features/billing/components/PlanCard";
import { api } from "@/lib/api";
import type { Plan } from "@/types";

export const Route = createFileRoute("/billing")({
  head: () => ({
    meta: [
      { title: "Billing — Forge" },
      { name: "description", content: "Manage your plan, view invoices, and track usage." },
      { property: "og:title", content: "Billing — Forge" },
      { property: "og:description", content: "Manage your plan, view invoices, and track usage." },
    ],
  }),
  component: BillingPage,
});

function BillingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const plansQ = useQuery({ queryKey: ["plans"], queryFn: api.billing.getPlans });
  const subQ = useQuery({ queryKey: ["subscription"], queryFn: api.billing.getSubscription });
  const invoicesQ = useQuery({ queryKey: ["invoices"], queryFn: api.billing.getInvoices });

  const handleSelect = (plan: Plan) => {
    if (plan.id === "enterprise") {
      toast.info("We'll be in touch within 24 hours.", {
        description: "Routing your request to sales.",
      });
      return;
    }
    toast.success(`Plan changed to ${plan.name}`, {
      description: "Your subscription will update at the next billing cycle.",
    });
  };

  const currentPlan = plansQ.data?.find((p) => p.id === subQ.data?.planId);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Billing & plans</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your subscription, usage, and payment history.
        </p>
      </div>

      {subQ.data && currentPlan && <CurrentPlan subscription={subQ.data} plan={currentPlan} />}

      {/* Plan cards */}
      <div className="mt-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Choose a plan</h2>
            <p className="text-sm text-muted-foreground">
              Upgrade or downgrade at any time. No hidden fees.
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1 text-xs">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-md px-3 py-1.5 font-medium transition ${
                billing === "monthly"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition ${
                billing === "annual"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {plansQ.data?.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billing={billing}
              isCurrent={plan.id === subQ.data?.planId}
              index={i}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">{invoicesQ.data && <InvoiceTable invoices={invoicesQ.data} />}</div>
    </div>
  );
}
