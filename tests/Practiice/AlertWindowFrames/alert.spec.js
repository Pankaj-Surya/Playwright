// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');


test.skip('Alert with OK', async ({page}) =>{
   await page.goto('https://demo.automationtesting.in/Alerts.html');
   await page.click("xpath=//a[normalize-space()='Alert with OK']");
   await page.click("xpath=//button[contains(text(),'click the button to display an')]");
   page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
   });
   
   await page.waitForTimeout(2000);
   //  await page.waitForTimeout(5000);
})


test.skip('Alert with OK & Cancel', async ({page}) =>{
   await page.goto('https://demo.automationtesting.in/Alerts.html');
  

   await page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
  });

  await page.click("xpath=//a[normalize-space()='Alert with OK & Cancel']");
  await page.click("xpath=//button[normalize-space()='click the button to display a confirm box']");
   const txt = await page.locator("xpath=//p[@id='demo']").textContent();
   console.log(txt)
   await page.waitForTimeout(5000);
})


test('Alert with Textbox', async ({page}) =>{
   await page.goto('https://demo.automationtesting.in/Alerts.html');
  

   await page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept("auto pankaj");
  });

  await page.click("xpath=//a[normalize-space()='Alert with Textbox']");
  await page.click("xpath=//button[normalize-space()='click the button to demonstrate the prompt box']");
   const txt = await page.locator("xpath=//p[@id='demo1']").textContent();
   console.log(txt)
   await page.waitForTimeout(5000);
})