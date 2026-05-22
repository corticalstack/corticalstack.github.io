# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

Personal portfolio and blog of Jon-Paul Boyd ("JP") - a cyberpunk / cyber-HUD
static site under the brand **Cortical Stack**. This is the **Next.js rebuild**
that replaces the previous Beautiful Jekyll site, per `site_rebuild.md` (the
source-of-truth spec).

**Branch state (important):**
- `master` = the OLD Beautiful Jekyll site, still **live** at `corticalstack.ai`
  (GitHub Pages serves it). Do not assume `master` reflects this stack.
- `rebuild` = this Next.js build; work happens here. Cutover to live is gated on
  JP's approval (switch the repo's Pages source to "GitHub Actions" and promote
  `rebuild` to `main`).

## Stack

- Next.js 16 (App Router), `output: 'export'` (static export, no runtime server)
- React 19, TypeScript strict
- Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`) + shadcn/ui (new-york), sources in `components/ui/`
- Fonts: JetBrains Mono (mono / chrome) + Space Grotesk (sans / body + display) via `next/font/google`
- Icons: Lucide React (do not add a second icon library)
- Package manager: pnpm (Node 22)

Forked from Devstarter by Zippystarter (Apache-2.0), extensively customized.

## Local development

```bash
pnpm install    # native build scripts (sharp, unrs-resolver) are approved in pnpm-workspace.yaml
pnpm dev        # http://localhost:3000
pnpm build      # static export to ./out
pnpm lint       # eslint
pnpm format     # prettier + tailwind class sorting
```

Gotchas:
- pnpm 11 reads settings from `pnpm-workspace.yaml` (NOT the `pnpm` key in `package.json`). Build-script approval lives there under `allowBuilds:`.
- Turbopack emits compiled CSS under `out/_next/static/chunks/*.css` (not `/css/`).

## Static export & deploy

- `next.config.ts`: `output: 'export'`, `images.unoptimized: true` (Pages has no image optimizer), `trailingSlash: true` (each route -> `<route>/index.html`).
- `public/CNAME` = `corticalstack.ai`; `public/.nojekyll` stops GitHub Pages Jekyll-processing the export; CV self-hosted at `public/cv.pdf` (served as `/cv.pdf`).
- `.github/workflows/deploy.yml`: builds with pnpm, exports `out/`, deploys via the official Pages action. Triggers on push to `main` + manual dispatch only - it does NOT run on `rebuild`, so it cannot disturb the live site before cutover.

## Content & structure

- `app/` - `layout.tsx` (fonts, metadata, dark-first theme), `page.tsx` (the single scrollable page: nav, hero, Selected Works, Tech Stack, Transmissions, Contact, footer - driven by inline data arrays), `globals.css` (theme tokens).
- `components/` - `ui/` (shadcn, owned source), `zippystarter/` (Container), `providers/` (theme), plus `project-image.tsx`.
- `lib/utils.ts` (`cn`); `@/` path alias = repo root.
- `public/` - static assets, `CNAME`, `cv.pdf`.
- Preserved from the Jekyll site for migration: `_posts/` (81 posts; source for the MDX transmissions), `assets/img/`, `docs/` (CV + project PDFs).
- `content/transmissions/` - blog posts as MDX (4 migrated). Read/sorted by `lib/transmissions.ts` (chronological hex IDs, reading time); rendered via `next-mdx-remote/rsc` (+ `remark-gfm`, `rehype-pretty-code`) in the `[slug]` route.
- `components/site-header.tsx` + `components/site-footer.tsx` - shared chrome used by the homepage and the transmissions routes.

## Theme / palette

Cyan accent on near-black, dark-first. Colors are OKLCH CSS variables under
`:root` (light) and `.dark` (canonical) in `app/globals.css`. Primary
`oklch(0.85 0.15 220)`; secondary amber (`--warning` `oklch(0.78 0.16 70)`) used
sparingly. Change the theme here, not in component classes.

## Build phases (see site_rebuild.md)

- **Phase 1 (DONE):** foundation - scaffold, static-export config, cyan palette, JP rebrand, staged deploy workflow.
- **Phase 2 (in progress):** MDX pipeline DONE - `content/transmissions/*.mdx`, `lib/transmissions.ts`, `/transmissions` + `/transmissions/[slug]` routes, shared header/footer, homepage wired to the collection. Remaining: Academic Archive (9 projects: MT/ACI/CIO/ANN/AIP/DM/FL/MR/RM) and Dossier sections; finalize nav to `transmissions / archives / dossier / comms`.
- **Phase 3:** Bunny-CDN video layer (hero ambient loop + project hover clips).
- **Phase 4 (deferred):** cyber theatrics. **Phase 5:** SEO / RSS / sitemap / perf.

## Conventions

TypeScript strict (no `any`); functional Server Components by default, `'use client'` only when needed; shadcn primitives in `components/ui/` are editable; co-locate types (shared in `types/`); Tailwind classes sorted via `prettier-plugin-tailwindcss`. Per JP's global rule: no em/en dashes or double hyphens in generated content.
