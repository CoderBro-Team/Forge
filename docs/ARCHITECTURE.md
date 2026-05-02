**Forge — structure**

**Runtime**

1. The TanStack Start client bundle loads; the router hydrates from `src/routeTree.gen.ts` (generated from `src/routes/`).
2. **Dashboard and billing** load data through TanStack Query → `src/lib/api.ts` (in-memory payloads + optional `setTimeout` to mimic latency).
3. **Assistant** uses `useChatStream`: short wait, then a typewriter reveal of a **fixed template** in the browser. No server function, streaming transport, or third-party completion endpoint in this project.

**Build**

Vite produces `dist/client` and an SSR server bundle under `dist/server` consistent with TanStack Start’s default pipeline (`npm run build`, then `npm run preview` for a local check).

**Styling**

Design tokens and globals live in `src/styles.css` (Tailwind v4). Component styling follows the patterns referenced from `components.json` (shadcn-style setup).

**Ownership**

Engineering and design: **[CoderBro Team](https://github.com/CoderBro-Team)**.
