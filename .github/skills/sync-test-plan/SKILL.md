---
name: sync-test-plan
description: "Synchronize test-plan.md with implemented Playwright coverage, identify gaps, and normalize tags/scope mapping."
argument-hint: "Coverage area, desired strictness, and whether to update test-plan.md directly"
user-invocable: true
disable-model-invocation: false
---

# Sync Test Plan

Use this skill to keep `test-plan.md` aligned with the current implemented test suite.

This skill extracts plan-reconciliation logic from generic prompts into a reusable, structured workflow.

## When to Use

Use this skill when the user asks things like:

- check whether test plan matches implemented tests
- update test-plan.md after new tests were added
- find missing coverage from test-plan.md
- split broad requirements into testable cases
- normalize tag mapping between plan and code

## Inputs

Provide these inputs when available:

- target scope (full plan or specific domain)
- strictness level (exact title match vs semantic match)
- whether to apply plan updates directly or propose only

## Workflow

### 1. Collect Source of Truth

- Read `test-plan.md` tables and tag assignments.
- Inventory implemented tests in `tests/**` and their tags.
- Cross-check Playwright project structure in `playwright.config.ts`.

### 2. Build Coverage Matrix

- Map each planned scenario to one of: covered, partially covered, or missing.
- Include file-level evidence for covered scenarios.
- Flag tests that exist but are not represented in the plan.

### 3. Detect Mismatches

- Detect tag mismatches between plan and tests.
- Detect combined scenarios that should be split into multiple cases.
- Detect stale scenarios no longer represented by runnable tests.

### 4. Propose or Apply Updates

- Update `test-plan.md` to reflect actual test behavior and naming.
- Split partial coverage items into clear testable rows.
- Keep tag taxonomy consistent with repository instructions.

### 5. Validate

- Re-check that updated plan rows map to existing tests.
- Call out residual gaps that still require new test implementation.

## Output Contract

Return:

- coverage summary by domain
- missing or partial scenarios
- tag mismatches
- updated `test-plan.md` content (if direct updates were requested)
- next implementation priorities
