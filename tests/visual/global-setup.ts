import { chromium, type FullConfig } from "@playwright/test"

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use

  // Launch browser for setup
  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    // Wait for the dev server to be ready
    console.log("Waiting for dev server to be ready...")
    await page.goto(baseURL!)
    await page.waitForLoadState("networkidle")
    console.log("Dev server is ready!")

    // Pre-warm the application by visiting key pages
    const pagesToWarm = [
      "/",
      "/dashboard",
      "/social",
      "/login",
      "/signup",
      "/founder/monitoring-dashboard",
      "/founder/api-management/integration-analytics",
    ]

    for (const url of pagesToWarm) {
      try {
        await page.goto(`${baseURL}${url}`)
        await page.waitForLoadState("networkidle", { timeout: 10000 })
      } catch (error) {
        console.warn(`Failed to warm up ${url}:`, error)
      }
    }
  } catch (error) {
    console.error("Global setup failed:", error)
    throw error
  } finally {
    await browser.close()
  }
}

export default globalSetup
