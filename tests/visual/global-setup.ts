import { chromium, type FullConfig } from "@playwright/test"

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global setup for visual tests...")

  // Set up test database or mock data if needed
  if (process.env.CI) {
    console.log("Running in CI environment")
    // CI-specific setup
    process.env.NODE_ENV = "test"
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000/api"
  } else {
    console.log("Running in local development environment")
    // Local development setup
    process.env.NODE_ENV = "development"
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000/api"
  }

  // Launch browser for authentication setup
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    // Navigate to the app to ensure it's running
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" })
    console.log("✅ Application is running and accessible")

    // Set up authentication tokens for different user types
    await page.evaluate(() => {
      // Mock authentication tokens
      localStorage.setItem("auth-token", "mock-test-token-12345")
      localStorage.setItem("user-role", "admin")
      localStorage.setItem("user-id", "test-user-123")
      localStorage.setItem("user-name", "Test User")
      localStorage.setItem("user-email", "test@example.com")
    })

    console.log("✅ Authentication setup completed")
  } catch (error) {
    console.error("❌ Global setup failed:", error)
    throw error
  } finally {
    await browser.close()
  }

  console.log("✅ Global setup completed successfully")
}

export default globalSetup
