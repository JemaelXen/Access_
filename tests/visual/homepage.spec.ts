import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Homepage Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.setFixedTime()
    await helpers.mockApiResponses()
    await page.goto("/")
  })

  test("homepage full layout", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("homepage")
  })

  test("homepage hero section", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="hero-section"]', "homepage-hero")
  })

  test("homepage navigation", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot("nav", "homepage-navigation")
  })

  test("homepage responsive layouts", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.testResponsiveLayout("homepage")
  })

  test("homepage theme variations", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.testThemeVariations("homepage")
  })

  test("homepage with user authentication", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.setupAuth("user")
    await page.reload()
    await helpers.takeFullPageScreenshot("homepage-authenticated")
  })

  test("homepage footer", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot("footer", "homepage-footer")
  })
})
