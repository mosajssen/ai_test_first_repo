# Static Analysis Setup Audit

## Date

2026-08-15

## Scope

Node.js + TypeScript + Playwright repository quality workflow.

## Current State

- TypeScript exists and `tsconfig.json` is strict, but there is no dedicated type-check script.
- No ESLint configuration exists (flat or legacy).
- No Prettier configuration or ignore file exists.
- No Husky hooks or lint-staged configuration exists.
- `package.json` only has Playwright test scripts; no quality scripts.
- CI workflows run Playwright tests, but there is no explicit quality gate (format/lint/type-check).
- VS Code settings include `source.organizeImports`, which can conflict with ESLint-based import sorting.

## Classification

Model C (mixed/incomplete): static-analysis responsibilities are not yet defined or enforced.

## Decisions For Standardization

- Use ESLint flat config.
- Use `typescript-eslint` for TypeScript linting.
- Use Prettier for formatting checks and writes.
- Use `eslint-plugin-simple-import-sort` for import ordering in ESLint.
- Use `eslint-config-prettier` to avoid lint/format conflicts.
- Keep formatting and linting as separate concerns (Model A).
- Add explicit quality scripts: `format`, `format:check`, `lint`, `tsc:check`, `check`, `check:ci`.
- Add Husky and lint-staged for local staged-file guardrails.
- Integrate quality checks into existing `.github/workflows/e2e-tests.yml` and gate test job with `needs`.

## Files Expected To Be Added Or Updated

- `package.json`
- `package-lock.json`
- `eslint.config.mjs`
- `.prettierrc.json`
- `.prettierignore`
- `.husky/pre-commit`
- `.github/workflows/e2e-tests.yml`
- `.vscode/settings.json`
- `README.md`

## Verification Plan

For each iterative step, run relevant checks and report outcomes.

- Dependency integrity: `npm ci`
- Formatting: `npm run format:check`
- Linting: `npm run lint`
- Type checking: `npm run tsc:check`
- Aggregate checks: `npm run check` and `npm run check:ci`
- Existing test suite compatibility: `npm test` (environment-dependent)
