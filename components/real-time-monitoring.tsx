"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Zap, Users, Server, Globe, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"

interface RealTimeMetric {
  id: string
  name: string
  value: number
  unit: string
  status: "healthy" | "warning" | "critical"
  trend: number[]
  lastUpdate: Date
}

interface SystemAlert {
  id: string
  type: "error" | "warning" | "info"
  message: string
  timestamp: Date
  resolved: boolean
}

export function RealTimeMonitoring() {
  const [metrics, setMetrics] = useState<RealTimeMetric[]>([
    {
      id: "cpu",
      name: "CPU Usage",
      value: 45.2,
      unit: "%",
      status: "healthy",
      trend: [42, 44, 43, 45, 46, 45],
      lastUpdate: new Date(),
    },
    {
      id: "memory",
      name: "Memory Usage",
      value: 67.8,
      unit: "%",
      status: "warning",
      trend: [65, 66, 67, 68, 69, 68],
      lastUpdate: new Date(),
    },
    {
      id: "requests",
      name: "Requests/sec",
      value: 2847,
      unit: "req/s",
      status: "healthy",
      trend: [2800, 2820, 2835, 2840, 2845, 2847],
      lastUpdate: new Date(),
    },
    {
      id: "response",
      name: "Response Time",
      value: 145,
      unit: "ms",
      status: "warning",
      trend: [140, 142, 143, 144, 145, 145],
      lastUpdate: new Date(),
    },
    {
      id: "errors",
      name: "Error Rate",
      value: 0.8,
      unit: "%",
      status: "critical",
      trend: [0.6, 0.7, 0.75, 0.8, 0.85, 0.8],
      lastUpdate: new Date(),
    },
    {
      id: "users",
      name: "Active Users",
      value: 8923,
      unit: "users",
      status: "healthy",
      trend: [8900, 8910, 8915, 8920, 8925, 8923],
      lastUpdate: new Date(),
    },
  ])

  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: "1",
      type: "error",
      message: "Database connection pool exhausted - scaling required",
      timestamp: new Date(Date.now() - 300000),
      resolved: false,
    },
    {
      id: "2",
      type: "warning",
      message: "Memory usage approaching 70% threshold",
      timestamp: new Date(Date.now() - 600000),
      resolved: false,
    },
    {
      id: "3",
      type: "info",
      message: "Scheduled maintenance completed successfully",
      timestamp: new Date(Date.now() - 1800000),
      resolved: true,
    },
  ])

  const [liveData, setLiveData] = useState({
    totalRequests: 2847,
    activeConnections: 1234,
    queuedJobs: 45,
    cacheHitRate: 94.2,
    diskUsage: 78.5,
    networkIO: 156.7,
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          const newValue = metric.value + (Math.random() - 0.5) * (metric.value * 0.1)
          const newTrend = [...metric.trend.slice(1), newValue]

          let status: "healthy" | "warning" | "critical" = "healthy"
          if (metric.id === "cpu" && newValue > 80) status = "critical"
          else if (metric.id === "cpu" && newValue > 60) status = "warning"
          else if (metric.id === "memory" && newValue > 85) status = "critical"
          else if (metric.id === "memory" && newValue > 70) status = "warning"
          else if (metric.id === "response" && newValue > 200) status = "critical"
          else if (metric.id === "response" && newValue > 150) status = "warning"
          else if (metric.id === "errors" && newValue > 1) status = "critical"
          else if (metric.id === "errors" && newValue > 0.5) status = "warning"

          return {
            ...metric,
            value: Math.max(0, newValue),
            trend: newTrend,
            status,
            lastUpdate: new Date(),
          }
        }),
      )

      setLiveData((prev) => ({
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 10) - 5,
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 20) - 10,
        queuedJobs: Math.max(0, prev.queuedJobs + Math.floor(Math.random() * 6) - 3),
        cacheHitRate: Math.min(100, Math.max(0, prev.cacheHitRate + (Math.random() - 0.5) * 2)),
        diskUsage: Math.min(100, Math.max(0, prev.diskUsage + (Math.random() - 0.5) * 1)),
        networkIO: Math.max(0, prev.networkIO + (Math.random() - 0.5) * 20),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Real-time Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.id} className="relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              {getStatusIcon(metric.status)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value.toFixed(metric.id === "errors" ? 1 : 0)}
                {metric.unit}
              </div>
              <div className="flex items-center justify-between mt-2">
                <Badge className={getStatusColor(metric.status)}>{metric.status.toUpperCase()}</Badge>
                <span className="text-xs text-muted-foreground">Updated {metric.lastUpdate.toLocaleTimeString()}</span>
              </div>

              {/* Mini trend chart */}
              <div className="mt-3 h-8 flex items-end space-x-1">
                {metric.trend.map((value, index) => (
                  <div
                    key={index}
                    className="bg-blue-200 rounded-sm flex-1"
                    style={{
                      height: `${(value / Math.max(...metric.trend)) * 100}%`,
                      minHeight: "2px",
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Monitoring Tabs */}
      <Tabs defaultValue="system" className="space-y-4">
        <TabsList>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  System Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="font-medium">{metrics.find((m) => m.id === "cpu")?.value.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metrics.find((m) => m.id === "cpu")?.value}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="font-medium">{metrics.find((m) => m.id === "memory")?.value.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metrics.find((m) => m.id === "memory")?.value}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Disk Usage</span>
                    <span className="font-medium">{liveData.diskUsage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${liveData.diskUsage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Live Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Connections</span>
                    <span className="font-semibold">{liveData.activeConnections.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Queued Jobs</span>
                    <span className="font-semibold">{liveData.queuedJobs}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cache Hit Rate</span>
                    <span className="font-semibold text-green-600">{liveData.cacheHitRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Network I/O</span>
                    <span className="font-semibold">{liveData.networkIO.toFixed(1)} MB/s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{liveData.totalRequests.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Requests/sec</p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">
                    {metrics.find((m) => m.id === "response")?.value.toFixed(0)}ms
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">
                    {metrics.find((m) => m.id === "users")?.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>

                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-600">
                    {metrics.find((m) => m.id === "errors")?.value.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Error Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Live System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${
                      alert.resolved
                        ? "bg-gray-50 border-gray-200"
                        : alert.type === "error"
                          ? "bg-red-50 border-red-200"
                          : alert.type === "warning"
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <p className={`font-medium ${alert.resolved ? "text-gray-600" : ""}`}>{alert.message}</p>
                          <p className="text-sm text-muted-foreground">{alert.timestamp.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {alert.resolved ? (
                          <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                        ) : (
                          <Button size="sm" variant="outline">
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Network & Connectivity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Global Endpoints Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">🇺🇸 US East (Virginia)</span>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">🇪🇺 EU West (Ireland)</span>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm">🇦🇺 Asia Pacific (Sydney)</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">CDN Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Cache Hit Ratio</span>
                      <span className="font-medium">{liveData.cacheHitRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Bandwidth Usage</span>
                      <span className="font-medium">{liveData.networkIO.toFixed(1)} MB/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Edge Locations</span>
                      <span className="font-medium">47 Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
