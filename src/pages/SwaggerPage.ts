import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SwaggerPage extends BasePage {
  static readonly URL = "/swagger.html";

  constructor(page: Page) {
    super(page, SwaggerPage.URL);
  }
}
