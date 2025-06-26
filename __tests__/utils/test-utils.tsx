import type React from "react"
import type { ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { AuthProvider } from "@/contexts/auth-context"
import jest from "jest"

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }

// Helper functions for testing
export const createMockUser = (overrides = {}) => ({
  id: "test-user-id",
  name: "Test User",
  email: "test@example.com",
  username: "testuser",
  role: "user" as const,
  verified: false,
  joinDate: "January 2024",
  followers: 0,
  following: 0,
  posts: 0,
  ...overrides,
})

export const createMockFounder = () =>
  createMockUser({
    id: "founder-001",
    name: "Jemael Xenn",
    email: "founder@projectaccess.co",
    username: "jemael",
    role: "founder" as const,
    verified: true,
    followers: 2500000,
    following: 1000,
    posts: 1250,
  })

export const createMockAdmin = () =>
  createMockUser({
    id: "admin-001",
    name: "Admin User",
    email: "admin@projectaccess.co",
    username: "admin",
    role: "admin" as const,
    verified: true,
    followers: 50000,
    following: 500,
    posts: 320,
  })

export const mockLocalStorage = () => {
  const store: Record<string, string> = {}

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach((key) => delete store[key])
    }),
  }
}

export const waitForLoadingToFinish = () => new Promise((resolve) => setTimeout(resolve, 0))
