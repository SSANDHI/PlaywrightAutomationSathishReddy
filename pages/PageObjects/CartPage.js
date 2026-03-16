export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator("h3"); // includes headings + product titles
        this.checkoutButton = page.locator("text=Checkout");
    }

    async verifyProductInCart(productName) {
        await this.page.locator('div li').first().waitFor();
        const items = (await this.cartItems.allTextContents()).map(t => t.trim()).filter(Boolean);
        console.log("Cart h3 texts:", items);
        return await this.page.locator(`h3:has-text("${productName}")`).isVisible();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
