import { test, expect } from "@playwright/test";
import { PageManager } from "../page-object/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://www.shapermint.com");
});

test("test 1", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.onBasePage().closePopUp();
  await pm.onBasePage().firstProductFromBestSellers();
  await pm.onBasePage().addToCartAndProceedToCheckout();
  await pm.onBasePage().completeCardData();
  await pm.onBasePage().completePersonalData();
  await pm.onBasePage().completeOrder();
});
