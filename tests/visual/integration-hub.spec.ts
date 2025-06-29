import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Integration Hub Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.setFixedTime()
    await helpers.mockApiResponses()
    await helpers.setupAuth("admin")
  })

  test("integration analytics dashboard", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("integration-analytics")
  })

  test("integration heatmap", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="integration-heatmap"]', "integration-heatmap")
  })

  test("integration builder canvas", async ({ page }) => {
    await page.goto("/founder/api-management/integration-builder")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("integration-builder")
  })

  test("integration node library", async ({ page }) => {
    await page.goto("/founder/api-management/integration-builder")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="node-library"]', "integration-nodes")
  })

  test("peer groups overview", async ({ page }) => {
    await page.goto("/founder/api-management/peer-groups")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("peer-groups")
  })

  test("vertical peer groups", async ({ page }) => {
    await page.goto("/founder/api-management/vertical-peer-groups")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("vertical-peer-groups")
  })

  test("integration benchmarks", async ({ page }) => {
    await page.goto("/founder/api-management/integration-benchmarks")
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("integration-benchmarks")
  })

  test("integration hub responsive layouts", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    const helpers = new ScreenshotHelpers(page)
    await helpers.testResponsiveLayout("integration-hub")
  })

  test("integration hub theme variations", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    const helpers = new ScreenshotHelpers(page)
    await helpers.testThemeVariations("integration-hub")
  })
})
