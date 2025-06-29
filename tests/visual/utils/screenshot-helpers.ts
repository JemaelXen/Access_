import { type Page, expect } from "@playwright/test"

export class ScreenshotHelpers {
  constructor(private page: Page) {}

  /**
   * Disable all animations and transitions for consistent screenshots
   */
  async disableAnimations(): Promise<void> {
    await this.page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
          scroll-behavior: auto !important;
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

  /**
   * Hide scrollbars for cleaner screenshots
   */
  async hideScrollbars(): Promise<void> {
    await this.page.addStyleTag({
      content: `
        ::-webkit-scrollbar {
          display: none;
        }
        
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `,
    })
  }

  /**
   * Set a fixed time for consistent timestamps in screenshots
   */
  async setFixedTime(): Promise<void> {
    const fixedTime = new Date("2024-01-15T10:30:00Z").getTime()
    await this.page.addInitScript(`{
      Date.now = () => ${fixedTime};
      const OriginalDate = Date;
      Date = class extends OriginalDate {
        constructor(...args) {
          if (args.length === 0) {
            super(${fixedTime});
          } else {
            super(...args);
          }
        }
      };
    }`)
  }

  /**
   * Mock API responses for consistent data
   */
  async mockApiResponses(): Promise<void> {
    // Mock user data
    await this.page.route("**/api/user", async (route) => {
      await route.fulfill({
        json: {
          id: "test-user-123",
          name: "Test User",
          email: "test@example.com",
          role: "admin",
          avatar: "/placeholder-user.jpg",
        },
      })
    })

    // Mock dashboard metrics
    await this.page.route("**/api/metrics", async (route) => {
      await route.fulfill({
        json: {
          totalUsers: 1234,
          activeIntegrations: 56,
          apiCalls: 789012,
          uptime: 99.9,
          revenue: 45678.9,
        },
      })
    })

    // Mock social feed data
    await this.page.route("**/api/feed", async (route) => {
      await route.fulfill({
        json: {
          posts: [
            {
              id: "1",
              author: "John Doe",
              content: "Just launched our new integration!",
              timestamp: "2024-01-15T10:00:00Z",
              likes: 42,
              isFounder: true,
            },
            {
              id: "2",
              author: "Jane Smith",
              content: "Great insights from the latest benchmark report.",
              timestamp: "2024-01-15T09:30:00Z",
              likes: 28,
              isFounder: false,
            },
          ],
        },
      })
    })

    // Mock integration data
    await this.page.route("**/api/integrations", async (route) => {
      await route.fulfill({
        json: {
          active: [
            { id: "1", name: "Salesforce", status: "active", health: 98 },
            { id: "2", name: "HubSpot", status: "active", health: 95 },
            { id: "3", name: "Slack", status: "warning", health: 87 },
          ],
          available: [
            { id: "4", name: "Microsoft Teams", category: "Communication" },
            { id: "5", name: "Zoom", category: "Communication" },
            { id: "6", name: "Stripe", category: "Payment" },
          ],
        },
      })
    })
  }

  /**
   * Wait for all content to be stable before taking screenshot
   */
  async waitForStableContent(): Promise<void> {
    // Wait for network to be idle
    await this.page.waitForLoadState("networkidle")

    // Wait for any charts or dynamic content
    await this.page.waitForSelector('[data-testid="chart"]', { timeout: 5000 }).catch(() => {})
    await this.page.waitForSelector('[data-testid="metrics"]', { timeout: 5000 }).catch(() => {})

    // Additional wait for any remaining animations
    await this.page.waitForTimeout(1000)
  }

  /**
   * Setup authentication for different user roles
   */
  async setupAuth(role: "user" | "admin" | "founder" = "user"): Promise<void> {
    await this.page.addInitScript((userRole) => {
      localStorage.setItem("auth-token", "mock-test-token-12345")
      localStorage.setItem("user-role", userRole)
      localStorage.setItem("user-id", "test-user-123")
      localStorage.setItem("user-name", "Test User")
      localStorage.setItem("user-email", "test@example.com")

      if (userRole === "founder") {
        localStorage.setItem("is-founder", "true")
        localStorage.setItem("company", "Test Company")
      }
    }, role)
  }

  /**
   * Take a full page screenshot with all optimizations
   */
  async takeFullPageScreenshot(name: string): Promise<void> {
    await this.disableAnimations()
    await this.hideScrollbars()
    await this.waitForStableContent()

    await expect(this.page).toHaveScreenshot(`${name}-full-page.png`, {
      fullPage: true,
      animations: "disabled",
    })
  }

  /**
   * Take a screenshot of a specific element
   */
  async takeElementScreenshot(selector: string, name: string): Promise<void> {
    await this.disableAnimations()
    await this.waitForStableContent()

    const element = this.page.locator(selector)
    await expect(element).toHaveScreenshot(`${name}-element.png`, {
      animations: "disabled",
    })
  }

  /**
   * Test responsive layouts
   */
  async testResponsiveLayout(name: string): Promise<void> {
    const viewports = [
      { width: 375, height: 667, name: "mobile" },
      { width: 768, height: 1024, name: "tablet" },
      { width: 1920, height: 1080, name: "desktop" },
    ]

    for (const viewport of viewports) {
      await this.page.setViewportSize({ width: viewport.width, height: viewport.height })
      await this.waitForStableContent()
      await expect(this.page).toHaveScreenshot(`${name}-${viewport.name}.png`, {
        fullPage: true,
        animations: "disabled",
      })
    }
  }

  /**
   * Test theme variations
   */
  async testThemeVariations(name: string): Promise<void> {
    // Test light theme
    await this.page.evaluate(() => {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    })
    await this.waitForStableContent()
    await expect(this.page).toHaveScreenshot(`${name}-light-theme.png`, {
      fullPage: true,
      animations: "disabled",
    })

    // Test dark theme
    await this.page.evaluate(() => {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    })
    await this.waitForStableContent()
    await expect(this.page).toHaveScreenshot(`${name}-dark-theme.png`, {
      fullPage: true,
      animations: "disabled",
    })
  }
}
