import { Page } from "@playwright/test";
import { URLs } from "../urls";
import { BasePage } from "./BasePage";

export class DocsPage extends BasePage {
  static readonly URL = URLs.docs;
  readonly subtitle;

  constructor(page: Page) {
    super(page, DocsPage.URL);

    this.subtitle = page.locator(".docs-header-subtitle");
  }
}
