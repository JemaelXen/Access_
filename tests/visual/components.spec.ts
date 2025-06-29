import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Component Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
    await helpers.setupAuth("admin")
  })

  test("navigation components", async ({ page }) => {
    await page.goto("/")

    // Main navigation
    await helpers.takeElementScreenshot('[data-testid="main-nav"]', "nav-main")

    // Mobile navigation (if exists)
    await page.setViewportSize({ width: 375, height: 667 })
    await helpers.takeElementScreenshot('[data-testid="mobile-nav"]', "nav-mobile")
  })

  test("card components", async ({ page }) => {
    await page.goto("/dashboard")

    // Metric cards
    await helpers.takeElementScreenshot('[data-testid="metric-card"]', "card-metric")

    // Chart cards
    await helpers.takeElementScreenshot('[data-testid="chart-card"]', "card-chart")
  })

  test("button components", async ({ page }) => {
    await page.goto("/login")

    const button = page.locator('[data-testid="submit-button"]')

    // Normal state
    await helpers.takeElementScreenshot('[data-testid="submit-button"]', "button-normal")

    // Hover state
    await button.hover()
    await helpers.takeElementScreenshot('[data-testid="submit-button"]', "button-hover")

    // Focus state
    await button.focus()
    await helpers.takeElementScreenshot('[data-testid="submit-button"]', "button-focus")

    // Disabled state
    await page.evaluate(() => {
      const btn = document.querySelector('[data-testid="submit-button"]') as HTMLButtonElement
      if (btn) btn.disabled = true
    })
    await helpers.takeElementScreenshot('[data-testid="submit-button"]', "button-disabled")
  })

  test("form components", async ({ page }) => {
    await page.goto("/login")

    // Input fields
    await helpers.takeElementScreenshot('[data-testid="email-input"]', "input-empty")

    await page.fill('[data-testid="email-input"]', "test@example.com")
    await helpers.takeElementScreenshot('[data-testid="email-input"]', "input-filled")

    await page.focus('[data-testid="email-input"]')
    await helpers.takeElementScreenshot('[data-testid="email-input"]', "input-focused")
  })

  test("modal components", async ({ page }) => {
    await page.goto("/dashboard")

    // Trigger modal (if exists)
    try {
      await page.click('[data-testid="open-modal"]')
      await helpers.takeElementScreenshot('[data-testid="modal"]', "modal-open")
    } catch {
      // Modal trigger doesn't exist, skip
    }
  })

  test("loading components", async ({ page }) => {
    // Intercept API to show loading states
    await page.route("**/api/**", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await route.continue()
    })

    await page.goto("/dashboard")
    await helpers.takeElementScreenshot('[data-testid="loading-spinner"]', "loading-spinner")
  })

  test("error components", async ({ page }) => {
    // Mock API error
    await page.route("**/api/dashboard/metrics", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      })
    })

    await page.goto("/dashboard")
    await helpers.takeElementScreenshot('[data-testid="error-message"]', "error-component")
  })

  test("tooltip components", async ({ page }) => {
    await page.goto("/dashboard")

    // Hover over element with tooltip
    try {
      await page.hover('[data-testid="tooltip-trigger"]')
      await page.waitForSelector('[data-testid="tooltip"]', { timeout: 2000 })
      await helpers.takeElementScreenshot('[data-testid="tooltip"]', "tooltip-component")
    } catch {
      // Tooltip doesn't exist, skip
    }
  })
})
