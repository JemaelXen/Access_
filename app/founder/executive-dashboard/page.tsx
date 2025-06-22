"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExecutiveOverview } from "@/components/executive-overview"
import { RealTimeMonitoring } from "@/components/real-time-monitoring"
import { MLInsightsDashboard } from "@/components/ml-insights-dashboard"
import { AlertCenter } from "@/components/alert-center"
import { IntegrationHub } from "@/components/integration-hub"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { BusinessImpact } from "@/components/business-impact"
import { PredictiveInsights } from "@/components/predictive-insights"
import { ErrorAnalysis } from "@/components/error-analysis"

export default function ExecutiveDashboard() {
  const [activeAlerts, setActiveAlerts] = useState(0)
  const [systemHealth, setSystemHealth] = useState(98.7)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate real-time data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemHealth((prev) => prev + (Math.random() - 0.5) * 0.1)
      setActiveAlerts((prev) => Math.max(0, prev + Math.floor(Math.random() * 3) - 1))
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Executive Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Real-time insights and strategic overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">System Health</p>
              <p
                className={`text-lg font-bold ${systemHealth > 95 ? "text-green-600" : systemHealth > 90 ? "text-yellow-600" : "text-red-600"}`}
              >
                {systemHealth.toFixed(1)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Active Alerts</p>
              <p
                className={`text-lg font-bold ${activeAlerts === 0 ? "text-green-600" : activeAlerts < 5 ? "text-yellow-600" : "text-red-600"}`}
              >
                {activeAlerts}
              </p>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monitoring">Real-Time</TabsTrigger>
            <TabsTrigger value="ml-insights">AI Insights</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ExecutiveOverview />
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <RealTimeMonitoring />
          </TabsContent>

          <TabsContent value="ml-insights" className="space-y-6">
            <MLInsightsDashboard />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <AlertCenter />
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <IntegrationHub />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceMetrics />
              <ErrorAnalysis />
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BusinessImpact />
              <PredictiveInsights />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
