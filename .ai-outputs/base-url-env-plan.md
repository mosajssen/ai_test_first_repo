# Plan: Move BASE_URL to .env

## Goal

Use an environment variable for Playwright `baseURL` so sensitive/environment-specific values are not hardcoded.

## Assumptions and Open Questions

- Assumption: The user wants `BASE_URL` read from a `.env` file.
- Assumption: Existing tests should continue to run with no behavioral changes.
- Resolved: Added `.env.example` to document required variables.

## Risks and Constraints

- Risk: If `BASE_URL` is missing, tests may fail at runtime.
- Risk: Introducing env loading incorrectly could break CI/local runs.
- Constraint: Follow existing repository conventions and keep changes minimal.

## Planned Steps

1. Review current Playwright config and supporting files (`playwright.config.ts`, `package.json`, ignore files).
2. Implement `.env` loading and use `process.env.BASE_URL` in config with a safe fallback/fail-fast behavior.
3. Add/update `.env.example` (and `.gitignore` if needed) to keep secrets out of source control.
4. Run full test suite (`npx playwright test`) as regression gate.
5. Update this plan with results and completion status.

## Progress and Findings

- Step 1 complete: Confirmed `baseURL` was hardcoded in `playwright.config.ts`.
- Step 2 complete: Added `dotenv` loading and fail-fast validation when `BASE_URL` is missing.
- Step 3 complete: Added `.env.example`, added `.env*` ignore rules with an allowlist for `.env.example`, and created local `.env`.
- Step 4 complete: Full suite run twice during changes; all tests passed.

## Validation Results

- Command: `npx playwright test`
- Result: `12 passed`

## Status

Completed.
