import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Dashboard Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
    await helpers.setupAuth("admin")
  })

  test("dashboard full layout", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.takeFullPageScreenshot("dashboard")
  })

  test("dashboard responsive layouts", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.testResponsiveLayout("dashboard")
  })

  test("dashboard theme variations", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.testThemeVariations("dashboard")
  })

  test("dashboard sidebar", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.takeElementScreenshot('[data-testid="sidebar"]', "dashboard-sidebar")
  })

  test("dashboard metrics cards", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.takeElementScreenshot('[data-testid="metrics-cards"]', "dashboard-metrics")
  })

  test("dashboard revenue chart", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.takeElementScreenshot('[data-testid="revenue-chart"]', "dashboard-revenue-chart")
  })

  test("dashboard user acquisition map", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.takeElementScreenshot('[data-testid="user-acquisition-map"]', "dashboard-user-map")
  })

  test("dashboard with founder access", async ({ page }) => {
    await helpers.setupAuth("founder")
    await page.goto("/dashboard")
    await helpers.takeFullPageScreenshot("dashboard-founder")
  })

  test("dashboard loading state", async ({ page }) => {
    // Intercept API calls to simulate loading
    await page.route("**/api/dashboard/metrics", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await route.continue()
    })

    await page.goto("/dashboard")
    await helpers.takeFullPageScreenshot("dashboard-loading")
  })
})
