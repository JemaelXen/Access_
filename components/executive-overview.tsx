"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
} from "lucide-react"

interface KPIMetric {
  title: string
  value: string
  change: number
  trend: "up" | "down" | "stable"
  target?: string
  status: "good" | "warning" | "critical"
}

export function ExecutiveOverview() {
  const [kpiData, setKpiData] = useState<KPIMetric[]>([
    {
      title: "Monthly Revenue",
      value: "$8.74M",
      change: 23.4,
      trend: "up",
      target: "$10M",
      status: "good",
    },
    {
      title: "Active Users",
      value: "2.4M",
      change: 12.3,
      trend: "up",
      target: "3M",
      status: "good",
    },
    {
      title: "System Uptime",
      value: "99.97%",
      change: -0.02,
      trend: "down",
      target: "99.99%",
      status: "warning",
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: 5.2,
      trend: "up",
      target: "4.9/5",
      status: "good",
    },
    {
      title: "API Response Time",
      value: "145ms",
      change: -12.5,
      trend: "up",
      target: "<100ms",
      status: "warning",
    },
    {
      title: "Error Rate",
      value: "0.8%",
      change: 15.3,
      trend: "down",
      target: "<0.5%",
      status: "critical",
    },
  ])

  const [businessMetrics, setBusinessMetrics] = useState({
    totalIntegrations: 47,
    activePartnerships: 1284,
    globalEvents: 23,
    mediaCoverage: 347,
    revenueGrowth: 23.4,
    userGrowth: 12.3,
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setKpiData((prev) =>
        prev.map((kpi) => ({
          ...kpi,
          change: kpi.change + (Math.random() - 0.5) * 2,
        })),
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up" && change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (trend === "down" || change < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return <Activity className="h-4 w-4 text-gray-500" />
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {getStatusIcon(kpi.status)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-1">
                  {getTrendIcon(kpi.trend, kpi.change)}
                  <span className={`text-xs ${kpi.change > 0 ? "text-green-600" : "text-red-600"}`}>
                    {kpi.change > 0 ? "+" : ""}
                    {kpi.change.toFixed(1)}%
                  </span>
                </div>
                {kpi.target && <span className="text-xs text-muted-foreground">Target: {kpi.target}</span>}
              </div>
              {kpi.target && (
                <div className="mt-2">
                  <Progress
                    value={Math.min(
                      100,
                      (Number.parseFloat(kpi.value.replace(/[^\d.]/g, "")) /
                        Number.parseFloat(kpi.target.replace(/[^\d.]/g, ""))) *
                        100,
                    )}
                    className="h-1"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Business Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Revenue Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Monthly Recurring Revenue</span>
                <span className="font-semibold">$8.74M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Annual Run Rate</span>
                <span className="font-semibold">$104.9M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Growth Rate (YoY)</span>
                <span className="font-semibold text-green-600">+{businessMetrics.revenueGrowth}%</span>
              </div>
              <Progress value={87} className="h-2" />
              <p className="text-xs text-muted-foreground">87% of annual target achieved</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Active Users</span>
                <span className="font-semibold">2.4M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">VIP Users</span>
                <span className="font-semibold">1.8M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Growth Rate (MoM)</span>
                <span className="font-semibold text-green-600">+{businessMetrics.userGrowth}%</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-muted-foreground">80% of growth target achieved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Initiatives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Strategic Initiatives Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{businessMetrics.totalIntegrations}</p>
              <p className="text-sm text-muted-foreground">Active Integrations</p>
              <Badge className="mt-2 bg-green-100 text-green-800">On Track</Badge>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{businessMetrics.activePartnerships.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Global Partnerships</p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">Exceeding</Badge>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{businessMetrics.globalEvents}</p>
              <p className="text-sm text-muted-foreground">Elite Events</p>
              <Badge className="mt-2 bg-purple-100 text-purple-800">On Track</Badge>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{businessMetrics.mediaCoverage}</p>
              <p className="text-sm text-muted-foreground">Media Features</p>
              <Badge className="mt-2 bg-orange-100 text-orange-800">Ahead</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Executive Actions Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-red-800">Critical: System Error Rate Above Threshold</p>
                <p className="text-sm text-red-600">Error rate at 0.8% - requires immediate attention</p>
              </div>
              <Button size="sm" variant="destructive">
                Review Now
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <p className="font-medium text-yellow-800">Warning: API Response Time Degradation</p>
                <p className="text-sm text-yellow-600">Response time increased to 145ms - optimization needed</p>
              </div>
              <Button size="sm" variant="outline">
                Schedule Review
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-medium text-blue-800">Info: Q4 Board Meeting Preparation</p>
                <p className="text-sm text-blue-600">Quarterly metrics ready for board presentation</p>
              </div>
              <Button size="sm" variant="outline">
                View Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
