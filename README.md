# XSin Studio

The production product-showcase PWA for XSin Studio:
local-first tools for the machine on your desk.

Two products today:

- **AI Bobby** — one OpenAI-compatible endpoint for free-tier pools (OpenCode,
  NVIDIA NIM) and WorkBuddy CN/AI. 0.2.3 is in internal beta; 0.2.2 is the
  public beta.
- **O Muse** — the musician's toolbox: Stem Player, Kontakt Library Manager and
  Audio Plugin Manager. 0.2.2 is the public beta.

The approved design draft, which this app is ported from, lives in
[`prototype/xsin-studio`](prototype/xsin-studio). The UI rules are in
[`docs/spec-ui.md`](docs/spec-ui.md).

## Stack

| Layer | Version |
|---|---|
| React | 19.3 |
| Vite | 8.3 |
| TypeScript | 7.0 |
| Tailwind CSS | 4.3 |
| shadcn/ui CLI / Radix primitives | shadcn 4.22 |
| PWA | vite-plugin-pwa 2 / Workbox |
| Monorepo | pnpm workspaces |

## Quick start

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

Build and preview the production bundle:

```bash
pnpm build
pnpm preview
```

Quality gates:

```bash
pnpm typecheck
pnpm test
```

## Workspace

```
apps/web                 Vite + React site, PWA, shadcn/ui, WebGL/Canvas visuals
packages/content         build-time product collection + generated catalogue
prototype/xsin-studio    approved interactive design draft (kept for reference)
docs/spec-ui.md          approved UI spec from the design draft
docs/styling.md          styling conventions and the CSS file map
```

## Product content pipeline

`packages/content` collects product facts at build time from a GitHub repo, a
URL, or a local README, then merges them with the approved editorial copy:

```bash
pnpm content:offline   # reproducible, uses packages/content/snapshots
pnpm content           # live GitHub/README refresh (writes the same files)
```

The collector writes `packages/content/data/products.json` and
`apps/web/src/generated/products.json`. Those files are committed; the
production build always runs the offline collector so the deploy is
reproducible. The copy deck, including what is a fact versus editorial, is in
[`prototype/xsin-studio/COPY.md`](prototype/xsin-studio/COPY.md).

## Design system

- Semantic tokens live in
  [`apps/web/src/styles/base.css`](apps/web/src/styles/base.css); the few rules
  that cannot be utilities (WebGL/Canvas staging, HUD artwork, cursor) are in
  [`apps/web/src/styles/visuals.css`](apps/web/src/styles/visuals.css). The
  conventions are in [`docs/styling.md`](docs/styling.md).
- Tailwind CSS 4 provides layout utilities and the shadcn theme bridge.
- shadcn/ui primitives (Radix Dialog, Input, Button) power the dossiers, command
  palette and install sheet.
- Theme and locale are persisted in `localStorage` (`xsin.theme`, `xsin.lang`)
  and applied before first paint.
- The hero, routing diagram, stem player and craft experiments are WebGL, Canvas
  2D and SVG; they respect `prefers-reduced-motion` and degrade to CSS/SVG
  fallbacks when WebGL is unavailable.

## Deploy to GitHub Pages

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds the workspace and publishes `apps/web/dist` with GitHub Pages.

One-time repository settings: **Settings → Pages → Build and deployment → Source:
GitHub Actions**, plus the custom domain recorded in
[`apps/web/public/CNAME`](apps/web/public/CNAME). The CNAME file is part of the
published artifact, so the domain survives every deploy. DNS: apex `A` records
to the GitHub Pages IPs (`185.199.108-111.153`), `www` CNAME to `xsin.github.io`.
