import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly spanElement: Locator;
  readonly termsCheckbox: Locator;
  readonly signInBtnButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username:', exact: true });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:', exact: true });
    this.spanElement = page.locator(`.checkmark`);
    this.termsCheckbox = page.getByRole('checkbox', { name: 'I Agree to the terms and 											conditions', exact: true, checked: true });
    this.signInBtnButton = page.getByRole('button', { name: 'Sign In', exact: true });
  }

  async fillUsernameinput(value: string): Promise<void> {
    await this.usernameInput.fill(value);
  }

  async fillPasswordinput(value: string): Promise<void> {
    await this.passwordInput.fill(value);
  }

  async clickSpanelement(): Promise<void> {
    await this.spanElement.click();
  }

  async checkTermscheckbox(): Promise<void> {
    await this.termsCheckbox.check();
  }

  async clickSigninbtnbutton(): Promise<void> {
    await this.signInBtnButton.click();
  }

}
