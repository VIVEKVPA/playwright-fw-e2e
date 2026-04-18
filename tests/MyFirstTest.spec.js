import { expect, test } from '@playwright/test'
// test.describe.configure({ mode: 'serial' });
test('Launch New Context Browser', async({browser})=> {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register')
    await expect(page).toHaveTitle('Register Account')
})

test('@Web Customer Login', async({page})=> {
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

test('@Web Login to RSAcademy - Invalid Credentials', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const usernameInput = page.getByRole('textbox', { name: 'Username:', exact: true });
    await usernameInput.fill('rahulshettyacademy');
    const passwordInput = page.getByRole('textbox', { name: 'Password:', exact: true });
    await passwordInput.fill('Learning@');
    const termsCheckbox = page.locator(`#terms`);
    await termsCheckbox.check();
    const signInBtnButton = page.getByRole('button', { name: 'Sign In', exact: true });
    await signInBtnButton.click();

    const expected_error_message = 'Incorrect username/password.'
    const incorrectUsernamePasswordText = page.getByText('Incorrect username/password.', { exact: true });
    await expect(incorrectUsernamePasswordText).toBeVisible()
    // const actual_error_message = await incorrectUsernamePasswordText.innerText()
    const actual_error_message = await incorrectUsernamePasswordText.textContent()
    expect(actual_error_message).toBe(expected_error_message)
    await expect(incorrectUsernamePasswordText).toHaveText(expected_error_message)
})

test('Login to RSAcademy - valid Credentials', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const usernameInput = page.getByRole('textbox', { name: 'Username:', exact: true });
    await usernameInput.fill('rahulshettyacademy');
    const passwordInput = page.getByRole('textbox', { name: 'Password:', exact: true });
    await passwordInput.fill('Learning@830$3mK2');
    const termsCheckbox = page.locator(`#terms`);
    await termsCheckbox.check();
    const signInBtnButton = page.getByRole('button', { name: 'Sign In', exact: true });
    await signInBtnButton.click();
    const shopNameHeading = page.getByRole('heading', { name: 'Shop Name', exact: true, level: 1 });
    const expected_text = 'Shop Name'
    const actual_text = await shopNameHeading.textContent();
    await expect(actual_text).toEqual(expected_text)
    const card_titles = page.locator('.card-body a')
    const iphoneXLink = await card_titles.nth(0).textContent();
    const title_list = await card_titles.allTextContents();
    console.log(iphoneXLink)
    console.log(title_list)
    expect(title_list).toContain('iphone X')
})

test('Register to RSAcademy', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    // const registerHereLink = page.getByRole('link', { name: 'Register here', exact: true });
    const registerHereLink = page.locator('a.text-reset');
    await registerHereLink.click();
    await page.locator(`#firstName`).fill('Vivek');
    await page.locator(`#lastName`).fill('VPA');
    await page.locator('#userEmail').fill('vivek123@example.com')
    await page.locator('#userMobile').fill('2563458563')
    await page.locator('select.custom-select').selectOption('Doctor')
    const maleRadio = page.getByRole('radio', { name: 'Male', exact: true, checked: false });
    await maleRadio.check();
    // await page.getByRole('radio').check()
    await page.locator('#userPassword').fill('Hknd@u72')
    await page.locator('#confirmPassword').fill('Hknd@u72')
    await page.getByRole('checkbox').check()
    await page.locator('#login').click()

})

test('Login to RSAcademy', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.locator('#userEmail').fill('vivek123@example.com')
    await page.locator('#userPassword').fill('Hknd@u72')
    await page.locator('#login').click()
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash')
    const loginSuccessfullyText = page.getByText('Login Successfully', { exact: true });
    await expect(loginSuccessfullyText).toBeVisible()
    await page.waitForLoadState('networkidle')
    await page.locator('.card-body b').first().waitFor()
    const card_titles = await page.locator('.card-body b').allTextContents()
    console.log(card_titles)
    expect(card_titles).toContain('ADIDAS ORIGINAL')
})

test('Login to RSAcademy as Cunsulatant', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const usernameInput = page.getByRole('textbox', { name: 'Username:', exact: true });
    await usernameInput.fill('rahulshettyacademy');
    const passwordInput = page.getByRole('textbox', { name: 'Password:', exact: true });
    await passwordInput.fill('Learning@830$3mK2');
    await page.getByRole('radio', {name:'user', checked:false}).check()
    await page.locator('#okayBtn').click()
    await page.locator('select.form-control').selectOption('Consultant')
    const termsCheckbox = page.locator(`#terms`);
    await termsCheckbox.check();
    await expect(termsCheckbox).toBeChecked()
    const signInBtnButton = page.getByRole('button', { name: 'Sign In', exact: true });
    await signInBtnButton.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop')
})

