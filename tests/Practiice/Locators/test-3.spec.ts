import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.automationtesting.in/Register.html');
  await page.getByText('Drag and Drop').click();
  await page.getByRole('link', { name: 'Interactions' }).click();
  await page.getByText('Drag and Drop').click();
  await page.getByRole('link', { name: 'Static' }).click();
  await page.locator('.container-fluid > .row').first().click();
  await page.locator('#angular').click();
  await page.locator('#angular').click();
  await page.locator('#dragarea').click();
  await page.locator('#dragarea').click();
  await page.locator('#mongo').click();
  await page.locator('#node').click();
  await page.locator('#angular').click();
  await page.locator('#dragarea').click();
  await page.locator('#droparea').click();
  await page.getByRole('link', { name: 'Interactions' }).click();
  await page.getByRole('link', { name: 'Dynamic' }).click();
  await page.locator('#dragarea').click();
  await page.locator('#droparea').click();
  await page.locator('#droparea').click();
  await page.locator('#droparea').click({
    clickCount: 3
  });
  await page.locator('#node').click();
  await page.locator('#mongo').click();
  await page.locator('#angular').click();
  await page.locator('#angular').click({
    button: 'right'
  });
  await page.locator('#angular').click();
  await page.locator('#mongo').click({
    modifiers: ['Control']
  });
});