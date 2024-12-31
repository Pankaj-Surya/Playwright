const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../../../utils/APIUtils');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
  console.log(response)
})

//create order is success
test("Network Interception - Place the order", async ({page}) => {
   await page.addInitScript(value =>{
    window.localStorage.setItem("token", value)
   }, response.token)

   await page.goto("https://rahulshettyacademy.com/client")
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
        const res = await page.request.fetch(route.request())
        let body = JSON.stringify(fakePayLoadOrders)
        route.fulfill(
            {
                res,
                body,
            }
        )
         //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    } )

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    await page.pause();
    console.log(await page.locator(".mt-4").textContent());

})
