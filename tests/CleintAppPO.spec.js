import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/PageObjects/LoginPage.js';
import { DashBoard } from '../pages/PageObjects/DashBoard.js';
import { CartPage } from '../pages/PageObjects/CartPage.js';
import { PaymentPage } from '../pages/PageObjects/PaymentPage.js';
import { OrderPage } from '../pages/PageObjects/OrderPage.js';

test.only('Client App Playwright test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashBoard(page);
    const cartPage = new CartPage(page);
    const paymentPage = new PaymentPage(page);
    const orderPage = new OrderPage(page);

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
