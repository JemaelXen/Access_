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
        
        .animate-ping {
          animation: none !important;
        }
        
        .animate-fade-in {
          animation: none !important;
        }
        
        .animate-slide-in {
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
        
        html {
          overflow: -moz-scrollbars-none;
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
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

    // Mock health check
    await this.page.route(`${baseUrl}/api/health`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: "healthy",
          timestamp: "2024-01-15T10:30:00Z",
          version: "1.0.0",
          uptime: 86400,
        }),
      })
    })

    // Mock user data
    await this.page.route(`${baseUrl}/api/user`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "test-user-123",
          name: "Test User",
          email: "test@example.com",
          username: "testuser",
          role: "admin",
          avatar: "/placeholder-user.jpg",
          verified: true,
          createdAt: "2024-01-01T00:00:00Z",
        }),
      })
    })

    // Mock dashboard metrics
    await this.page.route(`${baseUrl}/api/dashboard/metrics`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          totalUsers: 1234,
          activeUsers: 856,
          activeIntegrations: 56,
          apiCalls: 789012,
          uptime: 99.9,
          revenue: 45678.9,
          growth: 12.5,
          conversion: 3.2,
          churn: 2.1,
        }),
      })
    })

    // Mock social feed data
    await this.page.route(`${baseUrl}/api/social/feed`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          posts: [
            {
              id: "1",
              author: "Jemael Xenn",
              username: "jemael",
              content: "Just launched our new integration platform! 🚀",
              timestamp: "2024-01-15T10:00:00Z",
              likes: 42,
              comments: 8,
              isFounder: true,
              verified: true,
              avatar: "/placeholder-user.jpg",
            },
            {
              id: "2",
              author: "Jane Smith",
              username: "janesmith",
              content: "Great insights from the latest benchmark report. The ML predictions are spot on!",
              timestamp: "2024-01-15T09:30:00Z",
              likes: 28,
              comments: 5,
              isFounder: false,
              verified: false,
              avatar: "/placeholder-user.jpg",
            },
            {
              id: "3",
              author: "Mike Johnson",
              username: "mikej",
              content: "Our API performance has improved by 40% this month. Thanks to the monitoring dashboard!",
              timestamp: "2024-01-15T09:00:00Z",
              likes: 35,
              comments: 12,
              isFounder: false,
              verified: true,
              avatar: "/placeholder-user.jpg",
            },
          ],
          stories: [
            {
              id: "s1",
              author: "Jemael Xenn",
              username: "jemael",
              thumbnail: "/placeholder.jpg",
              isViewed: false,
            },
            {
              id: "s2",
              author: "Sarah Wilson",
              username: "sarahw",
              thumbnail: "/placeholder.jpg",
              isViewed: true,
            },
          ],
        }),
      })
    })

    // Mock integration data
    await this.page.route(`${baseUrl}/api/integrations`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          active: [
            {
              id: "1",
              name: "Salesforce",
              status: "active",
              health: 98,
              category: "CRM",
              lastSync: "2024-01-15T10:25:00Z",
              apiCalls: 15420,
            },
            {
              id: "2",
              name: "HubSpot",
              status: "active",
              health: 95,
              category: "Marketing",
              lastSync: "2024-01-15T10:20:00Z",
              apiCalls: 8930,
            },
            {
              id: "3",
              name: "Slack",
              status: "warning",
              health: 87,
              category: "Communication",
              lastSync: "2024-01-15T10:15:00Z",
              apiCalls: 5670,
            },
          ],
          available: [
            {
              id: "4",
              name: "Microsoft Teams",
              category: "Communication",
              description: "Team collaboration and communication",
              popularity: 85,
            },
            {
              id: "5",
              name: "Zoom",
              category: "Communication",
              description: "Video conferencing and meetings",
              popularity: 92,
            },
            {
              id: "6",
              name: "Stripe",
              category: "Payment",
              description: "Payment processing and billing",
              popularity: 88,
            },
          ],
        }),
      })
    })

    // Mock monitoring data
    await this.page.route(`${baseUrl}/api/monitoring/alerts`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          alerts: [
            {
              id: "alert-1",
              title: "High API Response Time",
              severity: "warning",
              status: "active",
              timestamp: "2024-01-15T10:25:00Z",
              description: "API response time exceeded 2s threshold",
            },
            {
              id: "alert-2",
              title: "Integration Health Check Failed",
              severity: "critical",
              status: "resolved",
              timestamp: "2024-01-15T09:45:00Z",
              description: "Slack integration health check failed",
            },
          ],
          metrics: {
            totalAlerts: 15,
            activeAlerts: 3,
            resolvedToday: 8,
            averageResolutionTime: "12m",
          },
        }),
      })
    })

    // Mock ML insights data
    await this.page.route(`${baseUrl}/api/ml/insights`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          predictions: [
            {
              id: "pred-1",
              type: "performance",
              confidence: 0.92,
              prediction: "API performance will degrade by 15% in next 24h",
              recommendation: "Scale up server capacity",
              impact: "medium",
            },
            {
              id: "pred-2",
              type: "usage",
              confidence: 0.87,
              prediction: "User activity will increase by 25% this weekend",
              recommendation: "Prepare additional resources",
              impact: "high",
            },
          ],
          anomalies: [
            {
              id: "anom-1",
              metric: "api_calls",
              value: 15420,
              expected: 12000,
              deviation: 0.285,
              timestamp: "2024-01-15T10:20:00Z",
            },
          ],
          modelStatus: {
            performance: "healthy",
            lastTrained: "2024-01-14T02:00:00Z",
            accuracy: 0.94,
          },
        }),
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
    const dynamicSelectors = [
      '[data-testid="chart"]',
      '[data-testid="metrics"]',
      '[data-testid="revenue-chart"]',
      '[data-testid="user-acquisition-map"]',
      '[data-testid="integration-heatmap"]',
      '[data-testid="real-time-monitoring"]',
      ".recharts-wrapper",
      "canvas",
      'svg[class*="chart"]',
    ]

    for (const selector of dynamicSelectors) {
      try {
        await this.page.waitForSelector(selector, { timeout: 5000 })
        await this.page.waitForTimeout(1000) // Wait for chart animation
        break
      } catch {
        // Continue if selector doesn't exist
      }
    }

    // Additional wait for any remaining animations
    await this.page.waitForTimeout(1000)
  }

  /**
   * Setup authentication for different user roles
   */
  async setupAuth(role: "user" | "admin" | "founder" = "user"): Promise<void> {
    const userData = {
      user: {
        id: "test-user-123",
        name: "Test User",
        email: "test@example.com",
        username: "testuser",
        role: "user",
        verified: false,
      },
      admin: {
        id: "test-admin-456",
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
      localStorage.setItem("auth-token", "mock-test-token-12345")
      localStorage.setItem("user-data", JSON.stringify(data))
      localStorage.setItem("user-role", data.role)
      localStorage.setItem("user-id", data.id)
      localStorage.setItem("user-name", data.name)
      localStorage.setItem("user-email", data.email)
      localStorage.setItem("is-authenticated", "true")

      if (data.role === "founder") {
        localStorage.setItem("is-founder", "true")
        localStorage.setItem("company", "Access&Co")
      }
    }, userData[role])
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
