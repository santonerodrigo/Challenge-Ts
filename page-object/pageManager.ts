import { Page, expect } from "@playwright/test";
import { BasePage } from "../page-object/basePage";

export class PageManager {
  readonly page: Page;
  readonly basePage: BasePage;
  constructor(page: Page) {
    this.page = page;
    this.basePage = new BasePage(this.page);
  }
  onBasePage() {
    return this.basePage;
  }
}
