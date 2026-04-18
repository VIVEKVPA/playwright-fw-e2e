import { expect, test } from '@playwright/test'

test('Child window handling', async({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const blinkLink = page.locator('[href*="documents-request"]')
    await expect(blinkLink).toHaveAttribute('class', 'blinkingText')
    
    const [newPage] =await Promise.all([
        context.waitForEvent('page'),
        blinkLink.click(),
        
    ])
    await expect(newPage).toHaveURL('https://rahulshettyacademy.com/documents-request')
    await newPage.waitForLoadState('networkidle')
    const message = await newPage.locator('.red')
    await expect(message).toBeVisible()
    
    const text = await message.textContent()
    const username = text.split('@')[1].split(' ')[0].split('.')[0]
    
    await page.locator('#username').fill(username)
    console.log(await page.locator('#username').inputValue())

})

test('E2E shopping cart', async({browser}) => {
    let username = "vivek123@example.com"
    let pwd = "Hknd@u72"
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.waitForLoadState('domcontentloaded', {timeout:8000})
    await page.waitForLoadState('networkidle')
    const userEmailInput = page.getByRole('textbox', { name: 'email@example.com', exact: true })
    await userEmailInput.fill(username)
    const passwordInput = page.getByRole('textbox', {name:'enter your passsword', exact:true})
    await passwordInput.fill(pwd)
    const loginButton = page.getByRole('button', { name: 'Login', exact: true })
    await loginButton.click()
    const productz = page.locator('#products')
    await expect(productz).toBeVisible()

    const productName = 'ZARA COAT 3'
    const products = page.locator('.card-body b')
    const productNames = await page.locator('.card-body b').allTextContents()
    console.log(productNames)
    const productCount = await products.count()

    for (let i=0; i<productCount; i++) {
        if (productNames[i] == productName) {
            const addToCartButton = page.getByText('Add To Cart').nth(i)
            await addToCartButton.click()
            break
        }
    }
    const shoppingCart = page.locator('[routerlink*="cart"]')
    // const shoppingCartItems = await shoppingCart.locator('label').allInnerTexts()
    // console.log(shoppingCartItems)
    // await expect(shoppingCartItems).toBe('1')
    await shoppingCart.click()
    

    const productNameInCart = page.locator('h3:has-text("ZARA COAT 3")')
    await expect(productNameInCart).toBeVisible()
    expect(await productNameInCart.isVisible()).toBeTruthy()
    await expect(productNameInCart).toHaveText(productName)

    const checkoutButton = page.getByText("Checkout")
    await checkoutButton.click()

    const autoPopulatedUseremail1 = page.locator('.user__name').locator('label')
    await expect(autoPopulatedUseremail1).toHaveText(username)


    const selectCountry = page.locator('[placeholder="Select Country"]')
    await selectCountry.pressSequentially('ind', {delay:150})

    const options = page.locator('section.ta-results')
    await options.waitFor()
    
    const count = await options.locator('button').count()

    for (let i=0; i<count; i++) {
        const text = await options.locator('button').nth(i).textContent()
        if (text === ' India') {
            await options.locator('button').nth(i).click()
            break
        }
    }

    const placeOrder = page.locator('.action__submit')
    await placeOrder.click()

    const header = page.locator('.hero-primary')
    await expect(header).toBeVisible()
    await expect(header).toHaveText('Thankyou for the order.')

    let orderId = await page.locator('table#htmlData').locator('label').last().textContent()
    orderId = orderId.split(' | ')[1].split(' | ')[0]
    console.log(orderId)

    const orderHistory = page.locator('label[routerlink*="myorders"]')
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