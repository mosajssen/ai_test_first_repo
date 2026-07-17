# Copilot Instructions

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/): `<type>[optional scope]: <description>`

**Types:** `feat` | `fix` | `test` | `docs` | `style` | `refactor` | `perf` | `chore` | `ci` | `revert`

**Rules:**

- Imperative mood: "add feature" not "added feature"
- Max 72 characters, no capital first letter, no trailing period
- Use `!` for breaking changes: `feat!: remove deprecated API`

## Tests

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
