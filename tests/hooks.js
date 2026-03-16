import { test } from '@playwright/test';

test.afterEach(async ({ page }, testInfo) => {
  const screenshot = await page.screenshot();
  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });
});