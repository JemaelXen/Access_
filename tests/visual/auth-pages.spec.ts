import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Authentication Pages Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
  })

  test("login page full layout", async ({ page }) => {
    await page.goto("/login")
    await helpers.takeFullPageScreenshot("login-page")
  })

  test("login page responsive layouts", async ({ page }) => {
    await page.goto("/login")
    await helpers.testResponsiveLayout("login-page")
  })

  test("login page theme variations", async ({ page }) => {
    await page.goto("/login")
    await helpers.testThemeVariations("login-page")
  })

  test("signup page full layout", async ({ page }) => {
    await page.goto("/signup")
    await helpers.takeFullPageScreenshot("signup-page")
  })

  test("signup page responsive layouts", async ({ page }) => {
    await page.goto("/signup")
    await helpers.testResponsiveLayout("signup-page")
  })

  test("signup page theme variations", async ({ page }) => {
    await page.goto("/signup")
    await helpers.testThemeVariations("signup-page")
  })

  test("login form states", async ({ page }) => {
    await page.goto("/login")

    // Empty form
    await helpers.takeElementScreenshot("form", "login-form-empty")

    // Filled form
    await page.fill('[data-testid="email-input"]', "test@example.com")
    await page.fill('[data-testid="password-input"]', "password123")
    await helpers.takeElementScreenshot("form", "login-form-filled")

    // Form with validation errors
    await page.fill('[data-testid="email-input"]', "invalid-email")
    await page.fill('[data-testid="password-input"]', "123")
    await page.click('[data-testid="submit-button"]')
    await helpers.takeElementScreenshot("form", "login-form-errors")
  })

  test("signup form states", async ({ page }) => {
    await page.goto("/signup")

    // Empty form
    await helpers.takeElementScreenshot("form", "signup-form-empty")

    // Filled form
    await page.fill('[data-testid="name-input"]', "Test User")
    await page.fill('[data-testid="email-input"]', "test@example.com")
    await page.fill('[data-testid="password-input"]', "password123")
    await page.fill('[data-testid="confirm-password-input"]', "password123")
    await helpers.takeElementScreenshot("form", "signup-form-filled")

    // Form with validation errors
    await page.fill('[data-testid="email-input"]', "invalid-email")
    await page.fill('[data-testid="password-input"]', "123")
    await page.fill('[data-testid="confirm-password-input"]', "456")
    await page.click('[data-testid="submit-button"]')
    await helpers.takeElementScreenshot("form", "signup-form-errors")
  })

  test("login form interactions", async ({ page }) => {
    await page.goto("/login")

    // Focus states
    await page.focus('[data-testid="email-input"]')
    await helpers.takeElementScreenshot("form", "login-form-email-focus")

    await page.focus('[data-testid="password-input"]')
    await helpers.takeElementScreenshot("form", "login-form-password-focus")

    // Button hover state
    await page.hover('[data-testid="submit-button"]')
    await helpers.takeElementScreenshot("form", "login-form-button-hover")
  })
})
