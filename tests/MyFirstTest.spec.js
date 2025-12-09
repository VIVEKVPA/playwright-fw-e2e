import { expect, test } from '@playwright/test'

test('Launch New Context Browser', async({browser})=> {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register')
    await expect(page).toHaveTitle('Register Account')
})

test('Customer Login', async({page})=> {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login')
    await expect(page).toHaveTitle('Account Login')

    await page.locator('#input-email').fill('customer_one@gmail.com')
    await page.locator('#input-password').fill('cust1234')
    await page.locator('[value="Login"]').click()
})

test('Customer Registration', async({page})=> {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register')
    await expect(page).toHaveTitle('Register Account')

    await page.locator('#input-firstname').fill('Vivek')
    await page.locator('#input-lastname').fill('Pukale')
    await page.locator('#input-email').fill('customer_one@gmail.com')
    await page.locator('#input-telephone').fill('9983283393')
    await page.locator('#input-password').fill('cust1234')
    await page.locator('#input-confirm').fill('cust1234')
    await page.locator('input[name="agree"]').check()
    await page.locator('input[type="submit"][value="Continue"]').click()
})

