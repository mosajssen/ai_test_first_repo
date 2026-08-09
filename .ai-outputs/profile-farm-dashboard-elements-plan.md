# Plan: Verify Farm Dashboard Elements on Profile Page

## Goal

Extend profile page coverage with verification of additional key elements shown after login:

- Fields list
- Animals list
- Staff list

Add a new Playwright test for this verification, mapping to test-plan.md item 2.1 ("View farm dashboard"), and add any missing environment variables required for the scenario.

## Assumptions

- A demo account with existing resources (Farmer A: `demo@example.com` / `demo123`) is used, since the "empty user" account has no fields/animals/staff (per test-plan.md Demo Accounts).
- Login still redirects to `/profile.html` (confirmed by existing tests).
- Fields/Animals/Staff sections are rendered on `/profile.html` itself (per test-plan.md 2.1: "Log in, go to profile" → "Fields, animals, and staff are listed").
- `ProfilePage` page object will be extended with new locators (fields/animals/staff list containers), following existing pattern (`getByTestId` preferred).

## Open Questions

- Exact locators/test-ids for the fields/animals/staff list sections and how "listed" is exposed in the DOM (headings, containers, item rows) — to confirm via Playwright MCP exploration before implementing.
- Whether existing `.env` already has values needed (`DEMO_USER_EMAIL`/`DEMO_USER_PASSWORD` already exist in `src/env.ts`) or new variables are required for this scenario.

## Risks / Constraints

- Must follow Page Object pattern and coding standards (no assertions in page objects, `getByTestId` first, no comments).
- Tags must strictly match test-plan.md: `@smoke @farm` for test 2.1.
- Must not break existing tests — full suite run required after change (hard gate).
- Use soft assertions only for independent checks (e.g. verifying fields/animals/staff visibility together); use hard assertions for preconditions (login success, navigation).

## Planned Steps

1. Review existing `ProfilePage.ts`, `main.smoke.spec.ts`, `test-plan.md`, `env.ts`, `.env.example`.
2. Explore `/profile.html` via Playwright MCP logged in as Farmer A to confirm locators for fields/animals/staff sections.
3. Update the plan with exploration findings.
4. Extend `ProfilePage.ts` with new locators (actions/locators only, no assertions).
5. Add a new test tagged `@smoke @farm` covering farm dashboard element visibility, in the appropriate spec file.
6. Add/update environment variables in `.env`/`.env.example`/`env.ts` only if the scenario requires new ones.
7. Run the full test suite (`npx playwright test`) to confirm no regressions.
8. Update this plan with validation results.

## Exploration Findings

- `/profile.html` does **not** contain the Fields/Animals/Staff lists directly. It only has a "Staff & Fields Management" nav link/card (`data-testid="nav-staff-fields"`) pointing to `/staff-fields-main.html`.
- Deviation from test-plan.md 2.1 wording ("Log in, go to profile" → "Fields, animals, and staff are listed") — asked the user for clarification. Decision: navigate from profile to Staff & Fields Management page and verify the lists there (matches the actual farm dashboard, test-plan.md 2.1 intent).
- `/staff-fields-main.html` (Farmer A: `demo@example.com`) shows three level-3 headings: `Fields`, `Staff`, `Animals (groups)`, each followed by a searchable, paginated `list` of items.
- No `data-testid` attributes exist on these section headings/lists (confirmed via DOM query — only nav/footer/logout elements have test-ids), so `getByRole("heading", { name })` is used per coding standard fallback order, consistent with existing `ProfilePage` headings.
- Nav link to reach the dashboard: `page.getByTestId("nav-staff-fields")`.
- No new environment variables needed — `DEMO_USER_EMAIL`/`DEMO_USER_PASSWORD` (Farmer A, has resources) already exist in `.env`/`env.ts` and are sufficient.

## Validation Results

- New page object: `src/pages/StaffFieldsPage.ts` (fields/staff/animals headings, `level: 3` to disambiguate from the page's level-1 "Staff & Fields Management" heading).
- Extended `src/pages/ProfilePage.ts` with `staffFieldsManagementLink` locator and `goToStaffFieldsManagement()` action.
- Added `staffFields: "/staff-fields-main.html"` to `src/urls.ts`.
- New test added to `tests/main.smoke.spec.ts`: `"farm dashboard lists fields, staff, and animals after login"`, tagged `@smoke @farm` (matches test-plan.md 2.1). Hard assertions gate login/navigation preconditions; `expect.soft` used for the three independent heading visibility checks.
- No new environment variables required.
- `get_errors` — no lint/type errors in changed files.
- Full suite: `npx playwright test` → **13 passed**, no regressions.

## Status: Completed

---

## Follow-up: detailed Profile Information field assertions

### Goal

Enhance the existing test `"empty user can log in, view profile sections, and log out from app"` in `tests/main.smoke.spec.ts` to verify the Profile Information card's detail fields, not just the section headings:

- Email address (exact match against the logged-in user's email)
- Display name (visible / not empty)
- User ID container not empty
- Created At container not empty
- Last Login container not empty

### Clarification

User's active selection was on the farm dashboard test, but the requested details (email, name, userId, createdAt, lastLogin) belong to the Profile Information card on `profile.html`. Confirmed with the user: enhance the profile sections test, not the farm dashboard test.

### Exploration Findings

- `/profile.html` exposes `data-testid` attributes for each detail value: `user-id`, `displayed-name`, `email-value`, `created-at`, `last-login` (found via DOM query; not visible in the accessibility tree text alone).
- Verified with both `demo@example.com` (Farmer A) and `emptyuser@rolnopol.demo.pl` (Empty User) accounts — fields render consistently for any logged-in account.
- `email-value` exactly matches the account's login email — safe to hard-match.
- `displayed-name` is a fixed per-account display string (e.g. "Empty User") — not part of the `User` model/env vars, so only visibility/non-empty is asserted (per user's "if applicable" wording), not exact text.
- `user-id` and `created-at` are stable but arbitrary seed data (not exposed via env/model) — asserted non-empty only.
- `last-login` is dynamic (updates to current login timestamp) — must only assert non-empty, never exact text.

### Planned Steps

1. Add `userIdValue`, `displayedNameValue`, `emailValue`, `createdAtValue`, `lastLoginValue` locators (`getByTestId`) to `ProfilePage.ts`.
2. Extend the existing profile sections test with `expect.soft` assertions for each of these (independent, non-blocking checks), plus an exact-match check on `emailValue` against the logged-in user's email.
3. Run the full suite to confirm no regressions.
4. Update this plan with validation results.

### Validation Results

- Extended `src/pages/ProfilePage.ts` with `userIdValue`, `displayedNameValue`, `emailValue`, `createdAtValue`, `lastLoginValue` locators (`getByTestId`).
- Extended the test `"empty user can log in, view profile sections, and log out from app"` in `tests/main.smoke.spec.ts` with `expect.soft` assertions: exact email match, and non-empty checks for display name, user ID, created-at, and last-login.
- `get_errors` — no lint/type errors in changed files.
- Full suite: `npx playwright test` → **13 passed**, no regressions.

## Status: Completed

