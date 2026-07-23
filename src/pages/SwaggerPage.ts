import { Page } from "@playwright/test";
import { URLs } from "../urls";
import { BasePage } from "./BasePage";

export class SwaggerPage extends BasePage {
  static readonly URL = URLs.swagger;

  constructor(page: Page) {
    super(page, SwaggerPage.URL);
  }
}
