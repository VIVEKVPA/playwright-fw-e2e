// import { expect } from '@playwright/test'
const { expect } = require('@playwright/test')

class CheckoutPage {

    constructor(page) {
        this.page = page
        this.checkoutButton = page.getByText("Checkout")
    }

    async verifyProductAndCheckout(productName) {
        const product = await this.getProductLocator(productName)
        await expect(product).toBeVisible()
        expect(await product.isVisible()).toBeTruthy()
        await expect(product).toHaveText(productName)

        this.checkoutButton.click()
    }

    async getProductLocator(productName) {
        const product = this.page.locator('h3:has-text("' + productName + '")')
        return product
    }

}

module.exports = { CheckoutPage }
// export { CheckoutPage }