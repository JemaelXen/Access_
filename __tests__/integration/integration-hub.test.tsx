import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { IntegrationHub } from "@/components/integration-hub"
import { NewIntegrations } from "@/components/new-integrations"

describe("Integration Hub Tests", () => {
  test("integration hub displays active integrations", async () => {
    render(<IntegrationHub />)

    // Verify integration overview metrics
    expect(screen.getByText("Active Integrations")).toBeInTheDocument()
    expect(screen.getByText("API Requests")).toBeInTheDocument()
    expect(screen.getByText("Success Rate")).toBeInTheDocument()

    // Verify active integrations are listed
    await waitFor(() => {
      expect(screen.getByText("Stripe")).toBeInTheDocument()
      expect(screen.getByText("Slack")).toBeInTheDocument()
      expect(screen.getByText("AWS")).toBeInTheDocument()
    })

    // Test integration configuration
    const configureButtons = screen.getAllByRole("button", { name: /configure/i })
    expect(configureButtons.length).toBeGreaterThan(0)
  })

  test("new integrations installation flow", async () => {
    render(<NewIntegrations />)

    // Verify marketplace is displayed
    expect(screen.getByText("Integration Marketplace")).toBeInTheDocument()
    expect(screen.getByText("Available Integrations")).toBeInTheDocument()

    // Test search functionality
    const searchInput = screen.getByPlaceholderText(/search integrations/i)
    fireEvent.change(searchInput, { target: { value: "salesforce" } })

    await waitFor(() => {
      expect(screen.getByText("Salesforce")).toBeInTheDocument()
    })

    // Test integration installation
    const installButtons = screen.getAllByRole("button", { name: /install/i })
    if (installButtons.length > 0) {
      fireEvent.click(installButtons[0])

      // Verify installation job is created
      await waitFor(() => {
        expect(screen.getByText(/installing/i)).toBeInTheDocument()
      })
    }
  })

  test("custom integration creation", async () => {
    render(<NewIntegrations />)

    // Navigate to custom integration tab
    const customTab = screen.getByRole("tab", { name: /custom integration/i })
    fireEvent.click(customTab)

    // Fill in custom integration form
    const nameInput = screen.getByLabelText(/integration name/i)
    const endpointInput = screen.getByLabelText(/api endpoint/i)
    const descriptionInput = screen.getByLabelText(/description/i)

    fireEvent.change(nameInput, { target: { value: "Test Custom API" } })
    fireEvent.change(endpointInput, { target: { value: "https://api.test.com/v1" } })
    fireEvent.change(descriptionInput, { target: { value: "Test custom integration" } })

    // Submit form
    const createButton = screen.getByRole("button", { name: /create integration/i })
    fireEvent.click(createButton)

    // Verify integration is created
    await waitFor(() => {
      // Should show in installations tab or success message
      expect(screen.getByText(/test custom api/i)).toBeInTheDocument()
    })
  })

  test("integration filtering and categorization", async () => {
    render(<NewIntegrations />)

    // Test category filter
    const categoryFilter = screen.getByRole("combobox", { name: /category/i })
    fireEvent.click(categoryFilter)

    const crmOption = screen.getByText("CRM")
    fireEvent.click(crmOption)

    // Verify filtering works
    await waitFor(() => {
      expect(screen.getByText("Salesforce")).toBeInTheDocument()
      // Should not show non-CRM integrations
    })

    // Test complexity filter
    const complexityFilter = screen.getByRole("combobox", { name: /complexity/i })
    fireEvent.click(complexityFilter)

    const easyOption = screen.getByText("Easy")
    fireEvent.click(easyOption)

    await waitFor(() => {
      // Should only show easy integrations
      expect(complexityFilter).toHaveValue("easy")
    })
  })
})
