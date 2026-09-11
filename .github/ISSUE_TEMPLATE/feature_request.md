---
name: "✨ Feature request"
about: Propose something new to build (page, admin capability, content, API)
title: "[feature] "
labels: ["enhancement"]
assignees: []
---

<!-- Propose the feature relative to the current `development` branch. -->

## Problem or goal
What’s the user, member, or admin trying to do — and what’s missing today?
A concrete story beats a vague idea ("admins want to publish an event without
touching code" > "better admin").

## Proposed solution
How you’d like it to work. Roughly sketch the flow, screens, or admin steps.

## Alternatives considered
Other ways to solve it, and why the proposal above is preferable.

## Scope (tick any)
- [ ] Public page (home / about / events / resources / form)
- [ ] Admin panel (form builder / events / members / dashboard)
- [ ] API + database (`src/{model,repository,service}` + `/api/*` + `db.sql`)
- [ ] Design / animation (`ScrollReveal`, `LoadingSpinner`, palette)
- [ ] Google Sheets integration

## Design constraints (tick to confirm you’ve read them)
- [ ] Maroon + creme only — **no blue/indigo/purple** on public pages
- [ ] Reuse existing components & fonts (`DisplayBebasNeue`, `MainInter`,
      `Button`, `EventCard`, `FormBox`/`EventBox`, the modals)
- [ ] Full-viewport "parts" with scroll reveals, matching the home rhythm

## Acceptance criteria
- [ ] …
- [ ] `npx eslint .` and `npm run build` pass
- [ ] Works on desktop and mobile

## Additional context
Links, mockups, related issues/PRs, deadlines (e.g. "before orientation week").
