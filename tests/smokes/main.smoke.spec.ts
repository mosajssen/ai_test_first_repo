import { expect, test } from "@playwright/test";

import { createEmptyUser, createUniqueUser, createUser } from "../../src/models/User";
import { DocsPage } from "../../src/pages/DocsPage";
import { HomePage } from "../../src/pages/HomePage";
import { LoginPage } from "../../src/pages/LoginPage";
import { ProfilePage } from "../../src/pages/ProfilePage";
import { RegisterPage } from "../../src/pages/RegisterPage";
import { StaffFieldsPage } from "../../src/pages/StaffFieldsPage";
import { SwaggerPage } from "../../src/pages/SwaggerPage";

test(
  "should have correct page title 'Rolnopol'",
  { tag: ["@smoke", "@navigation"] },
  async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await expect(page).toHaveTitle("Rolnopol");
  }
);

test("login page is visible and loaded", { tag: ["@smoke", "@auth"] }, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await expect(loginPage.subtitle).toHaveText("User Login & Account Access");
});

test("docs page is visible and loaded", { tag: ["@smoke", "@navigation"] }, async ({ page }) => {
  const docsPage = new DocsPage(page);

  await docsPage.goto();
  await expect(docsPage.subtitle).toHaveText("Rolnopol System Guide & API Reference");
});

test("swagger page is visible and loaded", { tag: ["@smoke", "@navigation"] }, async ({ page }) => {
  const swaggerPage = new SwaggerPage(page);

  await swaggerPage.goto();
  await expect(page).toHaveTitle("Rolnopol - Swagger");
});

test("register page is visible and loaded", { tag: ["@smoke", "@auth"] }, async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.goto();
  await expect(registerPage.subtitle).toHaveText("Create Your User Account");
});

test(
  "successful registration redirects to login page",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    const user = createUniqueUser();
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(user.email, user.password);

    await expect(page.getByRole("alert")).toContainText("Registration successful!");
    await expect(page).toHaveURL(/login\.html/, { timeout: 10_000 });
  }
);

test(
  "empty user can log in, view profile sections, and log out from app (final change)",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    const user = createEmptyUser();
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);

    await loginPage.goto();
    await loginPage.login(user.email, user.password);

    await expect.soft(page).toHaveURL(profilePage.url, { timeout: 10_000 });
    await expect.soft(profilePage.profileInformationHeading).toBeVisible();
    await expect.soft(profilePage.updateProfileHeading).toBeVisible();
    await expect.soft(profilePage.dangerZoneHeading).toBeVisible();
    await expect.soft(profilePage.emailValue).toHaveText(user.email);
    await expect.soft(profilePage.displayedNameValue).not.toBeEmpty();
    await expect.soft(profilePage.userIdValue).not.toBeEmpty();
    await expect.soft(profilePage.createdAtValue).not.toBeEmpty();
    await expect.soft(profilePage.lastLoginValue).not.toBeEmpty();

    await profilePage.logout();

    await expect(page).toHaveURL(LoginPage.URL, { timeout: 10_000 });
  }
);

test(
  "farm dashboard lists fields, staff, and animals after login test",
  { tag: ["@smoke", "@farm"] },
  async ({ page }) => {
    const user = createUser();
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    const staffFieldsPage = new StaffFieldsPage(page);

    await loginPage.goto();
    await loginPage.login(user.email, user.password);

    await expect.soft(page).toHaveURL(profilePage.url, { timeout: 10_000 });

    await profilePage.goToStaffFieldsManagement();

    await expect(page).toHaveURL(staffFieldsPage.url, { timeout: 10_000 });
    await expect.soft(staffFieldsPage.fieldsHeading).toBeVisible();
    await expect.soft(staffFieldsPage.staffHeading).toBeVisible();
    await expect.soft(staffFieldsPage.animalsHeading).toBeVisible();
  }
);
