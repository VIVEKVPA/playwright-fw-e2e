// import { LoginPage } from '../pageobjects/LoginPage.js'
// import { DashboardPage } from '../pageobjects/DashboardPage.js'
// import { CheckoutPage } from '../pageobjects/CheckoutPage.js'
// import { OrderConfirmationPage } from '../pageobjects/OrderConfirmationPage.js'
// import { OrderDetailsPage } from '../pageobjects/OrderDetailsPage.js'

const { LoginPage } = require('../pageobjects/LoginPage.js')
const { DashboardPage } = require('../pageobjects/DashboardPage.js')
const { CheckoutPage } = require('../pageobjects/CheckoutPage.js')
const { OrderConfirmationPage } = require('../pageobjects/OrderConfirmationPage.js')
const { OrderDetailsPage } = require('../pageobjects/OrderDetailsPage.js')

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

module.exports = { POManager }
// export { POManager }