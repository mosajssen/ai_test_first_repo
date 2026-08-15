import { Locator, Page } from "@playwright/test";

import { URLs } from "../urls";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {
  static readonly URL = URLs.profile;
  readonly profileInformationHeading: Locator;
  readonly updateProfileHeading: Locator;
  readonly dangerZoneHeading: Locator;
  readonly logoutButton: Locator;
  readonly staffFieldsManagementLink: Locator;
  readonly userIdValue: Locator;
  readonly displayedNameValue: Locator;
  readonly emailValue: Locator;
  readonly createdAtValue: Locator;
  readonly lastLoginValue: Locator;

  constructor(page: Page) {
    super(page, ProfilePage.URL);

    this.profileInformationHeading = page.getByRole("heading", {
      name: "Profile Information",
    });
    this.updateProfileHeading = page.getByRole("heading", {
      name: "Update Profile",
    });
    this.dangerZoneHeading = page.getByRole("heading", { name: "Danger Zone" });

    this.logoutButton = page.getByTestId("profile-header").getByTestId("logout-btn");
    this.staffFieldsManagementLink = page.getByTestId("nav-staff-fields");
    this.userIdValue = page.getByTestId("user-id");
    this.displayedNameValue = page.getByTestId("displayed-name");
    this.emailValue = page.getByTestId("email-value");
    this.createdAtValue = page.getByTestId("created-at");
    this.lastLoginValue = page.getByTestId("last-login");
  }

  async logout() {
    await this.logoutButton.click();
  }

  async goToStaffFieldsManagement() {
    await this.staffFieldsManagementLink.click();
  }
}
