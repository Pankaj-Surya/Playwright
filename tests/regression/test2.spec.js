// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test('Check Demo-2', async ({ page }) => {
  await page.goto('https://playwright.dev/');
})