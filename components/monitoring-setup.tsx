"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Server,
  Database,
  Globe,
  Shield,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Plus,
  Eye,
  BarChart3,
} from "lucide-react"

interface MonitoringEndpoint {
  id: string
  name: string
  url: string
  method: string
  status: "healthy" | "warning" | "critical" | "unknown"
  responseTime: number
  uptime: number
  lastCheck: Date
  enabled: boolean
}

interface HealthCheck {
  id: string
  name: string
  type: "http" | "tcp" | "database" | "custom"
  target: string
  interval: number
  timeout: number
  retries: number
  enabled: boolean
  status: "passing" | "warning" | "critical"
}

export function MonitoringSetup() {
  const [endpoints, setEndpoints] = useState<MonitoringEndpoint[]>([
    {
      id: "api-main",
      name: "Main API",
      url: "https://api.projectaccess.com/health",
      method: "GET",
      status: "healthy",
      responseTime: 145,
      uptime: 99.8,
      lastCheck: new Date(),
      enabled: true,
    },
    {
      id: "auth-service",
      name: "Authentication Service",
      url: "https://auth.projectaccess.com/status",
      method: "GET",
      status: "healthy",
      responseTime: 89,
      uptime: 99.9,
      lastCheck: new Date(),
      enabled: true,
    },
    {
      id: "database",
      name: "Primary Database",
      url: "postgresql://db.projectaccess.com:5432",
      method: "TCP",
      status: "warning",
      responseTime: 234,
      uptime: 98.7,
      lastCheck: new Date(),
      enabled: true,
    },
    {
      id: "cdn",
      name: "CDN Endpoint",
      url: "https://cdn.projectaccess.com/ping",
      method: "GET",
      status: "healthy",
      responseTime: 67,
      uptime: 99.95,
      lastCheck: new Date(),
      enabled: true,
    },
  ])

  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([
    {
      id: "disk-space",
      name: "Disk Space Check",
      type: "custom",
      target: "df -h | grep '/dev/sda1'",
      interval: 300,
      timeout: 30,
      retries: 3,
      enabled: true,
      status: "passing",
    },
    {
      id: "memory-usage",
      name: "Memory Usage",
      type: "custom",
      target: "free -m",
      interval: 60,
      timeout: 10,
      retries: 2,
      enabled: true,
      status: "passing",
    },
    {
      id: "ssl-cert",
      name: "SSL Certificate",
      type: "http",
      target: "https://projectaccess.com",
      interval: 3600,
      timeout: 30,
      retries: 1,
      enabled: true,
      status: "passing",
    },
  ])

  const [monitoringConfig, setMonitoringConfig] = useState({
    globalInterval: 60,
    alertThreshold: 5,
    retentionDays: 30,
    enableNotifications: true,
    enableAutoScaling: true,
    enablePredictiveAlerts: true,
  })

  const [newEndpoint, setNewEndpoint] = useState({
    name: "",
    url: "",
    method: "GET",
    interval: 60,
  })

  useEffect(() => {
    // Simulate real-time monitoring updates
    const interval = setInterval(() => {
      setEndpoints((prev) =>
        prev.map((endpoint) => ({
          ...endpoint,
          responseTime: endpoint.responseTime + (Math.random() - 0.5) * 20,
          uptime: Math.min(100, Math.max(95, endpoint.uptime + (Math.random() - 0.5) * 0.1)),
          lastCheck: new Date(),
          status: endpoint.responseTime > 500 ? "warning" : endpoint.responseTime > 1000 ? "critical" : "healthy",
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "passing":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "passing":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const handleAddEndpoint = () => {
    if (newEndpoint.name && newEndpoint.url) {
      const endpoint: MonitoringEndpoint = {
        id: `endpoint-${Date.now()}`,
        name: newEndpoint.name,
        url: newEndpoint.url,
        method: newEndpoint.method,
        status: "unknown",
        responseTime: 0,
        uptime: 0,
        lastCheck: new Date(),
        enabled: true,
      }
      setEndpoints((prev) => [...prev, endpoint])
      setNewEndpoint({ name: "", url: "", method: "GET", interval: 60 })
    }
  }

  const healthyEndpoints = endpoints.filter((e) => e.status === "healthy").length
  const avgResponseTime = endpoints.reduce((sum, e) => sum + e.responseTime, 0) / endpoints.length
  const avgUptime = endpoints.reduce((sum, e) => sum + e.uptime, 0) / endpoints.length

  return (
    <div className="space-y-6">
      {/* Monitoring Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Endpoints</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{healthyEndpoints}</div>
            <p className="text-xs text-muted-foreground">of {endpoints.length} monitored</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponseTime.toFixed(0)}ms</div>
            <p className="text-xs text-muted-foreground">Across all endpoints</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{avgUptime.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Monitors</CardTitle>
            <Eye className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{endpoints.filter((e) => e.enabled).length}</div>
            <p className="text-xs text-muted-foreground">Monitoring services</p>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Configuration Tabs */}
      <Tabs defaultValue="endpoints" className="space-y-4">
        <TabsList>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="health-checks">Health Checks</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          {/* Add New Endpoint */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Endpoint
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="endpoint-name">Name</Label>
                  <Input
                    id="endpoint-name"
                    value={newEndpoint.name}
                    onChange={(e) => setNewEndpoint({ ...newEndpoint, name: e.target.value })}
                    placeholder="API Endpoint"
                  />
                </div>
                <div>
                  <Label htmlFor="endpoint-url">URL</Label>
                  <Input
                    id="endpoint-url"
                    value={newEndpoint.url}
                    onChange={(e) => setNewEndpoint({ ...newEndpoint, url: e.target.value })}
                    placeholder="https://api.example.com/health"
                  />
                </div>
                <div>
                  <Label htmlFor="endpoint-method">Method</Label>
                  <Select
                    value={newEndpoint.method}
                    onValueChange={(value) => setNewEndpoint({ ...newEndpoint, method: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddEndpoint} className="w-full">
                    Add Endpoint
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endpoints List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Monitored Endpoints ({endpoints.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpoints.map((endpoint) => (
                  <div key={endpoint.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(endpoint.status)}
                        <div>
                          <h3 className="font-medium">{endpoint.name}</h3>
                          <p className="text-sm text-muted-foreground">{endpoint.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(endpoint.status)}>{endpoint.status.toUpperCase()}</Badge>
                        <Switch checked={endpoint.enabled} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Response Time</p>
                        <p className="font-medium">{endpoint.responseTime.toFixed(0)}ms</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Uptime</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={endpoint.uptime} className="flex-1 h-2" />
                          <span className="font-medium">{endpoint.uptime.toFixed(2)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Method</p>
                        <p className="font-medium">{endpoint.method}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Check</p>
                        <p className="font-medium">{endpoint.lastCheck.toLocaleTimeString()}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        View Metrics
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        Test Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health-checks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Health Checks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthChecks.map((check) => (
                  <div key={check.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(check.status)}
                        <div>
                          <h3 className="font-medium">{check.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {check.type.toUpperCase()} - {check.target}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(check.status)}>{check.status.toUpperCase()}</Badge>
                        <Switch checked={check.enabled} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Interval</p>
                        <p className="font-medium">{check.interval}s</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Timeout</p>
                        <p className="font-medium">{check.timeout}s</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Retries</p>
                        <p className="font-medium">{check.retries}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium">{check.type.toUpperCase()}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Edit Check
                      </Button>
                      <Button size="sm" variant="outline">
                        Run Now
                      </Button>
                      <Button size="sm" variant="outline">
                        View History
                      </Button>
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Health Check
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Monitoring Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="global-interval">Global Check Interval (seconds)</Label>
                      <Input
                        id="global-interval"
                        type="number"
                        value={monitoringConfig.globalInterval}
                        onChange={(e) =>
                          setMonitoringConfig({ ...monitoringConfig, globalInterval: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="alert-threshold">Alert Threshold (failures)</Label>
                      <Input
                        id="alert-threshold"
                        type="number"
                        value={monitoringConfig.alertThreshold}
                        onChange={(e) =>
                          setMonitoringConfig({ ...monitoringConfig, alertThreshold: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="retention-days">Data Retention (days)</Label>
                      <Input
                        id="retention-days"
                        type="number"
                        value={monitoringConfig.retentionDays}
                        onChange={(e) =>
                          setMonitoringConfig({ ...monitoringConfig, retentionDays: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send alerts when issues are detected</p>
                      </div>
                      <Switch
                        checked={monitoringConfig.enableNotifications}
                        onCheckedChange={(checked) =>
                          setMonitoringConfig({ ...monitoringConfig, enableNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-Scaling</Label>
                        <p className="text-sm text-muted-foreground">Automatically scale resources based on metrics</p>
                      </div>
                      <Switch
                        checked={monitoringConfig.enableAutoScaling}
                        onCheckedChange={(checked) =>
                          setMonitoringConfig({ ...monitoringConfig, enableAutoScaling: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Predictive Alerts</Label>
                        <p className="text-sm text-muted-foreground">Use ML to predict potential issues</p>
                      </div>
                      <Switch
                        checked={monitoringConfig.enablePredictiveAlerts}
                        onCheckedChange={(checked) =>
                          setMonitoringConfig({ ...monitoringConfig, enablePredictiveAlerts: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monitoring Dashboards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Server className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Infrastructure Overview</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Real-time view of servers, databases, and network infrastructure
                  </p>
                  <Button size="sm" className="w-full">
                    Open Dashboard
                  </Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">API Performance</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monitor API endpoints, response times, and error rates
                  </p>
                  <Button size="sm" className="w-full">
                    Open Dashboard
                  </Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-purple-500" />
                    <h3 className="font-medium">Database Metrics</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Track database performance, connections, and query analytics
                  </p>
                  <Button size="sm" className="w-full">
                    Open Dashboard
                  </Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Security Monitoring</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Security events, intrusion detection, and compliance metrics
                  </p>
                  <Button size="sm" className="w-full">
                    Open Dashboard
                  </Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-medium">Performance Analytics</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Application performance, user experience, and optimization insights
                  </p>
                  <Button size="sm" className="w-full">
                    Open Dashboard
                  </Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-orange-500" />
                    <h3 className="font-medium">Custom Metrics</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Business-specific KPIs and custom monitoring dashboards
                  </p>
                  <Button size="sm" className="w-full">
                    Create Dashboard
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
