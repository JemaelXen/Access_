import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Integration Hub Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
    await helpers.setupAuth("admin")
  })

  test("integration hub full layout", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    await helpers.takeFullPageScreenshot("integration-hub")
  })

  test("integration hub responsive layouts", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    await helpers.testResponsiveLayout("integration-hub")
  })

  test("integration hub theme variations", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    await helpers.testThemeVariations("integration-hub")
  })

  test("integration analytics dashboard", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    await helpers.takeElementScreenshot('[data-testid="analytics-dashboard"]', "integration-analytics")
  })

  test("integration heatmap", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    await helpers.takeElementScreenshot('[data-testid="integration-heatmap"]', "integration-heatmap")
  })

  test("integration builder canvas", async ({ page }) => {
    await page.goto("/founder/api-management/integration-builder")
    await helpers.takeFullPageScreenshot("integration-builder")
  })

  test("integration benchmarks", async ({ page }) => {
    await page.goto("/founder/api-management/integration-benchmarks")
    await helpers.takeFullPageScreenshot("integration-benchmarks")
  })

  test("peer groups overview", async ({ page }) => {
    await page.goto("/founder/api-management/peer-groups")
    await helpers.takeFullPageScreenshot("peer-groups")
  })

  test("vertical peer groups", async ({ page }) => {
    await page.goto("/founder/api-management/vertical-peer-groups")
    await helpers.takeFullPageScreenshot("vertical-peer-groups")
  })

  test("integration hub with founder access", async ({ page }) => {
    await helpers.setupAuth("founder")
    await page.goto("/founder/api-management/integration-analytics")
    await helpers.takeFullPageScreenshot("integration-hub-founder")
  })
})
