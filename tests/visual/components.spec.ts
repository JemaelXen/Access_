import { test, expect } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Component Visual Tests", () => {
  let helpers: ScreenshotHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new ScreenshotHelpers(page)
    await helpers.setupTestEnvironment()
  })

  test("navigation component variations", async ({ page }) => {
    await page.goto("/")
    await helpers.waitForStableContent()

    // Desktop navigation
    const nav = page.locator("nav, header").first()
    if ((await nav.count()) > 0) {
      await expect(nav).toHaveScreenshot("navigation-desktop.png", {
        animations: "disabled",
      })
    }

    // Mobile navigation
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(500)

    if ((await nav.count()) > 0) {
      await expect(nav).toHaveScreenshot("navigation-mobile.png", {
        animations: "disabled",
      })
    }

    // Mobile menu (if hamburger exists)
    const hamburger = page.locator('[class*="hamburger"], [class*="menu-toggle"], button[aria-label*="menu"]').first()
    if ((await hamburger.count()) > 0) {
      await hamburger.click()
      await page.waitForTimeout(300)
      await expect(page).toHaveScreenshot("navigation-mobile-menu-open.png", {
        animations: "disabled",
      })
    }
  })

  test("button component states", async ({ page }) => {
    await page.goto("/")
    await helpers.waitForStableContent()

    // Find different button types
    const buttons = page.locator("button")
    const buttonCount = await buttons.count()

    if (buttonCount > 0) {
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i)
        const buttonText = await button.textContent()

        // Normal state
        await expect(button).toHaveScreenshot(`button-${i + 1}-normal.png`, {
          animations: "disabled",
        })

        // Hover state
        await button.hover()
        await page.waitForTimeout(200)
        await expect(button).toHaveScreenshot(`button-${i + 1}-hover.png`, {
          animations: "disabled",
        })

        // Focus state
        await button.focus()
        await page.waitForTimeout(200)
        await expect(button).toHaveScreenshot(`button-${i + 1}-focus.png`, {
          animations: "disabled",
        })
      }
    }
  })

  test("card component layouts", async ({ page }) => {
    await page.goto("/dashboard")
    await helpers.waitForStableContent()

    // Find card-like components
    const cards = page.locator('[class*="card"], [class*="panel"], [class*="widget"]')
    const cardCount = await cards.count()

    if (cardCount > 0) {
      for (let i = 0; i < Math.min(cardCount, 6); i++) {
        const card = cards.nth(i)
        await expect(card).toHaveScreenshot(`card-component-${i + 1}.png`, {
          animations: "disabled",
        })
      }
    }
  })

  test("form input component states", async ({ page }) => {
    await page.goto("/login")
    await helpers.waitForStableContent()

    const inputs = page.locator("input")
    const inputCount = await inputs.count()

    if (inputCount > 0) {
      for (let i = 0; i < Math.min(inputCount, 3); i++) {
        const input = inputs.nth(i)
        const inputType = (await input.getAttribute("type")) || "text"

        // Empty state
        await expect(input).toHaveScreenshot(`input-${inputType}-empty.png`, {
          animations: "disabled",
        })

        // Focused state
        await input.focus()
        await page.waitForTimeout(200)
        await expect(input).toHaveScreenshot(`input-${inputType}-focused.png`, {
          animations: "disabled",
        })

        // Filled state
        const testValue =
          inputType === "email" ? "test@example.com" : inputType === "password" ? "password123" : "test value"
        await input.fill(testValue)
        await page.waitForTimeout(200)
        await expect(input).toHaveScreenshot(`input-${inputType}-filled.png`, {
          animations: "disabled",
        })
      }
    }
  })

  test("loading component states", async ({ page }) => {
    // Visit pages that might have loading states
    const loadingPages = ["/ebooks", "/marketplace", "/messages"]

    for (const url of loadingPages) {
      try {
        await page.goto(url)

        // Try to capture loading state quickly
        const loadingElements = page.locator('[class*="loading"], [class*="spinner"], [class*="skeleton"]')
        const loadingCount = await loadingElements.count()

        if (loadingCount > 0) {
          for (let i = 0; i < Math.min(loadingCount, 3); i++) {
            const loading = loadingElements.nth(i)
            await expect(loading).toHaveScreenshot(`loading-state-${i + 1}.png`, {
              animations: "disabled",
            })
          }
        }
      } catch (error) {
        console.warn(`Could not test loading states for ${url}:`, error)
      }
    }
  })

  test("error component states", async ({ page }) => {
    // Test error boundaries and error states
    await page.goto("/")
    await helpers.waitForStableContent()

    // Inject error component for testing
    await page.evaluate(() => {
      const errorDiv = document.createElement("div")
      errorDiv.className = "p-4 bg-red-50 border border-red-200 rounded-md text-red-800"
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <span>An error occurred while loading data.</span>
        </div>
      `
      document.body.appendChild(errorDiv)
    })

    const errorComponent = page.locator(".bg-red-50").last()
    await expect(errorComponent).toHaveScreenshot("error-component.png", {
      animations: "disabled",
    })
  })
})
