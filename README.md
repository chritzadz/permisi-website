# PERMISI HK Website

The public website of **PERMISI** — the Indonesian Students' Association at
City University of Hong Kong. It’s a marketing site (home, about, events,
student resources) plus a small internal admin: a dynamic form builder that
pipes submissions into Google Sheets, an events manager, and a member roster.

- Live site: https://permisi.hk
- Admin panel: https://permisi.hk/admin/login
- Tech plan & design overview (Google Drive): https://drive.google.com/file/d/1U85cXvm4qDLxFtcrD762akIh3IRk5Fom/view

## Contents

- [Stack](#stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [Database](#database)
- [Design system](#design-system)
- [Workflow](#workflow)
- [Contributing & AI agents](#contributing--ai-agents)

## Stack

| Concern        | Choice                                                    |
| -------------- | --------------------------------------------------------- |
| Framework      | Next.js 16 (App Router) + React 19 + TypeScript           |
| Styling        | Tailwind CSS v4 (theme tokens in `src/app/globals.css`)   |
| Animation      | GSAP (`gsap`, `@gsap/react`, ScrollTrigger/ScrollSmoother), `motion` |
| UI primitives  | shadcn-style components in `src/components/ui/`           |
| Icons          | `lucide-react`                                            |
| Data           | Neon Postgres via `pg` · Google Sheets API                |
| Auth           | JWT `admin-token` session cookie (protects all admin/UI API mutations) |
| Deploy         | Netlify (`@netlify/plugin-nextjs`)                         |

## Getting started

```bash
# 1. install deps (Node 18+ recommended; repo also carries bun/deno lockfiles)
npm install

# 2. copy the example env file and fill in real values (see table below)
cp .env.example .env.local

# 3. (optional) verify DB connectivity
npx tsx scripts/test-db-connection.ts

# 4. run
npm run dev        # http://localhost:3000  (home at /home)
```

Create a form / event / member in the admin and the public pages populate from
the same DB — there is no seed data.

## Environment variables

Put these in `.env.local` (git-ignored). `NEXT_PUBLIC_*` are exposed to the
browser; everything else stays server-side.

| Variable                     | Used for                                             |
| ---------------------------- | ---------------------------------------------------- |
| `NETLIFY_DATABASE_URL` / `DATABASE_URL` | Postgres connection string (first one wins) |
| `ADMIN_USERNAME`             | Admin login username                                 |
| `ADMIN_PASSWORD`             | Admin login password                                 |
| `JWT_SECRET`                 | Signs/verifies the `admin-token` session cookie — **required in production** (admin auth fails closed without it; a dev-only fallback exists) |
| `GOOGLE_PRIVATE_KEY_ID`      | Service-account key id                               |
| `GOOGLE_PRIVATE_KEY`         | Service-account private key (`\n`-escaped)           |
| `GOOGLE_CLIENT_EMAIL`        | Service-account email — **share each target Sheet with it** |
| `GOOGLE_CLIENT_ID`           | Service-account client id                            |
| `GOOGLE_CLIENT_X509_CERT_URL`| Service-account cert url                             |

> Without `ADMIN_USERNAME`/`ADMIN_PASSWORD` the login returns
> “Admin credentials not configured”. Without a shared Sheet the submit
> endpoint logs a hint naming the service-account email to add as a collaborator.

## Scripts

| Command          | What it does                                             |
| ---------------- | -------------------------------------------------------- |
| `npm run dev`    | Dev server (Turbopack)                                   |
| `npm run build`  | Production build — **this also runs the TypeScript check** |
| `npm start`      | Serve the built app                                      |
| `npx eslint .`   | Lint. ⚠️ `next lint` was removed in Next 16, so `npm run lint` errors out — use eslint directly |

Verify with **`npx eslint .` + `npm run build`** before opening a PR.

## Project structure

```
src/app/                     routes (App Router)
  home/ about-us/ events/ resources/    public pages
  form/[formName]/ formThankyou/        public dynamic form + confirmation
  admin/                     JWT-guarded admin panel
    home/ form/ event/ member/update/ login/
  api/                       route handlers (see Architecture)
  layout.tsx globals.css

src/components/              shared UI: navbar, footer, hero, aboutUsV2,
  activityGallery, boardMembers, eventCard, formBox, eventBox,
  scrollReveal, loadingSpinner, modals/, ui/ (button, card)
src/lib/                     font.ts, utils (cn), apiFetch, apiAuth
src/{model,repository,service,controller,factory,db}/   backend layers
public/assets/  public/files/  images + downloadable PDFs
```

## Architecture

Each backend feature is split into a **model → repository → service → API
route**, with a factory choosing the right React component by type.

```
browser ── fetch ──▶ /api/<x> route ──▶ Service ──▶ Repository ──▶ pg Pool (Neon)
```

### Dynamic forms → Google Sheets

1. Admin builds a form: `forms` (+ `form_inputs` rows, + `form_input_options`
   for multiple-choice). A form is `OPEN` or `CLOSED`.
2. Public page `/form/[formName]` reads structure via `GET /api/forms?name=`,
   `GET /api/formInputs?formid=`, `GET /api/options?forminputid=`. A `CLOSED`
   form shows a “closed” notice and hides the questions.
3. Submit posts `{ answers, formName }` to `POST /api/sheets`, which validates
   the form is `OPEN`, orders answers by `form_inputs.id`, and appends a row to
   the form’s Google Sheet (`values.append`, `Sheet1`).

### Events ⇄ forms

`events` and `forms` are independent tables; an event may optionally link one
form via `forms.event_id → events.id`. The admin **Events** page owns the link
(the form’s event select only lists unlinked forms), and it also mirrors a route
into `events.form_link` so the public event page can deep-link the registration.

### Auth

- **Admin UI**: `POST /api/admin/auth` sets an `HttpOnly` `admin-token` JWT
  cookie; `adminLoginGuard` + `/api/admin/validate` gate every `/admin/*` route
  (bare `/admin` redirects to login).
- **Mutating API routes**: must carry the `admin-token` session cookie set at
  `/admin/login`, verified with `JWT_SECRET` and checked for `role: "admin"`
  (`requireAdminSession` in `src/lib/apiAuth.ts`), plus a same-origin
  `Origin`/`Referer` check as CSRF defense. On a `401` the admin client
  (`apiFetch`) redirects to `/admin/login`. Reads
  (`GET /api/events|forms|formInputs|options|members`) and form submissions
  (`POST /api/sheets`) stay public.

## Database

- Schema lives in [`src/db/db.sql`](src/db/db.sql) and mirrors the live Neon
  schema. Tables: `forms`, `form_inputs`, `form_input_options`, `events`,
  `members`.
- Gotchas encoded there:
  - `events.id` is `GENERATED ALWAYS AS IDENTITY` — never supply it on insert.
  - `members` has a composite `PRIMARY KEY (name, role)` and no `id`/`photo_url`;
    deletes key off `name` + `role`, avatars are placeholders.
  - `forms.status` is `OPEN`/`CLOSED` (new forms default to `CLOSED`);
    `forms.event_id` is the optional link to `events`.
  - `forms.question_count` / `linked_event` and `events.linked_form` are computed
    in SQL, not stored.

## Design system

- **Palette is maroon + creme; blue is forbidden on public pages.** Tokens live
  in `src/app/globals.css` (`--color-normal-maroon: #831515`,
  `--color-dark-maroon: #670a0a`, `--color-normal-creme: #f8f2e5`,
  `--color-dark-creme: #e6dccf`). Use `text-normal-maroon`, `bg-normal-creme`,
  `border-normal-maroon/15`, etc. — never raw `blue-*`/`indigo-*`/`purple-*`.
  JS colors (e.g. spinner `color`) use the hexes.
- **Type**: `DisplayBebasNeue` (Bebas Neue) for large display numbers/headings,
  `MainInter` for body, `Cantonese` where needed — all via `src/lib/font.ts`.
- **Language**: abstract/editorial, not “cards in boxes”. Big display numerals,
  thin maroon rules, generous whitespace; full-viewport “parts” with scroll
  reveals (`ScrollReveal`, GSAP) and `LoadingSpinner` (maroon ring) for loading.
- Reuse home-page components (`Navbar`, `Footer`, `ScrollReveal`, `Button`,
  `EventCard`, `FormBox`/`EventBox`, the modals) before inventing new styles.

## Workflow

`feature/… → development` (PR, Netlify pipeline) `→ main` (PR, **requires
maintainer approval**). Never commit straight to `main`/`development`, never
force-push or auto-push. Branch from the newest `development`, one branch per
feature/fix, and start with a GitHub issue. Full details, conventions and the
PR checklist are in [CONTRIBUTING.md](CONTRIBUTING.md).

```
development ──(merge)──▶ main        gated: every PR links an issue,
                                      every dev→main PR needs approval
```

## Contributing & AI agents

- Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, conventions, issue/PR
  templates (in `.github/`), and the verification checklist.
- AI agents / assistants working in this repo should follow
  [AGENTS.md](AGENTS.md) — it encodes the commands, stack, structure, design
  rules, and git workflow above in machine-friendly form.

---

© PERMISI HK · Built with Next.js on Netlify
