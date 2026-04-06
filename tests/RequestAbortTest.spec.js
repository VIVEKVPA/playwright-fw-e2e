import {test, expect} from '@playwright/test'

test('Login to RSAcademy - valid Credentials -request abort', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const usernameInput = page.getByRole('textbox', { name: 'Username:', exact: true });
    await usernameInput.fill('rahulshettyacademy');
    const passwordInput = page.getByRole('textbox', { name: 'Password:', exact: true });
    await passwordInput.fill('Learning@830$3mK2');
    const termsCheckbox = page.locator(`#terms`);
    await termsCheckbox.check();
    const signInBtnButton = page.getByRole('button', { name: 'Sign In', exact: true });
    await page.route('**/*.{png,jpg,jpeg}', route => route.abort())
    page.on('request', request => console.log(request.url()))
    page.on('response', response => console.log(response.url(), response.status()))
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