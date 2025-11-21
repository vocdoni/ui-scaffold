import { type Locator, type Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly signInButton: Locator
  readonly forgotPasswordLink: Locator
  readonly signUpLink: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.getByLabel(/email/i)
    this.passwordInput = page.getByLabel(/password/i)
    this.signInButton = page.getByRole('button', { name: /log in/i })
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot your password/i })
    this.signUpLink = page.getByRole('link', { name: /sign up/i })
  }

  async goto() {
    await this.page.goto('/account/signin')
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email)
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  async clickSignIn() {
    await this.signInButton.click()
  }

  async login(email: string, password: string) {
    await this.fillEmail(email)
    await this.fillPassword(password)
    await this.clickSignIn()
  }

  async waitForDashboard() {
    await this.page.waitForURL('**/admin')
  }
}
