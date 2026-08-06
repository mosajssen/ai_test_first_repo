# Plan: Login → Profile Sections → Logout E2E Test

## Goal

Add an end-to-end Playwright test covering:

1. Navigate to the login page.
2. Log in as the "empty user" (`emptyuser@rolnopol.demo.pl` / `demoPass123`).
3. Verify redirect to the logged-in/profile page.
4. Verify "Profile information", "Update Profile", and "Danger Zone" sections are visible.
5. Log out and verify redirect to the home page.

## Assumptions

- Login redirects to `/profile.html` (confirmed by existing test `main.smoke.spec.ts` and test-plan.md 1.4).
- The "empty user" account (`emptyuser@rolnopol.demo.pl` / `demoPass123`, no funds/resources — per test-plan.md Demo Accounts) can still log in successfully and see the profile page sections, since these sections describe the account itself, not farm resources.
- No `ProfilePage` page object currently exists in `src/pages/` — one needs to be created following the existing Page Object pattern (`BasePage`, `getByTestId` first).
- A logout control exists on the profile page and redirects to `/` (home) — to be confirmed via MCP exploration.
- Dev server is already running on `http://localhost:3000` (confirmed reachable).

## Open Questions

- Exact locators/test-ids for "Profile information", "Update Profile", "Danger Zone" sections and the logout control — will confirm via Playwright MCP exploration of `/profile.html` before implementing.

## Risks / Constraints

- Test must match repo conventions: Page Object pattern, no assertions in page objects, tags per test-plan.md (`@smoke`/@regression + `@auth`), no comments in code, `getByRole`/`getByLabel` preferred in tests, `getByTestId` fallback.
- Must not break existing tests (full suite run required after change).
- Timeout config is 10s per test (`playwright.config.ts`) — reuse existing `{ timeout: 10_000 }` pattern for post-redirect URL assertions where needed.

## Planned Steps

1. ✅ Review `playwright.config.ts`, `test-plan.md`, `CODING_STANDARDS.md`, existing pages (`BasePage`, `LoginPage`, `HomePage`, `RegisterPage`) and tests (`main.smoke.spec.ts`, `auth.negative.spec.ts`).
2. ✅ Explore `/profile.html` via Playwright MCP after logging in with the empty user to confirm:
   - Section locators for "Profile information", "Update Profile", "Danger Zone".
   - Logout control locator and post-logout redirect target.
3. ✅ Create `src/pages/ProfilePage.ts` Page Object (actions only, `getByTestId` preferred).
4. ✅ Add new test case(s) to an auth spec file (extend `main.smoke.spec.ts` or a new file) with proper `@smoke`/`@auth` tags, following existing style.
5. ✅ Run the full test suite (`npx playwright test`) to confirm no regressions.
6. ✅ Update this plan with exploration findings and validation results.

## Exploration Findings

- Login with `emptyuser@rolnopol.demo.pl` / `demoPass123` succeeds and redirects to `/profile.html`, same as other demo accounts.
- Section headings on `/profile.html` are `Profile Information`, `Update Profile`, `Danger Zone` (level-3 headings). No dedicated `data-testid` exists on the heading/section containers themselves, so `getByRole("heading", { name })` is used (per coding standard fallback order).
- The page has **two** elements sharing `data-testid="logout-btn"`: one in the persistent nav header (`profile-header`... actually `header-component`) and one in the profile card (`profile-header`). Using `getByTestId("logout-btn")` directly is ambiguous (strict-mode violation); the profile card's button is scoped via `page.getByTestId("profile-header").getByTestId("logout-btn")`.
- **Deviation from requested scenario**: clicking Logout redirects to `/login.html`, not the home page (`/`). Confirmed live against the running app (both logout buttons behave the same way). Asked the user for clarification — decision: assert the actual behavior (`/login.html`).

## Validation Results

- New page object: `src/pages/ProfilePage.ts`.
- New test added to `tests/main.smoke.spec.ts`: `"empty user can log in, view profile sections, and log out"` tagged `@smoke @auth`.
- Added `profile: "/profile.html"` to `src/urls.ts`.
- `get_errors` — no lint/type errors in changed files.
- Full suite: `npx playwright test` → **12 passed**, no regressions.

## Status: Completed
