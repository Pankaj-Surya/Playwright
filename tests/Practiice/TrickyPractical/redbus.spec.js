const { chromium, test } = require("@playwright/test")


test("Frame Test", async () => {
    const browser = await chromium.launch({
        args: ['--start-maximized']
    });
    const ctx = await browser.newContext({
        viewport: null, 
    });

    const page = await ctx.newPage();

    // Make sure to set the viewport to null to prevent it from shrinking
    //await page.setViewportSize({ width: 1920, height: 1080 });
    
    await page.goto("https://www.redbus.in/");

    await page.locator("//input[@id='src']").fill("Indira Gandhi International Airport, Delhi");

    await page.locator("//input[@id='dest']").fill("Goa sight seeing");

    // calender icon
    await page.locator("//i[@class='sc-cSHVUG NyvQv icon icon-datev2']").click();
    //span[contains(@class,'DayTiles__CalendarDaysSpan-sc-1xum02u-1 fgdqFw']


    const time = new Date();
    const currentDate = time.getDate();
    const nextDate = currentDate + 2;
    console.log("Next Date ", nextDate); //27

    await page.locator(`//span[contains(@class,'DayTiles__CalendarDaysSpan') and text()='${nextDate}']`).click();

    await page.locator("//button[@id='search_button']").click();

    const list = await page.locator("//div[@class='clearfix row-one ']").waitFor({ state: "visible" })

    for (let ele of list) {
        const price = await ele.locator("//div[contains(@class,'column-seven')]").textConhtent();
        console.log(price);
    }

    await page.waitForTimeout(6000);

})