"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-lg mb-6">We apologize for the inconvenience.</p>
      <button onClick={() => reset()} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Try again
      </button>
    </div>
  )
}
