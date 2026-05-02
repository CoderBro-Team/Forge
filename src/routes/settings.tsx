import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Forge" },
      { name: "description", content: "Manage your workspace, profile, and preferences." },
      { property: "og:title", content: "Settings — Forge" },
      { property: "og:description", content: "Manage your workspace, profile, and preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Workspace and profile preferences.</p>
      </div>

      <div className="space-y-4">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold tracking-tight">Profile</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Update your personal information.</p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Name</label>
              <input
                defaultValue="Alex Chen"
                className="mt-1.5 h-9 w-full rounded-md border border-border bg-surface px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <input
                defaultValue="alex@acme.co"
                className="mt-1.5 h-9 w-full rounded-md border border-border bg-surface px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold tracking-tight">Appearance</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Toggle between light and dark theme.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </section>

        <section className="rounded-2xl border border-destructive/30 bg-card p-6">
          <h2 className="text-sm font-semibold tracking-tight text-destructive">Danger zone</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Permanently delete your workspace and all data.
          </p>
          <button className="mt-4 inline-flex h-9 items-center rounded-md border border-destructive/40 bg-destructive/10 px-3 text-xs font-medium text-destructive transition hover:bg-destructive/20">
            Delete workspace
          </button>
        </section>
      </div>
    </div>
  );
}
