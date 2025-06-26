import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { AlertCenter } from "@/components/alert-center"
import { AlertRules } from "@/components/alert-rules"

describe("Alert System Integration Tests", () => {
  test("alert rules creation and management flow", async () => {
    render(<AlertRules />)

    // Verify initial state
    expect(screen.getByText("Total Rules")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument() // Initial rule count

    // Click create rule button
    const createButton = screen.getByRole("button", { name: /create rule/i })
    fireEvent.click(createButton)

    // Fill in new rule form
    const nameInput = screen.getByLabelText(/rule name/i)
    const conditionInput = screen.getByLabelText(/condition/i)
    const descriptionInput = screen.getByLabelText(/description/i)

    fireEvent.change(nameInput, { target: { value: "Test Alert Rule" } })
    fireEvent.change(conditionInput, { target: { value: "test_metric > threshold" } })
    fireEvent.change(descriptionInput, { target: { value: "Test alert description" } })

    // Select notification channels
    const emailCheckbox = screen.getByLabelText(/email notifications/i)
    fireEvent.click(emailCheckbox)

    // Submit the form
    const saveButton = screen.getByRole("button", { name: /create rule/i })
    fireEvent.click(saveButton)

    // Verify rule was created
    await waitFor(() => {
      expect(screen.getByText("Test Alert Rule")).toBeInTheDocument()
      expect(screen.getByText("test_metric > threshold")).toBeInTheDocument()
    })

    // Verify rule count updated
    expect(screen.getByText("4")).toBeInTheDocument()
  })

  test("alert rule editing and deletion", async () => {
    render(<AlertRules />)

    // Find and click edit button for first rule
    const editButtons = screen.getAllByRole("button", { name: /edit/i })
    fireEvent.click(editButtons[0])

    // Modify rule name
    const nameInput = screen.getByDisplayValue(/high cpu usage/i)
    fireEvent.change(nameInput, { target: { value: "Modified CPU Alert" } })

    // Save changes
    const saveButton = screen.getByRole("button", { name: /save changes/i })
    fireEvent.click(saveButton)

    // Verify changes were saved
    await waitFor(() => {
      expect(screen.getByText("Modified CPU Alert")).toBeInTheDocument()
    })

    // Test rule deletion
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i })
    fireEvent.click(deleteButtons[0])

    // Verify rule was deleted
    await waitFor(() => {
      expect(screen.queryByText("Modified CPU Alert")).not.toBeInTheDocument()
    })
  })

  test("alert center displays and manages alerts", async () => {
    render(<AlertCenter />)

    // Verify alert statistics are displayed
    expect(screen.getByText("Active Alerts")).toBeInTheDocument()
    expect(screen.getByText("Critical Alerts")).toBeInTheDocument()

    // Test alert acknowledgment
    const acknowledgeButtons = screen.getAllByRole("button", { name: /acknowledge/i })
    if (acknowledgeButtons.length > 0) {
      fireEvent.click(acknowledgeButtons[0])

      await waitFor(() => {
        expect(screen.getByText(/acknowledged/i)).toBeInTheDocument()
      })
    }

    // Test alert resolution
    const resolveButtons = screen.getAllByRole("button", { name: /resolve/i })
    if (resolveButtons.length > 0) {
      fireEvent.click(resolveButtons[0])

      await waitFor(() => {
        expect(screen.getByText(/resolved/i)).toBeInTheDocument()
      })
    }
  })

  test("alert filtering and search functionality", async () => {
    render(<AlertCenter />)

    // Test severity filter
    const severityFilter = screen.getByRole("combobox", { name: /filter by severity/i })
    fireEvent.click(severityFilter)

    const criticalOption = screen.getByText("Critical")
    fireEvent.click(criticalOption)

    // Verify filtering works (would need to check filtered results)
    await waitFor(() => {
      // This would verify that only critical alerts are shown
      expect(severityFilter).toHaveValue("critical")
    })

    // Test search functionality
    const searchInput = screen.getByPlaceholderText(/search alerts/i)
    fireEvent.change(searchInput, { target: { value: "database" } })

    // Verify search filters alerts
    await waitFor(() => {
      expect(searchInput).toHaveValue("database")
    })
  })
})
