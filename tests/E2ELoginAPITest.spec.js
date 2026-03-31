import { expect, request, test } from '@playwright/test'
const loginRequest = {userEmail:"vivek123@example.com",userPassword:"Hknd@u72"}
let token
test.beforeAll( async ()=> {
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

test('E2E shopping cart - login API', async({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.waitForLoadState('networkidle')
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
    await expect(autoPopulatedUseremail1).toHaveText(loginRequest.userEmail)


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