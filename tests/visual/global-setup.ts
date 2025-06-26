import { chromium, type FullConfig } from "@playwright/test"

async function globalSetup(config: FullConfig) {
  // Start the development server if not already running
  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    // Check if the server is running
    await page.goto("http://localhost:3000", { timeout: 5000 })
    console.log("Development server is already running")
  } catch (error) {
    console.log("Development server not running, please start it manually")
    throw new Error('Please start the development server with "npm run dev" before running visual tests')
  } finally {
    await browser.close()
  }
}

export default globalSetup
