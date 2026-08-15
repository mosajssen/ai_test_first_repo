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
  readonly addAnimalButton: Locator;
  readonly addAnimalModalHeading: Locator;
  readonly addAnimalModal: Locator;
  readonly animalTypeSelect: Locator;
  readonly animalAmountInput: Locator;
  readonly submitAddAnimalButton: Locator;
  readonly searchAnimalsInput: Locator;

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
    this.addFieldButton = page.locator("#openAddFieldModal");
    this.addFieldModalHeading = page.getByRole("heading", { name: "Add Field" });
    this.fieldNameInput = page.getByRole("textbox", { name: "Field Name" });
    this.fieldAreaInput = page.getByRole("spinbutton", { name: "Area (ha)" });
    this.submitAddFieldButton = page
      .locator("#addFieldForm")
      .getByRole("button", { name: "Add Field" });
    this.fieldAddedMessage = page.getByText("Field added!");
    this.searchFieldsInput = page.getByRole("textbox", {
      name: "Search fields...",
    });
    this.addAnimalButton = page.locator("#openAddAnimalModal");
    this.addAnimalModalHeading = page.getByRole("heading", {
      name: "Add Animal",
    });
    this.addAnimalModal = page.locator("#addAnimalModal");
    this.animalTypeSelect = page
      .locator("#addAnimalForm")
      .locator("#animalType");
    this.animalAmountInput = page
      .locator("#addAnimalForm")
      .getByRole("spinbutton", { name: "Amount" });
    this.submitAddAnimalButton = page
      .locator("#addAnimalForm")
      .getByRole("button", { name: "Add Animal" });
    this.searchAnimalsInput = page.getByRole("textbox", {
      name: "Search animals...",
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

  async openAddAnimalModal() {
    await this.addAnimalButton.click();
  }

  async addAnimal(type: string, amount: number) {
    await this.animalTypeSelect.selectOption(type);
    await this.animalAmountInput.fill(amount.toString());
    await this.submitAddAnimalButton.click();
  }

  async searchAnimalByType(type: string) {
    await this.searchAnimalsInput.fill(type);
  }

  animalListItem(type: string, amount: number) {
    return this.page.locator("#animalsList li").filter({
      has: this.page.getByText(type, { exact: true }),
    }).filter({
      hasText: amount.toString(),
    });
  }
}
