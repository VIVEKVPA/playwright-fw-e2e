import { test } from '@playwright/test'
import { POManager } from '../pageobjects/POManager'
import dataset from '../utils/placeorderMultiTestData.json'

for (let data of dataset) {
test(`E2E shopping experience for ${data.productName}`, async({browser}) => {
    let username = data.username
    let password = data.password
    const productName = data.productName
    const context = await browser.newContext()
    const page = await context.newPage()
    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(username, password)
    
    const dashboardPage = poManager.getDashboardPage()

    const products = await dashboardPage.getProductNames()
    
    await dashboardPage.searchProductAddToCart(products, productName)
    await dashboardPage.navigateToCart()

    const checkoutPage = poManager.getCheckoutPage()

    await checkoutPage.verifyProductAndCheckout(productName)

    const orderDetailsPage = poManager.getOrderDetailsPage()

    await orderDetailsPage.verifyUserInfo(username)
    await orderDetailsPage.chooseCountry(data.searchCountry, data.country)
    await orderDetailsPage.placeOrder()

    const orderConfirmPage = poManager.getOrderConfirmPage()

    const orderId = await orderConfirmPage.verifyOrderConfirmation()
    await orderConfirmPage.verifyOrderInMyOrders(orderId)
    await page.close()
    await context.close()
})
}
