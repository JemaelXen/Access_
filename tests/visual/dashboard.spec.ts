import { test, expect } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Dashboard Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
    await helpers.mockAuthenticatedUser("admin")
  })

  test("admin dashboard overview", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("dashboard-overview.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("dashboard metrics cards", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.waitForStableContent()

    // Look for metrics or card components
    const metricsCards = page.locator('[class*="card"], [data-testid*="metric"], [class*="grid"]').first()
    if ((await metricsCards.count()) > 0) {
      await expect(metricsCards).toHaveScreenshot("dashboard-metrics-cards.png", {
        animations: "disabled",
      })
    }
  })

  test("dashboard charts and graphs", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.waitForStableContent()

    // Look for chart components
    const chartElements = page.locator('svg, canvas, [class*="chart"], [data-testid*="chart"]')
    const chartCount = await chartElements.count()

    if (chartCount > 0) {
      for (let i = 0; i < Math.min(chartCount, 3); i++) {
        const chart = chartElements.nth(i)
        await expect(chart).toHaveScreenshot(`dashboard-chart-${i + 1}.png`, {
          animations: "disabled",
        })
      }
    }
  })

  test("dashboard sidebar navigation", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.waitForStableContent()

    // Look for sidebar or navigation elements
    const sidebar = page.locator('[class*="sidebar"], aside, nav').first()
    if ((await sidebar.count()) > 0) {
      await expect(sidebar).toHaveScreenshot("dashboard-sidebar.png", {
        animations: "disabled",
      })
    }
  })

  test("dashboard responsive layout", async ({ page }) => {
    const viewports = [
      { name: "mobile", width: 375, height: 667 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1920, height: 1080 },
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.goto("/dashboard")
      await helpers.waitForStableContent()

      await expect(page).toHaveScreenshot(`dashboard-${viewport.name}.png`, {
        fullPage: true,
        animations: "disabled",
      })
    }
  })

  test("dashboard dark mode", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.waitForStableContent()

    // Enable dark mode
    await page.evaluate(() => document.documentElement.classList.add("dark"))
    await page.waitForTimeout(500)

    await expect(page).toHaveScreenshot("dashboard-dark-mode.png", {
      fullPage: true,
      animations: "disabled",
    })
  })
})
