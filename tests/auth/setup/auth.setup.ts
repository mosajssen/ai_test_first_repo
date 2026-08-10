import { test as setup } from "@playwright/test";
import { createUser } from "../../../src/models/User";
import { LoginPage } from "../../../src/pages/LoginPage";

const authFile = "playwright/.auth/user.json";

setup(
  "authenticate as DEMO_USER",
  { tag: ["@smoke", "@auth"] },
  async ({ page }) => {
    const user = createUser();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await page.waitForURL(/profile\.html/, { timeout: 10_000 });

    await page.context().storageState({ path: authFile });
  },
);
