# Playwright JS Guide

This README file provides a quick reference for using Playwright with examples for various UI elements, interactions, and alerts. The examples cover common web automation scenarios.

## Setup
1. Install Playwright:
   ```bash
   npm init playwright@latest
   ```
2. Launch the Playwright Test Runner:
   ```bash
   npx playwright test
   ```

---

## Browser Context and Launch Example

### Launch Browser and New Context
```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  // Perform actions
  await browser.close();
})();
```

---

## Fixtures
Playwright test runner provides built-in fixtures for browser and context management.

### Example with Fixtures
```javascript
const { test, expect } = require('@playwright/test');

test('Test with fixtures', async ({ page }) => {
  await page.goto('https://example.com');
  await page.fill('#textbox', 'Sample Text');
  const value = await page.inputValue('#textbox');
  expect(value).toBe('Sample Text');
});
```

---

## Parallel Testing
Playwright supports parallel execution of tests to optimize testing time.

### Example Parallel Configuration
1. Update `playwright.config.js`:
   ```javascript
   module.exports = {
     projects: [
       { name: 'Chromium', use: { browserName: 'chromium' } },
       { name: 'Firefox', use: { browserName: 'firefox' } },
       { name: 'Webkit', use: { browserName: 'webkit' } },
     ],
   };
   ```
2. Run tests:
   ```bash
   npx playwright test --parallel
   ```

---

## Hooks
Playwright provides hooks to perform actions at different stages of the test lifecycle.

### Using Hooks
```javascript
const { test } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.com');
});

test.afterEach(async ({ page }) => {
  console.log('Test completed');
});

test('Example Test', async ({ page }) => {
  await page.fill('#input', 'Sample');
  await page.click('#submit');
});
```

---

## Important Commands and Notes

### Assertions
```javascript
await expect(page.locator('#element')).toHaveText('Expected Text');
await expect(page).toHaveTitle('Expected Title');
```

### Handling Alerts
```javascript
page.on('dialog', async dialog => {
  console.log(dialog.message());
  await dialog.accept();
});
await page.click('#alertButton');
```

### File Upload
```javascript
await page.setInputFiles('#upload', 'path/to/file.txt');
```

### File Download
```javascript
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.click('#downloadButton')
]);
const filePath = await download.path();
console.log(`File downloaded to: ${filePath}`);
```

### Wait for Network Idle
```javascript
await page.waitForLoadState('networkidle');
```

### Screenshots
```javascript
await page.screenshot({ path: 'screenshot.png' });
```

### Tracing
1. Start tracing:
   ```javascript
   await page.tracing.start({ screenshots: true, snapshots: true });
   ```
2. Stop and save trace:
   ```javascript
   await page.tracing.stop({ path: 'trace.zip' });
   ```

---

## Elements

### Text Box
```javascript
await page.fill('#textbox', 'Sample Text');
const value = await page.inputValue('#textbox');
expect(value).toBe('Sample Text');
```

### Check Box
```javascript
await page.check('#checkbox');
expect(await page.isChecked('#checkbox')).toBeTruthy();
```

### Radio Button
```javascript
await page.check('#radioButton');
expect(await page.isChecked('#radioButton')).toBeTruthy();
```

### Web Tables
```javascript
const rowData = await page.locator('table#exampleTable >> tr:nth-child(2)').innerText();
console.log(rowData);
```

### Buttons
```javascript
await page.click('#button');
```

### Links
```javascript
await page.click('a#exampleLink');
```

### Broken Links - Images
```javascript
const response = await page.goto('https://example.com/broken-link');
expect(response.status()).not.toBe(404);
```

### Upload and Download
```javascript
await page.setInputFiles('#upload', 'path/to/file.txt');
await page.locator('#download').click();
```

### Dynamic Properties
```javascript
await page.waitForSelector('#dynamicElement');
await page.click('#dynamicElement');
```

---

## Alerts, Frame & Windows

### Browser Windows
```javascript
const [newPage] = await Promise.all([
  page.waitForEvent('popup'),
  page.click('#newWindowButton')
]);
await newPage.waitForLoadState();
```

### Frames
```javascript
const frame = page.frame({ name: 'frameName' });
await frame.fill('#input', 'Text in frame');
```

### Nested Frames
```javascript
const parentFrame = page.frame({ name: 'parentFrame' });
const childFrame = parentFrame.frame({ name: 'childFrame' });
await childFrame.fill('#input', 'Nested frame text');
```

### Modal Dialogs
```javascript
await page.click('#openModal');
await page.waitForSelector('#modalDialog');
await page.click('#closeModal');
```

---

## Widgets

### Accordion
```javascript
await page.click('#accordionHeader');
await page.waitForSelector('#accordionContent');
```

### Auto Complete
```javascript
await page.fill('#autoComplete', 'Sample');
await page.press('#autoComplete', 'ArrowDown');
await page.press('#autoComplete', 'Enter');
```

### Date Picker
```javascript
await page.fill('#datePicker', '2025-01-01');
```

### Slider
```javascript
await page.dragAndDrop('#slider', { x: 50, y: 0 });
```

### Progress Bar
```javascript
await page.click('#startProgress');
await page.waitForSelector('#progressBar[aria-valuenow="100"]');
```

### Tabs
```javascript
await page.click('#tab2');
```

### Tool Tips
```javascript
await page.hover('#tooltipButton');
const tooltip = await page.locator('#tooltipText').innerText();
console.log(tooltip);
```

### Menu
```javascript
await page.hover('#menuButton');
await page.click('#menuOption');
```

### Select Menu
```javascript
await page.selectOption('#selectMenu', 'optionValue');
```

---

## Interactions

### Sortable
```javascript
await page.dragAndDrop('#item1', '#item2');
```

### Selectable
```javascript
await page.click('#selectableItem');
```

### Resizable
```javascript
await page.dragAndDrop('#resizeHandle', { x: 100, y: 50 });
```

### Droppable
```javascript
await page.dragAndDrop('#drag', '#drop');
```

### Draggable
```javascript
await page.dragAndDrop('#draggable', { x: 200, y: 150 });
```
