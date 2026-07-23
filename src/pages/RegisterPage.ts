import { Page } from "@playwright/test";
import { URLs } from "../urls";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  static readonly URL = URLs.register;
  readonly subtitle;
  readonly emailInput;
  readonly displayNameInput;
  readonly passwordInput;
  readonly submitButton;
  readonly loginLink;
  readonly backToHomeLink;
  readonly successNotification;

  constructor(page: Page) {
    super(page, RegisterPage.URL);

    this.subtitle = page.getByTestId("register-subtitle");

    this.emailInput = page.getByTestId("email-input");
    this.displayNameInput = page.getByTestId("display-name-input");
    this.passwordInput = page.getByTestId("password-input");

    this.submitButton = page.getByTestId("register-submit-btn");

    this.loginLink = page.getByRole("link", { name: "Login here" });
    this.backToHomeLink = page.getByRole("link", { name: "Back to Home" });

    this.successNotification = page.getByRole("alert");
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillDisplayName(name: string) {
    await this.displayNameInput.fill(name);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async register(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }
}
