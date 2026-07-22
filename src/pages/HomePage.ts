import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  static readonly URL = "/";

  constructor(page: Page) {
    super(page, HomePage.URL);
  }
}
