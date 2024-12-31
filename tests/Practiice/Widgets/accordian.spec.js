const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test('Accordion Test', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://demo.automationtesting.in/Accordion.html');
  
    // Updated selectors for accordion headers and content
    const accordionHeaderSelector = '//b';
    const accordionContentSelector = '.panel-body';

    // Wait for the accordion headers to be available
    await page.waitForSelector(accordionHeaderSelector);
  
    // Get all accordion headers
    const accordionHeaders = await page.$$(accordionHeaderSelector);
  
    console.log("accordionHeaders : "+accordionHeaders)
    for (let i = 0; i < accordionHeaders.length; i++) {
        const accordionHeader = accordionHeaders[i];
    
        // Get the text content of the accordion header
        const headerText = await accordionHeader.textContent();
    
        console.log(`Accordion Section ${i + 1} - Header: ${headerText}`);
    
        // Click on the accordion header to toggle its state
        await accordionHeader.click();
    
        // Wait for any animations or content to load after the click
        await page.waitForTimeout(1000); // Adjust the timeout as needed
    
        // Check if the accordion content is visible after clicking
        const accordionContent = await page.$(accordionContentSelector);
        const isContentVisible = await accordionContent.isVisible();
    
        // Get the text content of the accordion content
        const contentText = await accordionContent.textContent();
    
        console.log(`Accordion Section ${i + 1} - Content is visible: ${isContentVisible}`);
        console.log(`Accordion Section ${i + 1} - Body: ${contentText}`);
      }
    
  
    // Close the browser
    await browser.close();
  });
  