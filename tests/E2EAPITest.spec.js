import { expect, request, test } from '@playwright/test'
import { APIUtils } from '../utils/APIUtils'
const loginRequest = {userEmail:"vivek123@example.com",userPassword:"Hknd@u72"}
const createOrdRequest = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}
let response

test.beforeAll( async () => {
    const apiContext = await request.newContext()
    const apiutils = new APIUtils(apiContext, loginRequest)
    response = await apiutils.createOrder(createOrdRequest)
})

test('E2E shopping cart - login API', async({page}) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.waitForLoadState('networkidle')
    const productz = page.locator('#products')
    await expect(productz).toBeVisible()

    const orderHistory = page.locator('[routerlink*="myorders"]')
    await orderHistory.click()

    const orderTable = page.locator('table.table')
    await expect(orderTable).toBeVisible()
    const orders = await page.locator('tbody tr').count()

    for (let i=0; i<orders; i++) {
        const rowOrderId = await page.locator('tbody tr').nth(i).locator('th').textContent()
        if (response.orderId.includes(rowOrderId)) {
            await page.locator('tbody tr').nth(i).locator('button').first().click()
            break
        }
    }

    const orderSummaryHeader = page.locator('div.email-title')
    await expect(orderSummaryHeader).toHaveText('order summary')

    const orderDetails = await page.locator('div.col-text').textContent()
    expect(orderDetails).toEqual(response.orderId)
    expect(response.orderId.includes(orderDetails)).toBeTruthy();
})