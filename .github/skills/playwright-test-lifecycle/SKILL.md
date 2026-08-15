---
name: playwright-test-lifecycle
description: "Create or maintain Playwright tests using a reusable lifecycle for planning, design, implementation, validation, and regression safety."
argument-hint: "Feature or flow under test, scope, and acceptance criteria"
user-invocable: true
disable-model-invocation: false
---

# Playwright Test Lifecycle

Use this skill when the task is to create, update, refactor, or stabilize Playwright tests in this repository.

This skill extracts the repeated implementation workflow into one reusable procedure so agent files can stay focused on role and routing.

## When to Use

Use this skill when the user asks things like:

- add a new Playwright test
- update an existing UI test
- fix flaky test behavior
- refactor test code to Page Objects
- validate test tags and assertions
- run regression after test changes

## Inputs

Provide these inputs when available:

- feature or flow under test
- acceptance criteria and expected behavior
- target test area (authentication, farm, marketplace, financial, navigation)
- whether scope is smoke or regression

## Required Workflow

### 1. Plan Before Execution

- Create a plan file in `.ai-outputs/` before code or test execution.
- Include goal, assumptions, open questions, risks, and ordered implementation steps.

### 2. Clarify Unknowns

- If behavior or acceptance criteria are unclear, pause and ask focused questions.
- Do not guess business outcomes.

### 3. Understand Existing Coverage

- Review existing tests and related Page Objects first.
- Prefer extending existing structures over creating parallel patterns.

### 4. Design Test Scope

- Keep one intent per test when practical.
- Apply tags from `test-plan.md`.
- Every new test must include one domain tag and one priority tag.

### 5. Implement with Repository Conventions

- Use Page Objects in `src/pages/`.
- Keep assertions in test files, not in Page Objects.
- Prefer stable locators (`getByRole`, `getByLabel`, or explicit `getByTestId`).
- Avoid sleeps and magic waits.
- For redirect-after-submit flows, assert success alert before URL assertion and use explicit timeout on URL expectation.

### 6. Validate and Regress

- Run the full suite after each change set: `npx playwright test`.
- If pre-existing tests fail, treat as regression and fix before finishing.
- If only new tests fail, debug and fix before finishing.

### 7. Finalize

- Verify tag correctness, assertion quality, and consistency with coding standards.
- Update the plan with outcomes and unresolved risks.
- Return a summary with changed files and executed test commands.

## Expected Outputs

- Updated tests and Page Objects aligned with repository conventions
- Updated `.ai-outputs/*-plan.md` documenting decision flow
- Regression status and any residual risks
