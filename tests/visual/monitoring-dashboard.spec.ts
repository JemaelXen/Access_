import { test, expect } from "@playwright/test"

test.describe("Monitoring Dashboard Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      window.localStorage.setItem("auth-token", "mock-token")
      window.localStorage.setItem("user-role", "founder")
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

  test("monitoring dashboard overview", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(2000)

    await expect(page).toHaveScreenshot("monitoring-dashboard-overview.png", {
      fullPage: true,
    })
  })

  test("real-time monitoring panel", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await page.waitForLoadState("networkidle")
    await page.waitForSelector('[data-testid="real-time-monitoring"]')
    await page.waitForTimeout(1000)

    const monitoringPanel = page.locator('[data-testid="real-time-monitoring"]')
    await expect(monitoringPanel).toHaveScreenshot("real-time-monitoring-panel.png")
  })

  test("alert center", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await page.waitForLoadState("networkidle")

    const alertCenter = page.locator('[data-testid="alert-center"]')
    await expect(alertCenter).toHaveScreenshot("monitoring-alert-center.png")
  })

  test("performance metrics grid", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(1000)

    const metricsGrid = page.locator('[data-testid="performance-metrics"]')
    await expect(metricsGrid).toHaveScreenshot("performance-metrics-grid.png")
  })

  test("ml insights panel", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await page.waitForLoadState("networkidle")
    await page.waitForSelector('[data-testid="ml-insights"]')
    await page.waitForTimeout(1500)

    const mlInsights = page.locator('[data-testid="ml-insights"]')
    await expect(mlInsights).toHaveScreenshot("ml-insights-panel.png")
  })

  test("error analysis section", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await page.waitForLoadState("networkidle")

    const errorAnalysis = page.locator('[data-testid="error-analysis"]')
    await expect(errorAnalysis).toHaveScreenshot("error-analysis-section.png")
  })
})
