"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Monitor,
} from "lucide-react"

export function PerformanceMetrics() {
  const performanceData = {
    responseTime: {
      current: "145ms",
      p50: "89ms",
      p95: "234ms",
      p99: "567ms",
      trend: -12.5,
    },
    throughput: {
      current: "2,847 req/s",
      peak: "4,123 req/s",
      average: "1,956 req/s",
      trend: 18.3,
    },
    latency: {
      dns: "12ms",
      connect: "23ms",
      ssl: "45ms",
      processing: "65ms",
      total: "145ms",
    },
    availability: {
      uptime: "99.97%",
      downtime: "2.1 min",
      incidents: 3,
      mttr: "4.2 min",
    },
  }

  const integrationPerformance = [
    {
      name: "Social Media Sync",
      avgTime: "89ms",
      p95Time: "156ms",
      throughput: "1,234 req/s",
      errorRate: "0.3%",
      status: "excellent",
      trend: "up",
    },
    {
      name: "Payment Processing",
      avgTime: "234ms",
      p95Time: "445ms",
      throughput: "567 req/s",
      errorRate: "0.1%",
      status: "excellent",
      trend: "up",
    },
    {
      name: "AI Content Generation",
      avgTime: "1.2s",
      p95Time: "2.1s",
      throughput: "89 req/s",
      errorRate: "1.6%",
      status: "good",
      trend: "down",
    },
    {
      name: "Analytics Dashboard",
      avgTime: "156ms",
      p95Time: "289ms",
      throughput: "892 req/s",
      errorRate: "0.9%",
      status: "good",
      trend: "stable",
    },
    {
      name: "Notification Hub",
      avgTime: "67ms",
      p95Time: "123ms",
      throughput: "2,145 req/s",
      errorRate: "2.1%",
      status: "warning",
      trend: "down",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "border-green-400 text-green-300"
      case "good":
        return "border-blue-400 text-blue-300"
      case "warning":
        return "border-yellow-400 text-yellow-300"
      case "critical":
        return "border-red-400 text-red-300"
      default:
        return "border-gray-400 text-gray-300"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-400" />
      case "down":
        return <TrendingDown className="w-3 h-3 text-red-400" />
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-black/40 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <Badge variant="outline" className="border-green-400 text-green-300">
                <TrendingUp className="w-3 h-3 mr-1" />
                {Math.abs(performanceData.responseTime.trend)}%
              </Badge>
            </div>
            <h3 className="text-sm text-gray-400 mb-1">Response Time</h3>
            <p className="text-2xl font-bold text-white mb-2">{performanceData.responseTime.current}</p>
            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>P50:</span>
                <span>{performanceData.responseTime.p50}</span>
              </div>
              <div className="flex justify-between">
                <span>P95:</span>
                <span>{performanceData.responseTime.p95}</span>
              </div>
              <div className="flex justify-between">
                <span>P99:</span>
                <span>{performanceData.responseTime.p99}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <Badge variant="outline" className="border-green-400 text-green-300">
                <TrendingUp className="w-3 h-3 mr-1" />
                {performanceData.throughput.trend}%
              </Badge>
            </div>
            <h3 className="text-sm text-gray-400 mb-1">Throughput</h3>
            <p className="text-2xl font-bold text-white mb-2">{performanceData.throughput.current}</p>
            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Peak:</span>
                <span>{performanceData.throughput.peak}</span>
              </div>
              <div className="flex justify-between">
                <span>Average:</span>
                <span>{performanceData.throughput.average}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-orange-400" />
              </div>
              <Badge variant="outline" className="border-blue-400 text-blue-300">
                Breakdown
              </Badge>
            </div>
            <h3 className="text-sm text-gray-400 mb-1">Latency Breakdown</h3>
            <p className="text-2xl font-bold text-white mb-2">{performanceData.latency.total}</p>
            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>DNS:</span>
                <span>{performanceData.latency.dns}</span>
              </div>
              <div className="flex justify-between">
                <span>Connect:</span>
                <span>{performanceData.latency.connect}</span>
              </div>
              <div className="flex justify-between">
                <span>SSL:</span>
                <span>{performanceData.latency.ssl}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing:</span>
                <span>{performanceData.latency.processing}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <Badge variant="outline" className="border-green-400 text-green-300">
                {performanceData.availability.incidents} incidents
              </Badge>
            </div>
            <h3 className="text-sm text-gray-400 mb-1">Availability</h3>
            <p className="text-2xl font-bold text-white mb-2">{performanceData.availability.uptime}</p>
            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Downtime:</span>
                <span>{performanceData.availability.downtime}</span>
              </div>
              <div className="flex justify-between">
                <span>MTTR:</span>
                <span>{performanceData.availability.mttr}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Performance Table */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Integration Performance Details
            </CardTitle>
            <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
              <Monitor className="w-4 h-4 mr-2" />
              Real-time View
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Integration</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Avg Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">P95 Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Throughput</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Error Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Trend</th>
                </tr>
              </thead>
              <tbody>
                {integrationPerformance.map((integration, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4">
                      <span className="font-medium text-white">{integration.name}</span>
                    </td>
                    <td className="py-3 px-4 text-blue-300">{integration.avgTime}</td>
                    <td className="py-3 px-4 text-purple-300">{integration.p95Time}</td>
                    <td className="py-3 px-4 text-green-300">{integration.throughput}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`${Number.parseFloat(integration.errorRate) > 1 ? "text-red-300" : "text-green-300"}`}
                      >
                        {integration.errorRate}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{getTrendIcon(integration.trend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Performance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="font-medium text-yellow-300">High Latency Detected</span>
                </div>
                <p className="text-sm text-gray-300">Notification Hub showing 2.1% error rate</p>
                <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-blue-300">Throughput Spike</span>
                </div>
                <p className="text-sm text-gray-300">Payment Processing at 150% normal load</p>
                <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
              </div>

              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="font-medium text-green-300">Performance Improved</span>
                </div>
                <p className="text-sm text-gray-300">Social Media Sync response time decreased by 12%</p>
                <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Performance Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="font-medium text-purple-300 mb-1">Optimize AI Content Generation</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Consider implementing response caching to reduce average response time by ~40%
                </p>
                <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs">
                  Potential 40% improvement
                </Badge>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-medium text-blue-300 mb-1">Scale Notification Hub</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Add horizontal scaling to handle peak loads more efficiently
                </p>
                <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                  Reduce error rate by 60%
                </Badge>
              </div>

              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="font-medium text-green-300 mb-1">Database Optimization</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Implement connection pooling for better resource utilization
                </p>
                <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                  15% faster queries
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
