"use client"

import { useState, useEffect } from "react"
import { Logo } from "./logo"

export function SplashScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 2500)

      return () => clearTimeout(timer)
    } catch (error) {
      console.error("Error in SplashScreen:", error)
      setVisible(false)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="mb-6">
        <Logo size="lg" color="white" />
      </div>

      <h1 className="text-4xl font-bold text-white mb-2">Access&Co</h1>
      <p className="text-lg text-indigo-100">Your Full Potential</p>
    </div>
  )
}
