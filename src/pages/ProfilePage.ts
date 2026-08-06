import { Locator, Page } from "@playwright/test";
import { URLs } from "../urls";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {
  static readonly URL = URLs.profile;
  readonly profileInformationHeading: Locator;
  readonly updateProfileHeading: Locator;
  readonly dangerZoneHeading: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page, ProfilePage.URL);

    this.profileInformationHeading = page.getByRole("heading", {
      name: "Profile Information",
    });
    this.updateProfileHeading = page.getByRole("heading", {
      name: "Update Profile",
    });
    this.dangerZoneHeading = page.getByRole("heading", { name: "Danger Zone" });

    this.logoutButton = page
      .getByTestId("profile-header")
      .getByTestId("logout-btn");
  }

  async logout() {
    await this.logoutButton.click();
  }
}
