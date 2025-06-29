import { test, expect } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Monitoring Dashboard Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
    await helpers.mockAuthenticatedUser("founder")
  })

  test("monitoring dashboard overview", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("monitoring-dashboard-overview.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("real-time monitoring panels", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.waitForStableContent()

    // Look for monitoring panels or widgets
    const monitoringPanels = page.locator('[class*="panel"], [class*="widget"], [class*="monitor"]')
    const panelCount = await monitoringPanels.count()

    if (panelCount > 0) {
      for (let i = 0; i < Math.min(panelCount, 4); i++) {
        const panel = monitoringPanels.nth(i)
        await expect(panel).toHaveScreenshot(`monitoring-panel-${i + 1}.png`, {
          animations: "disabled",
        })
      }
    }
  })

  test("alert center interface", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.waitForStableContent()

    // Look for alert components
    const alertCenter = page.locator('[class*="alert"], [data-testid*="alert"]').first()
    if ((await alertCenter.count()) > 0) {
      await expect(alertCenter).toHaveScreenshot("monitoring-alert-center.png", {
        animations: "disabled",
      })
    }
  })

  test("performance metrics display", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.waitForStableContent()

    // Look for metrics displays
    const metricsDisplay = page.locator('[class*="metrics"], [class*="performance"]').first()
    if ((await metricsDisplay.count()) > 0) {
      await expect(metricsDisplay).toHaveScreenshot("performance-metrics-display.png", {
        animations: "disabled",
      })
    }
  })

  test("ml insights visualization", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.waitForStableContent()

    // Look for ML insights components
    const mlInsights = page.locator('[class*="ml"], [class*="insights"], [class*="ai"]').first()
    if ((await mlInsights.count()) > 0) {
      await expect(mlInsights).toHaveScreenshot("ml-insights-visualization.png", {
        animations: "disabled",
      })
    }
  })

  test("monitoring dashboard mobile view", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/founder/monitoring-dashboard")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("monitoring-dashboard-mobile.png", {
      fullPage: true,
      animations: "disabled",
    })
  })
})
