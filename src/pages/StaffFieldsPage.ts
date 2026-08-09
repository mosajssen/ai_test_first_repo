import { Locator, Page } from "@playwright/test";
import { URLs } from "../urls";
import { BasePage } from "./BasePage";

export class StaffFieldsPage extends BasePage {
  static readonly URL = URLs.staffFields;
  readonly fieldsHeading: Locator;
  readonly staffHeading: Locator;
  readonly animalsHeading: Locator;

  constructor(page: Page) {
    super(page, StaffFieldsPage.URL);

    this.fieldsHeading = page.getByRole("heading", {
      name: "Fields",
      level: 3,
    });
    this.staffHeading = page.getByRole("heading", { name: "Staff", level: 3 });
    this.animalsHeading = page.getByRole("heading", {
      name: "Animals (groups)",
      level: 3,
    });
  }
}
