import { useRouterState } from "@tanstack/react-router";
import { Bell, Command, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "./ThemeToggle";

const titleMap: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Overview of your business today" },
  "/assistant": { title: "AI Assistant", subtitle: "Your always-on startup advisor" },
  "/billing": { title: "Billing", subtitle: "Plans, usage, and invoices" },
  "/settings": { title: "Settings", subtitle: "Workspace preferences" },
};

export function Topbar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { title, subtitle } = titleMap[pathname] ?? { title: "Forge", subtitle: "" };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md">
      <SidebarTrigger className="h-8 w-8" />
      <Separator orientation="vertical" className="h-5" />

      <div className="flex min-w-0 flex-col leading-tight">
        <h1 className="truncate text-sm font-semibold tracking-tight">{title}</h1>
        <p className="hidden truncate text-xs text-muted-foreground sm:block">{subtitle}</p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="hidden h-9 items-center gap-2 rounded-md border border-border bg-surface px-3 text-xs text-muted-foreground transition-colors hover:bg-accent md:flex">
          <Search className="h-3.5 w-3.5" />
          <span>Search…</span>
          <span className="ml-6 flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
            <Command className="h-3 w-3" />K
          </span>
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
