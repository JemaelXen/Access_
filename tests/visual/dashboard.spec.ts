import { test, expect } from "@playwright/test"

test.describe("Dashboard Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      window.localStorage.setItem("auth-token", "mock-token")
      window.localStorage.setItem("user-role", "admin")
    })

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

  test("admin dashboard overview", async ({ page }) => {
    await page.goto("/dashboard")
    await page.waitForLoadState("networkidle")

    // Wait for charts and data to load
    await page.waitForSelector('[data-testid="revenue-chart"]')
    await page.waitForTimeout(2000)

    await expect(page).toHaveScreenshot("dashboard-overview.png", {
      fullPage: true,
    })
  })

  test("dashboard sidebar navigation", async ({ page }) => {
    await page.goto("/dashboard")
    await page.waitForLoadState("networkidle")

    const sidebar = page.locator('[data-testid="dashboard-sidebar"]')
    await expect(sidebar).toHaveScreenshot("dashboard-sidebar.png")
  })

  test("dashboard metrics cards", async ({ page }) => {
    await page.goto("/dashboard")
    await page.waitForLoadState("networkidle")

    const metricsSection = page.locator('[data-testid="metrics-cards"]')
    await expect(metricsSection).toHaveScreenshot("dashboard-metrics.png")
  })

  test("dashboard revenue chart", async ({ page }) => {
    await page.goto("/dashboard")
    await page.waitForLoadState("networkidle")
    await page.waitForSelector('[data-testid="revenue-chart"]')
    await page.waitForTimeout(1000)

    const revenueChart = page.locator('[data-testid="revenue-chart"]')
    await expect(revenueChart).toHaveScreenshot("dashboard-revenue-chart.png")
  })

  test("dashboard user acquisition map", async ({ page }) => {
    await page.goto("/dashboard")
    await page.waitForLoadState("networkidle")
    await page.waitForSelector('[data-testid="user-acquisition-map"]')
    await page.waitForTimeout(1500)

    const acquisitionMap = page.locator('[data-testid="user-acquisition-map"]')
    await expect(acquisitionMap).toHaveScreenshot("dashboard-acquisition-map.png")
  })

  test("dashboard dark mode", async ({ page }) => {
    await page.goto("/dashboard")
    await page.waitForLoadState("networkidle")

    // Toggle dark mode
    await page.click('[data-testid="theme-toggle"]')
    await page.waitForTimeout(500)

    await expect(page).toHaveScreenshot("dashboard-dark-mode.png", {
      fullPage: true,
    })
  })
})
