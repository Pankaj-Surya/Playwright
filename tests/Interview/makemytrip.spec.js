const { test,chromium } = require("@playwright/test")


test("MakeMyTrip",async()=>{
    // launch the browser
    const browser = await chromium.launch();
    const ctx =  await browser.newContext();
    const page = await ctx.newPage();

    await page.goto("https://www.makemytrip.com/");

    await page.locator("//section[@data-cy='CommonModal_2']//span[@data-cy='closeModal']").waitFor({state:"attached"})

    await page.locator("//section[@data-cy='CommonModal_2']//span[@data-cy='closeModal']").click();

    // From
    await page.locator("//input[@id='fromCity']").waitFor({state:"attached"})
    await page.locator("//input[@id='fromCity']").click()    
    await page.locator("//input[@aria-controls='react-autowhatever-1']").fill("Mumbai");
    await page.locator("(//div[@class='makeFlex column flexOne'])[1]").click()

    // To   
    await page.locator("//input[@id='fromCity']").waitFor({state:"attached"})
    await page.locator("//input[@id='fromCity']").click()    
    await page.locator("//input[@aria-controls='react-autowhatever-1']").fill("Mumbai");
    await page.locator("(//div[@class='makeFlex column flexOne'])[1]").click()



    await page.locator("//input[@id='toCity']").fill("Bengaluru");

    await page.locator("//label[@for='departure']").click();
    
    await page.locator("//div[@class='DayPicker-Day DayPicker-Day--selected']//div[@class='dateInnerCell']").click();

    await page.locator("//p[@data-cy='submit']//a").click();
})