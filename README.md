# corticalstack.ai

Personal portfolio and blog of Jon-Paul Boyd ("JP") - a cyberpunk / cyber-HUD
static site. Brand: **Cortical Stack**.

Live at https://corticalstack.ai. Source on the `main` branch; deploys via
GitHub Actions to GitHub Pages.

## Stack

- **Next.js 16** (App Router) with `output: 'export'` (static site generation)
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme`, CSS-first) + **shadcn/ui** (sources in `components/ui/`)
- Fonts: **JetBrains Mono** (mono) + **Space Grotesk** (sans) via `next/font/google`
- Icons: **Lucide React**
- Package manager: **pnpm**

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

## Layout

- `app/` - routes, layout, global styles (`globals.css` holds the cyan theme tokens)
- `components/` - `ui/` (shadcn), `layout/` (Container primitive), and section components
- `lib/` - utilities + content readers
- `public/` - static assets, `CNAME`, `cv.pdf`, Bunny-mirror images, SFX
- `content/transmissions/` - blog posts as MDX
- `content/archives/` - academic dossier MDX
