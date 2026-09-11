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

- Brand tokens (Tailwind v4 `@theme` in `globals.css`): `text-normal-maroon` (#831515), `bg-normal-maroon`, `text-dark-maroon` (#670a0a), `text-normal-creme` (#f8f2e5). Prefer these over raw `red-*`/`blue-*` classes.
- Fonts via `src/lib/font.ts`: `MainInter` (body), `DisplayBebasNeue` (big display), `Cantonese`. Import classes like `${DisplayBebasNeue.className}`.
- Page pattern for content pages (see `about-us/page.tsx`, `resources/page.tsx`):
  - `"use client"` components, wrap content in `<div className="relative min-h-screen">`, `<section className="py-8 sm:py-12 md:py-16 lg:py-20">`, `<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">`.
  - `<Footer />` at end of the page; `Navbar` comes from the route-level `layout.tsx` (`#smooth-wrapper`/`#smooth-content` divs for GSAP ScrollSmoother).
  - H1: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6`.
  - Cards: use `Card`/`CardHeader`/`CardTitle`/`CardContent` from `@/components/ui/card`.
  - Buttons: `@/components/ui/button` (onClick-based, maroon/creme). For plain external links, style anchors with the same classes (`bg-normal-maroon hover:bg-dark-maroon text-normal-creme rounded-sm font-bold px-4 py-2`).
  - Icons: `lucide-react`.
- Reuse components already used on the home page (`Footer`, `Card`, `Button`, fonts, maroon theme) instead of inventing new styles.

## Content source

- Page copy lives in `PERMISI Website Content.pdf` (repo root). Google Docs export with subset fonts — if text extraction is needed again, decode via the embedded ToUnicode CMaps (bytes shifted +29).
- Facts: PERMISI founded 2016, 300+ members in AY 2025/2026, part of PPI HK. Contact: permisi.hk@gmail.com.

## Git workflow

- **Never work directly on `main` or `development`.** Every change gets its own feature branch named `feature/<short-change>` created from the branch it builds on (content/design work currently stacks on `feature/resource-page-design`).
- PR flow: `feature/* → development` (pipeline testing), then `development → main` — the dev→main PR **must be approved by a maintainer** before merging. Do not merge to `main` yourself.
- Commit messages: short, lowercase, imperative-ish (e.g. "add history and style about-us page"). No secrets in commits; `.env.local` is gitignored.
- `gh` CLI is not installed; after `git push -u origin <branch>`, GitHub prints a compare URL — share it to open the PR.
