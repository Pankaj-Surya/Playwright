import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.automationtesting.in/Register.html');
  await page.getByRole('link', { name: 'SwitchTo' }).click();
  await page.getByRole('link', { name: 'Windows' }).click();
  await page.getByRole('link', { name: 'Open New Tabbed Windows' }).click();
  //
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'click' }).click();
  const page1 = await page1Promise;
  await page1.getByText('What you do with that power').click();
  // await page.getByRole('link', { name: 'Open New Seperate Windows' }).click();
  await page.getByRole('link', { name: 'Open New Seperate Windows' }).click();
  await page.getByText('click the button to open a').click();

  //
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'click' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('heading', { name: 'Getting Started' }).click();
  await expect(page2.getByRole('heading', { name: 'Getting Started' })).toBeVisible();
  await page.getByRole('link', { name: 'Open Seperate Multiple Windows' }).click();
  await page.getByText('Click the button to open multiple windows').click();
 
  //
  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'click' }).click();
  const page4 = await page4Promise;
  await page4.getByRole('heading', { name: 'Selenium Level Sponsors' }).click();
  await page.getByRole('link', { name: 'WebTable' }).click();
  await page.getByLabel('items per page').selectOption('number:20');
  await page.getByRole('rowgroup').nth(1).click();
});