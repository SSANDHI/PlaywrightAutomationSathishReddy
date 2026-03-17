import { LoginPage } from './LoginPage.js';
import { DashBoard } from './DashBoard.js';
import { CartPage } from './CartPage.js';
import { PaymentPage } from './PaymentPage.js';
import { OrderPage } from './OrderPage.js';

export class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = null;
        this.dashboard = null;
        this.cartPage = null;
        this.paymentPage = null;
        this.orderPage = null;
    }

    getLoginPage() {
        if (!this.loginPage) {
            this.loginPage = new LoginPage(this.page);
        }
        return this.loginPage;
    }

    getDashBoard() {
        if (!this.dashboard) {
            this.dashboard = new DashBoard(this.page);
        }
        return this.dashboard;
    }

    getCartPage() {
        if (!this.cartPage) {
            this.cartPage = new CartPage(this.page);
        }
        return this.cartPage;
    }

    getPaymentPage() {
        if (!this.paymentPage) {
            this.paymentPage = new PaymentPage(this.page);
        }
        return this.paymentPage;
    }

    getOrderPage() {
        if (!this.orderPage) {
            this.orderPage = new OrderPage(this.page);
        }
        return this.orderPage;
    }
}
