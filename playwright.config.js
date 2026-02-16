// @ts-check
const { devices, chromium } = require('@playwright/test');


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 50 * 1000,
  expect : {
  timeout: 10000
  },
  use: {
    browserName: 'chromium',
    headless: false
  },
  reporter: 'html',
  
};

module.exports = config;
