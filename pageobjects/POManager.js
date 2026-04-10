import { LoginPage } from '../pageobjects/LoginPage'
import { DashboardPage } from '../pageobjects/DashboardPage'
import { CheckoutPage } from '../pageobjects/CheckoutPage'
import { OrderConfirmationPage } from '../pageobjects/OrderConfirmationPage'
import { OrderDetailsPage } from '../pageobjects/OrderDetailsPage'

class POManager {

    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.orderDetailsPage = new OrderDetailsPage(this.page)
        this.orderConfirmPage = new OrderConfirmationPage(this.page)
    }

    getLoginPage() {
        return this.loginPage
    }

    getDashboardPage() {
        return this.dashboardPage
    }

    getCheckoutPage() {
        return this.checkoutPage
    }
    
    getOrderDetailsPage() {
        return this.orderDetailsPage
    }

    getOrderConfirmPage() {
        return this.orderConfirmPage
    }
}

module.exports = {POManager}