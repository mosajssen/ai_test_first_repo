import { defineConfig, devices } from "@playwright/test";
import { env } from "./src/env";

export default defineConfig({
  testDir: "./tests",
  timeout: 20 * 1000,
  fullyParallel: true,
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
      name: "smoke-tests",
      testDir: "./tests",
      testIgnore: ["auth/setup/**", "auth/authenticated/**"],
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
  ],
});
