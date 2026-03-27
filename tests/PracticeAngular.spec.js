import {expect, test} from '@playwright/test'


test.only('Practice angular - locator strategies', async({page}) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    await page.waitForLoadState('networkidle')
    const image = page.locator('div.jumbotron')
    await expect(image).toBeVisible()

    // await page.getByRole('text', {name:'name'}).fill('Vivek')
    await page.locator('form input[name="name"]').fill('Vivek')
    // await page.pause()
    await page.locator('input[name="email"]').fill('vivek123@example.com')
    // await page.getByRole('text', {name:'email'}).fill('vivek123@example.com')
    await page.getByPlaceholder('Password').fill('Hknd@u72')
    await page.getByRole('checkbox').check()
    await page.getByLabel('Check me out if you Love IceCreams!').click()
    await page.locator('#exampleCheck1').check()
    await page.locator('#exampleFormControlSelect1').selectOption('Female')
    await page.locator('#exampleFormControlSelect1').selectText('Male')
    await page.locator('#inlineRadio1').check()
    await page.getByLabel('Student').check()
    await page.getByLabel('Employed').click()
    await page.locator('input[name="bday"]').pressSequentially('26032026')
    await page.getByRole('button', {name:'Submit'}).click()
    // await page.locator('input[value="Submit"]').click()
    
    const successMsg = await page.locator('.alert-success').textContent()
    expect(successMsg).toContain('Success')
    

    //Locator chaining
    await page.getByRole('link', {name:'Shop'}).click()
    const bool = await page.locator('app-card-list').isVisible()
    expect(bool).toBeTruthy()
    const checkoutButton = page.locator('#navbarResponsive a')
    await expect(checkoutButton).toContainText('0')
    // await page.locator('app-card').filter({hasText:'Samsung Note 8'}).getByText('Add').click()
    await page.locator('app-card').filter({hasText:'Samsung Note 8'}).getByRole('button').click()

    await expect(checkoutButton).toContainText('1')
    await checkoutButton.click()

    await page.pause()
})