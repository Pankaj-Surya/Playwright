const { test,expect } = require('@playwright/test');


//  chdck if orderId one person can we inject into the other user
// intercept request
test('@QW Security test request intercept', async ({ page }) => {

    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.pause();    
    await page.locator("button[routerlink*='myorders']").click();
    // if this request hit -> order/get-orders-details?id=* -> replace/intercept with -> ecom/order/get-orders-details?id=621661f884b053f6765465b6
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})


//test.use({ browserName: 'webkit'});
// abort/block some request file type
test.only('@API Browser Context-Validating Error login', async ({browser})=>
{
  
     const context = await browser.newContext();
     const page =  await context.newPage();
     page.pause()
     page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
     const userName = page.locator('#username');
     const signIn = page.locator("#signInBtn");
     const cardTitles =  page.locator(".card-body a");
     page.on('request',request=> console.log("request Url : ",request.url()));
     page.on('response',response=> console.log("response Url : ", response.url(), response.status()));
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     console.log(await page.title());
     //css 
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   //type - fill
   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await signIn.click();
   console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  
  console.log("All Title : ", allTitles);

});