
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');


test.only('Window Handler', async () => {
  
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://demo.automationtesting.in/Windows.html")
    
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
       page1.click("xpath=//a[@href='http://www.selenium.dev']//button[@class='btn btn-info'][normalize-space()='click']")
      
    ])
    // make promise before click on link
    
    await newPage.click("xpath= //span[normalize-space()='Projects']")
  
   
    await page1.waitForTimeout(3000);
      
    
   // await page.waitForTimeout(5000);
  })
  
  
  
  test.skip('Window Handler1', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://demo.automationtesting.in/Windows.html");
  
    // Click on the link to open a new window
    await page1.click("xpath=//a[@href='http://www.selenium.dev']//button[@class='btn btn-info'][normalize-space()='click']");
  
    // Wait for the new page to be created
    const newPage = await context.waitForEvent('page');
  
    // Perform actions on the new page
    await newPage.click("xpath=//span[normalize-space()='Blog']");
  
    await page1.waitForTimeout(3000);
  });
  
  
  test.skip('Window Handler2', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://demo.automationtesting.in/Windows.html");
  
  
    // Click on the link to open a new window
    //Open New Seperate Window
    await page1.click("xpath=//a[normalize-space()='Open New Seperate Windows']")
    await page1.click("xpath=//button[@class='btn btn-primary']")
    
    // Wait for the new page to be created
    const newPage = await context.waitForEvent('page');
  
    // Perform actions on the new page
    await newPage.click("xpath=//span[normalize-space()='Blog']");
  
    await page1.waitForTimeout(3000);
  });
  
  
  test('Window Handler3', async ({ page }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://demo.automationtesting.in/Windows.html");
  
    // Click on the link to open a new window
    // Open Separate Multiple Windows
    await page1.click("xpath=(//a[normalize-space()='Open Seperate Multiple Windows'])[1]");
    await page1.click("xpath=//button[@onclick='multiwindow()']")
    // Wait for the new page to be created
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
    ]);
  
    // Get all open pages in the context
    const pages = context.pages();
    console.log('No.of tabs: ' + pages.length);
  
      // Switch to the second tab (index 1)
      const desiredTab = pages[1];
      await desiredTab.bringToFront();
  
      await page1.waitForTimeout(3000);
    
      // Perform actions on the new page
      await desiredTab.click("xpath=//img[@id='enterimg']");
    
      await page1.waitForTimeout(3000);
  
    // Close the browser
    await browser.close();
  });
  
  
  