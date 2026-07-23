import { expect, test } from "@playwright/test";
import { DocsPage } from "../src/pages/DocsPage";
import { HomePage } from "../src/pages/HomePage";
import { LoginPage } from "../src/pages/LoginPage";
import { RegisterPage } from "../src/pages/RegisterPage";
import { SwaggerPage } from "../src/pages/SwaggerPage";

test(
  "should have correct page title 'Rolnopol'",
  { tag: ["@smoke", "@navigation"] },
  async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await expect(page).toHaveTitle("Rolnopol");
  },
);

test(
  "login page is visible and loaded",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await expect(loginPage.subtitle).toHaveText("User Login & Account Access");
  },
);

test(
  "docs page is visible and loaded",
  { tag: ["@smoke", "@navigation"] },
  async ({ page }) => {
    const docsPage = new DocsPage(page);

    await docsPage.goto();
    await expect(docsPage.subtitle).toHaveText(
      "Rolnopol System Guide & API Reference",
    );
  },
);

test(
  "swagger page is visible and loaded",
  { tag: ["@smoke", "@navigation"] },
  async ({ page }) => {
    const swaggerPage = new SwaggerPage(page);

    await swaggerPage.goto();
    await expect(page).toHaveTitle("Rolnopol - Swagger");
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

test(
  "successful login redirects to profile and sets auth cookie",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("demo@example.com", "demo123");

    await expect(page).toHaveURL(/profile\.html/, { timeout: 10_000 });
  },
);
