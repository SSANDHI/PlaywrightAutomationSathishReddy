export class ProtoCommercePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Form fields
    this.nameInput = page.locator("input[name='name']").first();
    this.emailInput = page.locator("input[name='email']");
    this.passwordInput = page.locator('#exampleInputPassword1');
    this.iceCreamCheck = page.locator('#exampleCheck1');
    this.genderSelect = page.locator('#exampleFormControlSelect1');
    this.dobInput = page.locator("input[name='bday']");

    // Misc / validations
    this.nameTwoWayBindingInput = page.locator("input[name='name']").nth(1);
    this.successAlert = page.locator('.alert.alert-success');

    // Actions
    this.submitButton = page.locator("input[type='submit'], button[type='submit']");
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/angularpractice/');
  }

  async fillName(name) {
    await this.nameInput.fill(name);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async setIceCreamPreference(checked = true) {
    if (checked) await this.iceCreamCheck.check();
    else await this.iceCreamCheck.uncheck();
  }

  async selectGender(genderLabel) {
    await this.genderSelect.selectOption({ label: genderLabel });
  }

  async selectEmploymentStatusByLabel(label) {
    const option = this.page
      .locator('.form-check-inline')
      .filter({ hasText: label })
      .locator('input[name="inlineRadioOptions"]');
    await option.check();
  }

  async fillDob(yyyyMmDd) {
    await this.dobInput.fill(yyyyMmDd);
  }

  async submit() {
    await this.submitButton.click();
  }
}

