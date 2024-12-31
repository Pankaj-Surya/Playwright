const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Root directory for tests
  timeout: 30 * 1000, // 30 seconds timeout for each test
  retries: 1, // Retry failed tests once
  workers: 4, // Number of parallel workers (adjust based on your system)
  use: {
    headless: true, // Run tests in headless mode
  },
  projects: [
    {
      name: 'regression',
      testDir: './tests/regression',
    },
    // {
    //   name: 'sanity',
    //   testDir: './tests/sanity',
    // },
    // {
    //   name: 'smoke',
    //   testDir: './tests/smoke',
    // },
  ],
});
