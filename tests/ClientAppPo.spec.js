import { test, expect } from '@playwright/test';
import { POManager } from '../pages/PageObjects/POManager.js';

test.only('Client App Playwright test', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboard = poManager.getDashBoard();
    const cartPage = poManager.getCartPage();
    const paymentPage = poManager.getPaymentPage();
    const orderPage = poManager.getOrderPage();

    const userName = 'sandhi.019@gmail.com';
    const password = 'JobNeed@1234';
    const productName = 'ZARA COAT 3';

    // Login
    await loginPage.goto();
    await loginPage.validateLoginPage(userName, password);
    await expect(page).toHaveTitle("Let's Shop");

    // Add product to cart
    await dashboard.searchProductAddCart(productName);

    // Verify cart
    const inCart = await cartPage.verifyProductInCart(productName);
    expect(inCart).toBeTruthy();
    await cartPage.proceedToCheckout();

    // Payment
    await paymentPage.fillPaymentDetails("4542 9931 9292 2293", "10", "25", "276", "Sandhi");
    await paymentPage.placeOrder();

    // Order confirmation
    const success = await orderPage.verifyOrderSuccess();
    expect(success).toBeTruthy();
});
