"use client"

import { useState, useEffect } from "react"

export function Splash() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-indigo-600 mx-auto mb-4"></div>
        <h1 className="text-white text-3xl font-bold">Access</h1>
        <p className="text-white text-lg mt-2">Your Full Potential</p>
      </div>
    </div>
  )
}
