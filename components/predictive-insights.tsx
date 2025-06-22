"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { TrendingUp, Brain, Zap, AlertTriangle, Target, Calendar, BarChart3, Lightbulb } from "lucide-react"

interface Prediction {
  id: string
  type: string
  prediction: string
  confidence: number
  timeframe: string
  impact: "high" | "medium" | "low"
  category: "performance" | "reliability" | "security" | "capacity"
  recommendation: string
}

const predictions: Prediction[] = [
  {
    id: "PRED-001",
    type: "Capacity Planning",
    prediction: "Database will reach 85% capacity within 3 weeks",
    confidence: 92,
    timeframe: "3 weeks",
    impact: "high",
    category: "capacity",
    recommendation: "Scale database storage and optimize queries",
  },
  {
    id: "PRED-002",
    type: "Performance Degradation",
    prediction: "API response times will increase by 40% during peak hours",
    confidence: 87,
    timeframe: "1 week",
    impact: "high",
    category: "performance",
    recommendation: "Implement caching layer and load balancing",
  },
  {
    id: "PRED-003",
    type: "Security Vulnerability",
    prediction: "Authentication system vulnerable to brute force attacks",
    confidence: 78,
    timeframe: "Immediate",
    impact: "high",
    category: "security",
    recommendation: "Implement rate limiting and account lockout policies",
  },
  {
    id: "PRED-004",
    type: "System Reliability",
    prediction: "Memory leak will cause service restart within 5 days",
    confidence: 85,
    timeframe: "5 days",
    impact: "medium",
    category: "reliability",
    recommendation: "Deploy memory profiling and fix identified leaks",
  },
]

interface TrendForecast {
  metric: string
  current: number
  predicted: number
  change: number
  timeframe: string
  confidence: number
}

const trendForecasts: TrendForecast[] = [
  {
    metric: "User Growth",
    current: 15000,
    predicted: 22500,
    change: 50,
    timeframe: "Next Quarter",
    confidence: 89,
  },
  {
    metric: "API Calls/Day",
    current: 2500000,
    predicted: 4200000,
    change: 68,
    timeframe: "Next Month",
    confidence: 94,
  },
  {
    metric: "Error Rate",
    current: 2.3,
    predicted: 1.1,
    change: -52,
    timeframe: "After Fixes",
    confidence: 82,
  },
  {
    metric: "Response Time",
    current: 245,
    predicted: 180,
    change: -27,
    timeframe: "Post Optimization",
    confidence: 91,
  },
]

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-red-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "performance":
      return <Zap className="h-4 w-4" />
    case "reliability":
      return <Target className="h-4 w-4" />
    case "security":
      return <AlertTriangle className="h-4 w-4" />
    case "capacity":
      return <BarChart3 className="h-4 w-4" />
    default:
      return <Brain className="h-4 w-4" />
  }
}

export function PredictiveInsights() {
  const highImpactPredictions = predictions.filter((p) => p.impact === "high").length
  const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Impact Predictions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highImpactPredictions}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <Brain className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgConfidence.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">Prediction accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Forecasts</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictions.length}</div>
            <p className="text-xs text-muted-foreground">AI-generated insights</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time to Action</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 days</div>
            <p className="text-xs text-muted-foreground">Avg response window</p>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Insights Tabs */}
      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="trends">Trend Forecasts</TabsTrigger>
          <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Predictions</CardTitle>
              <CardDescription>Machine learning insights based on historical data and current patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(prediction.category)}
                        <span className="font-medium">{prediction.type}</span>
                        <Badge className={getImpactColor(prediction.impact)}>{prediction.impact.toUpperCase()}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{prediction.timeframe}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Prediction</p>
                      <p className="text-sm text-muted-foreground">{prediction.prediction}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence Level</span>
                        <span className="font-medium">{prediction.confidence}%</span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-800 mb-1">
                        <Lightbulb className="h-4 w-4 inline mr-1" />
                        Recommended Action
                      </p>
                      <p className="text-sm text-blue-700">{prediction.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trend Forecasting</CardTitle>
              <CardDescription>Predictive analytics for key business and technical metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendForecasts.map((forecast, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{forecast.metric}</span>
                      <Badge variant="outline">{forecast.timeframe}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current</p>
                        <p className="font-medium">
                          {forecast.metric.includes("Rate") || forecast.metric.includes("Time")
                            ? `${forecast.current}${forecast.metric.includes("Rate") ? "%" : "ms"}`
                            : forecast.current.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Predicted</p>
                        <p className="font-medium">
                          {forecast.metric.includes("Rate") || forecast.metric.includes("Time")
                            ? `${forecast.predicted}${forecast.metric.includes("Rate") ? "%" : "ms"}`
                            : forecast.predicted.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Change</p>
                        <p className={`font-medium ${forecast.change > 0 ? "text-green-600" : "text-red-600"}`}>
                          {forecast.change > 0 ? "+" : ""}
                          {forecast.change}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Forecast Confidence</span>
                        <span>{forecast.confidence}%</span>
                      </div>
                      <Progress value={forecast.confidence} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Smart Recommendations</CardTitle>
              <CardDescription>AI-generated recommendations based on predictive analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Proactive Scaling:</strong> Based on growth predictions, scale infrastructure by 60% within
                    the next 2 weeks to avoid performance issues.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Performance Optimization:</strong> Implement caching for top 20 API endpoints to reduce
                    predicted response time increases by 65%.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Reliability Enhancement:</strong> Deploy automated failover mechanisms to prevent predicted
                    service interruptions and maintain 99.9% uptime.
                  </AlertDescription>
                </Alert>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Priority Action Items
                  </h4>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Address database capacity within 1 week
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Zap className="h-4 w-4 mr-2" />
                      Implement API caching before traffic spike
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Deploy security patches immediately
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Planning</CardTitle>
              <CardDescription>What-if analysis and scenario-based predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3 text-green-700">Best Case Scenario</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• All recommendations implemented within 1 week</li>
                    <li>• 95% reduction in critical errors</li>
                    <li>• 40% improvement in user satisfaction</li>
                    <li>• 25% increase in system performance</li>
                  </ul>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Probability</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3 text-yellow-700">Most Likely Scenario</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Partial implementation over 2-3 weeks</li>
                    <li>• 60% reduction in critical errors</li>
                    <li>• 20% improvement in user satisfaction</li>
                    <li>• 15% increase in system performance</li>
                  </ul>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Probability</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3 text-red-700">Worst Case Scenario</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Delayed implementation due to resource constraints</li>
                    <li>• Continued system degradation</li>
                    <li>• 30% increase in user churn</li>
                    <li>• Major service outage within 1 month</li>
                  </ul>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Probability</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
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
