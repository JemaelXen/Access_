"use client"

import Link from "next/link"

export function HomeLink() {
  return (
    <div className="fixed bottom-4 right-4 z-10">
      <Link href="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md">
        Dashboard
      </Link>
    </div>
  )
}
