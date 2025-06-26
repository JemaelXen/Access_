"use client"

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import LoginPage from "@/app/login/page"
import SignupPage from "@/app/signup/page"
import { SocialFeed } from "@/components/social-feed"
import jest from "jest" // Declare the jest variable

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

const mockPush = jest.fn()
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
}

beforeEach(() => {
  ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  mockPush.mockClear()
  localStorage.clear()
})

describe("Authentication Flow Integration Tests", () => {
  test("complete login flow with founder account", async () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>,
    )

    // Fill in login form
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "founder@projectaccess.co" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.click(submitButton)

    // Wait for login to complete
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/social")
    })

    // Verify user data is stored in localStorage
    const storedUser = localStorage.getItem("project_access_user")
    expect(storedUser).toBeTruthy()

    const userData = JSON.parse(storedUser!)
    expect(userData.role).toBe("founder")
    expect(userData.name).toBe("Jemael Xenn")
    expect(userData.verified).toBe(true)
  })

  test("signup flow creates new user and redirects", async () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>,
    )

    // Fill in signup form
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const termsCheckbox = screen.getByRole("checkbox")
    const submitButton = screen.getByRole("button", { name: /create account/i })

    fireEvent.change(nameInput, { target: { value: "Test User" } })
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } })
    fireEvent.click(termsCheckbox)
    fireEvent.click(submitButton)

    // Wait for signup to complete
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/social")
    })

    // Verify user data is stored
    const storedUser = localStorage.getItem("project_access_user")
    expect(storedUser).toBeTruthy()

    const userData = JSON.parse(storedUser!)
    expect(userData.name).toBe("Test User")
    expect(userData.email).toBe("test@example.com")
    expect(userData.role).toBe("user")
  })

  test("password mismatch shows error", async () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>,
    )

    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const termsCheckbox = screen.getByRole("checkbox")
    const submitButton = screen.getByRole("button", { name: /create account/i })

    fireEvent.change(nameInput, { target: { value: "Test User" } })
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.change(confirmPasswordInput, { target: { value: "different" } })
    fireEvent.click(termsCheckbox)
    fireEvent.click(submitButton)

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
    })

    // Should not redirect
    expect(mockPush).not.toHaveBeenCalled()
  })

  test("authenticated user can create posts in social feed", async () => {
    // Mock authenticated user
    const mockUser = {
      id: "test-user",
      name: "Test User",
      email: "test@example.com",
      username: "testuser",
      role: "user" as const,
      verified: false,
      joinDate: "January 2024",
      followers: 0,
      following: 0,
      posts: 0,
    }

    localStorage.setItem("project_access_user", JSON.stringify(mockUser))

    const TestComponent = () => {
      const { user } = useAuth()
      return user ? <SocialFeed /> : <div>Not authenticated</div>
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    // Wait for auth context to load
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/what's happening/i)).toBeInTheDocument()
    })

    // Create a new post
    const postInput = screen.getByPlaceholderText(/what's happening/i)
    const postButton = screen.getByRole("button", { name: /post/i })

    fireEvent.change(postInput, { target: { value: "This is a test post!" } })
    fireEvent.click(postButton)

    // Verify post appears in feed
    await waitFor(() => {
      expect(screen.getByText("This is a test post!")).toBeInTheDocument()
    })

    // Verify post input is cleared
    expect(postInput).toHaveValue("")
  })
})
