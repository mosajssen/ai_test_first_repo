# Playwright Config Refactor — Setup / Smoke / Authenticated Projects

## Goal

Split the single `chromium` project into three projects in [playwright.config.ts](../playwright.config.ts):

1. **`setup`** — logs in as `DEMO_USER` and persists storage state to `playwright/.auth/user.json`.
2. **`smoke-tests`** ("Fast Check") — runs without any stored auth state, verifies basic app state (home/docs/swagger/login/register pages, registration flow, DEMO_USER login flow itself, empty-user login+profile flow).
3. **`authenticated`** — depends on `setup`, reuses `playwright/.auth/user.json` via `storageState`, for tests that need an already-authenticated DEMO_USER session (skips repeating the login steps).

Move DEMO_USER login/session related specs into a new `tests/auth/` directory.

## Decisions (confirmed with user)

- Directory: `tests/auth/`
- Project names: `setup`, `smoke-tests`, `authenticated`
- Tests moving to the `authenticated` project (using storageState, no inline login):
  - "farm dashboard lists fields, staff, and animals after login test" → `tests/auth/dashboard.spec.ts`
- Tests moving to `tests/auth/` but staying in `smoke-tests` project (still perform the actual login action, since they test the login flow itself):
  - "successful login redirects to profile and sets auth cookie" → `tests/auth/login.spec.ts`
- `auth.setup.ts` is tagged like a normal test (`@smoke`, `@auth`) for consistency with repo tag rules, even though it's infra.
- `tests/auth.negative.spec.ts` (registration negative cases) is unrelated to DEMO_USER session — left in place, untouched, still runs under `smoke-tests`.
- Empty-user test ("empty user can log in, view profile sections...") performs its own inline login for a _different_ account (`EMPTY_USER`), not `DEMO_USER` — stays in `main.smoke.spec.ts` under `smoke-tests`, unchanged.

## Assumptions

- `DEMO_USER` = `demo@example.com` / `demo123` via `createUser()` in [User.ts](../src/models/User.ts).
- `playwright/.auth/` is already gitignored (confirmed in [.gitignore](../.gitignore)).
- No CI workflow changes needed beyond the fact all 3 projects run under the existing `npx playwright test` command (confirmed — no `--project` filter in [package.json](../package.json) scripts or CI).

## Risks / Open Questions

- None outstanding — clarified with user via questions before implementation.

## Planned Steps

1. Update [playwright.config.ts](../playwright.config.ts):
   - Add `setup` project (`testDir: "./tests/auth/setup"`, `testMatch: /.*\.setup\.ts/` — needed since `auth.setup.ts` doesn't match Playwright's default `test|spec` filename pattern).
   - Add `smoke-tests` project (`testDir: "./tests"`, `testIgnore: ["auth/setup/**", "auth/authenticated/**"]`).
   - Add `authenticated` project (`testDir: "./tests/auth/authenticated"`, `dependencies: ["setup"]`, `use.storageState: "playwright/.auth/user.json"`).
2. Create `tests/auth/setup/auth.setup.ts` — logs in as DEMO_USER via `LoginPage`, waits for redirect to profile, saves storage state.
3. Create `tests/auth/login.spec.ts` — move "successful login redirects to profile and sets auth cookie" test here (unchanged behavior, still does inline login).
4. Create `tests/auth/authenticated/dashboard.spec.ts` — move "farm dashboard..." test here, refactored to rely on the authenticated storage state instead of performing login inline (navigate straight to profile page).
5. Remove the two moved tests from `tests/main.smoke.spec.ts`.
6. Run full suite (`npx playwright test`) to confirm no regressions.
7. Update this plan with validation results and mark complete.
8. Follow-up: split `setup` and `authenticated` tests into their own subfolders (`tests/auth/setup/`, `tests/auth/authenticated/`) instead of relying on filename-based `testMatch`/`testIgnore` within a flat `tests/auth/` folder.

## Validation Results

- `npx playwright test` → **14 passed** (0 regressions).
- `npx playwright test --list` confirms project split (after folder split follow-up):
  - `setup` (1): `tests/auth/setup/auth.setup.ts` — authenticates DEMO_USER, writes `playwright/.auth/user.json`.
  - `smoke-tests` (12): `tests/main.smoke.spec.ts` (7), `tests/auth.negative.spec.ts` (4), `tests/auth/login.spec.ts` (1, DEMO_USER login flow itself, no storageState).
  - `authenticated` (1): `tests/auth/authenticated/dashboard.spec.ts`, depends on `setup`, reuses `playwright/.auth/user.json`, no inline login.
- Confirmed `playwright/.auth/user.json` was created after the run and is gitignored.
- Re-ran `npx playwright test` after moving `auth.setup.ts` → `tests/auth/setup/` and `dashboard.spec.ts` → `tests/auth/authenticated/` (updated relative imports one level deeper) — still 14 passed.

**Status: Complete.**
