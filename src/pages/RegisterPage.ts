import { Page } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly subtitle;
  readonly emailInput;
  readonly displayNameInput;
  readonly passwordInput;
  readonly submitButton;
  readonly loginLink;
  readonly backToHomeLink;
  readonly successNotification;

  constructor(page: Page) {
    this.page = page;

    this.subtitle = page.getByTestId("register-subtitle");

    this.emailInput = page.getByTestId("email-input");
    this.displayNameInput = page.getByTestId("display-name-input");
    this.passwordInput = page.getByTestId("password-input");

    this.submitButton = page.getByTestId("register-submit-btn");

    this.loginLink = page.getByRole("link", { name: "Login here" });
    this.backToHomeLink = page.getByRole("link", { name: "Back to Home" });

    this.successNotification = page.getByRole("alert");
  }

  async goto() {
    await this.page.goto("/register.html");
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
