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
    await page.goto("/login.html");
    await expect(page).toHaveURL(/login\.html/);
    await expect(
      page.locator("input[type='email'], input[name='email']"),
    ).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
    await expect(
      page.locator("button[type='submit'], input[type='submit']"),
    ).toBeVisible();
  },
);

test(
  "register page is visible and loaded",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    await page.goto("/register.html");
    await expect(page).toHaveURL(/register\.html/);
    await expect(
      page.locator("input[type='email'], input[name='email']"),
    ).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
    await expect(
      page.locator("button[type='submit'], input[type='submit']"),
    ).toBeVisible();
  },
);
