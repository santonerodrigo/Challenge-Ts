import { Page, expect } from "@playwright/test";
export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async closePopUp() {
    await this.page.locator("//div[contains(.,'popup')]//span").last().click();
  }
  async firstProductFromBestSellers() {
    await this.page
      .locator(
        "//h3[contains(.,'Our Best Sellers')]/following-sibling::div[contains(@class,'products')]/div"
      )
      .first()
      .click();
  }
  async addToCartAndProceedToCheckout() {
    await this.page.getByText("Add to cart").click();
    await this.page
      .locator("//div[@data-testid='Drawer-Sidebar']")
      .first()
      .getByText("Proceed to checkout")
      .click();
  }
  async completePersonalData() {
    await this.page.getByTestId("email-field").fill("qa.mail@gmail.com");
    await this.page.getByTestId("first-name-shipping-field").fill("My Name");
    await this.page.getByTestId("last-name-shipping-field").fill("My Lastname");
    await this.page
      .getByTestId("address-shipping-field")
      .fill("123 William Street");
    await this.page.getByTestId("apt-shipping-field").fill("Apt 1");
    await this.page.getByTestId("city-shipping-field").fill("New York");
    await this.page.getByTestId("zipcode-shipping-field").fill("10038");
    await this.page.getByTestId("phone-shipping-field").fill("1234567890");
    await this.page.getByTestId("state-field").click();
    await this.page.getByRole("option").getByText("New York").click();
    await expect(
      this.page.getByText("Standard Delivery (4-8 business days)")
    ).toBeVisible();
  }
  async completeCardData() {
    const frame = await this.page.frameLocator(
      "iframe[title='Secure card number input frame']"
    );
    const frame2 = await this.page.frameLocator(
      "iframe[title='Secure expiration date input frame']"
    );
    const frame3 = await this.page.frameLocator(
      "iframe[title='Secure CVC input frame']"
    );
    await frame
      .getByPlaceholder("Card number")
      .pressSequentially("1234 1234 1234 1234");
    await expect(
      this.page.getByText("Your card number is invalid.")
    ).toBeVisible();
    await frame2.getByPlaceholder("MM / YY").fill("01 / 25");
    await frame3.getByPlaceholder("CVV").fill("999");
    await this.page.getByPlaceholder("Name on card").fill("Name Lastname");
  }
  async completeOrder() {
    await expect(this.page).toHaveURL(new RegExp(".*hc/checkout/.*"));
    await this.page.waitForTimeout(1000);
    await this.page.getByText("Complete order").click();
  }
}
