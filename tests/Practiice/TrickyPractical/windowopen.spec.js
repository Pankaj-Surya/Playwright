const {test, chromium } = require("@playwright/test");
const { console } = require("inspector");


test("Window open", async()=>{
    const browser = await chromium.launch();
    const ctx =  await browser.newContext();
    const page = await ctx.newPage();

    await page.goto("https://demoqa.com/browser-windows");
    

    const [newPage] = await Promise.all([
        ctx.waitForEvent('page'),
        page.locator("//button[@id='tabButton']").click()
    ])

    await newPage.waitForLoadState();

    const text = await newPage.locator("//h1").textContent();
    console.log("text is : "+text);


    const pagef =  await ctx.newPage();
    await pagef.goto("https://www.amazon.in/")

    
})