# Copilot Instructions

## Credentials Access

- Never read `.env` files.
- For AI credential access, always use `#file:.env.ai`.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/): `<type>[optional scope]: <description>`

**Types:** `feat` | `fix` | `test` | `docs` | `style` | `refactor` | `perf` | `chore` | `ci` | `revert`

**Rules:**

- Imperative mood: "add feature" not "added feature"
- Max 72 characters, no capital first letter, no trailing period
- Use `!` for breaking changes: `feat!: remove deprecated API`

## Local Skills Index

Use these repository-local skills and agent for repeatable workflows:

- `playwright-test-lifecycle`:
  Use for implementing or maintaining Playwright tests end-to-end (plan, design, implementation, validation, and regression safety).
- `sync-test-plan`:
  Use for reconciling `test-plan.md` with implemented tests, coverage classification, tag normalization, and plan updates.
- `static-code-analysis-typescript`:
  Use for ESLint, Prettier, TypeScript checks, Husky/lint-staged, and CI quality-gate setup or audits.
- `ui-test-automation` agent:
  Use for orchestration of UI test requests; delegate execution workflow to `playwright-test-lifecycle` and plan reconciliation to `sync-test-plan`.

Selection rule:

- If work spans both test implementation and plan reconciliation, invoke `playwright-test-lifecycle` first, then `sync-test-plan`.

## Tests

We use the [Playwright Test](https://playwright.dev/docs/test-intro) framework for all end-to-end tests. Before creating tests, review [playwright.config.ts](../playwright.config.ts) for the configured `baseURL`, timeouts, projects, and other settings.

When creating Playwright tests, always annotate them with the tags defined in [test-plan.md](../test-plan.md).

**Available tags:**

- `@smoke` — critical path, run on every build
- `@regression` — extended coverage
- `@auth` — authentication flows
- `@farm` — farm & resource management
- `@marketplace` — marketplace features
- `@financial` — financial account features
- `@navigation` — system & navigation

**Rules:**

- Every test must have at least one domain tag (`@auth`, `@farm`, `@marketplace`, `@financial`, `@navigation`) and one priority tag (`@smoke` or `@regression`) matching the tags in the test plan
- Use `test.tag()` or the `tag` option in Playwright to apply tags: `test('name', { tag: ['@smoke', '@auth'] }, ...)`
- Keep this list in sync with the Tags columns in [test-plan.md](../test-plan.md) whenever new tags are introduced

## Test Patterns

### Form submission with redirect

1. Use `Date.now()` for unique values (e.g. emails) to avoid state conflicts between runs
2. Prefer `getByRole` or `getByLabel` in test files; use `getByTestId` when explicit test IDs are present
3. After submitting, assert the success `alert` role before asserting the URL change
4. Use `{ timeout: 10_000 }` on `toHaveURL` to account for redirect delay after a notification

For coding conventions, follow [CODING_STANDARDS.md](../CODING_STANDARDS.md).
