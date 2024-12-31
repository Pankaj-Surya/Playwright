const { test, chromium } = require("@playwright/test")

test('Single Frame', async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto("https://demo.automationtesting.in/Frames.html");

    await page.locator("//a[@href='#Single']").click();

    // Switch to the single frame using frameLocator
    const frame = page.frameLocator("iframe[id='singleframe']");

    // Locate the h5 element inside the frame
    const text = await frame.locator("h5").textContent();

    console.log(text);
})


test.only('Nested Frame', async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto("https://demo.automationtesting.in/Frames.html");

    await page.locator("//a[@href='#Multiple']").click();

    // Switch to the single frame using frameLocator
    const parentFrame = await page.frameLocator("//iframe[@src='MultipleFrames.html']");
    // Locate the h5 element inside the frame
    const text = await parentFrame.locator("h5").textContent();

    console.log("Parent : ",text);
    
    const childFrame = await parentFrame.frameLocator("//iframe[@src='SingleFrame.html']")
   
    await childFrame.locator("//input").fill("pankaj")
   
    // Locate the h5 element inside the frame
    const text2 = await childFrame.locator("h5").textContent();

    console.log("Child : ",text2);


})