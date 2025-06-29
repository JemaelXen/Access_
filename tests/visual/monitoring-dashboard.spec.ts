import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Monitoring Dashboard Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
    await helpers.setupAuth("admin")
  })

  test("monitoring dashboard full layout", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.takeFullPageScreenshot("monitoring-dashboard")
  })

  test("monitoring dashboard responsive layouts", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.testResponsiveLayout("monitoring-dashboard")
  })

  test("monitoring dashboard theme variations", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.testThemeVariations("monitoring-dashboard")
  })

  test("real-time monitoring panel", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.takeElementScreenshot('[data-testid="real-time-monitoring"]', "monitoring-realtime")
  })

  test("alert center", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.takeElementScreenshot('[data-testid="alert-center"]', "monitoring-alerts")
  })

  test("performance metrics", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.takeElementScreenshot('[data-testid="performance-metrics"]', "monitoring-performance")
  })

  test("ml insights dashboard", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    await helpers.takeElementScreenshot('[data-testid="ml-insights"]', "monitoring-ml-insights")
  })

  test("monitoring dashboard with critical alerts", async ({ page }) => {
    // Mock critical alerts
    await page.route("**/api/monitoring/alerts", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          alerts: [
            {
              id: "alert-1",
              title: "System Down",
              severity: "critical",
              status: "active",
              timestamp: "2024-01-15T10:25:00Z",
              description: "Main API server is not responding",
            },
            {
              id: "alert-2",
              title: "Database Connection Lost",
              severity: "critical",
              status: "active",
              timestamp: "2024-01-15T10:20:00Z",
              description: "Unable to connect to primary database",
            },
          ],
          metrics: {
            totalAlerts: 25,
            activeAlerts: 8,
            resolvedToday: 12,
            averageResolutionTime: "25m",
          },
        }),
      })
    })

    await page.goto("/founder/monitoring-dashboard")
    await helpers.takeFullPageScreenshot("monitoring-dashboard-critical")
  })

  test("executive dashboard", async ({ page }) => {
    await helpers.setupAuth("founder")
    await page.goto("/founder/executive-dashboard")
    await helpers.takeFullPageScreenshot("executive-dashboard")
  })
})
