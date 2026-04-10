import { expect } from '@playwright/test'

class LoginPage {

    constructor(page) {
        this.page = page
        this.userEmailInput = page.getByRole('textbox', { name: 'email@example.com', exact: true })
        this.passwordInput = page.getByRole('textbox', { name: 'enter your passsword', exact: true })
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true })
        this.productz = page.locator('#products')
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login')
        await this.page.waitForLoadState('domcontentloaded', { timeout: 8000 })
        await this.page.waitForLoadState('networkidle')
    }

    async validLogin(username, password) {
        await this.userEmailInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
        await this.page.waitForLoadState('networkidle')
        await expect(this.productz).toBeVisible()
    }

}
module.exports = { LoginPage }