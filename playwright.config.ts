import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

if (!process.env.BASE_URL) {
  throw new Error(
    "Missing BASE_URL. Define it in .env or environment variables.",
  );
}

export default defineConfig({
  testDir: "./tests",
  timeout: 10 * 1000,
  fullyParallel: true,
  reporter: process.env.CI
    ? [["github"], ["html"]]
    : [["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL,
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
