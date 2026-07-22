import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  static readonly URL = "/login.html";
  readonly subtitle;

  constructor(page: Page) {
    super(page, LoginPage.URL);

    this.subtitle = page.getByTestId("login-subtitle");
  }
}
