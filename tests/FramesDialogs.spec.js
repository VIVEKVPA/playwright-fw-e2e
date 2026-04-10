import {expect, test} from '@playwright/test'


test('Back and Forward test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    // await page.waitForLoadState('networkidle', {timeout:90000})
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveTitle('GreenKart - veg and fruits kart')

    await page.goBack()
    await expect(page).toHaveURL('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page).toHaveTitle('Practice Page')

    await page.goForward()
    await expect(page).toHaveURL('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    await expect(page).toHaveTitle('GreenKart - veg and fruits kart')

    await page.goBack()
    // await page.waitForLoadState('networkidle')

    const hstextb = page.getByPlaceholder('Hide/Show Example')
    await expect(hstextb).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(hstextb).toBeHidden()
    await page.locator('#show-textbox').click()
    await expect(hstextb).toBeVisible()

})

test('Dialog handling', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    const nameTextArea = page.getByPlaceholder('Enter Your Name')
    await nameTextArea.fill('Welcome Go Back')
    const alertBtn = page.locator('#alertbtn')
    const confirmBtn = page.locator('#confirmbtn')

    // page.on('dialog', dialog => dialog.accept())
    // await alertBtn.click()
    page.on('dialog', dialog => dialog.dismiss())
    await confirmBtn.click()

    const mouseOverBtn = await page.getByRole('button', {name:'Mouse Hover'})
    await mouseOverBtn.hover()

})

test('Iframe handling', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    const iframe = page.frameLocator('#courses-iframe')
    await iframe.getByRole('link', {name:'Learning paths'}).click()
    // await iframe.locator('li a[href*="learning-path"]:visible').click()
    const title = iframe.locator('.page-title h1')
    await expect(title).toBeVisible()
    await expect(title).toHaveText('LEARNING PATHS')

    await iframe.getByRole('link', {name:'All Access plan'}).click()
    // const subMsg1 = await iframe.locator('.text h2').innerText()
    const subMsg = await iframe.locator('.text h2').textContent()

    const subCount = subMsg.split(' ')[1]
    // const subCount1 = subMsg1.split(' ')[1]

    expect(subCount).toBe('13,522')
    

})