import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Social Feed Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.setFixedTime()
    await helpers.mockApiResponses()
    await helpers.setupAuth("user")
    await page.goto("/social")
  })

  test("social feed full layout", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeFullPageScreenshot("social-feed")
  })

  test("social feed posts", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="feed-posts"]', "social-posts")
  })

  test("social feed stories bar", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="stories-bar"]', "social-stories")
  })

  test("social feed trending sidebar", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="trending-sidebar"]', "social-trending")
  })

  test("social feed responsive layouts", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.testResponsiveLayout("social-feed")
  })

  test("social feed theme variations", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.testThemeVariations("social-feed")
  })

  test("social feed with founder posts", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.setupAuth("founder")
    await page.reload()
    await helpers.takeFullPageScreenshot("social-feed-founder")
  })

  test("social feed post interactions", async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)

    // Test like button hover state
    await page.hover('[data-testid="like-button"]')
    await helpers.takeElementScreenshot('[data-testid="post-actions"]', "social-post-actions-hover")

    // Test bookmark button
    await page.click('[data-testid="bookmark-button"]')
    await helpers.takeElementScreenshot('[data-testid="post-actions"]', "social-post-actions-bookmarked")
  })
})
