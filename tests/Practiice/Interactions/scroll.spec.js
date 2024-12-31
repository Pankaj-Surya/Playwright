const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');


// test.describe.configure( {mode: 'parallel'})

test('Scroll Test', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://playwright.dev/docs/input#drag-and-drop');


    // Wait for the tooltip to appear and retrieve its content
    const footer = await page.locator("//div[@class='footer__copyright']")
    await footer.scrollIntoViewIfNeeded();
    const text = await footer.textContent();
    console.log("Footer text:", text);

    await page.waitForTimeout(3000)

})
