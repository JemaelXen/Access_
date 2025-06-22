"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  Plus,
  Activity,
  Globe,
  Shield,
  Database,
  MessageSquare,
  CreditCard,
  BarChart3,
  Users,
  Mail,
  Smartphone,
} from "lucide-react"

interface Integration {
  id: string
  name: string
  category: string
  status: "active" | "inactive" | "error" | "pending"
  health: number
  requests: number
  lastSync: Date
  version: string
  icon: React.ReactNode
  description: string
}

interface IntegrationMetric {
  name: string
  value: string
  change: number
  status: "good" | "warning" | "error"
}

export function IntegrationHub() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "stripe",
      name: "Stripe",
      category: "Payment",
      status: "active",
      health: 99.8,
      requests: 15420,
      lastSync: new Date(Date.now() - 120000),
      version: "v2.1.0",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Payment processing and subscription management",
    },
    {
      id: "slack",
      name: "Slack",
      category: "Communication",
      status: "active",
      health: 98.5,
      requests: 8934,
      lastSync: new Date(Date.now() - 300000),
      version: "v1.8.2",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "Team communication and notifications",
    },
    {
      id: "aws",
      name: "AWS",
      category: "Infrastructure",
      status: "active",
      health: 99.9,
      requests: 45678,
      lastSync: new Date(Date.now() - 60000),
      version: "v3.0.1",
      icon: <Database className="h-5 w-5" />,
      description: "Cloud infrastructure and storage services",
    },
    {
      id: "sendgrid",
      name: "SendGrid",
      category: "Email",
      status: "active",
      health: 97.2,
      requests: 12345,
      lastSync: new Date(Date.now() - 180000),
      version: "v2.3.1",
      icon: <Mail className="h-5 w-5" />,
      description: "Email delivery and marketing automation",
    },
    {
      id: "twilio",
      name: "Twilio",
      category: "SMS",
      status: "error",
      health: 45.2,
      requests: 234,
      lastSync: new Date(Date.now() - 1800000),
      version: "v1.9.0",
      icon: <Smartphone className="h-5 w-5" />,
      description: "SMS and voice communication services",
    },
    {
      id: "analytics",
      name: "Google Analytics",
      category: "Analytics",
      status: "active",
      health: 96.8,
      requests: 23456,
      lastSync: new Date(Date.now() - 240000),
      version: "v4.1.2",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Web analytics and user behavior tracking",
    },
  ])

  const [integrationMetrics, setIntegrationMetrics] = useState<IntegrationMetric[]>([
    { name: "Total API Calls", value: "2.4M", change: 12.3, status: "good" },
    { name: "Success Rate", value: "99.2%", change: 0.8, status: "good" },
    { name: "Avg Response Time", value: "145ms", change: -8.5, status: "good" },
    { name: "Error Rate", value: "0.8%", change: 15.2, status: "warning" },
  ])

  const [availableIntegrations] = useState([
    { name: "Salesforce", category: "CRM", icon: <Users className="h-5 w-5" /> },
    { name: "HubSpot", category: "Marketing", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Zendesk", category: "Support", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "GitHub", category: "Development", icon: <Activity className="h-5 w-5" /> },
    { name: "Jira", category: "Project Management", icon: <Settings className="h-5 w-5" /> },
    { name: "Discord", category: "Communication", icon: <MessageSquare className="h-5 w-5" /> },
  ])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setIntegrations((prev) =>
        prev.map((integration) => ({
          ...integration,
          requests: integration.requests + Math.floor(Math.random() * 10),
          health: Math.min(100, Math.max(0, integration.health + (Math.random() - 0.5) * 2)),
          lastSync: integration.status === "active" ? new Date() : integration.lastSync,
        })),
      )

      setIntegrationMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          change: metric.change + (Math.random() - 0.5) * 2,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 95) return "text-green-600"
    if (health >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const activeIntegrations = integrations.filter((i) => i.status === "active").length
  const totalRequests = integrations.reduce((sum, i) => sum + i.requests, 0)
  const avgHealth = integrations.reduce((sum, i) => sum + i.health, 0) / integrations.length

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
            <Zap className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeIntegrations}</div>
            <p className="text-xs text-muted-foreground">of {integrations.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Requests</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Health Score</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthColor(avgHealth)}`}>{avgHealth.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">System reliability</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.2%</div>
            <p className="text-xs text-muted-foreground">API call success</p>
          </CardContent>
        </Card>
      </div>

      {/* Integration Management Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Integrations</TabsTrigger>
          <TabsTrigger value="marketplace">Integration Marketplace</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Active Integrations ({activeIntegrations})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {integration.icon}
                        <div>
                          <h3 className="font-medium">{integration.name}</h3>
                          <p className="text-sm text-muted-foreground">{integration.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(integration.status)}
                        <Badge className={getStatusColor(integration.status)}>{integration.status.toUpperCase()}</Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{integration.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Health Score</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={integration.health} className="flex-1 h-2" />
                          <span className={`font-medium ${getHealthColor(integration.health)}`}>
                            {integration.health.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Requests (24h)</p>
                        <p className="font-medium">{integration.requests.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Version: {integration.version}</span>
                      <span>Last sync: {integration.lastSync.toLocaleTimeString()}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        View Logs
                      </Button>
                      {integration.status === "error" && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Fix Issues
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Integration Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableIntegrations.map((integration, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      {integration.icon}
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.category}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Connect {integration.name} to enhance your workflow and automate processes.
                    </p>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Plus className="h-3 w-3 mr-1" />
                        Install
                      </Button>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">Browse All Integrations</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Integration Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {integrationMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.name}</p>
                    <div className="flex items-center justify-center mt-1">
                      <span className={`text-xs ${metric.change > 0 ? "text-green-600" : "text-red-600"}`}>
                        {metric.change > 0 ? "+" : ""}
                        {metric.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Integration Performance</h4>
                <div className="space-y-3">
                  {integrations.slice(0, 5).map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {integration.icon}
                        <span className="font-medium">{integration.name}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span>{integration.requests.toLocaleString()} requests</span>
                        <span className={getHealthColor(integration.health)}>
                          {integration.health.toFixed(1)}% health
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Integration Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Global Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Auto-retry failed requests</p>
                        <p className="text-sm text-muted-foreground">Automatically retry failed API calls</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">ENABLED</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Rate limiting</p>
                        <p className="text-sm text-muted-foreground">Prevent API rate limit violations</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">ENABLED</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Health monitoring</p>
                        <p className="text-sm text-muted-foreground">Monitor integration health status</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">ENABLED</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Security Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API key rotation</span>
                      <Badge className="bg-blue-100 text-blue-800">Every 90 days</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Request signing</span>
                      <Badge className="bg-green-100 text-green-800">ENABLED</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">IP whitelisting</span>
                      <Badge className="bg-green-100 text-green-800">ACTIVE</Badge>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
