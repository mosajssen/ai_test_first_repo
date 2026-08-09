# Plan: Wire DEMO_USER_EMAIL / DEMO_USER_PASSWORD secrets into CI workflow

## Goal

Update `.github/workflows/e2e-tests.yml` so the `playwright-tests` job passes
the new `DEMO_USER_EMAIL` and `DEMO_USER_PASSWORD` GitHub **secrets** into the
`Run Playwright tests` step, matching how `BASE_URL` is already wired via
`vars.BASE_URL`.

## Assumptions and Open Questions

- Assumption: "new SECRET variables" refers to GitHub Actions **secrets**
  (`secrets.DEMO_USER_EMAIL` / `secrets.DEMO_USER_PASSWORD`), not repository
  **variables** (`vars.*`) — consistent with these being credentials, unlike
  `BASE_URL` which is a plain vars entry.
- Assumption: these secrets are defined at the `dev` Environment level (job
  already declares `environment: dev`), same place `vars.BASE_URL` lives.
- Open question: should they be added only to the `Run Playwright tests` step,
  or job-level `env`? Decision: step-level `env`, matching existing `BASE_URL`
  pattern (only that step needs them).
- Not in scope: `EMPTY_USER_*` / `NEW_USER_PASSWORD` secrets — user only asked
  for `DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD`.

## Risks and Constraints

- Risk: if the secrets aren't actually configured in the `dev` GitHub
  Environment yet, `process.env.DEMO_USER_EMAIL!`/`PASSWORD!` in
  `src/models/User.ts` will be `undefined` at runtime in CI and tests relying
  on the demo user will fail with a non-obvious error. User must add these to
  Settings → Environments → dev → Secrets.
- Constraint: keep the change minimal — only add the two secrets to the
  workflow, don't restructure other steps.

## Planned Steps

1. Confirm how `DEMO_USER_EMAIL`/`DEMO_USER_PASSWORD` are consumed in the repo
   (`src/models/User.ts`, `.env.example`).
2. Add `DEMO_USER_EMAIL: ${{ secrets.DEMO_USER_EMAIL }}` and
   `DEMO_USER_PASSWORD: ${{ secrets.DEMO_USER_PASSWORD }}` to the env of the
   "Run Playwright tests" step.
3. Validate YAML structure by reading the file back.
4. Run the full local test suite (`npx playwright test`) to confirm no
   regression (secrets aren't needed locally since `.env` supplies them).

## Progress and Findings

- Step 1 complete: `src/models/User.ts` reads
  `process.env.DEMO_USER_EMAIL!` / `process.env.DEMO_USER_PASSWORD!` for the
  demo user factory; `.env.example` documents the same names.
- Step 2 complete: added `DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD` (sourced
  from `secrets.*`) to the `Run Playwright tests` step env, alongside the
  existing `BASE_URL: ${{ vars.BASE_URL }}`.
- Step 3 complete: read the workflow file back, YAML structure is valid.
- Step 4 complete: `npx playwright test` — 12 passed (this is a CI-only
  change, so the local run confirms no unrelated regression, not the new
  secrets wiring itself).

## Status

Completed — pending user confirmation that `DEMO_USER_EMAIL` /
`DEMO_USER_PASSWORD` are configured as **secrets** in the `dev` GitHub
Environment (Settings → Environments → dev → Environment secrets).
