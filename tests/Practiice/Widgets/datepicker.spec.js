const { test, chromium, firefox } = require("@playwright/test")



test.describe.serial("Test Datepicker", () => {

    let page = null;
    test.beforeAll("Launch browser", async () => {

        const browser = await firefox.launch();
        const ctx = await browser.newContext();
        page = await ctx.newPage();
        await page.goto("https://jqueryui.com/datepicker/");
    })


    test("Do Select Date", async () => {
        const targetDate = "20";
        const targetMonth = "February";
        const targetYear = "2026";
        const frame = await page.frameLocator("//iframe[@class='demo-frame']")
        //await page.locator("//iframe[@class='demo-frame']").contetFrame();
        await frame.locator("//input[@id='datepicker']").click();


        // Loop to navigate through the calendar months
        while (true) {
            const currentMonth = await frame.locator('.ui-datepicker-month').textContent();
            const currentYear = await frame.locator('.ui-datepicker-year').textContent();

            if (currentMonth === targetMonth && currentYear === targetYear) {
                break; // Stop if the correct month and year are found
            }

            // Click the "next" button to navigate to the next month
            await frame.locator('.ui-icon-circle-triangle-e').click();

            // Wait for the calendar to update
            await frame.locator('.ui-datepicker-month').waitFor();
        }

        // Select the target date
        await frame.locator(`.ui-datepicker-calendar a:text("${targetDate}")`).click();

        await page.waitForTimeout(5000)

    })
})

