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
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { RevenueChart } from "@/components/revenue-chart"
import { UserAcquisitionMap } from "@/components/user-acquisition-map"
import { redirect } from "next/navigation"

const metrics = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    description: "from last month",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    icon: Users,
    description: "from last month",
  },
  {
    title: "Conversion Rate",
    value: "12.5%",
    change: "+19%",
    trend: "up",
    icon: TrendingUp,
    description: "from last month",
  },
  {
    title: "API Calls",
    value: "573,000",
    change: "+201",
    trend: "up",
    icon: Activity,
    description: "from last month",
  },
]

const recentActivity = [
  {
    id: 1,
    user: "John Doe",
    action: "Created new integration",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    user: "Sarah Wilson",
    action: "Updated API settings",
    time: "5 minutes ago",
    status: "info",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Deployed to production",
    time: "10 minutes ago",
    status: "success",
  },
  {
    id: 4,
    user: "Emily Chen",
    action: "API rate limit exceeded",
    time: "15 minutes ago",
    status: "warning",
  },
  {
    id: 5,
    user: "David Brown",
    action: "Integration failed",
    time: "20 minutes ago",
    status: "error",
  },
]

const topIntegrations = [
  { name: "Salesforce", users: 1234, growth: 12.5 },
  { name: "HubSpot", users: 987, growth: 8.3 },
  { name: "Slack", users: 756, growth: 15.7 },
  { name: "Stripe", users: 654, growth: 22.1 },
  { name: "Zoom", users: 543, growth: 5.9 },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !user) {
      redirect("/login")
    }
  }, [user, mounted])

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user.role === "user") {
    redirect("/social")
  }

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground">Here's what's happening with your platform today.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="metrics-cards">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-effect card-hover" data-testid="metric-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                    )}
                    <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                    <span className="ml-1">{metric.description}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="charts-section">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>User Acquisition</CardTitle>
                <CardDescription>Geographic distribution of new users</CardDescription>
              </CardHeader>
              <CardContent>
                <UserAcquisitionMap />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="activity" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="integrations">Top Integrations</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions and events on your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <div>
                            <p className="font-medium">{activity.user}</p>
                            <p className="text-sm text-muted-foreground">{activity.action}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              activity.status === "success"
                                ? "default"
                                : activity.status === "warning"
                                  ? "secondary"
                                  : activity.status === "error"
                                    ? "destructive"
                                    : "outline"
                            }
                          >
                            {activity.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Top Integrations</CardTitle>
                  <CardDescription>Most popular integrations by user count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topIntegrations.map((integration, index) => (
                      <div key={integration.name} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            <p className="text-sm text-muted-foreground">{integration.users.toLocaleString()} users</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-500">+{integration.growth}%</p>
                            <p className="text-xs text-muted-foreground">growth</p>
                          </div>
                          <Progress value={integration.growth} className="w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                  <CardDescription>Detailed analytics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">API Success Rate</span>
                        <span className="text-sm text-muted-foreground">99.2%</span>
                      </div>
                      <Progress value={99.2} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">User Satisfaction</span>
                        <span className="text-sm text-muted-foreground">94.8%</span>
                      </div>
                      <Progress value={94.8} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">System Uptime</span>
                        <span className="text-sm text-muted-foreground">99.9%</span>
                      </div>
                      <Progress value={99.9} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Response Time</span>
                        <span className="text-sm text-muted-foreground">120ms</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
