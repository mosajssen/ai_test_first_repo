---
name: sync-test-plan
description: Delegate test-plan reconciliation to the standalone sync-test-plan skill
agent: agent
---

Use the `sync-test-plan` skill to reconcile `test-plan.md` with the implemented Playwright tests.

Expected behavior:

- build a coverage matrix between plan rows and test files
- classify scenarios as covered, partial, or missing
- normalize tag mapping based on repository rules
- split partially implemented requirements into explicit testable rows
- update `test-plan.md` when requested, otherwise return a proposed diff
