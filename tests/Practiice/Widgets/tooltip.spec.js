const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');


// test.describe.configure( {mode: 'parallel'})

test('Tooltip Test', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://demoqa.com/tool-tips');
    await page.locator("//button[@id='toolTipButton']").hover();

    // Wait for the tooltip to appear and retrieve its content
    const tooltip = await page.locator("//div[@id='buttonToolTip']//div[@class='tooltip-inner']");
    await tooltip.waitFor(); // Ensures the tooltip is visible

    const tooltipText = await tooltip.textContent();
    console.log("Tooltip text:", tooltipText);

})


test.only('Tooltip Field Test', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://demoqa.com/tool-tips');
    await page.locator("//input[@id='toolTipTextField']").hover();

    // Wait for the tooltip to appear and retrieve its content
    const tooltip = await page.locator("//div[@id='buttonToolTip']//div[@class='tooltip-inner']");
    await tooltip.waitFor(); // Ensures the tooltip is visible

    const tooltipText = await tooltip.textContent();
    console.log("Tooltip text:", tooltipText);

})