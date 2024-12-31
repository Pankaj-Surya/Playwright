
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');


// test.describe.configure( {mode: 'parallel'})

test('Slider Test', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://demoqa.com/tool-tips');

    // i want move price range slider by using dragTo
    await page.locator("//input[@type='range']")

 
})
