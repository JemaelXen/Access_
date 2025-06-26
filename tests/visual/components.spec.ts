import { test, expect } from "@playwright/test"

test.describe("Component Visual Tests", () => {
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

  test("navigation component states", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    // Test normal state
    const nav = page.locator("nav")
    await expect(nav).toHaveScreenshot("navigation-normal.png")

    // Test mobile menu
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(500)
    await expect(nav).toHaveScreenshot("navigation-mobile.png")
  })

  test("button component variants", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    // Find different button variants
    const primaryButton = page.locator("button").first()
    await expect(primaryButton).toHaveScreenshot("button-primary.png")
  })

  test("card component layouts", async ({ page }) => {
    await page.goto("/dashboard")
    await page.waitForLoadState("networkidle")

    const card = page.locator('[data-testid="metric-card"]').first()
    await expect(card).toHaveScreenshot("card-component.png")
  })

  test("form input states", async ({ page }) => {
    await page.goto("/login")
    await page.waitForLoadState("networkidle")

    const emailInput = page.locator('input[name="email"]')

    // Normal state
    await expect(emailInput).toHaveScreenshot("input-normal.png")

    // Focused state
    await emailInput.focus()
    await expect(emailInput).toHaveScreenshot("input-focused.png")

    // Filled state
    await emailInput.fill("test@example.com")
    await expect(emailInput).toHaveScreenshot("input-filled.png")
  })

  test("loading states", async ({ page }) => {
    await page.goto("/ebooks")

    // Capture loading state
    const loadingElement = page.locator('[data-testid="loading-spinner"]')
    await expect(loadingElement).toHaveScreenshot("loading-spinner.png")
  })

  test("error states", async ({ page }) => {
    // Navigate to a page that might show error states
    await page.goto("/dashboard")
    await page.waitForLoadState("networkidle")

    // Mock an error state by injecting error content
    await page.evaluate(() => {
      const errorDiv = document.createElement("div")
      errorDiv.setAttribute("data-testid", "error-state")
      errorDiv.className = "p-4 bg-red-50 border border-red-200 rounded-md"
      errorDiv.innerHTML = '<p class="text-red-800">An error occurred while loading data.</p>'
      document.body.appendChild(errorDiv)
    })

    const errorState = page.locator('[data-testid="error-state"]')
    await expect(errorState).toHaveScreenshot("error-state.png")
  })
})
