const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayload = { "userEmail": "anshika@gmail.com", "userPassword": "Iamking@000" }
const orderPayload = { "country": "British Indian Ocean Territory", "productOrderedId": "6581ca979fd99c85e8ee7faf" }

let response;

//  test.beforeAll(async()=>{
//     //Login API
//     const apiContext = await request.newContext()
//     const loginRes = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
//     {
//         data : loginPayload
//     })
//     expect(loginRes.ok()).toBeTruthy()

//     const loginResJSON = await loginRes.json()
//     //console.log(loginResJSON)
//     token = loginResJSON.token
//     console.log(token)

//  })

test.beforeAll(async () => {
   const apiContext = await request.newContext()
   const apiUtils = new APIUtils(apiContext,loginPayload)
   // reponse {token, orderid}
   response = await apiUtils.createOrder(orderPayload)
})


test.only('@API Client App login', async ({ page }) => {

   //  const apiContext = await request.newContext()
   //  const apiUtils = new APIUtils(apiContext)
   //  token =await apiUtils.getToken(loginPayload)
   //  console.log("Token from method : ",token)
   page.addInitScript(value => {
      window.localStorage.setItem('token', value)
   }, response.token)

   //  let orderRes = await apiUtils.createOrder(orderPayload)
   //  console.log("Order from res ", orderRes)


   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'IPHONE 13 PRO';
   const products = page.locator(".card-body");
   //    await page.goto("https://rahulshettyacademy.com/client");
   //    await page.locator("#userEmail").fill(email);
   //    await page.locator("#userPassword").type("Iamking@000");
   //    await page.locator("[value='Login']").click();


   await page.waitForLoadState('networkidle');
   await page.goto("https://rahulshettyacademy.com/client/")
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }

   await page.locator("[routerlink*='cart']").click();
   //await page.pause();

   await page.locator("div li").first().waitFor({ state: "visible" });
   const bool = await page.locator("h3:has-text('" + productName + "')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").type("ind");

   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
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
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
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

// for this testcase we dont need to check login -> Add to Cart -> Create Order  UI Automation
// Instead PreCondtion :- Create Order -> check order ID  
test("Verify if order is created is Showing ", async ({ page }) => {

   page.addInitScript(value => {
      window.localStorage.setItem('token', value);
   }, response.token);

   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   //await page.pause();
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
})