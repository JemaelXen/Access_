import { test, expect } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Social Feed Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
    await helpers.mockAuthenticatedUser("user")
  })

  test("social feed main layout", async ({ page }) => {
    await page.goto("/social")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("social-feed-layout.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("social feed post components", async ({ page }) => {
    await page.goto("/social")
    await helpers.waitForStableContent()

    // Look for post-like components
    const posts = page.locator('[class*="post"], [data-testid*="post"], article, [class*="card"]')
    const postCount = await posts.count()

    if (postCount > 0) {
      // Screenshot first few posts
      for (let i = 0; i < Math.min(postCount, 3); i++) {
        const post = posts.nth(i)
        await expect(post).toHaveScreenshot(`social-post-${i + 1}.png`, {
          animations: "disabled",
        })
      }
    }
  })

  test("social feed sidebar", async ({ page }) => {
    await page.goto("/social")
    await helpers.waitForStableContent()

    // Look for sidebar components
    const sidebar = page.locator('[class*="sidebar"], aside, [class*="trending"]').first()
    if ((await sidebar.count()) > 0) {
      await expect(sidebar).toHaveScreenshot("social-sidebar.png", {
        animations: "disabled",
      })
    }
  })

  test("social feed stories section", async ({ page }) => {
    await page.goto("/social")
    await helpers.waitForStableContent()

    // Look for stories or similar components
    const stories = page.locator('[class*="stories"], [data-testid*="stories"], [class*="carousel"]').first()
    if ((await stories.count()) > 0) {
      await expect(stories).toHaveScreenshot("social-stories.png", {
        animations: "disabled",
      })
    }
  })

  test("social feed mobile layout", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/social")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("social-feed-mobile.png", {
      fullPage: true,
      animations: "disabled",
    })
  })

  test("social feed founder posts", async ({ page }) => {
    await helpers.mockAuthenticatedUser("founder")
    await page.goto("/social")
    await helpers.waitForStableContent()

    await expect(page).toHaveScreenshot("social-feed-founder-view.png", {
      fullPage: true,
      animations: "disabled",
    })
  })
})
