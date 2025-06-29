import { test, expect } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Integration Hub Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
    await helpers.mockAuthenticatedUser("founder")
  })

  test("integration analytics dashboard", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("integration-analytics-dashboard.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("integration heatmap visualization", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    await helpers.waitForStableContent()

    // Look for heatmap or visualization components
    const heatmap = page.locator('[class*="heatmap"], svg, canvas, [data-testid*="heatmap"]').first()
    if ((await heatmap.count()) > 0) {
      await expect(heatmap).toHaveScreenshot("integration-heatmap.png", {
        animations: "disabled",
      })
    }
  })

  test("integration builder canvas", async ({ page }) => {
    await page.goto("/founder/api-management/integration-builder")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("integration-builder-canvas.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("integration node library", async ({ page }) => {
    await page.goto("/founder/api-management/integration-builder")
    await helpers.waitForStableContent()

    // Look for node library or component palette
    const nodeLibrary = page.locator('[class*="library"], [class*="palette"], [class*="nodes"]').first()
    if ((await nodeLibrary.count()) > 0) {
      await expect(nodeLibrary).toHaveScreenshot("integration-node-library.png", {
        animations: "disabled",
      })
    }
  })

  test("peer groups comparison", async ({ page }) => {
    await page.goto("/founder/api-management/peer-groups")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("peer-groups-comparison.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("vertical peer groups", async ({ page }) => {
    await page.goto("/founder/api-management/vertical-peer-groups")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("vertical-peer-groups.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("integration benchmarks", async ({ page }) => {
    await page.goto("/founder/api-management/integration-benchmarks")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("integration-benchmarks.png", {
      fullPage: true,
      animations: "disabled",
    })
  })
})
