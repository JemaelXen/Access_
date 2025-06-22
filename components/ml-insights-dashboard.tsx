"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, Target, Zap, AlertTriangle, CheckCircle, Lightbulb, Cpu } from "lucide-react"

interface MLModel {
  id: string
  name: string
  type: string
  accuracy: number
  status: "training" | "deployed" | "testing"
  lastTrained: Date
  predictions: number
}

interface MLPrediction {
  id: string
  model: string
  prediction: string
  confidence: number
  impact: "high" | "medium" | "low"
  timeframe: string
  category: string
}

interface AnomalyDetection {
  id: string
  metric: string
  anomaly: string
  severity: "critical" | "warning" | "info"
  timestamp: Date
  resolved: boolean
}

export function MLInsightsDashboard() {
  const [models, setModels] = useState<MLModel[]>([
    {
      id: "capacity-predictor",
      name: "Capacity Predictor",
      type: "Time Series Forecasting",
      accuracy: 94.2,
      status: "deployed",
      lastTrained: new Date(Date.now() - 86400000),
      predictions: 1247,
    },
    {
      id: "anomaly-detector",
      name: "Anomaly Detector",
      type: "Unsupervised Learning",
      accuracy: 89.7,
      status: "deployed",
      lastTrained: new Date(Date.now() - 172800000),
      predictions: 3456,
    },
    {
      id: "user-behavior",
      name: "User Behavior Analyzer",
      type: "Classification",
      accuracy: 91.3,
      status: "training",
      lastTrained: new Date(Date.now() - 3600000),
      predictions: 8923,
    },
    {
      id: "performance-optimizer",
      name: "Performance Optimizer",
      type: "Reinforcement Learning",
      accuracy: 87.5,
      status: "testing",
      lastTrained: new Date(Date.now() - 7200000),
      predictions: 567,
    },
  ])

  const [predictions, setPredictions] = useState<MLPrediction[]>([
    {
      id: "pred-1",
      model: "Capacity Predictor",
      prediction: "Database storage will reach 85% capacity in 3 weeks",
      confidence: 94.2,
      impact: "high",
      timeframe: "3 weeks",
      category: "Infrastructure",
    },
    {
      id: "pred-2",
      model: "User Behavior Analyzer",
      prediction: "User engagement will increase by 23% during holiday season",
      confidence: 87.8,
      impact: "medium",
      timeframe: "2 months",
      category: "Business",
    },
    {
      id: "pred-3",
      model: "Performance Optimizer",
      prediction: "API response time can be reduced by 35% with caching optimization",
      confidence: 91.5,
      impact: "high",
      timeframe: "1 week",
      category: "Performance",
    },
    {
      id: "pred-4",
      model: "Anomaly Detector",
      prediction: "Unusual traffic pattern detected - potential DDoS preparation needed",
      confidence: 78.3,
      impact: "high",
      timeframe: "Immediate",
      category: "Security",
    },
  ])

  const [anomalies, setAnomalies] = useState<AnomalyDetection[]>([
    {
      id: "anom-1",
      metric: "CPU Usage",
      anomaly: "Unusual spike in CPU usage detected at 3:42 AM",
      severity: "warning",
      timestamp: new Date(Date.now() - 1800000),
      resolved: false,
    },
    {
      id: "anom-2",
      metric: "Network Traffic",
      anomaly: "Abnormal traffic pattern from specific IP range",
      severity: "critical",
      timestamp: new Date(Date.now() - 900000),
      resolved: false,
    },
    {
      id: "anom-3",
      metric: "Database Queries",
      anomaly: "Query response time anomaly resolved",
      severity: "info",
      timestamp: new Date(Date.now() - 3600000),
      resolved: true,
    },
  ])

  const [mlMetrics, setMlMetrics] = useState({
    totalPredictions: 14193,
    accuracyRate: 91.2,
    modelsDeployed: 4,
    anomaliesDetected: 23,
    autoResolvedIssues: 18,
    costSavings: 125000,
  })

  useEffect(() => {
    // Simulate real-time ML updates
    const interval = setInterval(() => {
      setMlMetrics((prev) => ({
        ...prev,
        totalPredictions: prev.totalPredictions + Math.floor(Math.random() * 5),
        accuracyRate: Math.min(100, Math.max(85, prev.accuracyRate + (Math.random() - 0.5) * 2)),
        anomaliesDetected: prev.anomaliesDetected + (Math.random() > 0.8 ? 1 : 0),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "bg-green-100 text-green-800"
      case "training":
        return "bg-blue-100 text-blue-800"
      case "testing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* ML Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
            <Brain className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mlMetrics.totalPredictions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 50 + 10)} in last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mlMetrics.accuracyRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Across all deployed models</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <Cpu className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mlMetrics.modelsDeployed}</div>
            <p className="text-xs text-muted-foreground">Production ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mlMetrics.costSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Monthly through automation</p>
          </CardContent>
        </Card>
      </div>

      {/* ML Insights Tabs */}
      <Tabs defaultValue="models" className="space-y-4">
        <TabsList>
          <TabsTrigger value="models">ML Models</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="optimization">Auto-Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Machine Learning Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {models.map((model) => (
                  <div key={model.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{model.name}</h3>
                        <p className="text-sm text-muted-foreground">{model.type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(model.status)}>{model.status.toUpperCase()}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={model.accuracy} className="flex-1" />
                          <span className="text-sm font-medium">{model.accuracy}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Predictions Made</p>
                        <p className="font-medium">{model.predictions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Trained</p>
                        <p className="font-medium">{model.lastTrained.toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Retrain Model
                      </Button>
                      {model.status === "testing" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Deploy to Production
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI-Generated Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{prediction.model}</Badge>
                          <Badge className={getImpactColor(prediction.impact)}>
                            {prediction.impact.toUpperCase()} IMPACT
                          </Badge>
                        </div>
                        <p className="font-medium mb-1">{prediction.prediction}</p>
                        <p className="text-sm text-muted-foreground">
                          Category: {prediction.category} • Timeframe: {prediction.timeframe}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence Level</span>
                        <span className="font-medium">{prediction.confidence}%</span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Analysis
                      </Button>
                      <Button size="sm" variant="outline">
                        Create Action Plan
                      </Button>
                      {prediction.impact === "high" && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Urgent Action Required
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Anomaly Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {anomalies.map((anomaly) => (
                  <div key={anomaly.id} className={`border rounded-lg p-4 ${anomaly.resolved ? "bg-gray-50" : ""}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{anomaly.metric}</Badge>
                          <Badge className={getSeverityColor(anomaly.severity)}>{anomaly.severity.toUpperCase()}</Badge>
                          {anomaly.resolved && <Badge className="bg-green-100 text-green-800">RESOLVED</Badge>}
                        </div>
                        <p className="font-medium mb-1">{anomaly.anomaly}</p>
                        <p className="text-sm text-muted-foreground">Detected: {anomaly.timestamp.toLocaleString()}</p>
                      </div>
                    </div>

                    {!anomaly.resolved && (
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark as Resolved
                        </Button>
                        {anomaly.severity === "critical" && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Emergency Response
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automated Optimizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Recent Auto-Optimizations</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-green-800">Database Query Optimization</p>
                          <p className="text-sm text-green-600">Response time improved by 23%</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium text-blue-800">Cache Configuration Tuning</p>
                          <p className="text-sm text-blue-600">Hit rate increased to 94.2%</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <p className="font-medium text-purple-800">Load Balancer Adjustment</p>
                          <p className="text-sm text-purple-600">Traffic distribution optimized</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Optimization Impact</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Performance Improvement</span>
                        <span className="font-medium text-green-600">+31%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Cost Reduction</span>
                        <span className="font-medium text-green-600">-18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Issues Auto-Resolved</span>
                        <span className="font-medium text-blue-600">{mlMetrics.autoResolvedIssues}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Manual Interventions Avoided</span>
                        <span className="font-medium text-purple-600">47</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Upcoming Optimizations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm">API Rate Limiting Adjustment</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm">Memory Allocation Optimization</span>
                      <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
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
