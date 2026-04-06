import { expect, request, test } from '@playwright/test'
import { APIUtils } from './utils/APIUtils'
const loginRequest = {userEmail:"vivek123@example.com",userPassword:"Hknd@u72"}
const createOrdRequest = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}
const fakeResponse = {data:[], message:"No Orders"}
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

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69752095c941646b7ab57115', 
        async route => {
            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(fakeResponse)
            route.fulfill({
                response,
                body
            })
        }
    )
    const orderHistory = page.locator('[routerlink*="myorders"]')
    await orderHistory.click()
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69752095c941646b7ab57115')
    const noOrderMsg = await page.locator('.mt-4').textContent()
    expect(noOrderMsg).toContain('You have No Orders to show at this time.')
    
})