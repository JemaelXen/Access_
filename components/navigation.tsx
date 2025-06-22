"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Bell, MessageSquare, User, Home, Users, DollarSign, BarChart3 } from "lucide-react"
import { useAuth } from "@/context/authContext" // Assuming authContext is in "@/context/authContext"

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()

  const isActive = (path: string) => {
    return pathname === path ? "bg-indigo-700 text-white" : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
  }

  const navItems = [
    { path: "/", label: "Home", icon: <Home size={18} /> },
    { path: "/social", label: "Social", icon: <Users size={18} /> },
    { path: "/messages", label: "Messages", icon: <MessageSquare size={18} /> },
    { path: "/profile", label: "Profile", icon: <User size={18} /> },
    { path: "/company", label: "Company", icon: <Users size={18} /> },
    { path: "/invest", label: "Invest", icon: <DollarSign size={18} /> },
    { path: "/dashboard", label: "Dashboard", icon: <BarChart3 size={18} /> },
  ]

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-md transform rotate-45 mr-2"></div>
              <span className="text-xl font-bold">Access&Co</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive(item.path)}`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-indigo-100 hover:text-white">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">{user?.avatar || "?"}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:text-white hover:bg-indigo-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${isActive(item.path)}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
