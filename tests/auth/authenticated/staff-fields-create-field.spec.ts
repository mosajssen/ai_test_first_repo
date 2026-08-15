import { expect, test } from "@playwright/test";
import { ProfilePage } from "../../../src/pages/ProfilePage";
import { StaffFieldsPage } from "../../../src/pages/StaffFieldsPage";

test(
  "authenticated user can create a new field in staff and fields view",
  { tag: ["@smoke", "@farm"] },
  async ({ page }) => {
    const profilePage = new ProfilePage(page);
    const staffFieldsPage = new StaffFieldsPage(page);
    const fieldName = `Pole E2E ${Date.now()}`;
    const fieldArea = 21;

    await profilePage.goto();
    await expect(page).toHaveURL(profilePage.url, { timeout: 10_000 });

    await profilePage.goToStaffFieldsManagement();
    await expect(page).toHaveURL(staffFieldsPage.url, { timeout: 10_000 });

    await staffFieldsPage.openAddFieldModal();
    await expect(staffFieldsPage.addFieldModalHeading).toBeVisible();

    await staffFieldsPage.addField(fieldName, fieldArea);
    await expect(staffFieldsPage.fieldAddedMessage).toBeVisible();

    await staffFieldsPage.searchFieldByName(fieldName);

    const createdField = staffFieldsPage.fieldListItem(fieldName);
    await expect(createdField).toBeVisible();
    await expect(createdField).toContainText(`${fieldArea} ha`);
  },
);
