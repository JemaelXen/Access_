"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AsymmetricLogo } from "@/components/asymmetric-logo"
import {
  BarChart3,
  TrendingUp,
  Activity,
  Users,
  Zap,
  AlertTriangle,
  DollarSign,
  Clock,
  Globe,
  Shield,
  Crown,
  Download,
  RefreshCw,
} from "lucide-react"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { UsageAnalytics } from "@/components/usage-analytics"
import { ErrorAnalysis } from "@/components/error-analysis"
import { BusinessImpact } from "@/components/business-impact"
import { PredictiveInsights } from "@/components/predictive-insights"
import { IntegrationHeatmap } from "@/components/integration-heatmap"

export default function IntegrationAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedIntegration, setSelectedIntegration] = useState("all")

  const overviewMetrics = {
    totalExecutions: "47.2M",
    executionGrowth: 23.4,
    successRate: 99.2,
    successTrend: 0.3,
    avgResponseTime: "145ms",
    responseTrend: -12.5,
    errorRate: 0.8,
    errorTrend: -15.2,
    activeIntegrations: 247,
    integrationGrowth: 18.7,
    costSavings: "$127K",
    savingsGrowth: 34.2,
  }

  const topIntegrations = [
    {
      id: "social-sync",
      name: "Social Media Sync",
      executions: "12.4M",
      successRate: 99.7,
      avgTime: "89ms",
      revenue: "$45K",
      trend: "up",
      change: 15.3,
    },
    {
      id: "payment-flow",
      name: "Payment Processing",
      executions: "8.9M",
      successRate: 99.9,
      avgTime: "234ms",
      revenue: "$78K",
      trend: "up",
      change: 28.7,
    },
    {
      id: "ai-content",
      name: "AI Content Generation",
      executions: "6.2M",
      successRate: 98.4,
      avgTime: "1.2s",
      revenue: "$32K",
      trend: "up",
      change: 45.2,
    },
    {
      id: "analytics-dash",
      name: "Analytics Dashboard",
      executions: "4.8M",
      successRate: 99.1,
      avgTime: "156ms",
      revenue: "$23K",
      trend: "down",
      change: -5.4,
    },
    {
      id: "notification-hub",
      name: "Notification Hub",
      executions: "3.7M",
      successRate: 97.8,
      avgTime: "67ms",
      revenue: "$18K",
      trend: "up",
      change: 12.1,
    },
  ]

  const apiVersionMetrics = [
    {
      version: "v4.0",
      usage: 45.2,
      executions: "21.3M",
      successRate: 99.4,
      avgTime: "132ms",
      growth: 67.8,
      color: "bg-purple-500",
    },
    {
      version: "v3.0",
      usage: 38.7,
      executions: "18.3M",
      successRate: 99.1,
      avgTime: "156ms",
      growth: 12.4,
      color: "bg-blue-500",
    },
    {
      version: "v2.0",
      usage: 12.8,
      executions: "6.0M",
      successRate: 98.7,
      avgTime: "189ms",
      growth: -23.1,
      color: "bg-orange-500",
    },
    {
      version: "v1.0",
      usage: 3.3,
      executions: "1.6M",
      successRate: 97.9,
      avgTime: "234ms",
      growth: -45.6,
      color: "bg-gray-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AsymmetricLogo className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold text-white">Integration Analytics</h1>
                <p className="text-purple-200">Deep insights into performance and usage</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-purple-400 text-purple-300">
                <Crown className="w-3 h-3 mr-1" />
                Founder Access
              </Badge>
              <div className="flex items-center gap-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
                >
                  <option value="1h">Last Hour</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
                <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Executions</p>
                  <p className="text-2xl font-bold text-white">{overviewMetrics.totalExecutions}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400">+{overviewMetrics.executionGrowth}%</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Activity className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Success Rate</p>
                  <p className="text-2xl font-bold text-white">{overviewMetrics.successRate}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400">+{overviewMetrics.successTrend}%</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Response Time</p>
                  <p className="text-2xl font-bold text-white">{overviewMetrics.avgResponseTime}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-400 rotate-180" />
                    <span className="text-xs text-green-400">{overviewMetrics.responseTrend}%</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Cost Savings</p>
                  <p className="text-2xl font-bold text-white">{overviewMetrics.costSavings}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400">+{overviewMetrics.savingsGrowth}%</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-black/20 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600">
              <Activity className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="usage" className="data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              Usage
            </TabsTrigger>
            <TabsTrigger value="errors" className="data-[state=active]:bg-purple-600">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Errors
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-purple-600">
              <DollarSign className="w-4 h-4 mr-2" />
              Business
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-purple-600">
              <Zap className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performing Integrations */}
              <Card className="bg-black/40 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Top Performing Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topIntegrations.map((integration, index) => (
                      <div
                        key={integration.id}
                        className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm font-semibold text-purple-300">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{integration.name}</h3>
                            <p className="text-sm text-gray-400">{integration.executions} executions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <TrendingUp
                              className={`w-3 h-3 ${integration.trend === "up" ? "text-green-400" : "text-red-400 rotate-180"}`}
                            />
                            <span
                              className={`text-sm ${integration.trend === "up" ? "text-green-400" : "text-red-400"}`}
                            >
                              {integration.trend === "up" ? "+" : ""}
                              {integration.change}%
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{integration.successRate}% success</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* API Version Distribution */}
              <Card className="bg-black/40 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    API Version Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {apiVersionMetrics.map((version) => (
                      <div key={version.version} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${version.color}`} />
                            <span className="font-medium text-white">{version.version}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-400">{version.usage}%</span>
                            <span className={`${version.growth > 0 ? "text-green-400" : "text-red-400"}`}>
                              {version.growth > 0 ? "+" : ""}
                              {version.growth}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className={`h-2 rounded-full ${version.color}`} style={{ width: `${version.usage}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>{version.executions} executions</span>
                          <span>{version.avgTime} avg time</span>
                          <span>{version.successRate}% success</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Integration Heatmap */}
            <IntegrationHeatmap />
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <PerformanceMetrics />
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage">
            <UsageAnalytics />
          </TabsContent>

          {/* Errors Tab */}
          <TabsContent value="errors">
            <ErrorAnalysis />
          </TabsContent>

          {/* Business Tab */}
          <TabsContent value="business">
            <BusinessImpact />
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <PredictiveInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
