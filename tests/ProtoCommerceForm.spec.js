import './hooks.js';
import { test, expect } from '@playwright/test';
import { ProtoCommercePage } from '../pages/ProtoCommercePage.js';

test('ProtoCommerce form - fill, validate, submit', async ({ page }) => {
  test.setTimeout(2 * 60 * 1000);
  const form = new ProtoCommercePage(page);
  const visualPauseMs = 1000;
  const pause = async (label) => {
    console.log(`\n--- ${label} (pause ${visualPauseMs}ms) ---\n`);
    await page.waitForTimeout(visualPauseMs);
  };

  const testData = {
    name: 'SathishReddy',
    email: 'sandhi.019@gmail.com',
    password: 'JobNeed@1234',
    gender: 'Male',
    employmentStatus: 'Student',
    dob: '1997-03-11',
  };

  await form.goto();
  await expect(page).toHaveTitle(/ProtoCommerce/i);
  // Make the browser large so actions are easy to observe in headed mode.
  await page.setViewportSize({ width: 1920, height: 1080 });
  await pause('Page loaded');

  // Fill form
  await form.fillName(testData.name);
  await pause('Filled Name');
  await form.fillEmail(testData.email);
  await pause('Filled Email');
  await form.fillPassword(testData.password);
  await pause('Filled Password');
  await form.setIceCreamPreference(true);
  await pause('Checked IceCream');
  await form.selectGender(testData.gender);
  await pause('Selected Gender');
  await form.selectEmploymentStatusByLabel(testData.employmentStatus);
  await pause('Selected Employment Status');
  await form.fillDob(testData.dob);
  await pause('Filled DOB');

  // Validations (print + assert)
  const nameValue = await form.nameInput.inputValue();
  console.log('Name:', nameValue);
  await expect(form.nameInput).toHaveValue(testData.name);
  await pause('Validated Name');

  // Two-way binding input should mirror the name field
  const bindingValue = await form.nameTwoWayBindingInput.inputValue();
  console.log('Two-way binding name:', bindingValue);
  await expect(form.nameTwoWayBindingInput).toHaveValue(testData.name);
  await pause('Validated Two-way binding');

  const emailValue = await form.emailInput.inputValue();
  console.log('Email:', emailValue);
  await expect(form.emailInput).toHaveValue(testData.email);
  await pause('Validated Email');

  const genderValue = await form.genderSelect.inputValue();
  console.log('Gender value:', genderValue);
  await expect(form.genderSelect).toHaveValue(testData.gender);
  await pause('Validated Gender');

  const dobValue = await form.dobInput.inputValue();
  console.log('DOB:', dobValue);
  await expect(form.dobInput).toHaveValue(testData.dob);
  await pause('Validated DOB');

  // Submit
  await form.submit();
  await pause('Clicked Submit');

  // Validate success message
  await expect(form.successAlert).toBeVisible();
  const successText = (await form.successAlert.textContent())?.trim() ?? '';
  console.log('Success message:', successText);
  await expect(form.successAlert).toContainText(/success/i);
  await pause('Validated Success message');
});

