# Contributing to the PERMISI Website

Thanks for helping! This guide is how we go from an idea to something live on
https://permisi.hk. Reading it once end-to-end will save you a review round-trip.

## Code of conduct

Be kind, be constructive. This is a student community project.

## Before you start

1. **Install** — see [README](README.md#getting-started) for `npm install`,
   `.env.local`, and how to run `npm run dev`.
2. **Pick or file an issue first.** Everything we build starts as a GitHub
   issue. If none exists, open one using the
   [bug](.github/ISSUE_TEMPLATE/bug_report.md) or
   [feature](.github/ISSUE_TEMPLATE/feature_request.md) template and describe
   it from the angle of `development` (our integration branch), not `main`.
   A maintainer will triage/assign before you start coding.
3. **Branch from the newest `development`:**

   ```bash
   git checkout development
   git pull
   git checkout -b feature/short-slug     # or fix/short-slug, docs/…, chore/…
   ```

   One branch per feature/fix; stack multiple commits on it. Don’t create a
   new branch per change or per commit.

## Making changes

- **TypeScript + ESLint must stay clean.** `next lint` was removed in Next 16,
  so lint with `npx eslint .` (or on touched paths).
- **Design rules are binding** (summarised here, full version in `AGENTS.md`):
  - Maroon + creme only — **no `blue-*`/`indigo-*`/`purple-*` classes** on
    public pages or shared components. Use the `@theme` tokens
    (`text-normal-maroon`, `bg-normal-creme`, `border-normal-maroon/15`, …).
    JS-side colors use the hex values from the README palette table.
  - Big `DisplayBebasNeue` display numbers/headings, thin maroon rules,
    generous whitespace. Full-viewport “parts” with `ScrollReveal`; the
    `LoadingSpinner` (maroon ring) for loading states.
  - Reuse existing components (`Navbar`, `Footer`, `ScrollReveal`, `Button`,
    `EventCard`, `FormBox`/`EventBox`, the modals) before adding new styles.
  - Fonts come from `src/lib/font.ts`; images from `public/assets` (kebab-case).
- **Backend follows the layering**: `model → repository → service → api route`.
  Put SQL in a repository, validation in the route, never talk to `pg` from a
  component. New `src/db/db.sql` changes must match what’s applied on Neon.
- Keep the form/admin flows honest: new forms are `CLOSED` by default, event →
  form links are managed from the admin Events page, and public reads stay
  public while mutations keep the `x-api-key` check.

### Things to avoid

- Don’t edit `node_modules`, `.next`, or `.netlify`.
- Don’t commit secrets — `.env*`, service-account JSON, etc. are git-ignored.
- Don’t work directly on `main` or `development`.
- Don’t touch the form-submission (`/api/sheets`) or auth code casually; they
  have security implications (see the “Known limitation” note in the README).

## Verifying before you open a PR

```bash
npx eslint .      # no new errors
npm run build     # this is the TypeScript + production check
```

Then click through the affected pages on desktop **and mobile**:
public pages (`/home`, `/about-us`, `/events`, `/resources`, a live `/form/…`),
and, if relevant, the admin (`/admin/form`, `/admin/event`,
`/admin/member/update`).

## Commit & PR conventions

- **Commits**: short, lowercase, imperative-ish
  (e.g. `add form status option with closed default`, `fix who are we mobile
  overflow`). No secrets in messages.
- **Branch naming**: `feature/<slug>`, `fix/<slug>`, `docs/<slug>`,
  `chore/<slug>`. Keep it descriptive but short.
- **The PR** targets `development` and uses the
  [template](.github/PULL_REQUEST_TEMPLATE.md). Link its issue with
  `Closes #<number>`. Include before/after screenshots for UI work.
- Commit locally and **let the repo owner push** if you don’t have write access
  — never force-push `main`/`development`.

### Merge flow

```
feature/…  ──PR──▶  development        (Netlify deploy preview = pipeline test)
development ──PR──▶ main                (requires a maintainer APPROVAL)
```

Only a maintainer merges `development → main`. If you’re unsure who that is,
ask in the issue thread.

## Feature / issue lifecycle

1. Open an issue (bug or feature) — describe it from `development`.
2. A maintainer triages, labels (`bug` / `enhancement` / `good first issue` /
   `design`), and assigns.
3. Branch from `development`, build, verify (lint + build + manual QA).
4. Open a PR to `development` that references the issue; address review
   feedback; get it approved and merged.
5. It ships to `main` on the next approved `development → main` release.

## Getting help

Open a `question`-style discussion or comment on the relevant issue. For
anything touching admin auth, member data, or the Google Sheets integration,
ping a maintainer before writing code.

---

This file lives alongside [AGENTS.md](AGENTS.md) (the same rules, tuned for AI
assistants). When in doubt, follow both.
