# Coding Standards

## Page Object Pattern

- One class per page, placed in `src/pages/`
- Define all locators as `readonly` properties in the constructor
- Prefer `getByTestId`; fall back to `getByRole` or `getByLabel`
- Expose locators as public properties so tests can assert against them directly
- **No assertions in Page Objects** — all `expect` calls belong in test files only

```ts
// Page Object — actions only
async register(email: string, password: string) {
  await this.fillEmail(email);
  await this.fillPassword(password);
  await this.submit();
}

// Test file — assertions only
await registerPage.register(email, password);
await expect(page.getByRole("alert")).toContainText("Registration successful!");
await expect(page).toHaveURL(/login\.html/, { timeout: 10_000 });
```

## Comments

- Do not add comments to code — write self-documenting code instead
- No inline comments explaining what the code does
- No block comments or file-level header comments
- No commented-out code — delete it instead
- Comments in code examples within this document (e.g. `// Page Object — actions only`) are permitted for illustrative purposes only
