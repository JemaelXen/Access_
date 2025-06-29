import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Authentication Pages Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.setFixedTime()
  })

  test("login page layout", async ({ page }) => {
    await page.goto("/login")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("login-page")
  })

  test("login form states", async ({ page }) => {
    await page.goto("/login")
    const helpers = new ScreenshotHelpers(page)

    // Empty form
    await helpers.takeElementScreenshot('[data-testid="login-form"]', "login-form-empty")

    // Filled form
    await page.fill('[data-testid="email-input"]', "test@example.com")
    await page.fill('[data-testid="password-input"]', "password123")
    await helpers.takeElementScreenshot('[data-testid="login-form"]', "login-form-filled")

    // Form validation error
    await page.fill('[data-testid="email-input"]', "invalid-email")
    await page.click('[data-testid="login-button"]')
    await helpers.takeElementScreenshot('[data-testid="login-form"]', "login-form-error")
  })

  test("signup page layout", async ({ page }) => {
    await page.goto("/signup")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("signup-page")
  })

  test("signup form states", async ({ page }) => {
    await page.goto("/signup")
    const helpers = new ScreenshotHelpers(page)

    // Empty form
    await helpers.takeElementScreenshot('[data-testid="signup-form"]', "signup-form-empty")

    // Filled form
    await page.fill('[data-testid="name-input"]', "Test User")
    await page.fill('[data-testid="email-input"]', "test@example.com")
    await page.fill('[data-testid="password-input"]', "password123")
    await page.fill('[data-testid="confirm-password-input"]', "password123")
    await helpers.takeElementScreenshot('[data-testid="signup-form"]', "signup-form-filled")

    // Password mismatch error
    await page.fill('[data-testid="confirm-password-input"]', "different-password")
    await page.click('[data-testid="signup-button"]')
    await helpers.takeElementScreenshot('[data-testid="signup-form"]', "signup-form-password-mismatch")
  })

  test("auth pages responsive layouts", async ({ page }) => {
    await page.goto("/login")
    const helpers = new ScreenshotHelpers(page)
    await helpers.testResponsiveLayout("login-page")
  })

  test("auth pages theme variations", async ({ page }) => {
    await page.goto("/login")
    const helpers = new ScreenshotHelpers(page)
    await helpers.testThemeVariations("login-page")
  })

  test("loading states", async ({ page }) => {
    await page.goto("/login")

    // Mock slow API response
    await page.route("**/api/auth/login", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await route.fulfill({ json: { success: true } })
    })

    // Fill form and submit
    await page.fill('[data-testid="email-input"]', "test@example.com")
    await page.fill('[data-testid="password-input"]', "password123")
    await page.click('[data-testid="login-button"]')

    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="login-form"]', "login-form-loading")
  })
})
