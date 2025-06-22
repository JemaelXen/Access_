"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Bug, Clock, TrendingUp, Zap, Shield } from "lucide-react"

interface ErrorData {
  id: string
  type: string
  severity: "critical" | "high" | "medium" | "low"
  frequency: number
  impact: string
  resolution: string
  trend: "increasing" | "decreasing" | "stable"
}

const errorData: ErrorData[] = [
  {
    id: "ERR-001",
    type: "Authentication Timeout",
    severity: "critical",
    frequency: 45,
    impact: "User login failures",
    resolution: "Increase timeout threshold",
    trend: "increasing",
  },
  {
    id: "ERR-002",
    type: "Database Connection Pool",
    severity: "high",
    frequency: 23,
    impact: "Query performance degradation",
    resolution: "Optimize connection pooling",
    trend: "stable",
  },
  {
    id: "ERR-003",
    type: "API Rate Limiting",
    severity: "medium",
    frequency: 67,
    impact: "Request throttling",
    resolution: "Implement adaptive rate limiting",
    trend: "decreasing",
  },
  {
    id: "ERR-004",
    type: "Memory Leak",
    severity: "high",
    frequency: 12,
    impact: "Application crashes",
    resolution: "Code review and optimization",
    trend: "decreasing",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-500"
    case "high":
      return "bg-orange-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "increasing":
      return <TrendingUp className="h-4 w-4 text-red-500" />
    case "decreasing":
      return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />
    case "stable":
      return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    default:
      return null
  }
}

export function ErrorAnalysis() {
  const criticalErrors = errorData.filter((error) => error.severity === "critical").length
  const totalErrors = errorData.length
  const avgResolutionTime = "2.3 hours"

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalErrors}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
            <Bug className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalErrors}</div>
            <p className="text-xs text-muted-foreground">Active error types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResolutionTime}</div>
            <p className="text-xs text-muted-foreground">Time to fix</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">Overall stability</p>
          </CardContent>
        </Card>
      </div>

      {/* Error Analysis Tabs */}
      <Tabs defaultValue="errors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="errors">Error Details</TabsTrigger>
          <TabsTrigger value="patterns">Error Patterns</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Error Analysis</CardTitle>
              <CardDescription>Detailed breakdown of current system errors and their impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {errorData.map((error) => (
                  <div key={error.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={getSeverityColor(error.severity)}>{error.severity.toUpperCase()}</Badge>
                        <span className="font-medium">{error.type}</span>
                        <span className="text-sm text-muted-foreground">({error.id})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(error.trend)}
                        <span className="text-sm text-muted-foreground">{error.frequency} occurrences</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Impact</p>
                        <p className="text-sm">{error.impact}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Recommended Resolution</p>
                        <p className="text-sm">{error.resolution}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Frequency Impact</span>
                        <span>{error.frequency}%</span>
                      </div>
                      <Progress value={error.frequency} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Pattern Analysis</CardTitle>
              <CardDescription>Identifying recurring patterns and root causes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Peak Error Times:</strong> Errors spike during 9-11 AM and 2-4 PM, correlating with high
                    user activity periods.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Authentication Issues:</strong> 67% increase in timeout errors over the past week,
                    suggesting infrastructure scaling needs.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Bug className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Database Bottlenecks:</strong> Connection pool exhaustion occurs during concurrent user
                    sessions above 500 active users.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
              <CardDescription>Prioritized recommendations to improve system stability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-red-700">Immediate Actions (Critical)</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Increase authentication timeout from 30s to 60s</li>
                    <li>• Scale database connection pool to handle 1000+ concurrent connections</li>
                    <li>• Implement circuit breaker pattern for external API calls</li>
                  </ul>
                  <Button size="sm" className="mt-2" variant="destructive">
                    Deploy Critical Fixes
                  </Button>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium text-orange-700">Short-term Improvements (High)</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Implement adaptive rate limiting based on user behavior</li>
                    <li>• Add memory profiling and automated leak detection</li>
                    <li>• Set up proactive monitoring for error pattern detection</li>
                  </ul>
                  <Button size="sm" className="mt-2" variant="outline">
                    Schedule Implementation
                  </Button>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium text-yellow-700">Long-term Optimizations (Medium)</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Implement predictive scaling based on usage patterns</li>
                    <li>• Develop automated error recovery mechanisms</li>
                    <li>• Create comprehensive error documentation and runbooks</li>
                  </ul>
                  <Button size="sm" className="mt-2" variant="secondary">
                    Add to Roadmap
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
