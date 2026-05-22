# corticalstack.ai

Personal portfolio and blog of Jon-Paul Boyd ("JP") - a cyberpunk / cyber-HUD
static site. Brand: **Cortical Stack**.

> **Rebuild in progress.** This is the Next.js replacement for the previous
> Beautiful Jekyll site. corticalstack.ai still serves the Jekyll build from
> `master` until cutover; this rebuild lives on the `rebuild` branch. See
> `site_rebuild.md` for the full specification.

## Stack

- **Next.js 16** (App Router) with `output: 'export'` (static site generation)
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme`, CSS-first) + **shadcn/ui** (sources in `components/ui/`)
- Fonts: **JetBrains Mono** (mono) + **Space Grotesk** (sans) via `next/font/google`
- Icons: **Lucide React**
- Package manager: **pnpm**

Based on [Devstarter by Zippystarter](https://github.com/zippystarter/template-devstarter)
(Apache-2.0), extensively customized.

## Develop

```bash
pnpm install      # install deps (native build scripts approved in pnpm-workspace.yaml)
pnpm dev          # dev server at http://localhost:3000
pnpm build        # static export to ./out
pnpm lint         # eslint
pnpm format       # prettier (+ tailwind class sorting)
```

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` (builds with pnpm, exports to
`out/`, deploys with the official Pages action). Triggers on push to `main` and
manual dispatch. Custom domain via `public/CNAME` (`corticalstack.ai`);
`public/.nojekyll` disables Jekyll processing of the export.

> **Cutover:** switch the repo's Pages source to "GitHub Actions" and promote
> `rebuild` to `main` when ready. Until then, `master`/Jekyll stays live.

## Layout

- `app/` - routes, layout, global styles (`globals.css` holds the cyan theme tokens)
- `components/` - `ui/` (shadcn), `zippystarter/`, and section components
- `lib/` - utilities
- `public/` - static assets, `CNAME`, `cv.pdf`
- `content/transmissions/` - blog posts as MDX (added in phase 2)
- `site_rebuild.md` - the build specification
