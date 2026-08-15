# ai_test_first_repo

End-to-end test suite for validating key Rolnopol user flows with Playwright.

## Purpose

This repository is used for running tests and experimenting with test workflows.

## Prerequisites

- Node.js 20+
- npm 9+
- A running Rolnopol application at `http://localhost:3000`

## Setup

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Install Playwright browser dependencies (first run only):

   ```bash
   npx playwright install --with-deps
   ```

## Static Analysis Workflow

This repository uses a split quality model:

- Prettier handles formatting.
- ESLint handles code-quality rules and import sorting.
- TypeScript (`tsc --noEmit`) handles type safety.

Import ordering is enforced by `eslint-plugin-simple-import-sort` in [eslint.config.mjs](eslint.config.mjs).

### Quality Scripts

- Apply formatting changes:

  ```bash
  npm run format
  ```

- Check formatting without modifying files:

  ```bash
  npm run format:check
  ```

- Run lint checks (warnings fail CI):

  ```bash
  npm run lint
  ```

- Auto-fix lint issues when possible:

  ```bash
  npm run lint:fix
  ```

- Run TypeScript type check:

  ```bash
  npm run tsc:check
  ```

- Local aggregate check (mutating):

  ```bash
  npm run check
  ```

- CI-safe aggregate check (non-mutating):

  ```bash
  npm run check:ci
  ```

## Local Hooks

Husky and lint-staged are enabled via [package.json](package.json) and [.husky/pre-commit](.husky/pre-commit).

On each commit, the hook runs:

- `npm run lint-staged` for staged file formatting/lint fixes
- `npm run tsc:check` for repository-wide type checking

## CI Quality Gate

The existing E2E workflow in [.github/workflows/e2e-tests.yml](.github/workflows/e2e-tests.yml) now includes a `quality` job that runs:

- `npm run format:check`
- `npm run lint`
- `npm run tsc:check`

The `playwright-tests` job depends on the `quality` job and only runs after quality checks pass.

## Usage

- Run all tests:

  ```bash
  npm test
  ```

- Run tests in headed mode:

  ```bash
  npm run test:headed
  ```

- Debug tests interactively:

  ```bash
  npm run test:debug
  ```

- Open the latest HTML report:

  ```bash
  npm run test:report
  ```

## Project Structure

```text
.
├── src/
│   ├── pages/               # Playwright Page Objects
│   └── urls.ts              # Route constants
├── tests/
│   ├── main.smoke.spec.ts   # Critical smoke tests
│   └── auth.negative.spec.ts # Negative auth scenarios
├── playwright.config.ts     # Playwright configuration (baseURL, projects, reporter)
├── test-plan.md             # Coverage plan and tag mapping
└── CODING_STANDARDS.md      # Code and test conventions
```
