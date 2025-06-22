"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, TrendingDown, TrendingUp, AlertCircle, Target, BarChart3, Clock } from "lucide-react"

interface ImpactMetric {
  category: string
  current: number
  target: number
  impact: number
  trend: "up" | "down" | "stable"
  severity: "critical" | "high" | "medium" | "low"
}

const impactMetrics: ImpactMetric[] = [
  {
    category: "Revenue Loss",
    current: 125000,
    target: 0,
    impact: -15.3,
    trend: "down",
    severity: "critical",
  },
  {
    category: "User Churn",
    current: 8.2,
    target: 3.5,
    impact: -12.7,
    trend: "down",
    severity: "high",
  },
  {
    category: "Support Tickets",
    current: 342,
    target: 150,
    impact: 128.0,
    trend: "up",
    severity: "high",
  },
  {
    category: "System Downtime",
    current: 4.2,
    target: 1.0,
    impact: 320.0,
    trend: "up",
    severity: "critical",
  },
  {
    category: "Customer Satisfaction",
    current: 6.8,
    target: 8.5,
    impact: -20.0,
    trend: "down",
    severity: "medium",
  },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

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
    case "up":
      return <TrendingUp className="h-4 w-4 text-red-500" />
    case "down":
      return <TrendingDown className="h-4 w-4 text-red-500" />
    case "stable":
      return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    default:
      return null
  }
}

export function BusinessImpact() {
  const totalRevenueLoss = impactMetrics
    .filter((m) => m.category === "Revenue Loss")
    .reduce((sum, m) => sum + m.current, 0)

  const avgCustomerSatisfaction = impactMetrics.find((m) => m.category === "Customer Satisfaction")?.current || 0

  return (
    <div className="space-y-6">
      {/* Key Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalRevenueLoss)}</div>
            <p className="text-xs text-muted-foreground">Monthly loss estimate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Churn</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8.2%</div>
            <p className="text-xs text-muted-foreground">Above target of 3.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downtime Cost</CardTitle>
            <Clock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">4.2hrs</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Target className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{avgCustomerSatisfaction}/10</div>
            <p className="text-xs text-muted-foreground">Customer rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Business Impact Analysis */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Impact Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial Impact</TabsTrigger>
          <TabsTrigger value="operational">Operational Impact</TabsTrigger>
          <TabsTrigger value="strategic">Strategic Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Impact Summary</CardTitle>
              <CardDescription>Comprehensive view of how system issues affect business metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {impactMetrics.map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={getSeverityColor(metric.severity)}>{metric.severity.toUpperCase()}</Badge>
                        <span className="font-medium">{metric.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(metric.trend)}
                        <span
                          className={`text-sm font-medium ${metric.impact > 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          {metric.impact > 0 ? "+" : ""}
                          {metric.impact.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current</p>
                        <p className="font-medium">
                          {metric.category === "Revenue Loss"
                            ? formatCurrency(metric.current)
                            : metric.category === "Customer Satisfaction"
                              ? `${metric.current}/10`
                              : metric.category === "User Churn"
                                ? `${metric.current}%`
                                : metric.category === "System Downtime"
                                  ? `${metric.current} hours`
                                  : metric.current.toString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Target</p>
                        <p className="font-medium text-green-600">
                          {metric.category === "Revenue Loss"
                            ? formatCurrency(metric.target)
                            : metric.category === "Customer Satisfaction"
                              ? `${metric.target}/10`
                              : metric.category === "User Churn"
                                ? `${metric.target}%`
                                : metric.category === "System Downtime"
                                  ? `${metric.target} hours`
                                  : metric.target.toString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Gap</p>
                        <p
                          className={`font-medium ${
                            metric.current > metric.target ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {Math.abs(metric.current - metric.target).toFixed(1)}
                          {metric.category === "User Churn" ? "%" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to Target</span>
                        <span>{Math.max(0, 100 - Math.abs(metric.impact)).toFixed(0)}%</span>
                      </div>
                      <Progress value={Math.max(0, 100 - Math.abs(metric.impact))} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Impact Analysis</CardTitle>
              <CardDescription>Direct and indirect financial consequences of system issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <DollarSign className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Direct Revenue Loss:</strong> {formatCurrency(125000)} monthly due to system downtime and
                    failed transactions.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <TrendingDown className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Customer Lifetime Value Impact:</strong> 15% reduction in CLV due to increased churn from
                    poor user experience.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <BarChart3 className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Support Cost Increase:</strong> 128% increase in support tickets resulting in{" "}
                    {formatCurrency(45000)} additional monthly costs.
                  </AlertDescription>
                </Alert>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Financial Recovery Plan</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Immediate fixes implementation</span>
                      <span className="text-green-600">+{formatCurrency(75000)}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>User experience improvements</span>
                      <span className="text-green-600">+{formatCurrency(35000)}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support automation</span>
                      <span className="text-green-600">+{formatCurrency(15000)}/month</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total Recovery Potential</span>
                      <span className="text-green-600">+{formatCurrency(125000)}/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operational Impact</CardTitle>
              <CardDescription>How system issues affect day-to-day operations and team productivity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Team Impact
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• 40% of dev time spent on firefighting</li>
                      <li>• Support team overwhelmed with tickets</li>
                      <li>• Sales team losing deals due to demos failing</li>
                      <li>• Customer success team handling escalations</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Process Impact
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Delayed feature releases</li>
                      <li>• Extended testing cycles</li>
                      <li>• Manual workarounds required</li>
                      <li>• Increased deployment risks</li>
                    </ul>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Productivity Loss:</strong> Estimated 35% reduction in overall team productivity due to
                    context switching and incident response.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Impact & Recommendations</CardTitle>
              <CardDescription>Long-term strategic implications and recommended actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-red-700">Critical Strategic Risks</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Competitive disadvantage due to reliability issues</li>
                    <li>• Brand reputation damage from poor user experience</li>
                    <li>• Difficulty attracting enterprise customers</li>
                    <li>• Investor confidence impact on funding rounds</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-green-700">Strategic Opportunities</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Implement industry-leading reliability standards</li>
                    <li>• Develop competitive advantage through superior UX</li>
                    <li>• Build customer trust and loyalty</li>
                    <li>• Enable premium pricing for enterprise features</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Recommended Strategic Actions</h4>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Establish 99.9% uptime SLA commitment
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Implement comprehensive monitoring and alerting
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Create dedicated reliability engineering team
                    </Button>
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
