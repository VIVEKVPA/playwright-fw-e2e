import { expect } from '@playwright/test'

class OrderConfirmationPage {

    constructor(page) {
        this.page = page
        this.header = page.locator('.hero-primary')
        this.orderHistory = page.locator('label[routerlink*="myorders"]')
        this.orderTable = page.locator('table.table')
        this.orderSummaryHeader = page.locator('div.email-title')

    }

    async verifyOrderConfirmation() {

        await expect(this.header).toBeVisible()
        await expect(this.header).toHaveText('Thankyou for the order.')

        let orderId = await this.page.locator('table#htmlData').locator('label').last().textContent()
        orderId = orderId.split(' | ')[1].split(' | ')[0]
        return orderId
    }

    async verifyOrderInMyOrders(orderId) {

        await this.orderHistory.click()
        await expect(this.orderTable).toBeVisible()
        const orders = await this.page.locator('tbody tr').count()

        for (let i = 0; i < orders; i++) {
            const rowOrderId = await this.page.locator('tbody tr').nth(i).locator('th').textContent()
            if (orderId.includes(rowOrderId)) {
                await this.page.locator('tbody tr').nth(i).locator('button').first().click()
                break
            }
        }


        await expect(this.orderSummaryHeader).toHaveText('order summary')

        const orderDetails = await this.page.locator('div.col-text').textContent()
        expect(orderDetails).toEqual(orderId)
        expect(orderId.includes(orderDetails)).toBeTruthy();
    }

}

module.exports = { OrderConfirmationPage }