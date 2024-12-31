const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test('AutoComplete Test', async ({page}) => {

  await page.goto('https://demo.automationtesting.in/AutoComplete.html');

  // Assuming there's an input field with id 'searchbox'
  const searchBoxSelector = '#searchbox';
  const resultSelector = '.ui-menu-item';

  // Type a search query into the input field
  await page.locator(searchBoxSelector).fill('j');

  // Wait for the autocomplete results to appear
  await page.waitForSelector(resultSelector);

  // Get all autocomplete results
  const autocompleteResults = await page.$$(resultSelector);

  // Print the text content of each result
  for (let i = 0; i < autocompleteResults.length; i++) {
    const result = autocompleteResults[i];
    const resultText = await result.textContent();
    console.log(`AutoComplete Result ${i + 1}: ${resultText}`);
  }

  // Close the browser
  await page.close();
});
