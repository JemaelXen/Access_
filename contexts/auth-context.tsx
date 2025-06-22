"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

export type User = {
  id: string
  name: string
  email: string
  username: string
  avatar?: string
  role: "user" | "admin" | "founder" | "elite" | "partner"
  verified: boolean
  joinDate: string
  followers: number
  following: number
  posts: number
  investmentTier?: "starter" | "pro" | "elite" | "partner"
  specialAccess?: string[]
  bio?: string
  location?: string
  website?: string
  birthDate?: string
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
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("project_access_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (e) {
        console.error("Failed to parse user data:", e)
        if (typeof window !== "undefined") {
          localStorage.removeItem("project_access_user")
        }
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      let mockUser: User

      // Founder account (Jemael Xenn)
      if (email === "founder@projectaccess.co" || email === "jemael@projectaccess.co") {
        mockUser = {
          id: "founder-001",
          name: "Jemael Xenn",
          email: email,
          username: "jemael",
          avatar: "/placeholder.svg?height=100&width=100",
          role: "founder",
          verified: true,
          joinDate: "January 2024",
          followers: 2500000,
          following: 1000,
          posts: 1250,
          investmentTier: "partner",
          specialAccess: ["all", "founder-controls", "admin-panel", "analytics", "user-management"],
          bio: "Founder & CEO of Project Access. Building the future of social media and investment platforms.",
          location: "Philippines",
          website: "https://projectaccess.co",
        }
      }
      // Admin accounts
      else if (email === "admin@projectaccess.co") {
        mockUser = {
          id: "admin-001",
          name: "Admin User",
          email: email,
          username: "admin",
          avatar: "/placeholder.svg?height=100&width=100",
          role: "admin",
          verified: true,
          joinDate: "February 2024",
          followers: 50000,
          following: 500,
          posts: 320,
          investmentTier: "elite",
          specialAccess: ["admin-panel", "user-management", "content-moderation"],
          bio: "Project Access Administrator",
          location: "Global",
        }
      }
      // Elite user
      else if (email === "elite@projectaccess.co") {
        mockUser = {
          id: "elite-001",
          name: "Elite Member",
          email: email,
          username: "elite",
          avatar: "/placeholder.svg?height=100&width=100",
          role: "elite",
          verified: true,
          joinDate: "March 2024",
          followers: 100000,
          following: 200,
          posts: 150,
          investmentTier: "elite",
          specialAccess: ["elite-club", "premium-features"],
          bio: "Elite member of Project Access",
          location: "New York, USA",
        }
      }
      // Regular user
      else {
        mockUser = {
          id: Date.now().toString(),
          name: "New User",
          email: email,
          username: email.split("@")[0],
          avatar: "/placeholder.svg?height=100&width=100",
          role: "user",
          verified: false,
          joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          followers: 0,
          following: 0,
          posts: 0,
          bio: "New to Project Access",
        }
      }

      setUser(mockUser)
      localStorage.setItem("project_access_user", JSON.stringify(mockUser))
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
      const mockUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        username: email.split("@")[0],
        avatar: "/placeholder.svg?height=100&width=100",
        role: "user",
        verified: false,
        joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        followers: 0,
        following: 0,
        posts: 0,
        bio: `Welcome to Project Access! I'm ${name}.`,
      }

      setUser(mockUser)
      localStorage.setItem("project_access_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("project_access_user")
    router.push("/")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("project_access_user", JSON.stringify(updatedUser))
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
