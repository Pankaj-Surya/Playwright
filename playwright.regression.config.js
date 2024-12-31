const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/regression', // Directory for regression tests
  retries: 2, // Retry failed tests
  workers: 4, // Number of parallel workers
  use: {
    headless: false, // Run tests in headless mode
  },
});
