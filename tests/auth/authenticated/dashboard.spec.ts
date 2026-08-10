import { expect, test } from "@playwright/test";
import { ProfilePage } from "../../../src/pages/ProfilePage";
import { StaffFieldsPage } from "../../../src/pages/StaffFieldsPage";

test(
  "farm dashboard lists fields, staff, and animals after login test",
  { tag: ["@smoke", "@farm"] },
  async ({ page }) => {
    const profilePage = new ProfilePage(page);
    const staffFieldsPage = new StaffFieldsPage(page);

    await profilePage.goto();
    await expect(page).toHaveURL(profilePage.url, { timeout: 10_000 });

    await profilePage.goToStaffFieldsManagement();

    await expect(page).toHaveURL(staffFieldsPage.url, { timeout: 10_000 });
    await expect.soft(staffFieldsPage.fieldsHeading).toBeVisible();
    await expect.soft(staffFieldsPage.staffHeading).toBeVisible();
    await expect.soft(staffFieldsPage.animalsHeading).toBeVisible();
  },
);
