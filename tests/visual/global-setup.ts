import { chromium, type FullConfig } from "@playwright/test"

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global setup for visual tests...")

  // Set up environment variables
  process.env.NODE_ENV = "test"
  process.env.NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

  console.log(`📍 Base URL: ${process.env.NEXT_PUBLIC_API_URL}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
  console.log(`🤖 CI Mode: ${process.env.CI ? "Yes" : "No"}`)

  // Launch browser for setup tasks
  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    // Wait for the application to be ready
    console.log("⏳ Waiting for application to be ready...")
    await page.goto(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", {
      waitUntil: "networkidle",
      timeout: 60000,
    })

    // Check if the app is responding
    const title = await page.title()
    console.log(`✅ Application ready! Title: ${title}`)

    // Pre-warm the application by visiting key pages
    const pagesToWarm = ["/", "/dashboard", "/social", "/integration-hub", "/monitoring-dashboard", "/login", "/signup"]

    console.log("🔥 Pre-warming application pages...")
    for (const path of pagesToWarm) {
      try {
        await page.goto(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
          waitUntil: "networkidle",
          timeout: 30000,
        })
        console.log(`   ✓ Warmed: ${path}`)
      } catch (error) {
        console.log(`   ⚠️  Failed to warm: ${path}`)
      }
    }
  } catch (error) {
    console.error("❌ Global setup failed:", error)
    throw error
  } finally {
    await browser.close()
  }

  console.log("✅ Global setup completed successfully!")
}

export default globalSetup
