import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.automationtesting.in/Register.html');
  await page.getByRole('link', { name: 'SwitchTo' }).click();
  await page.getByRole('link', { name: 'Frames' }).click();
  await page.getByRole('link', { name: 'Single Iframe' }).click();
  await page.locator('section').click();
  await page.frameLocator('iframe[name="SingleFrame"]').locator('html').click();
  await page.frameLocator('iframe[name="SingleFrame"]').locator('div').nth(1).click();
  await page.frameLocator('iframe[name="SingleFrame"]').getByRole('textbox').click();
  await page.frameLocator('iframe[name="SingleFrame"]').getByRole('textbox').fill('Hello Simgle Frame');
  await page.frameLocator('iframe[name="SingleFrame"]').locator('html').click();
  await page.getByRole('link', { name: 'Iframe with in an Iframe' }).click();
  await page.frameLocator('#Multiple >> internal:text="<p>Your browser does not"i').locator('div').first().click();
  await page.frameLocator('#Multiple >> internal:text="<p>Your browser does not"i').frameLocator('internal:text="<p>Your browser does not"i').locator('div').nth(1).click();
  await page.frameLocator('#Multiple >> internal:text="<p>Your browser does not"i').frameLocator('internal:text="<p>Your browser does not"i').locator('div').filter({ hasText: 'iFrame Demo' }).click();
  await page.frameLocator('#Multiple >> internal:text="<p>Your browser does not"i').frameLocator('internal:text="<p>Your browser does not"i').getByRole('textbox').click();
  await page.frameLocator('#Multiple >> internal:text="<p>Your browser does not"i').frameLocator('internal:text="<p>Your browser does not"i').getByRole('textbox').fill('Hello');
});