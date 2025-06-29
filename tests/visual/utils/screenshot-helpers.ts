import type { Page, Locator } from "@playwright/test"

export interface ViewportConfig {
  name: string
  width: number
  height: number
}

export interface UserConfig {
  id: string
  name: string
  email: string
  username: string
  role: "user" | "admin" | "founder"
  verified: boolean
}

export class ScreenshotHelpers {
  constructor(private page: Page) {}

  async disableAnimations(): Promise<void> {
    await this.page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
          animation-play-state: paused !important;
        }
        .animate-spin,
        .animate-pulse,
        .animate-bounce,
        .animate-ping {
          animation: none !important;
        }
        @keyframes none {
          0%, 100% { opacity: 1; }
        }
      `,
    })
  }

  async hideScrollbars(): Promise<void> {
    await this.page.addStyleTag({
      content: `
        ::-webkit-scrollbar {
          display: none !important;
        }
        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        html {
          overflow: -moz-scrollbars-none;
        }
      `,
    })
  }

  async setFixedTime(date = "2024-01-15T10:00:00Z"): Promise<void> {
    await this.page.addInitScript((fixedDate) => {
      const mockDate = new Date(fixedDate)
      const originalDate = Date

      // Override Date constructor
      function MockDate(...args: any[]) {
        if (args.length === 0) {
          return mockDate
        }
        return new originalDate(...args)
      }

      MockDate.now = () => mockDate.getTime()
      MockDate.UTC = originalDate.UTC
      MockDate.parse = originalDate.parse
      MockDate.prototype = originalDate.prototype

      // @ts-ignore
      Date = MockDate
    }, date)
  }

  async waitForStableContent(timeout = 5000): Promise<void> {
    await this.page.waitForLoadState("networkidle")

    // Wait for common dynamic elements
    const dynamicSelectors = [
      '[data-testid*="chart"]',
      ".recharts-wrapper",
      "canvas",
      'svg[class*="chart"]',
      '[data-testid*="loading"]',
      ".animate-pulse",
      '[data-testid="revenue-chart"]',
      '[data-testid="user-acquisition-map"]',
      '[data-testid="integration-heatmap"]',
      '[data-testid="real-time-monitoring"]',
    ]

    for (const selector of dynamicSelectors) {
      try {
        const elements = await this.page.locator(selector).count()
        if (elements > 0) {
          await this.page.waitForTimeout(2000)
          break
        }
      } catch {
        // Continue if selector doesn't exist
      }
    }

    // Additional wait for any remaining animations
    await this.page.waitForTimeout(1000)
  }

  async mockAuthenticatedUser(role: "user" | "admin" | "founder" = "user"): Promise<void> {
    const userData: Record<string, UserConfig> = {
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
      window.localStorage.setItem("auth-token", "mock-jwt-token-12345")
      window.localStorage.setItem("user-data", JSON.stringify(data))
      window.localStorage.setItem("user-role", data.role)
      window.localStorage.setItem("user-id", data.id)
      window.localStorage.setItem("is-authenticated", "true")
    }, userData[role])
  }

  async mockApiResponses(): Promise<void> {
    await this.page.route("**/api/**", async (route) => {
      const url = route.request().url()

      // Mock different API endpoints
      if (url.includes("/api/health")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ status: "healthy", timestamp: "2024-01-15T10:00:00Z" }),
        })
      } else if (url.includes("/api/dashboard/metrics")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            revenue: 125000,
            users: 2847,
            growth: 12.5,
            conversion: 3.2,
          }),
        })
      } else {
        // Default mock response
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, data: [] }),
        })
      }
    })
  }

  async captureResponsiveViews(url: string): Promise<Record<string, Buffer>> {
    const viewports: ViewportConfig[] = [
      { name: "mobile", width: 375, height: 667 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1920, height: 1080 },
      { name: "wide", width: 2560, height: 1440 },
    ]

    const screenshots: Record<string, Buffer> = {}

    for (const viewport of viewports) {
      await this.page.setViewportSize({ width: viewport.width, height: viewport.height })
      await this.page.goto(url)
      await this.waitForStableContent()

      screenshots[viewport.name] = await this.page.screenshot({
        fullPage: true,
        animations: "disabled",
      })
    }

    return screenshots
  }

  async captureThemeVariations(url: string): Promise<Record<string, Buffer>> {
    const screenshots: Record<string, Buffer> = {}

    // Light theme
    await this.page.goto(url)
    await this.page.evaluate(() => {
      document.documentElement.classList.remove("dark")
    })
    await this.waitForStableContent()
    screenshots.light = await this.page.screenshot({
      fullPage: true,
      animations: "disabled",
    })

    // Dark theme
    await this.page.evaluate(() => {
      document.documentElement.classList.add("dark")
    })
    await this.page.waitForTimeout(500)
    screenshots.dark = await this.page.screenshot({
      fullPage: true,
      animations: "disabled",
    })

    return screenshots
  }

  async captureComponentStates(locator: Locator): Promise<Record<string, Buffer>> {
    const screenshots: Record<string, Buffer> = {}

    // Normal state
    screenshots.normal = await locator.screenshot({ animations: "disabled" })

    // Hover state
    try {
      await locator.hover()
      await this.page.waitForTimeout(200)
      screenshots.hover = await locator.screenshot({ animations: "disabled" })
    } catch {
      // Element not hoverable
    }

    // Focus state
    try {
      await locator.focus()
      await this.page.waitForTimeout(200)
      screenshots.focus = await locator.screenshot({ animations: "disabled" })
    } catch {
      // Element not focusable
    }

    return screenshots
  }

  async setupTestEnvironment(): Promise<void> {
    await this.disableAnimations()
    await this.hideScrollbars()
    await this.setFixedTime()
    await this.mockApiResponses()
  }
}
