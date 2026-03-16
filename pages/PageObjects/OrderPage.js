export class OrderPage {
    constructor(page) {
        this.page = page;
        this.orderConfirmation = page.locator(".hero-primary");
    }

    async verifyOrderSuccess() {
        await this.orderConfirmation.waitFor({ state: 'visible' });
        const confirmationText = (await this.orderConfirmation.textContent())?.trim() ?? '';
        console.log("Order Confirmation:", confirmationText);
        return confirmationText.toLowerCase().includes("thankyou");
    }
}
