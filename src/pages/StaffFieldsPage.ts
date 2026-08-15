import { Locator, Page } from "@playwright/test";

import { URLs } from "../urls";
import { BasePage } from "./BasePage";

export class StaffFieldsPage extends BasePage {
  static readonly URL = URLs.staffFields;
  readonly fieldsHeading: Locator;
  readonly staffHeading: Locator;
  readonly animalsHeading: Locator;
  readonly addFieldButton: Locator;
  readonly addFieldModalHeading: Locator;
  readonly fieldNameInput: Locator;
  readonly fieldAreaInput: Locator;
  readonly submitAddFieldButton: Locator;
  readonly fieldAddedMessage: Locator;
  readonly searchFieldsInput: Locator;

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
    this.addFieldButton = page.getByRole("button", { name: "+ Add Field" }).first();
    this.addFieldModalHeading = page.getByRole("heading", { name: "Add Field" });
    this.fieldNameInput = page.getByRole("textbox", { name: "Field Name" });
    this.fieldAreaInput = page.getByRole("spinbutton", { name: "Area (ha)" });
    this.submitAddFieldButton = page
      .locator("#addFieldForm")
      .getByRole("button", { name: "+ Add Field" });
    this.fieldAddedMessage = page.getByText("Field added!");
    this.searchFieldsInput = page.getByRole("textbox", {
      name: "Search fields...",
    });
  }

  async openAddFieldModal() {
    await this.addFieldButton.click();
  }

  async addField(name: string, area: number) {
    await this.fieldNameInput.fill(name);
    await this.fieldAreaInput.fill(area.toString());
    await this.submitAddFieldButton.click();
  }

  async searchFieldByName(name: string) {
    await this.searchFieldsInput.fill(name);
  }

  fieldListItem(name: string) {
    return this.page.locator("li").filter({
      has: this.page.getByText(name, { exact: true }),
    });
  }
}
