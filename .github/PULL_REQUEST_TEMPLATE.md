<!--
Target `development` (the integration branch). The pipeline/Netlify preview
tests this PR. `development → main` releases are a separate, maintainer-approved
PR. See CONTRIBUTING.md.
-->

## Summary
What does this PR change, in one or two sentences?

Closes #

## Type
- [ ] Feature
- [ ] Bug fix
- [ ] Design / styling
- [ ] Docs
- [ ] Chore / refactor

## How it works / why
The important decisions, anything reviewers should look at closely, and any
DB (`src/db/db.sql`) or Google-Sheets setup needed.

## Testing
- [ ] `npx eslint .` passes (no new errors)
- [ ] `npm run build` passes
- [ ] Checked on desktop **and** mobile

## Screenshots (for UI changes)
Before → after.

## Checklist
- [ ] One logical change per branch; branch is up to date with `development`
- [ ] No raw `blue-*` / `indigo-*` / `purple-*` on public pages (maroon + creme only)
- [ ] Reused existing components/fonts; matches the full-viewport "parts" rhythm
- [ ] New env vars documented in README + `.env.example`
- [ ] `db.sql` matches any schema changes applied to Neon
- [ ] Did not touch auth / form-submission code without flagging it
