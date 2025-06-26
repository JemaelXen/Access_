import { test, expect } from "@playwright/test"

test.describe("Integration Hub Visual Tests", () => {
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

  test("integration hub overview", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(1500)

    await expect(page).toHaveScreenshot("integration-hub-overview.png", {
      fullPage: true,
    })
  })

  test("integration analytics dashboard", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    await page.waitForLoadState("networkidle")

    const analyticsSection = page.locator('[data-testid="integration-analytics"]')
    await expect(analyticsSection).toHaveScreenshot("integration-analytics.png")
  })

  test("integration heatmap", async ({ page }) => {
    await page.goto("/founder/api-management/integration-analytics")
    await page.waitForLoadState("networkidle")
    await page.waitForSelector('[data-testid="integration-heatmap"]')
    await page.waitForTimeout(1000)

    const heatmap = page.locator('[data-testid="integration-heatmap"]')
    await expect(heatmap).toHaveScreenshot("integration-heatmap.png")
  })

  test("integration builder canvas", async ({ page }) => {
    await page.goto("/founder/api-management/integration-builder")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(1000)

    const canvas = page.locator('[data-testid="integration-canvas"]')
    await expect(canvas).toHaveScreenshot("integration-builder-canvas.png")
  })

  test("integration node library", async ({ page }) => {
    await page.goto("/founder/api-management/integration-builder")
    await page.waitForLoadState("networkidle")

    const nodeLibrary = page.locator('[data-testid="node-library"]')
    await expect(nodeLibrary).toHaveScreenshot("integration-node-library.png")
  })

  test("peer groups comparison", async ({ page }) => {
    await page.goto("/founder/api-management/peer-groups")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(1000)

    const peerGroups = page.locator('[data-testid="peer-groups-overview"]')
    await expect(peerGroups).toHaveScreenshot("peer-groups-comparison.png")
  })
})
