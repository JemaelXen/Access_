import type { Page, Locator } from "@playwright/test"

export class ScreenshotHelpers {
  constructor(private page: Page) {}

  async disableAnimations() {
    await this.page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        .animate-spin {
          animation: none !important;
        }
        .animate-pulse {
          animation: none !important;
        }
        .animate-bounce {
          animation: none !important;
        }
      `,
    })
  }

  async waitForStableContent(timeout = 3000) {
    await this.page.waitForLoadState("networkidle")
    await this.page.waitForTimeout(1000)

    // Wait for any charts or dynamic content to stabilize
    const chartSelectors = ['[data-testid*="chart"]', ".recharts-wrapper", "canvas", "svg"]

    for (const selector of chartSelectors) {
      const elements = await this.page.locator(selector).count()
      if (elements > 0) {
        await this.page.waitForTimeout(1500)
        break
      }
    }
  }

  async mockAuthenticatedUser(role: "user" | "admin" | "founder" = "user") {
    const userData = {
      user: {
        id: "user-123",
        name: "Test User",
        email: "test@example.com",
        username: "testuser",
        role: "user",
        verified: false,
      },
      admin: {
        id: "admin-123",
        name: "Admin User",
        email: "admin@example.com",
        username: "admin",
        role: "admin",
        verified: true,
      },
      founder: {
        id: "founder-001",
        name: "Jemael Xenn",
        email: "founder@projectaccess.co",
        username: "jemael",
        role: "founder",
        verified: true,
      },
    }

    await this.page.addInitScript((data) => {
      window.localStorage.setItem("auth-token", "mock-token")
      window.localStorage.setItem("user-data", JSON.stringify(data))
      window.localStorage.setItem("user-role", data.role)
    }, userData[role])
  }

  async hideScrollbars() {
    await this.page.addStyleTag({
      content: `
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          scrollbar-width: none;
        }
      `,
    })
  }

  async setFixedTime() {
    // Set a fixed time for consistent timestamps in screenshots
    await this.page.addInitScript(() => {
      const mockDate = new Date("2024-01-15T10:00:00Z")
      Date.now = () => mockDate.getTime()
      Date.prototype.getTime = () => mockDate.getTime()
    })
  }

  async captureComponentStates(locator: Locator, baseName: string) {
    const states = ["normal", "hover", "focus", "active"]
    const screenshots: Record<string, Buffer> = {}

    // Normal state
    screenshots.normal = await locator.screenshot()

    // Hover state
    await locator.hover()
    screenshots.hover = await locator.screenshot()

    // Focus state (if focusable)
    try {
      await locator.focus()
      screenshots.focus = await locator.screenshot()
    } catch {
      // Element not focusable
    }

    return screenshots
  }

  async captureResponsiveViews(url: string, baseName: string) {
    const viewports = [
      { name: "mobile", width: 375, height: 667 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1920, height: 1080 },
    ]

    const screenshots: Record<string, Buffer> = {}

    for (const viewport of viewports) {
      await this.page.setViewportSize(viewport)
      await this.page.goto(url)
      await this.waitForStableContent()

      screenshots[viewport.name] = await this.page.screenshot({
        fullPage: true,
      })
    }

    return screenshots
  }

  async captureThemeVariations(url: string, baseName: string) {
    const themes = ["light", "dark"]
    const screenshots: Record<string, Buffer> = {}

    for (const theme of themes) {
      await this.page.goto(url)
      await this.waitForStableContent()

      // Toggle theme
      if (theme === "dark") {
        await this.page.evaluate(() => {
          document.documentElement.classList.add("dark")
        })
        await this.page.waitForTimeout(500)
      }

      screenshots[theme] = await this.page.screenshot({
        fullPage: true,
      })
    }

    return screenshots
  }
}
