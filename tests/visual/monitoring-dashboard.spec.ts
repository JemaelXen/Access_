import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Monitoring Dashboard Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.setFixedTime()
    await helpers.mockApiResponses()
    await helpers.setupAuth("founder")
  })

  test("monitoring dashboard full layout", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("monitoring-dashboard")
  })

  test("real-time monitoring panels", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="monitoring-panels"]', "monitoring-panels")
  })

  test("alert center", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="alert-center"]', "alert-center")
  })

  test("performance metrics", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="performance-metrics"]', "performance-metrics")
  })

  test("ml insights dashboard", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="ml-insights"]', "ml-insights")
  })

  test("executive dashboard", async ({ page }) => {
    await page.goto("/founder/executive-dashboard")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("executive-dashboard")
  })

  test("monitoring dashboard responsive layouts", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    const helpers = new ScreenshotHelpers(page)
    await helpers.testResponsiveLayout("monitoring-dashboard")
  })

  test("monitoring dashboard theme variations", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")
    const helpers = new ScreenshotHelpers(page)
    await helpers.testThemeVariations("monitoring-dashboard")
  })

  test("alert rules configuration", async ({ page }) => {
    await page.goto("/founder/monitoring-dashboard")

    // Open alert rules modal
    await page.click('[data-testid="configure-alerts"]')

    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="alert-rules-modal"]', "alert-rules-modal")
  })
})
