// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test.skip('Check Demo', async ({ page }) => {
  await page.goto('https://demo.automationtesting.in/Register.html');

  await page.getByPlaceholder('First Name').fill('Pankaj');
  // @ts-ignore
  await page.locator("xpath=//input[@placeholder='Last Name']").fill('Surya');


  // Using class attribute
  await page.locator('[ng-model="Adress"]').fill('Your Addresss goes here');
  await page.locator("xpath=//input[@value='Male']").check();
  

  // Assuming the checkbox has a unique id
  await page.click('#checkbox1');
   // Assuming you need to click to open the dropdown
  await page.click('#msdd');
  await page.click("xpath=//a[normalize-space()='English']")

  // Dropdown - Language
  await page.click("xpath=//label[normalize-space()='Languages']")
  await page.locator("xpath=//select[@id='Skills']").selectOption('C');
  
  //AutoSuggestion Dropdown - Country
  await page.click("xpath=//span[@role='combobox']");
  await page.waitForTimeout(2000);
  await page.locator("xpath=//input[@role='textbox']").fill("S");

  const suggestions = await page.$$("xpath=//ul[@id='select2-country-results']//li");
  let selected = false;

  let searchQuery = 'South Africa'; // Replace with the actual country text

  for (const suggestion of suggestions) {
    const suggestionText = await suggestion.textContent();
    
    console.log(suggestionText)
    // Check for an exact match
    if (suggestionText?.trim() === searchQuery) {
      await suggestion.click();
      selected = true;
      break;
    }
  }

  await page.waitForTimeout(2000);

  // Locate the file input element and provide the file path
  const fileInputSelector = "xpath=//input[@id='imagesrc']";  // Adjust the selector based on your HTML structure
  const filePath = 'Pictures\appendchild.jpg';  // Replace with the actual file path

  // Upload the file
  await page.setInputFiles(fileInputSelector, filePath);
  

   await page.waitForTimeout(5000);
  
});


