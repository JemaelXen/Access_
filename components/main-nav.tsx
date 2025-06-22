"use client"

import Link from "next/link"
import { Home, MessageSquare, ShoppingBag, User, Users } from "lucide-react"

export function MainNav() {
  const mainNavItems = [
    { id: "home", label: "Home", icon: <Home size={20} />, href: "/" },
    { id: "social", label: "Social", icon: <Users size={20} />, href: "/social" },
    { id: "messages", label: "Messages", icon: <MessageSquare size={20} />, href: "/messages" },
    { id: "marketplace", label: "Marketplace", icon: <ShoppingBag size={20} />, href: "/marketplace" },
    { id: "profile", label: "Profile", icon: <User size={20} />, href: "/profile" },
  ]

  return (
    <div className="flex flex-col h-full border-r bg-white dark:bg-gray-950">
      <div className="p-4">
        <span className="font-bold text-lg">Access&Co</span>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {mainNavItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">A</span>
        </div>
      </div>
    </div>
  )
}
