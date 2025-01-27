const {test,expect} = require('@playwright/test')
const fs = require('fs')
const path = require('path')

const screenshotsFolder = path.join(process.cwd(), '../../../screenshots');

test("Screenshot & Visual comparision",async({page})=>
{
      // Define the screenshots folder in the project root
     
     
        if (!fs.existsSync(screenshotsFolder)) {
            fs.mkdirSync(screenshotsFolder, { recursive: true });
        }
    
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    
    // Partial/Element Screenshot 
    await page.locator('#displayed-text').screenshot({ path: path.join(screenshotsFolder, 'partialScreenshot.png') });
    await page.locator("#hide-textbox").click();

    // Full page
    await page.screenshot( { path: path.join(screenshotsFolder, 'screenshot.png') });
    await expect(page.locator("#displayed-text")).toBeHidden();
});

//screenshot -store -> screenshot -> 
test.only('visual',async({page})=>
{
    //make payment -when you 0 balance
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})