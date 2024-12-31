// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test('Check Demo-1', async ({ page }) => {
  await page.goto('https://demo.automationtesting.in/Register.html');
})