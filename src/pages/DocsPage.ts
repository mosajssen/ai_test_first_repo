import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DocsPage extends BasePage {
  static readonly URL = "/docs.html";
  readonly subtitle;

  constructor(page: Page) {
    super(page, DocsPage.URL);

    this.subtitle = page.locator(".docs-header-subtitle");
  }
}
