"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  TrendingUp,
  DollarSign,
  ActivityIcon,
  ArrowUpRight,
  MessageCircle,
  Bell,
  Calendar,
  Target,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { RevenueChart } from "@/components/revenue-chart"
import { UserAcquisitionMap } from "@/components/user-acquisition-map"

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  revenue: number
  growth: number
  engagement: number
  conversions: number
}

interface Activity {
  id: string
  type: "investment" | "social" | "partnership" | "achievement"
  title: string
  description: string
  timestamp: string
  amount?: number
  status: "success" | "pending" | "warning"
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    revenue: 0,
    growth: 0,
    engagement: 0,
    conversions: 0,
  })
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      setIsLoading(true)

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on user role
      const mockStats: DashboardStats = {
        totalUsers: user?.role === "founder" ? 52847 : user?.role === "admin" ? 15234 : 1247,
        activeUsers: user?.role === "founder" ? 34521 : user?.role === "admin" ? 8934 : 892,
        revenue: user?.role === "founder" ? 2847392 : user?.role === "admin" ? 145678 : 12450,
        growth: user?.role === "founder" ? 23.5 : user?.role === "admin" ? 18.2 : 12.8,
        engagement: user?.role === "founder" ? 87.3 : user?.role === "admin" ? 76.4 : 68.9,
        conversions: user?.role === "founder" ? 94.2 : user?.role === "admin" ? 82.1 : 71.5,
      }

      const mockActivities: Activity[] = [
        {
          id: "1",
          type: "investment",
          title: "New Investment Opportunity",
          description: "TechStart Inc. Series A funding round",
          timestamp: "2 hours ago",
          amount: 50000,
          status: "success",
        },
        {
          id: "2",
          type: "social",
          title: "New Connection",
          description: "Sarah Johnson wants to connect",
          timestamp: "4 hours ago",
          status: "pending",
        },
        {
          id: "3",
          type: "partnership",
          title: "Partnership Proposal",
          description: "Global Ventures partnership opportunity",
          timestamp: "6 hours ago",
          status: "warning",
        },
        {
          id: "4",
          type: "achievement",
          title: "Milestone Reached",
          description: "Congratulations! You've reached 1000 connections",
          timestamp: "1 day ago",
          status: "success",
        },
      ]

      setStats(mockStats)
      setActivities(mockActivities)
      setIsLoading(false)
    }

    fetchDashboardData()
  }, [user])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "investment":
        return <TrendingUp className="h-4 w-4" />
      case "social":
        return <Users className="h-4 w-4" />
      case "partnership":
        return <MessageCircle className="h-4 w-4" />
      case "achievement":
        return <Target className="h-4 w-4" />
      default:
        return <ActivityIcon className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Activity["status"]) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "warning":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your{" "}
              {user?.role === "founder" ? "platform" : user?.role === "admin" ? "admin panel" : "account"} today.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button size="sm" className="btn-primary">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stats.totalUsers)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />+{stats.growth}%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <ActivityIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stats.activeUsers)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />+{(stats.growth * 0.8).toFixed(1)}%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.revenue)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />+{(stats.growth * 1.2).toFixed(1)}%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.engagement}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +2.1%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <Tabs defaultValue="revenue" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="revenue" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Revenue
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="engagement" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  Engagement
                </TabsTrigger>
              </TabsList>

              <TabsContent value="revenue" className="space-y-4">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Monthly revenue trends and projections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RevenueChart />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="space-y-4">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>User Acquisition</CardTitle>
                    <CardDescription>Geographic distribution of new users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserAcquisitionMap />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="engagement" className="space-y-4">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Engagement Metrics</CardTitle>
                    <CardDescription>User engagement and activity levels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Daily Active Users</span>
                        <span className="text-sm text-muted-foreground">{stats.engagement}%</span>
                      </div>
                      <Progress value={stats.engagement} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Session Duration</span>
                        <span className="text-sm text-muted-foreground">{(stats.engagement * 0.9).toFixed(1)}%</span>
                      </div>
                      <Progress value={stats.engagement * 0.9} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Conversion Rate</span>
                        <span className="text-sm text-muted-foreground">{stats.conversions}%</span>
                      </div>
                      <Progress value={stats.conversions} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ActivityIcon className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                        {activity.amount && (
                          <Badge variant="secondary" className="text-xs">
                            {formatCurrency(activity.amount)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  View Connections
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Investment Portfolio
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
