# Plan: Create Animal Herd in Staff & Field View

## Goal
Create a Playwright test for an authenticated user that creates a new animal herd in the "Staff & Field" view.

## Assumptions
- Animal herd creation is accessible from `/staff-fields-main.html` (the `StaffFieldsPage`)
- The "Animals (groups)" section has an "Add Animal" button similar to "Add Field"
- The form requires at minimum: animal type and amount (as per test-plan.md 2.5)
- The existing `StaffFieldsPage` Page Object needs to be extended with animal-specific locators/methods
- Auth session will be available via `playwright/.auth/user.json` (the `authenticated` project)

## Risks & Constraints
- Animal herd form structure is unknown — must be explored via MCP before implementing
- The `StaffFieldsPage` import path in tests uses `../../../src/pages/StaffFieldsPage` — same pattern applies
- Tags: `@regression @farm` based on test plan row 2.5 "Add an animal"

## Steps
1. [x] Create this plan
2. [ ] Run existing tests to generate session file (`npx playwright test`)
3. [ ] Explore the Staff & Field page via Playwright MCP to discover the animal herd form
4. [ ] Update `StaffFieldsPage` with animal-related locators and methods
5. [ ] Create test file `tests/auth/authenticated/staff-fields-create-animal-herd.spec.ts`
6. [ ] Run full test suite to verify regression
7. [ ] Validate and report

## Open Questions
- What are the exact form field labels for animal herd creation?
- Is there a search/filter for animals similar to fields?
- What is the success message text after creation?

## UI Exploration Findings
_To be updated after MCP exploration_

## Validation Results
_To be updated after test run_
