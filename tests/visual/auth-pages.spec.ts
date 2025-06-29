import { test, expect } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Authentication Pages Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
  })

  test("login page layout", async ({ page }) => {
    await page.goto("/login")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("login-page-layout.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("login form states", async ({ page }) => {
    await page.goto("/login")
    await helpers.waitForStableContent()

    // Empty form state
    const loginForm = page.locator("form").first()
    await expect(loginForm).toHaveScreenshot("login-form-empty.png", {
      animations: "disabled",
    })

    // Fill form
    const emailInput = page.locator('input[type="email"], input[name="email"]').first()
    const passwordInput = page.locator('input[type="password"], input[name="password"]').first()

    if ((await emailInput.count()) > 0) {
      await emailInput.fill("test@example.com")
    }
    if ((await passwordInput.count()) > 0) {
      await passwordInput.fill("password123")
    }

    await page.waitForTimeout(300)
    await expect(loginForm).toHaveScreenshot("login-form-filled.png", {
      animations: "disabled",
    })

    // Validation error state
    await emailInput.fill("invalid-email")
    await page.click('button[type="submit"]')
    await page.waitForTimeout(500)

    await expect(loginForm).toHaveScreenshot("login-form-validation-error.png", {
      animations: "disabled",
    })
  })

  test("signup page layout", async ({ page }) => {
    await page.goto("/signup")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("signup-page-layout.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("signup form states", async ({ page }) => {
    await page.goto("/signup")
    await helpers.waitForStableContent()

    // Empty form state
    const signupForm = page.locator("form").first()
    await expect(signupForm).toHaveScreenshot("signup-form-empty.png", {
      animations: "disabled",
    })

    // Fill form with valid data
    const inputs = {
      email: page.locator('input[type="email"], input[name="email"]').first(),
      password: page.locator('input[type="password"], input[name="password"]').first(),
      name: page.locator('input[name="name"], input[name="fullName"]').first(),
    }

    if ((await inputs.email.count()) > 0) {
      await inputs.email.fill("newuser@example.com")
    }
    if ((await inputs.password.count()) > 0) {
      await inputs.password.fill("SecurePassword123!")
    }
    if ((await inputs.name.count()) > 0) {
      await inputs.name.fill("New User")
    }

    await page.waitForTimeout(300)
    await expect(signupForm).toHaveScreenshot("signup-form-filled.png", {
      animations: "disabled",
    })
  })

  test("auth pages mobile layout", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Login mobile
    await page.goto("/login")
    await helpers.waitForStableContent()
    await expect(page).toHaveScreenshot("login-page-mobile.png", {
      fullPage: true,
      animations: "disabled",
    })

    // Signup mobile
    await page.goto("/signup")
    await helpers.waitForStableContent()
    await expect(page).toHaveScreenshot("signup-page-mobile.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("auth pages dark mode", async ({ page }) => {
    await page.evaluate(() => document.documentElement.classList.add("dark"))

    // Login dark mode
    await page.goto("/login")
    await helpers.waitForStableContent()
    await expect(page).toHaveScreenshot("login-page-dark.png", {
      fullPage: true,
      animations: "disabled",
    })

    // Signup dark mode
    await page.goto("/signup")
    await helpers.waitForStableContent()
    await expect(page).toHaveScreenshot("signup-page-dark.png", {
      fullPage: true,
      animations: "disabled",
    })
  })
})
