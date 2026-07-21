import { expect, test } from "@playwright/test";

test(
  "should have correct page title 'Rolnopol'",
  { tag: ["@smoke", "@navigation"] },
  async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Rolnopol");
  },
);

test(
  "login page is visible and loaded",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    const expectedSubtitle = "User Login & Account Access";

    await page.goto("/login.html");
    await expect(page.getByTestId("login-subtitle")).toHaveText(
      expectedSubtitle,
    );
  },
);

test(
  "register page is visible and loaded",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    const expectedSubtitle = "Create Your User Account";

    await page.goto("/register.html");
    await expect(page.getByTestId("register-subtitle")).toHaveText(
      expectedSubtitle,
    );
  },
);

test(
  "docs page is visible and loaded",
  { tag: ["@smoke", "@navigation"] },
  async ({ page }) => {
    const expectedSubtitle = "Rolnopol System Guide & API Reference";

    await page.goto("/docs.html");
    await expect(page.locator(".docs-header-subtitle")).toHaveText(
      expectedSubtitle,
    );
  },
);

test(
  "swagger page is visible and loaded",
  { tag: ["@smoke", "@navigation"] },
  async ({ page }) => {
    const expectedTitle = "Rolnopol - Swagger";

    await page.goto("/swagger.html");
    await expect(page).toHaveTitle(expectedTitle);
  },
);

test(
  "successful registration redirects to login page",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    await page.goto("/register.html");
    await page.getByTestId("email-input").fill(uniqueEmail);
    await page.getByTestId("password-input").fill("Test1234!");
    await page.getByTestId("register-submit-btn").click();

    await expect(page.getByRole("alert")).toContainText(
      "Registration successful!",
    );
    await expect(page).toHaveURL(/login\.html/, { timeout: 10_000 });
  },
);
