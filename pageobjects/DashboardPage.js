import { expect } from '@playwright/test'

class DashboardPage {

    constructor(page) {
        this.page = page
        this.products = page.locator('.card-body b')
        this.addToCartButton = page.getByText('Add To Cart')
        this.shoppingCart = page.locator('[routerlink*="cart"]')
    }

    async getProductNames() {
        let products = {}
        products.productNames = await this.products.allTextContents()
        products.productCount = await this.products.count()
        return products
    }

    async navigateToCart() {
        await this.shoppingCart.click()
        await this.page.waitForLoadState('domcontentloaded')
    }

    async searchProductAddToCart(products, productName) {
        const productCount = await products.productCount
        for (let i = 0; i < productCount; i++) {
            if (products.productNames[i] == productName) {
                const addToCartButton = this.addToCartButton.nth(i)
                await addToCartButton.click()
                break
            }
        }
    }
}

module.exports = { DashboardPage }