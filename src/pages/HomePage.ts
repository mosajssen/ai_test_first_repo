import { Page } from "@playwright/test";

import { URLs } from "../urls";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  static readonly URL = URLs.home;

  constructor(page: Page) {
    super(page, HomePage.URL);
  }
}
