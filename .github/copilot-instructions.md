# Copilot Instructions

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/): `<type>[optional scope]: <description>`

**Types:** `feat` | `fix` | `test` | `docs` | `style` | `refactor` | `perf` | `chore` | `ci` | `revert`

**Rules:**

- Imperative mood: "add feature" not "added feature"
- Max 72 characters, no capital first letter, no trailing period
- Use `!` for breaking changes: `feat!: remove deprecated API`

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

For tests that fill a form, expect a success notification, and assert a redirect:

1. Use `Date.now()` to generate unique data (e.g. emails) and avoid state conflicts between runs
2. Use the best available locator: prefer `getByRole` or `getByLabel`, fall back to `getByTestId` when explicit test IDs are present
3. After submitting, first assert the success `alert` role, then assert the URL change
4. Use `{ timeout: 10_000 }` on `toHaveURL` to account for redirect delay after notification
