# Cortical Stack — Project Build Specification

This document is the source of truth for building the **corticalstack.ai** site rebuild. It is intended to be read at the start of a Claude Code CLI session as the primary context. Everything below has been discussed and agreed; treat it as the brief, not a starting point for renegotiation.

If anything in this document conflicts with a later instruction from the user in the chat, the chat wins — but flag the conflict.

---

## 1. What we're building

A complete replacement for `corticalstack.ai`, the current Jekyll-based personal site of Jon-Paul Boyd ("JP"). The new site is a cyberpunk / cyber-HUD aesthetic personal portfolio and blog, with cinematic ambient video clips throughout.

**Site purpose:** showcase academic projects, work history, blog posts ("transmissions"), and contact info. Should feel distinctive and memorable — not a generic developer portfolio.

**Brand name (existing, do not change):** Cortical Stack. The name references the spine-implanted memory device from Altered Carbon. Lean into this — terminology like "transmissions," "archives," "dossier," "operative" is on-brand. Avoid generic dev-portfolio language like "Hi I'm JP, I make websites."

**Existing live site for reference:** https://corticalstack.ai/  
**Existing GitHub:** https://github.com/corticalstack  
**Existing Jekyll repo (to be replaced):** corticalstack/corticalstack.github.io

---

## 2. Starting point

Fork or clone this template and modify in place. Do not build from scratch.

**Template:** Devstarter by Zippystarter  
**Repo:** https://github.com/zippystarter/template-devstarter  
**License:** Apache-2.0 (fork-friendly, attribute as needed)  
**Live demo:** https://devstarter-demo.vercel.app

The template provides the architecture, component structure, and base styling. We are extensively customizing content, structure, color, and adding a video layer it does not have out of the box.

---

## 3. Tech stack (locked)

Do not propose alternatives unless something is genuinely broken.

- **Framework:** Next.js 16 (App Router) with `output: 'export'` for static site generation
- **React:** 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme`)
- **Component library:** shadcn/ui (sources copied into repo at `components/ui/`)
- **Fonts:** JetBrains Mono (monospace, primary), Space Grotesk (sans, secondary) — both via `next/font/google`
- **Icons:** Lucide React (already used by shadcn) — do not introduce a second icon library
- **Animation:** Motion (formerly Framer Motion) — add as needed for the boot sequence and transitions
- **Markdown for blog posts:** MDX via `@next/mdx` or `next-mdx-remote` — see Section 7
- **Package manager:** `pnpm` (template uses it; stay consistent)

**Notable non-features:** no Astro, no Vite migration, no Server Components for fetching (this is a static export), no database, no auth, no API routes.

---

## 4. Hosting & deployment (locked)

- **Site:** GitHub Pages, served at `corticalstack.ai` (custom domain via CNAME)
- **Repo target:** `corticalstack/corticalstack.github.io` (replaces the current Jekyll site)
- **Videos:** Bunny CDN — plain CDN + Storage product (not Bunny Stream). Custom subdomain `cdn.corticalstack.ai` pointing at the Bunny pull zone.
- **Build & deploy:** GitHub Actions workflow that runs on push to `main`, builds with `pnpm build`, exports static output, and deploys via GitHub's official Pages action.
- **Local dev:** `pnpm dev` on port 3000.

**Important constraints derived from this:**
- `next.config.ts` must set `output: 'export'` and `images.unoptimized: true` (GitHub Pages can't run Next's image optimizer)
- All routes must be statically pre-renderable — no dynamic API routes, no server-side rendering at request time
- For client-side routing to work on GitHub Pages, use a `404.html` fallback that redirects to `index.html` (standard SPA workaround) OR rely on Next.js trailing-slash handling
- Asset paths must work under the root domain (no `basePath` needed since this is at `corticalstack.ai`, not `corticalstack.github.io/repo`)
- Custom domain: ensure `public/CNAME` file contains exactly `corticalstack.ai`

---

## 5. Content sections (final structure)

The site is one scrollable page in the Devstarter style. Sections, in order:

### 5.1 Header / Nav
Sticky monospace nav: `corticalstack_` (or stylized) on the left. Links: `transmissions` `archives` `dossier` `comms`. Right side: small `cv.pdf` button styled as terminal output.

### 5.2 Hero
- Status pill at top: `// SYSTEM ONLINE` and a second pill like `// LOCATION: [city]` or `// STATUS: ENGAGED`
- Large primary headline (replaces Devstarter's `FULL STACK DEV_`):  
  Suggested: `CORTICAL STACK_` or `JP BOYD //` — keep the trailing underscore cursor effect.
- Subhead: short tagline — "Cyberware storage unit for academic projects, AI experiments, and field notes from the edge of practical machine learning." (Adapt JP's existing site tagline.)
- CTA buttons: `[ view transmissions ]` and `[ initiate contact ]`
- Below the headline: telemetry chips like `SYS.STATUS: NORMAL`, `UPTIME: <years since first post>`, `TRANSMISSIONS: <count>`, `ARCHIVES: 9`
- **Video layer:** subtle ambient hero video looping behind the typography at very low opacity (`opacity: 0.15` to `0.25`). Must not distract from text. Falls back to a static gradient if no video file present.

### 5.3 Selected Works (recent / professional)
Devstarter's "SELECTED WORKS" section, renamed if desired. 3–6 cards showcasing JP's recent work. Each card has:
- Image / video poster
- Title
- Tag chips (tech stack)
- Short description
- "LIVE" and "CODE" links (or whatever fits — some entries won't have a live link)
- **Hover behavior:** when a card is hovered (desktop only), a short Kling video clip plays muted in place of the static poster. On mouse leave, the video pauses and the poster returns.

### 5.4 Academic Archive
**This is a custom addition not in Devstarter.** It surfaces JP's 9 academic projects from his Masters program. Each entry is a "case file" card:
- Code prefix (`MT`, `ACI`, `CIO`, `ANN`, `AIP`, `DM`, `FL`, `MR`, `RM`) — these match the URL slugs from the existing site
- Full title
- One-line description
- Year (if known)
- Link to the existing detail page on the current site (e.g. `https://corticalstack.ai/mt`) for now, OR a placeholder for future migration

The 9 projects are:
- `MT` — Masters Thesis
- `ACI` — Applied Computational Intelligence
- `CIO` — Computational Intelligence Optimization
- `ANN` — Artificial Neural Networks
- `AIP` — Artificial Intelligence Programming
- `DM` — Data Mining
- `FL` — Fuzzy Logic
- `MR` — Mobile Robots
- `RM` — Research Methods

**Layout (default — confirm with user):** display all 9 in a compact grid with denser styling than Selected Works (smaller cards, less prose). User has not yet finalized whether these should be inline, collapsed by default, or moved to a separate `/archive` page — ask before implementing if unclear.

### 5.5 Tech Stack
Devstarter's existing skills grid. Replace the dummy categories with JP's actual stack — pull from his LinkedIn and recent blog post titles. Real categories likely:
- AI / ML: Python, PyTorch, LangChain, RAG, LLMs, AutoGen, vector DBs
- Cloud / Platform: Azure, AWS, Kubernetes, Terraform, Docker
- Data: SQL, Spark, dbt, data pipelines
- Tooling: VS Code, GitHub, Cline, Claude Code

JP should provide the canonical list; in the meantime, use placeholders and mark them as `TODO: confirm with JP`.

### 5.6 Transmissions (blog)
Lists recent blog posts. Each entry shows:
- Transmission ID (`> TRANSMISSION 0x0023`) — derive from post date
- Date and classification (tags)
- Title (links to full post)
- Excerpt (~2 lines)
- Read time

Below the list: `[ view all transmissions → ]` that links to `/transmissions` (full archive page).

Posts must be authorable as MDX files (see Section 7).

### 5.7 Dossier
Devstarter doesn't have this. It's a compact "about me" block, styled as a classified personnel file:
- Avatar (JP's photo, treated with a slight cyberpunk grayscale + cyan tint or kept clean — user preference)
- Name, current role, location
- 2–3 paragraph bio
- Resume download link

### 5.8 Initiate Contact
Devstarter's contact form. Wire it to **Formspree** (free tier, 50 submissions/month). User must create the Formspree form and provide the endpoint URL. Until then, use a placeholder `mailto:` fallback. Show the form's `SEND TRANSMISSION` button in terminal style.

Below the form, list direct links: GitHub, LinkedIn, email (use Cloudflare email obfuscation or a contact form — never expose the raw address in HTML).

### 5.9 Footer
Minimal. Monospace. Copyright, "build_v0.1.0" version tag, link to the GitHub repo, and a small `// end of transmission_` flourish.

---

## 6. Color & theming

**Default (until user confirms):** Cyan / electric blue accent on near-black background.

Specifically:
- Primary accent: `oklch(0.85 0.15 220)` — bright cyan
- Background: `oklch(0.08 0.01 240)` — near-black with cool tint
- Card background: `oklch(0.11 0.015 240)`
- Foreground text: `oklch(0.95 0 0)` — near-white
- Muted: `oklch(0.55 0.02 240)`
- Border: `oklch(0.20 0.02 240)`

**Reasoning:** the user originally expressed enthusiasm for the 2Advanced V3 aesthetic, which is navy/cyan with amber accents. Green is the Devstarter default but is overused in cyber portfolios. Cyan differentiates and matches the brand. Confirm with the user before locking — they have not explicitly confirmed cyan.

**Secondary accent (sparingly):** amber `oklch(0.78 0.16 70)` — use for warnings/critical-status pills, occasional highlights. Maximum one or two amber elements per section.

All colors must live in `app/globals.css` as CSS custom properties under `:root` and `.dark` selectors, in line with shadcn conventions. Light mode should still be styled but the site is dark-first — default theme is `dark`.

---

## 7. Blog post content pipeline

This is the major addition beyond Devstarter. JP has years of existing blog posts on the Jekyll site that need to migrate.

### 7.1 Posts as MDX
- Create `content/transmissions/` directory at repo root
- Each post is `content/transmissions/{slug}.mdx`
- Frontmatter format:
  ```yaml
  ---
  title: "Post title"
  date: "2025-03-12"
  excerpt: "One-sentence summary."
  tags: ["learning", "genai", "github"]
  readingTime: "5 min"  # auto-compute if missing
  classification: "TRANSMISSION"  # default; allow override
  ---
  ```
- Use `next-mdx-remote` or `@next/mdx` — whichever has cleaner Next.js 16 integration at time of building. Prefer `next-mdx-remote` for flexibility.

### 7.2 Routes
- `/transmissions` — full archive index (paginated if more than ~20 posts)
- `/transmissions/[slug]` — individual post page
- Both must be statically generated (`generateStaticParams`)

### 7.3 Post layout
- HUD chrome consistent with main site
- Monospace metadata header (`> TRANSMISSION 0x0023 // 2025.03.12 // CLASSIFICATION: LEARNING`)
- Title as large display text
- Body in a readable sans-serif (Space Grotesk) — monospace is for chrome, not body prose
- Code blocks: monospace with a subtle border, syntax highlighting via `rehype-pretty-code` or `shiki`
- Footer: "← return to transmissions" link

### 7.4 Migration
Initial content seed: copy 5–10 of JP's most recent posts from his existing Jekyll site as MDX files. Do not migrate all posts at once; start with the 4 visible on the current homepage:
- `2025-03-12-github-model-marketplace`
- `2025-02-28-leaving-nordcloud`
- `2024-12-30-power-pitfalls-coding-assistants`
- `2024-12-24-ai-agentic-tooling`

These can be fetched as Markdown source from the existing Jekyll repo if accessible. If not, the user will paste content directly into the chat for conversion.

---

## 8. Video layer

This is the second major addition beyond Devstarter. We're integrating Kling-generated cyberpunk video loops throughout the site.

### 8.1 Video sources
- **Hero ambient loop:** 1 file, ~8–15 seconds, looping seamlessly, used as low-opacity background
- **Project hover clips:** 3–6 files, one per project card in Selected Works, ~3–5 seconds each
- **Optional Phase 4:** scanline overlay, boot sequence — see Section 9

Videos do not exist yet. The build should work without them by gracefully falling back to static images / gradients. Add `<video>` elements with proper `onError` fallbacks.

### 8.2 Encoding requirements
All videos must be encoded for web delivery before upload to Bunny:

```bash
# Hero (subtle background, can be aggressive on compression since opacity is low)
ffmpeg -i input.mp4 -vcodec libx264 -crf 30 -preset slow \
  -vf "scale=1280:-2,fps=24" -an -movflags +faststart hero.mp4

# Hover previews (visible, but small frame)
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow \
  -vf "scale=800:-2,fps=24" -an -movflags +faststart preview.mp4
```

Target file sizes:
- Hero: 2–4 MB
- Hover previews: 400–900 KB each

Encode WebM (VP9) versions as well for broader browser support:
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 34 -b:v 0 \
  -vf "scale=1280:-2,fps=24" -an hero.webm
```

Use a `<video>` element with multiple `<source>` tags so the browser picks the best:
```jsx
<video autoPlay loop muted playsInline>
  <source src="https://cdn.corticalstack.ai/hero.webm" type="video/webm" />
  <source src="https://cdn.corticalstack.ai/hero.mp4" type="video/mp4" />
</video>
```

### 8.3 Hover-preview implementation
- Detect pointer capabilities — only enable hover videos on devices with `hover: hover` and `pointer: fine` media query
- On `mouseenter` with a small delay (~150ms) to avoid mis-fires when the cursor passes over: start playback
- On `mouseleave`: pause, reset to first frame, show poster image
- Always start muted, always set `playsInline`, always set `preload="metadata"` (not `auto`) to avoid pre-fetching large clips for cards the user never hovers
- Lazy-load: only set the `src` attribute when the card first scrolls into view (use `IntersectionObserver`)

### 8.4 Hosting
- Upload encoded videos to a Bunny Storage Zone
- Configure a Bunny Pull Zone in front of it
- Point custom domain `cdn.corticalstack.ai` at the pull zone (CNAME)
- All `<video>` `src` URLs use `https://cdn.corticalstack.ai/...`

The user manages the Bunny account and uploads. The codebase only references the public URLs.

---

## 9. Optional Phase 4 — "Cyber theatrics"

**These features are deferred until the user explicitly opts in.** Build Phases 1–3 first (see Section 11), ship, then ask.

- **Boot sequence:** ~3-second intro on first visit, skippable, stored in `localStorage` so returning visitors skip it. Sequence: black screen → typing `> initializing cortical stack...` → status checks listing → scanline sweep → fade into the main page
- **Matrix-rain canvas background:** subtle, low opacity, behind the entire page or only on the hero. Lift from the `useMatrixRain` hook pattern in the crypticsoulak writeup at https://medium.com/@crypticsoul.ak/declassified-the-blueprint-for-a-cypherpunk-portfolio-with-next-js-16-tailwind-v4-829ae8eaa222
- **Scanline overlay:** single fixed-position element, `repeating-linear-gradient` of horizontal lines at low opacity, `pointer-events: none`, mix-blend-mode `overlay`
- **Audio toggle:** ambient drone, default off, persists choice in `localStorage`. Requires explicit user click before any audio plays (browsers block autoplay audio)
- **View Transitions:** use the View Transitions API for inter-page navigation (transmissions → individual post). Falls back to instant navigation on browsers that don't support it.

Each is independent — they can be added one at a time later.

---

## 10. Things to definitely NOT do

These have all come up in the planning conversation and been ruled out:

- ❌ Do not migrate the existing Jekyll site — it is being replaced wholesale
- ❌ Do not use DatoCMS, Contentful, or any external CMS — content lives in the repo
- ❌ Do not use Rive — user has explicitly opted out
- ❌ Do not use Create React App / `react-scripts` — Devstarter is correctly on Next.js
- ❌ Do not introduce Astro, SvelteKit, or any other framework — stack is locked
- ❌ Do not host videos in the GitHub Pages repo — they go on Bunny
- ❌ Do not introduce a backend / database / API server — pure static export
- ❌ Do not commit `node_modules/` to the repo (the template's prior fork did — do not repeat)
- ❌ Do not commit raw uncompressed Kling outputs to the repo — only encoded web-ready files, and ideally not even those (CDN handles them)
- ❌ Do not use neon green as the accent (user wants to differentiate from generic cyber portfolios) — see Section 6 for cyan default
- ❌ Do not auto-play audio on page load — gate behind explicit user click
- ❌ Do not implement a "Who's Watching?" profile picker — user dropped this from the earlier Netflix-template direction
- ❌ Do not implement the pure 2Advanced single-page console layout — user accepted the scrolling-page architecture for content reasons

---

## 11. Build phases & priority order

Build incrementally. Ship at the end of each phase to GitHub Pages so the user can react to a real deployed site, not local previews.

### Phase 1 — Foundation (target: 1 session)
1. Fork `zippystarter/template-devstarter` into a new local clone
2. Install with `pnpm install`
3. Verify `pnpm dev` runs cleanly on port 3000
4. Configure `next.config.ts` for static export to GitHub Pages
5. Add `public/CNAME` containing `corticalstack.ai`
6. Create GitHub Actions workflow `.github/workflows/deploy.yml` for static deploy
7. Replace all "Marcus Chen" / template demo content with real JP content (placeholder text fine for sections we haven't gathered)
8. Swap color palette from neon green to cyan (Section 6)
9. First deploy — verify site is live at `corticalstack.ai`

### Phase 2 — Content structure (target: 1 session)
1. Set up MDX pipeline (`next-mdx-remote`, `gray-matter`, `rehype-pretty-code`)
2. Create `content/transmissions/` with the 4 seed posts
3. Implement `/transmissions` archive route
4. Implement `/transmissions/[slug]` individual post route
5. Wire the homepage Transmissions section to read from the MDX collection
6. Add the Academic Archive section (Section 5.4)
7. Add the Dossier section (Section 5.7)
8. Deploy and verify all routes work on GitHub Pages with the SPA-style 404 fallback

### Phase 3 — Video integration (target: 1 session)
1. Create reusable `<HoverVideo>` component (Section 8.3)
2. Wire up the hero video element with fallback gradient
3. Wire up Selected Works cards to use `<HoverVideo>`
4. Add `IntersectionObserver`-based lazy loading
5. Add the `hover: hover` and `pointer: fine` media query guards
6. Test on mobile to verify the fallback static images work correctly
7. Coordinate with user to upload encoded clips to Bunny and provide URLs

### Phase 4 — Cyber theatrics (deferred, see Section 9)
Only after Phase 3 ships and user opts in.

### Phase 5 — Polish & ongoing
- Lighthouse audit, fix obvious perf issues
- SEO metadata (`generateMetadata` on every route)
- Open Graph images (can be generated with `@vercel/og`-style approach but at build time since we're static)
- Sitemap
- RSS feed for transmissions

---

## 12. Decisions still open (resolve early in the session)

Confirm these with the user before starting Phase 1, or use the noted defaults and flag them clearly:

1. **Phasing approach:** ship-and-iterate recommended (the phases above assume this). Confirm.
2. **Academic Archive layout:** inline grid / collapsed by default / separate page? Default is **inline grid**.
3. **Phase 4 cyber theatrics:** committed up-front, decide later, or skip entirely? Default is **decide later**.
4. **Color palette:** default is **cyan**. User has expressed openness to seeing options. Show 2–3 OKLCH-based palettes (cyan, amber, magenta) as a comparison if they ask.
5. **Resume PDF location:** currently lives in the old Jekyll repo. Confirm where the new build should fetch / host it.
6. **Domain transition:** the new repo target is `corticalstack/corticalstack.github.io`, which is currently the Jekyll site. Confirm the cutover plan — staging on a `gh-pages` branch first, or branch-replace `main` when ready.
7. **Bunny account:** user needs to create the Bunny storage zone + pull zone and configure `cdn.corticalstack.ai`. Confirm this is done before Phase 3.

---

## 13. Coding conventions

- **TypeScript strict mode**, no `any` unless genuinely unavoidable and commented
- **Functional React components only**, no class components
- **Server Components by default** in App Router, mark `'use client'` only when needed (any interactivity, hooks, browser APIs)
- **shadcn components** live in `components/ui/` — modify freely, they're owned source
- **Custom components** live in `components/` at the top level, organized by section (`components/hero/`, `components/transmissions/`, etc.) once there are more than ~5 in a section
- **Hooks** live in `hooks/`
- **Utilities** live in `lib/`
- **Content** lives in `content/`
- **Tailwind classes** sorted via the `prettier-plugin-tailwindcss` plugin (add it)
- **No inline styles** unless dynamically computed
- **Co-locate types** with the components that use them; shared types live in `types/`
- **Imports:** use `@/` path alias (already configured in template)

---

## 14. Source context (for the AI assistant)

If working in Claude Code or similar, useful starting points:

- The current Jekyll site (visible content): https://corticalstack.ai/
- JP's GitHub profile: https://github.com/corticalstack
- The Devstarter live demo (visual reference for the base template): https://devstarter-demo.vercel.app
- The Devstarter source (forking target): https://github.com/zippystarter/template-devstarter
- The 2Advanced V3 reboot (aesthetic inspiration, not implementation reference): https://v3.2advanced.com/v3expansionsreboot/
- The crypticsoulak writeup (architectural reference for cyber theatrics if Phase 4): https://medium.com/@crypticsoul.ak/declassified-the-blueprint-for-a-cypherpunk-portfolio-with-next-js-16-tailwind-v4-829ae8eaa222

Always read the latest Next.js and Tailwind v4 docs before making architectural decisions — the field moves fast and pretrained knowledge may be stale.

---

## 15. Tone for AI-generated content (when filling placeholders)

If asked to generate placeholder copy for sections before the user provides real text, match this voice:

- Brief, direct, slightly clinical
- Cortical Stack / Altered Carbon flavor where it fits naturally — do not force it
- No marketing language ("innovative solutions", "passionate about", "I love")
- No emoji
- Use monospace styling for status, timestamps, IDs, classifications

Examples of the right voice:

> Cyberware storage unit for academic projects, AI experiments, and field notes from the edge of practical machine learning.

> // SYSTEM ONLINE — TRANSMITTING FROM [LOCATION]

> // TRANSMISSION 0x0023 // 2025.03.12 // CLASSIFICATION: LEARNING

Examples of what to avoid:

> 👋 Hey there! I'm JP and I'm super passionate about building cutting-edge AI solutions! 🚀

---

## 16. End of specification

This document represents agreed scope as of the planning session. Anything not in this document is out of scope for the initial build.

When in doubt, ask the user before implementing. When making a default-vs-confirm call, lean toward the default in Section 12 and flag it clearly in chat so they can correct.
