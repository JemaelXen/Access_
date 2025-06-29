import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Dashboard Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.setFixedTime()
    await helpers.mockApiResponses()
    await helpers.setupAuth("admin")
    await page.goto("/dashboard")
  })

  test("admin dashboard full layout", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("admin-dashboard")
  })

  test("dashboard metrics cards", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="metrics-cards"]', "dashboard-metrics")
  })

  test("dashboard charts section", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="charts-section"]', "dashboard-charts")
  })

  test("dashboard sidebar navigation", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="sidebar"]', "dashboard-sidebar")
  })

  test("dashboard responsive layouts", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.testResponsiveLayout("admin-dashboard")
  })

  test("dashboard theme variations", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.testThemeVariations("admin-dashboard")
  })

  test("dashboard with founder role", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.setupAuth("founder")
    await page.reload()
    await helpers.takeFullPageScreenshot("dashboard-founder")
  })

  test("dashboard quick actions", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="quick-actions"]', "dashboard-quick-actions")
  })
})
