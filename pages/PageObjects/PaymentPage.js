export class PaymentPage {
    constructor(page) {
        this.page = page;
        this.creditCardInput = page.locator("//div[contains(text(),'Credit Card Number')]/parent::div/input");
        this.expiryMonth = page.locator("(//select[@class='input ddl'])[1]").first();
        this.expiryYear = page.locator("(//select[@class='input ddl'])[2]").last();
        this.cvvInput = page.locator("//div[@class='title' and contains(text(),'CVV') ]/parent::div/input");
        this.nameOnCard = page.locator("//div[@class='title' and contains(text(),'Name') ]/parent::div/input");
        this.countryInput = page.locator("input[placeholder='Select Country']");
        this.countryResults = page.locator(".ta-results");
        this.placeOrderButton = page.locator("//a[contains(text(),'Place Order ')]");
    }

    async fillPaymentDetails(cardNumber, month, year, cvv, name) {
        await this.creditCardInput.waitFor({ state: 'visible' });
        await this.creditCardInput.fill(cardNumber);
        await this.expiryMonth.selectOption(month);
        await this.expiryYear.selectOption(year);
        await this.cvvInput.fill(cvv);
        await this.nameOnCard.fill(name);

        // Country is required before placing the order
        await this.countryInput.pressSequentially('ind');
        await this.countryResults.waitFor({ state: 'visible', timeout: 60000 });
        await this.countryResults.locator("button").filter({ hasText: ' India' }).first().click();
    }

    async placeOrder() {
        await this.placeOrderButton.waitFor({ state: 'visible' });
        await this.placeOrderButton.click();
    }
}

