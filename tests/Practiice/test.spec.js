const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { escape } = require('querystring');


test.skip("Firt Test",async ({page})=>{
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  await page.waitForTimeout(5000);

})

test("Second Test",async ()=>{
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator("//input[@name='username']").fill("rahulshettyacademy");
    await page.locator("//input[@name='password']").fill("learning");
    await page.locator("//input[@type='radio']").nth(1).click();
    expect(page.locator("//input[@type='radio']").nth(1)).toBeChecked();
    await page.locator('css=#okayBtn').click();
    await page.locator("select[class='form-control']").click();
    await page.locator("select[class='form-control']").selectOption("Consultant")
  
    await page.locator("css=#terms").click();
    await page.getByRole('button',{ name: 'Sign In' }).click();
    //await page.toHave
    expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop");
     await page.screenshot("{ path: './screenshots/myimage.png', fullPage: true}");
     //console.log(buffer.toString('base64'));
    await page.waitForTimeout(5000);
  })