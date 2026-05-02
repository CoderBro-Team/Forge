import { Download } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { Invoice } from "@/types";

interface InvoiceTableProps {
  invoices: Invoice[];
}

const statusStyles = {
  paid: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  failed: "bg-destructive/10 text-destructive",
} as const;

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-sm font-semibold tracking-tight">Invoices</h3>
        <p className="text-xs text-muted-foreground">All your past invoices and receipts.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-xs text-muted-foreground">
              <th className="px-6 py-2.5 font-medium">Invoice</th>
              <th className="px-6 py-2.5 font-medium">Date</th>
              <th className="px-6 py-2.5 font-medium">Plan</th>
              <th className="px-6 py-2.5 text-right font-medium">Amount</th>
              <th className="px-6 py-2.5 font-medium">Status</th>
              <th className="px-6 py-2.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoices.map((inv) => (
              <tr key={inv.id} className="transition-colors hover:bg-accent/40">
                <td className="px-6 py-3 font-mono text-xs">{inv.id}</td>
                <td className="px-6 py-3 text-muted-foreground">
                  {inv.date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-3">{inv.plan}</td>
                <td className="px-6 py-3 text-right font-mono tabular-nums">
                  {formatCurrency(inv.amount)}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyles[inv.status]}`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right">
                  <button
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Download invoice ${inv.id}`}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
