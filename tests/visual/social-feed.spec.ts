import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Social Feed Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
    await helpers.setupAuth("user")
  })

  test("social feed full layout", async ({ page }) => {
    await page.goto("/social")
    await helpers.takeFullPageScreenshot("social-feed")
  })

  test("social feed responsive layouts", async ({ page }) => {
    await page.goto("/social")
    await helpers.testResponsiveLayout("social-feed")
  })

  test("social feed theme variations", async ({ page }) => {
    await page.goto("/social")
    await helpers.testThemeVariations("social-feed")
  })

  test("social feed main content", async ({ page }) => {
    await page.goto("/social")
    await helpers.takeElementScreenshot('[data-testid="feed-content"]', "social-feed-main")
  })

  test("social feed stories bar", async ({ page }) => {
    await page.goto("/social")
    await helpers.takeElementScreenshot('[data-testid="stories-bar"]', "social-stories")
  })

  test("social feed trending sidebar", async ({ page }) => {
    await page.goto("/social")
    await helpers.takeElementScreenshot('[data-testid="trending-sidebar"]', "social-trending")
  })

  test("social feed post interactions", async ({ page }) => {
    await page.goto("/social")

    // Test like button hover state
    const likeButton = page.locator('[data-testid="like-button"]').first()
    await likeButton.hover()
    await helpers.takeElementScreenshot('[data-testid="post"]', "social-post-hover")
  })

  test("social feed with founder posts", async ({ page }) => {
    await helpers.setupAuth("founder")
    await page.goto("/social")
    await helpers.takeFullPageScreenshot("social-feed-founder")
  })

  test("social feed empty state", async ({ page }) => {
    // Mock empty feed
    await page.route("**/api/social/feed", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ posts: [], stories: [] }),
      })
    })

    await page.goto("/social")
    await helpers.takeFullPageScreenshot("social-feed-empty")
  })
})
