import { expect, test } from "@playwright/test";

import { createUser } from "../../src/models/User";
import { RegisterPage } from "../../src/pages/RegisterPage";

test.describe("registration — negative scenarios", () => {
  test("duplicate email shows error", { tag: ["@regression", "@auth"] }, async ({ page }) => {
    const user = createUser();
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(user.email, user.password);

    await expect(page.getByRole("alert")).toContainText("User with this email already exists");
  });

  test(
    "invalid email format shows validation error",
    { tag: ["@regression", "@auth"] },
    async ({ page }) => {
      const registerPage = new RegisterPage(page);

      await registerPage.goto();
      await registerPage.register("notanemail", "ValidPass1!");

      await expect(page.getByRole("alert")).toContainText("Please enter a valid email address");
    }
  );

  test(
    "password shorter than 3 characters shows validation error",
    { tag: ["@regression", "@auth"] },
    async ({ page }) => {
      const registerPage = new RegisterPage(page);

      await registerPage.goto();
      await registerPage.register(`user_${Date.now()}@example.com`, "ab");

      await expect(page.getByRole("alert")).toContainText("Password must be at least 3 characters");
    }
  );

  test(
    "empty required fields does not submit the form",
    { tag: ["@regression", "@auth"] },
    async ({ page }) => {
      const registerPage = new RegisterPage(page);

      await registerPage.goto();
      await registerPage.submitButton.click();

      await expect(page).toHaveURL(/register\.html/);
      await expect(registerPage.emailInput).toBeFocused();
    }
  );
});
