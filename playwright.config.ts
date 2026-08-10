import { defineConfig, devices } from "@playwright/test";
import { env } from "./src/env";

export default defineConfig({
  testDir: "./tests",
  timeout: 20 * 1000,
  fullyParallel: false,
  reporter: process.env.CI
    ? [["github"], ["html"]]
    : [["html", { open: "never" }]],
  use: {
    baseURL: env.BASE_URL,
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "setup",
      testDir: "./tests/auth/setup",
      testMatch: /.*\.setup\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "authenticated",
      testDir: "./tests/auth/authenticated",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
    },
    {
      name: "smoke-tests",
      testDir: "./tests/smokes",
      dependencies: ["setup", "authenticated"],
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
