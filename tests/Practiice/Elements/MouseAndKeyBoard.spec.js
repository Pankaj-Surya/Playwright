const {test, chromium, expect} = require('@playwright/test')

test('mouse actions', async ({page})=>{
    await page.goto("https://www.google.com/")
    await expect(page).toHaveTitle("Google")



})


test.only('new window', async ()=>{
    // await page.goto("https://www.google.com/")
    // await expect(page).toHaveTitle("Google")

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://demo.automationtesting.in/Windows.html")
     
    //await page1.pause();
    
    // make promise before click on link
    const pagePromise = await context.waitForEvent('page')
    await page1.click("//a[@href='http://www.selenium.dev']//button[@class='btn btn-info'][normalize-space()='click']")
    
    // create page from promise
    const newPage = await pagePromise;
    await newPage.click("xpath= //span[normalize-space()='Projects']")
  
    //await page1.frameLocator()
    await expect.soft(page1).toHaveTitle("Google")
    await page1.waitForTimeout(3000);

})

