import { test, expect } from "@playwright/test"

test.describe("Homepage Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations for consistent screenshots
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

  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/")

    // Wait for the page to be fully loaded
    await page.waitForLoadState("networkidle")

    // Wait for any dynamic content to load
    await page.waitForTimeout(1000)

    // Take full page screenshot
    await expect(page).toHaveScreenshot("homepage-full.png", {
      fullPage: true,
    })
  })

  test("homepage hero section", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    // Screenshot of just the hero section
    const heroSection = page.locator('[data-testid="hero-section"]').first()
    await expect(heroSection).toHaveScreenshot("homepage-hero.png")
  })

  test("homepage navigation", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    // Screenshot of navigation
    const navigation = page.locator("nav").first()
    await expect(navigation).toHaveScreenshot("homepage-navigation.png")
  })

  test("homepage footer", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    // Screenshot of footer
    const footer = page.locator("footer").first()
    await expect(footer).toHaveScreenshot("homepage-footer.png")
  })

  test("homepage mobile view", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot("homepage-mobile.png", {
      fullPage: true,
    })
  })

  test("homepage tablet view", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot("homepage-tablet.png", {
      fullPage: true,
    })
  })
})
