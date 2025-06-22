"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import {
  Home,
  Users,
  MessageSquare,
  Video,
  Camera,
  TrendingUp,
  Briefcase,
  Crown,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Plus,
  Globe,
  BarChart3,
  Shield,
  Newspaper,
} from "lucide-react"
import { AsymmetricLogo } from "@/components/asymmetric-logo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MainNavigation() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(12)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mainNavItems = [
    { id: "home", label: "Home", icon: <Home size={20} />, href: "/" },
    { id: "social", label: "Social", icon: <Users size={20} />, href: "/social" },
    { id: "videos", label: "Videos", icon: <Video size={20} />, href: "/videos" },
    { id: "stories", label: "Stories", icon: <Camera size={20} />, href: "/stories" },
    { id: "messages", label: "Messages", icon: <MessageSquare size={20} />, href: "/messages", badge: 5 },
    { id: "trending", label: "Trending", icon: <TrendingUp size={20} />, href: "/trending" },
  ]

  const businessNavItems = [
    { id: "invest", label: "Invest", icon: <BarChart3 size={20} />, href: "/invest" },
    { id: "partnerships", label: "Partners", icon: <Briefcase size={20} />, href: "/partnerships" },
    { id: "pr", label: "PR Wire", icon: <Newspaper size={20} />, href: "/pr" },
    { id: "elite", label: "Elite Club", icon: <Crown size={20} />, href: "/elite" },
  ]

  const isActive = (href: string) => pathname === href

  const isFounder = user?.role === "founder"
  const isAdmin = user?.role === "admin" || isFounder

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 ${
        scrolled ? "shadow-lg" : ""
      } transition-all duration-300`}
    >
      <div className="flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center mr-6">
          <Link href="/" className="flex items-center space-x-3">
            <AsymmetricLogo size="sm" animated={isFounder} />
            <div className="hidden md:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Project Access
              </span>
              {isFounder && <div className="text-xs text-purple-600 font-medium">Founder Edition</div>}
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Search bar */}
        <div className="hidden md:flex relative mx-4 flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Project Access..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200/50 dark:border-gray-700/50"
          />
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-gray-800/50"
              }`}
            >
              {item.icon}
              <span className="hidden lg:inline">{item.label}</span>
              {item.badge && (
                <Badge
                  variant="secondary"
                  className="ml-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium">
                <Briefcase size={16} />
                <span className="hidden lg:inline">Business</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Business Features</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {businessNavItems.map((item) => (
                <DropdownMenuItem key={item.id} asChild>
                  <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Action buttons and user menu */}
        <div className="flex items-center ml-auto md:ml-4 space-x-2">
          {user && (
            <>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications > 9 ? "9+" : notifications}
                  </span>
                )}
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full">
                <Plus size={20} />
              </Button>

              {isFounder && (
                <Button variant="ghost" size="icon" className="rounded-full text-purple-600">
                  <Shield size={20} />
                </Button>
              )}
            </>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-xs text-gray-500">@{user.username}</span>
                    {isFounder && (
                      <Badge className="mt-1 w-fit bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <Crown size={12} className="mr-1" />
                        Founder
                      </Badge>
                    )}
                    {isAdmin && !isFounder && (
                      <Badge className="mt-1 w-fit bg-blue-500 text-white">
                        <Shield size={12} className="mr-1" />
                        Admin
                      </Badge>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <Users size={16} />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2 cursor-pointer text-purple-600">
                        <Shield size={16} />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {isFounder && (
                  <DropdownMenuItem asChild>
                    <Link href="/founder" className="flex items-center gap-2 cursor-pointer text-purple-600">
                      <Crown size={16} />
                      <span>Founder Control</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500"
                >
                  <Globe size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search Project Access..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">MAIN</div>
              {mainNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}

              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 mt-4">BUSINESS</div>
              {businessNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              {isAdmin && (
                <>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 mt-4">ADMIN</div>
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield size={20} />
                    <span>Admin Dashboard</span>
                  </Link>
                  {isFounder && (
                    <Link
                      href="/founder"
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Crown size={20} />
                      <span>Founder Control</span>
                    </Link>
                  )}
                </>
              )}

              {user ? (
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 mt-4"
                >
                  <Globe size={20} />
                  <span>Logout</span>
                </button>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <Link
                    href="/login"
                    className="w-full px-3 py-2 text-center text-sm font-medium text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full px-3 py-2 text-center text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
