import { expect, test } from "@playwright/test";
import { RegisterPage } from "../src/pages/RegisterPage";

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
  "register page is visible and loaded",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await expect(registerPage.subtitle).toHaveText("Create Your User Account");
  },
);

test(
  "successful registration redirects to login page",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(uniqueEmail, "Test1234!");

    await expect(page.getByRole("alert")).toContainText(
      "Registration successful!",
    );
    await expect(page).toHaveURL(/login\.html/, { timeout: 10_000 });
  },
);
