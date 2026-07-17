import { expect, test } from "@playwright/test";

test(
  "should have correct page title 'Rolnopol'",
  { tag: ["@smoke", "@navigation"] },
  async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Rolnopol");
  },
);
