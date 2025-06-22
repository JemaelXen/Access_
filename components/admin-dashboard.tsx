"use client"

import { useState } from "react"
import {
  BarChart3,
  Bell,
  ChevronDown,
  HandshakeIcon,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Settings,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RevenueChart } from "./revenue-chart"
import { UserAcquisitionMap } from "./user-acquisition-map"
import { EventsTable } from "./events-table"
import { MediaCoverage } from "./media-coverage"
import { PartnershipRequests } from "./partnership-requests"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-white dark:bg-gray-800 shadow-sm lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
                <path
                  d="M60 10L110 60L60 110L10 60L60 10Z"
                  fill="url(#gradient)"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M60 30L90 60L60 90L30 60L60 30Z"
                  fill="currentColor"
                  stroke="white"
                  strokeWidth="1"
                  className="text-gray-800 dark:text-gray-200"
                />
                <defs>
                  <linearGradient id="gradient" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-lg font-bold">Access&Co</span>
          </div>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Dashboard</h2>
            <div className="space-y-1">
              <Button
                variant={activeTab === "overview" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button
                variant={activeTab === "revenue" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("revenue")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Revenue
              </Button>
              <Button
                variant={activeTab === "users" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("users")}
              >
                <Users className="mr-2 h-4 w-4" />
                User Acquisition
              </Button>
              <Button
                variant={activeTab === "events" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("events")}
              >
                <Ticket className="mr-2 h-4 w-4" />
                Global Events
              </Button>
              <Button
                variant={activeTab === "media" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("media")}
              >
                <Newspaper className="mr-2 h-4 w-4" />
                PR & Media
              </Button>
              <Button
                variant={activeTab === "partnerships" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("partnerships")}
              >
                <HandshakeIcon className="mr-2 h-4 w-4" />
                Partnerships
              </Button>
            </div>
          </div>
          <div className="px-4 py-2">
            <h2 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Settings</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-white dark:bg-gray-800 px-4 lg:px-6">
          <Button variant="outline" size="icon" className="lg:hidden">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Aries" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-flex">Aries</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {activeTab === "overview" && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Daily Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,742,389</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  <div className="mt-4">
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4M</div>
                  <p className="text-xs text-muted-foreground">+12.3% from last week</p>
                  <div className="mt-4">
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Global Partnerships</CardTitle>
                  <HandshakeIcon className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,284</div>
                  <p className="text-xs text-muted-foreground">+34 new this week</p>
                  <div className="mt-4">
                    <Progress value={82} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Media Coverage</CardTitle>
                  <Newspaper className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">347</div>
                  <p className="text-xs text-muted-foreground">Articles published this month</p>
                  <div className="mt-4">
                    <Progress value={92} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Automation</CardTitle>
                  <CardDescription>Daily 8-9 digit revenue streams across all channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Global User Acquisition</CardTitle>
                  <CardDescription>Automated user growth across regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <UserAcquisitionMap />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Upcoming Elite Events</CardTitle>
                  <CardDescription>Auto-generated invitations and applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <EventsTable />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Media Coverage</CardTitle>
                  <CardDescription>Automated PR distribution and global press features</CardDescription>
                </CardHeader>
                <CardContent>
                  <MediaCoverage />
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "revenue" && (
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Streams</CardTitle>
                  <CardDescription>Detailed breakdown of all automated revenue channels</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <RevenueChart height={400} />
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Advertising</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$3,241,892</div>
                    <p className="text-xs text-muted-foreground">AI-powered ad marketplace</p>
                    <div className="mt-4">
                      <Progress value={85} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$2,184,567</div>
                    <p className="text-xs text-muted-foreground">VIP & VVIP accounts</p>
                    <div className="mt-4">
                      <Progress value={72} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Creator Monetization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,893,245</div>
                    <p className="text-xs text-muted-foreground">20-30% platform cut</p>
                    <div className="mt-4">
                      <Progress value={68} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Marketplace Fees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$942,781</div>
                    <p className="text-xs text-muted-foreground">1-5% transaction fees</p>
                    <div className="mt-4">
                      <Progress value={45} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Casino/Gaming</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,247,890</div>
                    <p className="text-xs text-muted-foreground">Revenue cuts from gaming</p>
                    <div className="mt-4">
                      <Progress value={58} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Other Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,132,014</div>
                    <p className="text-xs text-muted-foreground">NFTs, merch, partnerships</p>
                    <div className="mt-4">
                      <Progress value={52} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Global User Acquisition</CardTitle>
                  <CardDescription>Automated user growth across regions</CardDescription>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <UserAcquisitionMap height={500} />
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24.7M</div>
                    <p className="text-xs text-muted-foreground">+1.2M this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">VIP Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.8M</div>
                    <p className="text-xs text-muted-foreground">7.3% of total users</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">VVIP Elite Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">284K</div>
                    <p className="text-xs text-muted-foreground">High-value accounts</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Celebrity Accounts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12,847</div>
                    <p className="text-xs text-muted-foreground">Verified public figures</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Global Elite Events</CardTitle>
                  <CardDescription>Auto-generated invitations and applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <EventsTable fullView={true} />
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "media" && (
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Media Coverage & PR</CardTitle>
                  <CardDescription>Automated PR distribution and global press features</CardDescription>
                </CardHeader>
                <CardContent>
                  <MediaCoverage fullView={true} />
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "partnerships" && (
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Partnership Requests</CardTitle>
                  <CardDescription>Auto-generated partnership applications and sponsorships</CardDescription>
                </CardHeader>
                <CardContent>
                  <PartnershipRequests />
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
