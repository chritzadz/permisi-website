# PERMISI Website — Agent Guide

Indonesian Students Association (PERMISI) website for City University of Hong Kong.
Repo: `chritzadz/permisi-website` — Next.js App Router, deployed on Netlify.

## Commands

```bash
npm run dev      # local dev server (Turbopack)
npm run build    # production build
npm run lint     # next lint
npm run start    # serve production build
```

Verify with `npm run lint` and `npm run build` before committing.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (configured in `src/app/globals.css` via `@theme` tokens — no tailwind.config)
- GSAP (`gsap`, `@gsap/react`) for animations, `motion` also available
- shadcn-style primitives in `src/components/ui/` (`card.tsx`, `button.tsx`)
- `lucide-react` icons, `react-spinners` loaders
- Neon Postgres (`src/db`), Google Sheets API (`src/service`), JWT admin auth

## Structure

```
src/app/            routes (App Router)
  home/             landing page — Hero, AboutUs, Latest Events, reveal Footer
  about-us/         About Us content page
  events/           events list + [id] detail (fetch /api/events)
  resources/        student guide content page
  form*/            public + admin forms (Google-Sheets driven) — do not touch for content work
  admin/            JWT-protected admin panel
  api/              route handlers
src/components/     shared UI (navbar, footer, hero, aboutUs, eventCard, modals, ui/)
src/lib/            font.ts, utils (cn), api helpers
src/{controller,service,repository,model,factory}/  layered backend code
public/assets/      images (kebab-case names)
public/files/      downloadable PDFs served statically
```

## Design conventions

### Color palette

The brand palette is **maroon + creme**. Blue is forbidden on public pages — never use
`blue-*`, `indigo-*`, `purple-*` or raw `red-*` Tailwind classes in `src/app/{home,about-us,events,resources}`
or the shared components they use (navbar, footer, hero, aboutUs, eventCard, ui/*).
Use the `normal-maroon`/`dark-maroon` tokens instead (the footer's `bg-red-900` is legacy —
don't add new raw `red-*`; migrate it if you touch the footer).
Admin pages follow the same palette: maroon/creme tokens throughout, with `dark-maroon`
for destructive actions (no red/blue semantics). JS-side colors (e.g. `react-spinners`
`color` props) must use the hex values below.

| Token              | Hex       | Usage                                              |
| ------------------ | --------- | -------------------------------------------------- |
| `normal-maroon`    | `#831515` | Primary brand: headings, icons, buttons, active states, loaders |
| `dark-maroon`      | `#670a0a` | Hover/gradient end, strong accents                 |
| `normal-creme`     | `#f8f2e5` | Light backgrounds, text on maroon surfaces         |
| `dark-creme`       | `#e6dccf` | Secondary light surfaces                           |
| `gray-500`–`900`   | —         | Neutral body text                                  |
| `white`            | —         | Page background                                    |

Tailwind v4 `@theme` tokens in `globals.css`: `text-normal-maroon`, `bg-normal-maroon`,
`text-dark-maroon`/`hover:bg-dark-maroon`, `text-normal-creme`, `bg-normal-creme`, plus
opacity variants like `border-normal-maroon/15`.

### Other conventions

- Design language: abstract/editorial, not "cards in boxes". Big `DisplayBebasNeue` display
  numbers and headings with thin `border-normal-maroon/15` rules and generous whitespace.
  Avoid boxed card grids on content pages; reserve `Card` for real data (events).
  Public/home sections are full-viewport "parts": each `section` is `min-h-screen` with
  GSAP scroll-reveals (`ScrollReveal`) filling one screen before the next — no short
  fixed-padding bands between them. Content-page intros use `min-h-[88vh]` centered
  Bebas title + rule + bouncing `ChevronDown` scroll cue.
- Fonts via `src/lib/font.ts`: `MainInter` (body), `DisplayBebasNeue` (big display), `Cantonese`. Import classes like `${DisplayBebasNeue.className}`.
- Page pattern for content pages (see `about-us/page.tsx`, `resources/page.tsx`):
  - `"use client"` components, wrap content in `<div className="relative min-h-screen">`, `<section className="py-8 sm:py-12 md:py-16 lg:py-20">`, `<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">`.
  - `<Footer />` at end of the page; `Navbar` comes from the route-level `layout.tsx` (`#smooth-wrapper`/`#smooth-content` divs for GSAP ScrollSmoother).
  - Scroll reveals via the shared `ScrollReveal` component (`src/components/scrollReveal.tsx`) — GSAP fade-up on `ScrollTrigger`, like the home `AboutUs` section.
  - H1: `${DisplayBebasNeue.className}` maroon, sized `text-5xl`–`text-9xl` responsive.
  - Buttons: `@/components/ui/button` (onClick-based, maroon/creme). For plain external links, style anchors with the same classes (`bg-normal-maroon hover:bg-dark-maroon text-normal-creme rounded-sm font-bold px-4 py-2`).
  - Icons: `lucide-react`.
- Reuse components already used on the home page (`Footer`, `Navbar`, `Button`, `ScrollReveal`, fonts, maroon theme) instead of inventing new styles.

## Content source

- Page copy lives in `PERMISI Website Content.pdf` (repo root). Google Docs export with subset fonts — if text extraction is needed again, decode via the embedded ToUnicode CMaps (bytes shifted +29).
- Facts: PERMISI founded 2016, 300+ members in AY 2025/2026, part of PPI HK. Contact: permisi.hk@gmail.com.

## Git workflow

- **Never work directly on `main` or `development`.** Use **one feature branch per feature**
  (`feature/<short-name>`) and stack multiple commits on it — do not create a new branch per
  change or per commit. All home/content design work lives on `feature/home-design-overhaul`.
- **Never push automatically.** The user pushes branches themselves. Touching the remote
  (e.g. `git push origin --delete <branch>`) only when explicitly asked.
- PR flow: `feature/* → development` (pipeline testing), then `development → main` — the dev→main PR **must be approved by a maintainer** before merging. Do not merge to `main` yourself.
- Commit messages: short, lowercase, imperative-ish (e.g. "add history and style about-us page"). No secrets in commits; `.env.local` is gitignored.
- `gh` CLI is not installed; after the user pushes, GitHub prints a compare URL — share it to open the PR.
