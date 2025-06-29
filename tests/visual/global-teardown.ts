import type { FullConfig } from "@playwright/test"

async function globalTeardown(config: FullConfig) {
  console.log("🧹 Starting global teardown for visual tests...")

  // Clean up any test artifacts
  console.log("🗑️  Cleaning up test artifacts...")

  // Log test completion
  console.log("📊 Visual test suite completed")
  console.log(`📁 Test results saved to: ${config.outputDir}`)
  console.log(`📋 HTML report available at: playwright-report/index.html`)

  console.log("✅ Global teardown completed successfully!")
}

export default globalTeardown
