"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  username: string
  role: "user" | "admin" | "founder"
  verified: boolean
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user-data")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user-data")
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data based on email
      let mockUser: User

      if (email === "founder@projectaccess.co") {
        mockUser = {
          id: "founder-001",
          name: "Jemael Xenn",
          email: "founder@projectaccess.co",
          username: "jemael",
          role: "founder",
          verified: true,
          avatar: "/placeholder-user.jpg",
          createdAt: "2024-01-01T00:00:00Z",
        }
      } else if (email === "admin@projectaccess.co") {
        mockUser = {
          id: "admin-001",
          name: "Admin User",
          email: "admin@projectaccess.co",
          username: "admin",
          role: "admin",
          verified: true,
          avatar: "/placeholder-user.jpg",
          createdAt: "2024-01-01T00:00:00Z",
        }
      } else {
        mockUser = {
          id: "user-001",
          name: "John Doe",
          email: email,
          username: email.split("@")[0],
          role: "user",
          verified: false,
          avatar: "/placeholder-user.jpg",
          createdAt: new Date().toISOString(),
        }
      }

      // Store auth data
      const token = "mock-jwt-token-" + Date.now()
      localStorage.setItem("auth-token", token)
      localStorage.setItem("user-data", JSON.stringify(mockUser))
      localStorage.setItem("user-role", mockUser.role)
      localStorage.setItem("user-id", mockUser.id)

      setUser(mockUser)
    } catch (error) {
      throw new Error("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: "user-" + Date.now(),
        name,
        email,
        username: email.split("@")[0],
        role: "user",
        verified: false,
        avatar: "/placeholder-user.jpg",
        createdAt: new Date().toISOString(),
      }

      // Store auth data
      const token = "mock-jwt-token-" + Date.now()
      localStorage.setItem("auth-token", token)
      localStorage.setItem("user-data", JSON.stringify(newUser))
      localStorage.setItem("user-role", newUser.role)
      localStorage.setItem("user-id", newUser.id)

      setUser(newUser)
    } catch (error) {
      throw new Error("Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
    localStorage.removeItem("user-role")
    localStorage.removeItem("user-id")
    setUser(null)
    router.push("/")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user-data", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
