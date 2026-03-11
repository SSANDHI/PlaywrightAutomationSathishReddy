import { test, expect } from '@playwright/test';

test('AC Hi Hello Test', async ({ page }) => {
  // Step 1: Go to https://example.com
  await page.goto('https://example.com');

  // Step 2: Print "AC hi hello" to console
  console.log('AC hi hello');

  // Assertion: Check if the page title contains "Example"
  await expect(page).toHaveTitle(/Example/);
});