import { test } from "@playwright/test"
import { ScreenshotHelpers } from "./utils/screenshot-helpers"

test.describe("Component Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    const helpers = new ScreenshotHelpers(page)
    await helpers.setFixedTime()
    await helpers.mockApiResponses()
    await helpers.setupAuth("admin")
  })

  test("navigation components", async ({ page }) => {
    await page.goto("/dashboard")
    const helpers = new ScreenshotHelpers(page)

    // Main navigation
    await helpers.takeElementScreenshot('[data-testid="main-nav"]', "main-navigation")

    // Breadcrumb navigation
    await helpers.takeElementScreenshot('[data-testid="breadcrumb"]', "breadcrumb-navigation")
  })

  test("card components", async ({ page }) => {
    await page.goto("/dashboard")
    const helpers = new ScreenshotHelpers(page)

    // Metric cards
    await helpers.takeElementScreenshot('[data-testid="metric-card"]', "metric-card")

    // Chart cards
    await helpers.takeElementScreenshot('[data-testid="chart-card"]', "chart-card")
  })

  test("button components", async ({ page }) => {
    await page.goto("/dashboard")
    const helpers = new ScreenshotHelpers(page)

    // Primary button
    await helpers.takeElementScreenshot('[data-testid="primary-button"]', "primary-button")

    // Secondary button
    await helpers.takeElementScreenshot('[data-testid="secondary-button"]', "secondary-button")

    // Button hover states
    await page.hover('[data-testid="primary-button"]')
    await helpers.takeElementScreenshot('[data-testid="primary-button"]', "primary-button-hover")
  })

  test("form components", async ({ page }) => {
    await page.goto("/profile")
    const helpers = new ScreenshotHelpers(page)

    // Input fields
    await helpers.takeElementScreenshot('[data-testid="text-input"]', "text-input")

    // Select dropdown
    await page.click('[data-testid="select-trigger"]')
    await helpers.takeElementScreenshot('[data-testid="select-content"]', "select-dropdown")

    // Checkbox
    await helpers.takeElementScreenshot('[data-testid="checkbox"]', "checkbox")

    // Radio buttons
    await helpers.takeElementScreenshot('[data-testid="radio-group"]', "radio-group")
  })

  test("modal components", async ({ page }) => {
    await page.goto("/dashboard")

    // Open modal
    await page.click('[data-testid="open-modal"]')

    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="modal"]', "modal-dialog")

    // Modal with form
    await page.click('[data-testid="modal-form-tab"]')
    await helpers.takeElementScreenshot('[data-testid="modal"]', "modal-with-form")
  })

  test("toast notifications", async ({ page }) => {
    await page.goto("/dashboard")

    // Trigger success toast
    await page.click('[data-testid="success-toast-trigger"]')

    const helpers = new ScreenshotHelpers(page)
    await helpers.takeElementScreenshot('[data-testid="toast"]', "success-toast")

    // Trigger error toast
    await page.click('[data-testid="error-toast-trigger"]')
    await helpers.takeElementScreenshot('[data-testid="toast"]', "error-toast")
  })

  test("loading components", async ({ page }) => {
    await page.goto("/dashboard")
    const helpers = new ScreenshotHelpers(page)

    // Loading spinner
    await helpers.takeElementScreenshot('[data-testid="loading-spinner"]', "loading-spinner")

    // Skeleton loader
    await helpers.takeElementScreenshot('[data-testid="skeleton-loader"]', "skeleton-loader")

    // Progress bar
    await helpers.takeElementScreenshot('[data-testid="progress-bar"]', "progress-bar")
  })

  test("data table components", async ({ page }) => {
    await page.goto("/dashboard")
    const helpers = new ScreenshotHelpers(page)

    // Data table
    await helpers.takeElementScreenshot('[data-testid="data-table"]', "data-table")

    // Table with sorting
    await page.click('[data-testid="sort-header"]')
    await helpers.takeElementScreenshot('[data-testid="data-table"]', "data-table-sorted")

    // Table with filters
    await page.click('[data-testid="filter-button"]')
    await helpers.takeElementScreenshot('[data-testid="table-filters"]', "table-filters")
  })
})
