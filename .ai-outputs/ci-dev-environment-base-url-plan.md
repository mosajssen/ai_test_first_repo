# Plan: Use GitHub "dev" Environment BASE_URL variable in CI pipeline

## Goal

Update `.github/workflows/e2e-tests.yml` so the pipeline uses the `BASE_URL`
variable defined in the newly added GitHub "dev" environment, instead of
relying on hardcoded `localhost:3000` references / a local `.env` file
(which does not exist on the CI runner).

## Assumptions and Open Questions

- Assumption: "dev environment" refers to a GitHub Actions **Environment**
  named `dev` (Settings → Environments), and "variable" refers to an
  **Environment variable** (accessible via `vars.BASE_URL` when the job
  declares `environment: dev`).
- Assumption: The `dev` environment's `BASE_URL` value matches what the
  `rolnopol` service exposes on the runner (`http://localhost:3000`), since
  the service is spun up as a Docker service in the same job.
- `playwright.config.ts` already fails fast if `process.env.BASE_URL` is
  unset, so CI currently has no working BASE_URL source — this change fixes
  that gap.

## Risks and Constraints

- Risk: If `dev` environment requires approval/reviewers, it could block PR
  runs. Assume no protection rules unless told otherwise.
- Constraint: Keep changes minimal — only wire up `BASE_URL`, don't restructure
  the workflow otherwise.

## Planned Steps

1. Review `.github/workflows/e2e-tests.yml` and `playwright.config.ts` to
   confirm where `BASE_URL` is consumed.
2. Add `environment: dev` to the `playwright-tests` job.
3. Add `BASE_URL: ${{ vars.BASE_URL }}` as a job/step-level env so
   `npm test` (Playwright) picks it up.
4. Update the "Wait for rolnopol service to be ready" step to use
   `$BASE_URL` instead of the hardcoded `http://localhost:3000`.
5. Validate YAML correctness and note any open questions for the user.

## Progress and Findings

- Step 1 complete: `playwright.config.ts` throws if `BASE_URL` is missing;
  workflow had no `BASE_URL` source at all previously (hardcoded
  `localhost:3000` only in the readiness check).
- Steps 2-4 complete: workflow updated.

## Validation Results

- This is a CI-only YAML change; cannot execute the GitHub Actions runner
  locally. Verified YAML structure by reading the file back.

## Status

Completed — pending user confirmation that "dev environment" = GitHub
Environment `dev` with an Environment-level `BASE_URL` variable.
