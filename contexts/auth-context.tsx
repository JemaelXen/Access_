"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

export type User = {
  id: string
  name: string
  email: string
  username: string
  avatar: string
  role: "user" | "admin" | "elite"
  investmentTier?: "starter" | "pro" | "elite" | "partner"
  verified: boolean
  joinDate: string
  followers: number
  following: number
  posts: number
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("access_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (e) {
        console.error("Failed to parse user data:", e)
        // Clear corrupted data
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_user")
        }
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful login
      let mockUser: User

      if (email === "admin@access.co") {
        mockUser = {
          id: "1",
          name: "Jemael Xenn",
          email: email,
          username: "aries",
          avatar: "A",
          role: "admin",
          verified: true,
          joinDate: "January 2023",
          followers: 1200000,
          following: 256,
          posts: 543,
          investmentTier: "partner",
        }
      } else if (email === "elite@access.co") {
        mockUser = {
          id: "2",
          name: "Elite User",
          email: email,
          username: "elite",
          avatar: "E",
          role: "elite",
          verified: true,
          joinDate: "March 2023",
          followers: 50000,
          following: 120,
          posts: 210,
          investmentTier: "elite",
        }
      } else {
        mockUser = {
          id: "3",
          name: "Regular User",
          email: email,
          username: email.split("@")[0],
          avatar: email.charAt(0).toUpperCase(),
          role: "user",
          verified: false,
          joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          followers: 120,
          following: 85,
          posts: 24,
        }
      }

      setUser(mockUser)
      localStorage.setItem("access_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful signup
      const mockUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        username: email.split("@")[0],
        avatar: name.charAt(0).toUpperCase(),
        role: "user",
        verified: false,
        joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        followers: 0,
        following: 0,
        posts: 0,
      }

      setUser(mockUser)
      localStorage.setItem("access_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("access_user")
    router.push("/login")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("access_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    console.error("useAuth must be used within an AuthProvider")
    // Return a default context with safe values
    return {
      user: null,
      isLoading: false,
      login: async () => {
        console.error("Auth provider not found")
      },
      signup: async () => {
        console.error("Auth provider not found")
      },
      logout: () => {
        console.error("Auth provider not found")
      },
      updateUser: () => {
        console.error("Auth provider not found")
      },
    }
  }
  return context
}
