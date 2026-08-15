import { expect, test } from "@playwright/test";

import { ProfilePage } from "../../../src/pages/ProfilePage";
import { StaffFieldsPage } from "../../../src/pages/StaffFieldsPage";

test(
  "authenticated user can create a new animal herd in staff and fields view",
  { tag: ["@regression", "@farm"] },
  async ({ page }) => {
    const profilePage = new ProfilePage(page);
    const staffFieldsPage = new StaffFieldsPage(page);
    const animalType = "cow";
    const animalAmount = (Date.now() % 8999) + 1000;

    await profilePage.goto();
    await expect(page).toHaveURL(profilePage.url, { timeout: 10_000 });

    await profilePage.goToStaffFieldsManagement();
    await expect(page).toHaveURL(staffFieldsPage.url, { timeout: 10_000 });

    await staffFieldsPage.openAddAnimalModal();
    await expect(staffFieldsPage.addAnimalModalHeading).toBeVisible();

    await staffFieldsPage.addAnimal(animalType, animalAmount);
    await expect(staffFieldsPage.addAnimalModal).toBeHidden();

    await staffFieldsPage.searchAnimalByType(animalType);

    const createdAnimal = staffFieldsPage.animalListItem(animalType, animalAmount);
    await expect(createdAnimal).toBeVisible();
    await expect(createdAnimal).toContainText(animalAmount.toString());
  }
);
