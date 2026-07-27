# ai_test_first_repo

End-to-end test suite for validating key Rolnopol user flows with Playwright.

## Purpose

This repository is used for running tests and experimenting with test workflows.

## Prerequisites

- Node.js 18+
- npm 9+
- A running Rolnopol application at `http://localhost:3000`

## Setup

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Install Playwright browser dependencies (first run only):

   ```bash
   npx playwright install --with-deps
   ```

## Usage

- Run all tests:

  ```bash
  npm test
  ```

- Run tests in headed mode:

  ```bash
  npm run test:headed
  ```

- Debug tests interactively:

  ```bash
  npm run test:debug
  ```

- Open the latest HTML report:

  ```bash
  npm run test:report
  ```

## Project Structure

```text
.
├── src/
│   ├── pages/               # Playwright Page Objects
│   └── urls.ts              # Route constants
├── tests/
│   ├── main.smoke.spec.ts   # Critical smoke tests
│   └── auth.negative.spec.ts # Negative auth scenarios
├── playwright.config.ts     # Playwright configuration (baseURL, projects, reporter)
├── test-plan.md             # Coverage plan and tag mapping
└── CODING_STANDARDS.md      # Code and test conventions
```
