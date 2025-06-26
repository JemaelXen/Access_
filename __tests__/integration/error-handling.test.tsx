"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import { ErrorBoundary } from "@/components/error-boundary"
import jest from "jest" // Import jest to fix the undeclared variable error

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error")
  }
  return <div>No error</div>
}

describe("Error Handling Integration Tests", () => {
  test("error boundary catches and displays errors", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    )

    // Verify error boundary UI is displayed
    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    expect(screen.getByText(/we encountered an unexpected error/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  test("error boundary reset functionality works", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})

    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    )

    // Verify error is displayed
    expect(screen.getByText("Something went wrong")).toBeInTheDocument()

    // Click try again button
    const tryAgainButton = screen.getByRole("button", { name: /try again/i })
    fireEvent.click(tryAgainButton)

    // Rerender with no error
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    )

    // Verify component renders normally
    expect(screen.getByText("No error")).toBeInTheDocument()
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  test("custom error boundary fallback works", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})

    const customFallback = (error: Error, reset: () => void) => (
      <div>
        <h2>Custom Error: {error.message}</h2>
        <button onClick={reset}>Reset</button>
      </div>
    )

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    )

    // Verify custom fallback is displayed
    expect(screen.getByText("Custom Error: Test error")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument()

    consoleSpy.mockRestore()
  })
})
