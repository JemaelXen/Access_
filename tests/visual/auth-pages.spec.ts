import { test, expect } from "@playwright/test"

test.describe("Authentication Pages Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    })
  })

  test("login page layout", async ({ page }) => {
    await page.goto("/login")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(500)

    await expect(page).toHaveScreenshot("login-page.png", {
      fullPage: true,
    })
  })

  test("login form validation states", async ({ page }) => {
    await page.goto("/login")
    await page.waitForLoadState("networkidle")

    // Click submit without filling form to show validation errors
    await page.click('button[type="submit"]')
    await page.waitForTimeout(500)

    const loginForm = page.locator('[data-testid="login-form"]')
    await expect(loginForm).toHaveScreenshot("login-form-validation.png")
  })

  test("signup page layout", async ({ page }) => {
    await page.goto("/signup")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(500)

    await expect(page).toHaveScreenshot("signup-page.png", {
      fullPage: true,
    })
  })

  test("signup form validation states", async ({ page }) => {
    await page.goto("/signup")
    await page.waitForLoadState("networkidle")

    // Fill form with invalid data to show validation
    await page.fill('input[name="email"]', "invalid-email")
    await page.fill('input[name="password"]', "123")
    await page.click('button[type="submit"]')
    await page.waitForTimeout(500)

    const signupForm = page.locator('[data-testid="signup-form"]')
    await expect(signupForm).toHaveScreenshot("signup-form-validation.png")
  })

  test("login page mobile view", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/login")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(500)

    await expect(page).toHaveScreenshot("login-page-mobile.png", {
      fullPage: true,
    })
  })

  test("signup page mobile view", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/signup")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(500)

    await expect(page).toHaveScreenshot("signup-page-mobile.png", {
      fullPage: true,
    })
  })
})
