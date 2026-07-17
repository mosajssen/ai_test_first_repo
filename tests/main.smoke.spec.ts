import { expect, test } from "@playwright/test";

test("should have correct page title 'Rolnopol'", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Rolnopol");
});
