import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Homepage Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
  })

  test("homepage full layout", async ({ page }) => {
    await page.goto("/")
    await helpers.takeFullPageScreenshot("homepage")
  })

  test("homepage responsive layouts", async ({ page }) => {
    await page.goto("/")
    await helpers.testResponsiveLayout("homepage")
  })

  test("homepage theme variations", async ({ page }) => {
    await page.goto("/")
    await helpers.testThemeVariations("homepage")
  })

  test("homepage hero section", async ({ page }) => {
    await page.goto("/")
    await helpers.takeElementScreenshot('[data-testid="hero-section"]', "homepage-hero")
  })

  test("homepage navigation", async ({ page }) => {
    await page.goto("/")
    await helpers.takeElementScreenshot("nav", "homepage-navigation")
  })

  test("homepage footer", async ({ page }) => {
    await page.goto("/")
    await helpers.takeElementScreenshot("footer", "homepage-footer")
  })

  test("homepage with authenticated user", async ({ page }) => {
    await helpers.setupAuth("user")
    await page.goto("/")
    await helpers.takeFullPageScreenshot("homepage-authenticated")
  })

  test("homepage with founder user", async ({ page }) => {
    await helpers.setupAuth("founder")
    await page.goto("/")
    await helpers.takeFullPageScreenshot("homepage-founder")
  })
})
