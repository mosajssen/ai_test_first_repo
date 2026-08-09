# Plan: User Model, Factory, Env Vars, and Test Refactor

## Goal

Introduce a `User` interface and a simple factory for creating `User` objects, source user-related hardcoded values (known test account credentials) from environment variables, and update the existing tests to use the new model instead of inline/hardcoded user data.

## Assumptions and Open Questions

- Assumption: "User" refers to the login/registration credentials (email, password) used across `tests/main.smoke.spec.ts` and `tests/auth.negative.spec.ts`, following the existing `User` Page Object pattern (interface + factory, no classes).
- Assumption: Known, reusable accounts should move to env vars:
  - `demo@example.com` / `demo123` (successful login test; reused as the "already exists" account in the duplicate-email negative test)
  - `emptyuser@rolnopol.demo.pl` / `demoPass123` (profile/logout smoke test)
  - The fixed password used for newly registered users (`Test1234!`) in the successful registration test
- Assumption: Negative-validation test inputs that are intentionally invalid (e.g. `"notanemail"`, `"ab"`, empty fields) are NOT part of the "user model" — they test validation edge cases, not real user data, so they stay as literals.
- Assumption: The unique email generation (`testuser_${Date.now()}@example.com`) becomes part of the factory (a "unique user" variant) rather than being removed, since uniqueness per run must be preserved.
- Open question: exact env var names — will use descriptive names (`DEMO_USER_EMAIL`/`DEMO_USER_PASSWORD`, `EMPTY_USER_EMAIL`/`EMPTY_USER_PASSWORD`, `NEW_USER_PASSWORD`) consistent with existing `BASE_URL` convention in `.env`/`.env.example`.

## Risks and Constraints

- Risk: Missing env vars at runtime could break tests silently or with unclear errors — mirror the existing fail-fast pattern used for `BASE_URL` in `playwright.config.ts` where practical.
- Risk: Changing negative-test literals by mistake could weaken those tests' intent.
- Constraint: Follow `CODING_STANDARDS.md` (no comments, Page Object rules) and keep `.env`/`.env.example` in sync.
- Constraint: Must not break the full regression suite.

## Planned Steps

1. Create `src/models/User.ts` with the `User` interface.
2. Create a simple factory module in `src/models/` that builds `User` objects, reading known credentials from `process.env`, with support for generating a unique user (unique email) for registration flows.
3. Add new required env vars to `.env` and `.env.example`.
4. Update `tests/main.smoke.spec.ts` and `tests/auth.negative.spec.ts` to use the factory/interface instead of hardcoded credentials, leaving intentionally-invalid validation inputs untouched.
5. Run the full suite (`npx playwright test`) as the regression gate.
6. Update this plan with progress/validation results and mark completion.

## Progress and Findings

- Step 1 complete: Added `src/models/User.ts` with `email`/`password` fields (matches what `LoginPage.login()` / `RegisterPage.register()` actually consume).
- Step 2 complete: Added `src/models/userFactory.ts` with `createUser`, `createEmptyUser`, and `createUniqueUser` (unique email generation preserved for the registration flow).
- Step 3 complete: Added `DEMO_USER_EMAIL`, `DEMO_USER_PASSWORD`, `EMPTY_USER_EMAIL`, `EMPTY_USER_PASSWORD`, `NEW_USER_PASSWORD` to `.env` and `.env.example`.
- Step 4 complete: Updated `tests/main.smoke.spec.ts` (login, empty-user profile/logout, and registration tests) and `tests/auth.negative.spec.ts` (duplicate-email test) to use the factory. Left intentionally-invalid validation inputs (`"notanemail"`, `"ab"`, empty submit) untouched, per plan assumption.
- Step 5 complete: Full suite run via `npx playwright test`.

## Validation Results

- Command: `npx playwright test`
- Result: `12 passed`

## Status

Completed.
