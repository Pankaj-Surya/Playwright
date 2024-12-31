const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');


test('Extract Table', async ({ page }) => {
  await page.goto('https://cosmocode.io/automation-practice-webtable/');

  
  // Specify the selector for the table
  const tableSelector = '//tbody/tr[position() > 1]';  // Replace with the actual selector for your table

  // Get the data from the table
  const tableData = await page.$$eval(`${tableSelector}`, rows => {
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('td:not(:first-child)');
      return Array.from(columns, column => column.textContent);
    });
  });

   console.table(tableData);
    
   await page.waitForTimeout(5000);
  
});
