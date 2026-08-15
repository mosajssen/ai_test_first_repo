import { expect, test } from "@playwright/test";

import { createUser } from "../../src/models/User";
import { LoginPage } from "../../src/pages/LoginPage";

test(
  "successful login redirects to profile and sets auth cookie",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    const user = createUser();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(user.email, user.password);

    await expect(page).toHaveURL(/profile\.html/, { timeout: 10_000 });
  }
);
