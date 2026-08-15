import { readFile, writeFile } from "node:fs/promises";

import { test as setup } from "@playwright/test";

import { env } from "../../../src/env";
import { createUser } from "../../../src/models/User";
import { LoginPage } from "../../../src/pages/LoginPage";

const authFile = "playwright/.auth/user.json";

async function makeLocalHttpStorageStateMcpFriendly(path: string): Promise<void> {
  const baseUrl = new URL(env.BASE_URL);
  const isLocalHttp =
    baseUrl.protocol === "http:" &&
    (baseUrl.hostname === "localhost" || baseUrl.hostname === "127.0.0.1");

  if (!isLocalHttp) {
    return;
  }

  const raw = await readFile(path, "utf-8");
  const storageState = JSON.parse(raw) as {
    cookies?: Array<{ domain?: string; secure?: boolean }>;
  };

  if (!storageState.cookies?.length) {
    return;
  }

  for (const cookie of storageState.cookies) {
    const domain = cookie.domain?.replace(/^\./, "") ?? "";
    if (domain === "localhost" || domain === "127.0.0.1") {
      cookie.secure = false;
    }
  }

  await writeFile(path, JSON.stringify(storageState, null, 2));
}

setup("authenticate as DEMO_USER", { tag: ["@smoke", "@auth"] }, async ({ page }) => {
  const user = createUser();
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(user.email, user.password);
  await page.waitForURL(/profile\.html/, { timeout: 10_000 });

  await page.context().storageState({ path: authFile });
  await makeLocalHttpStorageStateMcpFriendly(authFile);
});
