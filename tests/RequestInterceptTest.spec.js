import { expect, request, test } from '@playwright/test'

test('E2E shopping cart - login API', async ({ page }) => {
    let username = "vivek123@example.com"
    let pwd = "Hknd@u72"
    await page.goto('https://rahulshettyacademy.com/client')
    await page.waitForLoadState('networkidle')
    const userEmailInput = page.getByPlaceholder('email@example.com')
    await userEmailInput.fill(username)
    const passwordInput = page.getByPlaceholder('enter your passsword')
    await passwordInput.fill(pwd)
    const loginButton = page.getByRole('button', { name: 'Login', exact: true })
    await loginButton.click()
    const productz = page.locator('#products')
    await expect(productz).toBeVisible()
    const orderHistory = page.locator('[routerlink*="myorders"]')
    await orderHistory.click()

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69d23071f86ba51a65482f22' })
    )

    const viewFirstOrder = page.locator('.btn-primary').first()
    await viewFirstOrder.click()
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*')
    const errorMsg = page.locator('p.blink_me')
    await expect(errorMsg).toBeVisible()
    const errorMsgText = await errorMsg.innerText()
    expect(errorMsgText).toBe('You are not authorize to view this order')
})