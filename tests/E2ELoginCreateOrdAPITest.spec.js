import { expect, request, test } from '@playwright/test'
const loginRequest = {userEmail:"vivek123@example.com",userPassword:"Hknd@u72"}
const createOrdRequest = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}
let token
let orderId
test.beforeAll( async () => {
    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        {
            data:loginRequest
        }
    )
    await expect(loginResponse).toBeOK()

    const loginResponseJson = await loginResponse.json()
    token = await loginResponseJson.token
    console.log(token)

    
})

test('@API E2E shopping cart - login API', async({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.waitForLoadState('networkidle')
    const productz = page.locator('#products')
    await expect(productz).toBeVisible()

    const apiContext = await request.newContext()
    const createOrdResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
        {
            data: createOrdRequest,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        }
    )

    const createOrdResponseJson = await createOrdResponse.json()
    console.log(createOrdResponseJson)
    orderId = await createOrdResponseJson.orders[0]

    const orderHistory = page.locator('[routerlink*="myorders"]')
    await orderHistory.click()

    const orderTable = page.locator('table.table')
    await expect(orderTable).toBeVisible()
    const orders = await page.locator('tbody tr').count()

    for (let i=0; i<orders; i++) {
        const rowOrderId = await page.locator('tbody tr').nth(i).locator('th').textContent()
        if (orderId.includes(rowOrderId)) {
            await page.locator('tbody tr').nth(i).locator('button').first().click()
            break
        }
    }

    const orderSummaryHeader = page.locator('div.email-title')
    await expect(orderSummaryHeader).toHaveText('order summary')

    const orderDetails = await page.locator('div.col-text').textContent()
    expect(orderDetails).toEqual(orderId)
    expect(orderId.includes(orderDetails)).toBeTruthy();
})