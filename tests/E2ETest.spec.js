import { expect, test } from '@playwright/test'


test('E2E shopping cart', async({browser}) => {
    let username = "vivek123@example.com"
    let pwd = "Hknd@u72"
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.waitForLoadState('domcontentloaded', {timeout:8000})
    await page.waitForLoadState('networkidle')
    const userEmailInput = page.getByPlaceholder('email@example.com')
    await userEmailInput.fill(username)
    const passwordInput = page.getByPlaceholder('enter your passsword')
    await passwordInput.fill(pwd)
    const loginButton = page.getByRole('button', { name: 'Login', exact: true })
    await loginButton.click()
    const productz = page.locator('#products')
    await expect(productz).toBeVisible()

    await page.locator('.card-body').filter({hasText:'ZARA COAT 3'})
    .getByRole('button', {name:'Add to Cart'}).click()
    
    const shoppingCart = page.getByRole('listitem').getByRole('button', {name:'Cart'})
    await shoppingCart.click()
    
    const productNameInCart = page.getByText('ZARA COAT 3')
    await expect(productNameInCart).toBeVisible()
    expect(await productNameInCart.isVisible()).toBeTruthy()

    const checkoutButton = page.getByRole('button', {name:'Checkout'})
    // const checkoutButton = page.getByText("Checkout")
    await checkoutButton.click()

    const autoPopulatedUseremail1 = page.locator('.user__name').locator('label')
    await expect(autoPopulatedUseremail1).toHaveText(username)


    const selectCountry = page.getByPlaceholder('Select Country')
    await selectCountry.pressSequentially('ind', {delay:150})

    await page.getByRole('button', {name:'India'}).nth(1).click()

    // const placeOrder = page.getByRole('button', {name:'Place Order'})
    const placeOrder = page.getByText('Place Order')
    await placeOrder.click()

    const header = page.getByText('Thankyou for the order.')
    await expect(header).toBeVisible()
    await page.pause()

})