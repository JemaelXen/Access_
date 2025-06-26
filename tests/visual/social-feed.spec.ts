import { test, expect } from "@playwright/test"

test.describe("Social Feed Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Mock user authentication
    await page.addInitScript(() => {
      window.localStorage.setItem("auth-token", "mock-token")
      window.localStorage.setItem(
        "user-data",
        JSON.stringify({
          id: "user-123",
          name: "Test User",
          username: "testuser",
          verified: false,
        }),
      )
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

  test("social feed layout", async ({ page }) => {
    await page.goto("/social")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot("social-feed-layout.png", {
      fullPage: true,
    })
  })

  test("social feed post card", async ({ page }) => {
    await page.goto("/social")
    await page.waitForLoadState("networkidle")

    const firstPost = page.locator('[data-testid="post-card"]').first()
    await expect(firstPost).toHaveScreenshot("social-post-card.png")
  })

  test("social feed stories bar", async ({ page }) => {
    await page.goto("/social")
    await page.waitForLoadState("networkidle")

    const storiesBar = page.locator('[data-testid="stories-bar"]')
    await expect(storiesBar).toHaveScreenshot("social-stories-bar.png")
  })

  test("social feed trending sidebar", async ({ page }) => {
    await page.goto("/social")
    await page.waitForLoadState("networkidle")

    const trendingSidebar = page.locator('[data-testid="trending-sidebar"]')
    await expect(trendingSidebar).toHaveScreenshot("social-trending-sidebar.png")
  })

  test("social feed founder post", async ({ page }) => {
    await page.goto("/social")
    await page.waitForLoadState("networkidle")

    // Look for founder post with verification badge
    const founderPost = page.locator('[data-testid="post-card"][data-founder="true"]').first()
    await expect(founderPost).toHaveScreenshot("social-founder-post.png")
  })

  test("social feed mobile view", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/social")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot("social-feed-mobile.png", {
      fullPage: true,
    })
  })
})
