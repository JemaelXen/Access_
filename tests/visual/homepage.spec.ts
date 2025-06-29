import { test, expect } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Homepage Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
  })

  test("homepage full layout", async ({ page }) => {
    await page.goto("/")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("homepage-full.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("homepage hero section", async ({ page }) => {
    await page.goto("/")
    await helpers.waitForStableContent()

    // Look for hero content
    const heroSection = page.locator("main").first()
    await expect(heroSection).toHaveScreenshot("homepage-hero.png", {
      animations: "disabled",
    })
  })

  test("homepage navigation bar", async ({ page }) => {
    await page.goto("/")
    await helpers.waitForStableContent()

    const navigation = page.locator("nav, header").first()
    await expect(navigation).toHaveScreenshot("homepage-navigation.png", {
      animations: "disabled",
    })
  })

  test("homepage footer", async ({ page }) => {
    await page.goto("/")
    await helpers.waitForStableContent()

    const footer = page.locator("footer").first()
    if ((await footer.count()) > 0) {
      await expect(footer).toHaveScreenshot("homepage-footer.png", {
        animations: "disabled",
      })
    }
  })

  test("homepage responsive views", async ({ page }) => {
    const viewports = [
      { name: "mobile", width: 375, height: 667 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1920, height: 1080 },
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.goto("/")
      await helpers.waitForStableContent()

      await expect(page).toHaveScreenshot(`homepage-${viewport.name}.png`, {
        fullPage: true,
        animations: "disabled",
      })
    }
  })

  test("homepage theme variations", async ({ page }) => {
    await page.goto("/")
    await helpers.waitForStableContent()

    // Light theme
    await page.evaluate(() => document.documentElement.classList.remove("dark"))
    await page.waitForTimeout(300)
    await expect(page).toHaveScreenshot("homepage-light.png", {
      fullPage: true,
      animations: "disabled",
    })

    // Dark theme
    await page.evaluate(() => document.documentElement.classList.add("dark"))
    await page.waitForTimeout(300)
    await expect(page).toHaveScreenshot("homepage-dark.png", {
      fullPage: true,
      animations: "disabled",
    })
  })
})
