// import { expect } from '@playwright/test'
const { expect } = require('@playwright/test')

class OrderDetailsPage {

    constructor(page) {
        this.page = page
        this.autoPopulatedUseremail = page.locator('.user__name').locator('label')
        this.selectCountry = page.locator('[placeholder="Select Country"]')
        this.options = page.locator('section.ta-results')
        this.placeOrderBtn = page.locator('.action__submit')
    }

    async verifyUserInfo(username) {
        await expect(this.autoPopulatedUseremail).toHaveText(username)
    }

    async chooseCountry(searchtext, country) {

        await this.selectCountry.pressSequentially(searchtext, { delay: 150 })
        await this.options.waitFor()

        const count = await this.options.locator('button').count()

        for (let i = 0; i < count; i++) {
            const text = await this.options.locator('button').nth(i).textContent()
            if (text.trim() === country) {
                await this.options.locator('button').nth(i).click()
                break
            }
        }
    }

    async placeOrder() {
        await this.placeOrderBtn.click()
        await this.page.waitForLoadState('networkidle')
    }

}

module.exports = { OrderDetailsPage }
// export { OrderDetailsPage }