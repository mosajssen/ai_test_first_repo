import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { URLs } from "../urls";

export class HomePage extends BasePage {
  static readonly URL = URLs.home;

  constructor(page: Page) {
    super(page, HomePage.URL);
  }
}
