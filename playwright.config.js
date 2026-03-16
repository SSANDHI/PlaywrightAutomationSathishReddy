// @ts-check
import { defineConfig } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    video: 'on',   
    trace: 'retain-on-failure',
    channel: 'msedge',
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
  },
});

