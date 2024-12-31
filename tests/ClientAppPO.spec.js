const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { CartPage } = require('../pageobjects/CartPage');


// check   Iamking@000
test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "pankaj1998@gmail.com";
   const password ="Table@123"
   const productName = 'IPHONE 13 PRO';
   
   const loginPage = new  LoginPage(page)
   await loginPage.goto()
   await loginPage.login(email, password)
  
   
   const dasboardPage = new DashboardPage(page)
   //await page.pause();
   await dasboardPage.searchProductAddCart(productName)
   await dasboardPage.navigateToCart()
   
   const cartPage = new CartPage(page)
    await cartPage.VerifyProductIsDisplayed(productName)
   await cartPage.Checkout()


   
   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   //await page.pause();
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor({state : "visible"});
   // await dropdown.getByRole("button",{exact : "India"}).click()
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
   console.log(orderId);
   
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor({state : "visible"});
   const rows = await page.locator("tbody tr");
   
   
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
   
});



