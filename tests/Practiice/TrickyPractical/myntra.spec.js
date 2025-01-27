const { test,webkit } = require("@playwright/test")


test.describe("Myntra TestSuite",()=>{

    test("Launch",async ()=>{
        const browser = await webkit.launch();
        const ctx = await browser.newContext();
        const page = await ctx.newPage();


        await page.goto("https://www.myntra.com/men-tshirts");

        //ul[@class='results-base']//li//a//div//h3
        await page
    })
})