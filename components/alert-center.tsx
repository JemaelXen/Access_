"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Settings,
  Zap,
  Shield,
  Activity,
  Users,
  Server,
} from "lucide-react"

interface Alert {
  id: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  category: "system" | "security" | "performance" | "business"
  status: "active" | "acknowledged" | "resolved"
  timestamp: Date
  source: string

  status: "active" | "acknowledged" | "resolved"
  timestamp: Date
  source: string
  assignedTo?: string
  escalationLevel: number
  autoResolved: boolean
}

interface AlertRule {
  id: string
  name: string
  condition: string
  threshold: number
  enabled: boolean
  channels: string[]
}

export function AlertCenter() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "alert-1",
      title: "Critical: Database Connection Pool Exhausted",
      description: "Database connection pool has reached maximum capacity. New connections are being rejected.",
      severity: "critical",
      category: "system",
      status: "active",
      timestamp: new Date(Date.now() - 300000),
      source: "Database Monitor",
      assignedTo: "DevOps Team",
      escalationLevel: 2,
      autoResolved: false,
    },
    {
      id: "alert-2",
      title: "High: API Response Time Degradation",
      description: "Average API response time has increased to 245ms, exceeding the 200ms threshold.",
      severity: "high",
      category: "performance",
      status: "acknowledged",
      timestamp: new Date(Date.now() - 600000),
      source: "Performance Monitor",
      assignedTo: "Backend Team",
      escalationLevel: 1,
      autoResolved: false,
    },
    {
      id: "alert-3",
      title: "Medium: Unusual Traffic Pattern Detected",
      description: "Traffic from specific IP range shows unusual patterns that may indicate bot activity.",
      severity: "medium",
      category: "security",
      status: "active",
      timestamp: new Date(Date.now() - 900000),
      source: "Security Monitor",
      escalationLevel: 0,
      autoResolved: false,
    },
    {
      id: "alert-4",
      title: "Low: Disk Usage Warning",
      description: "Disk usage on server-03 has reached 75% capacity.",
      severity: "low",
      category: "system",
      status: "resolved",
      timestamp: new Date(Date.now() - 1800000),
      source: "System Monitor",
      autoResolved: true,
      escalationLevel: 0,
    },
  ])

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: "rule-1",
      name: "High CPU Usage",
      condition: "cpu_usage > threshold",
      threshold: 80,
      enabled: true,
      channels: ["email", "slack", "sms"],
    },
    {
      id: "rule-2",
      name: "Memory Usage Critical",
      condition: "memory_usage > threshold",
      threshold: 90,
      enabled: true,
      channels: ["email", "slack", "pagerduty"],
    },
    {
      id: "rule-3",
      name: "Error Rate Spike",
      condition: "error_rate > threshold",
      threshold: 1,
      enabled: true,
      channels: ["email", "slack"],
    },
  ])

  const [filterSeverity, setFilterSeverity] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const [alertStats, setAlertStats] = useState({
    total: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    active: 0,
    resolved: 0,
  })

  useEffect(() => {
    // Calculate alert statistics
    const stats = alerts.reduce(
      (acc, alert) => {
        acc.total++
        acc[alert.severity]++
        if (alert.status === "active" || alert.status === "acknowledged") {
          acc.active++
        } else {
          acc.resolved++
        }
        return acc
      },
      {
        total: 0,
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        active: 0,
        resolved: 0,
      },
    )
    setAlertStats(stats)

    // Simulate new alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          title: "New Alert: System Anomaly Detected",
          description: "Automated monitoring has detected an anomaly in system behavior.",
          severity: Math.random() > 0.7 ? "high" : Math.random() > 0.5 ? "medium" : "low",
          category: ["system", "performance", "security"][Math.floor(Math.random() * 3)] as any,
          status: "active",
          timestamp: new Date(),
          source: "AI Monitor",
          escalationLevel: 0,
          autoResolved: false,
        }
        setAlerts((prev) => [newAlert, ...prev])
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [alerts])

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    const matchesSearch =
      searchTerm === "" ||
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSeverity && matchesStatus && matchesSearch
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800"
      case "acknowledged":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "system":
        return <Server className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      case "performance":
        return <Zap className="h-4 w-4" />
      case "business":
        return <Users className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const handleAcknowledge = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "acknowledged" } : alert)))
  }

  const handleResolve = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
  }

  return (
    <div className="space-y-6">
      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alertStats.active}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alertStats.critical}</div>
            <p className="text-xs text-muted-foreground">Immediate action needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{alertStats.resolved}</div>
            <p className="text-xs text-muted-foreground">Successfully handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2min</div>
            <p className="text-xs text-muted-foreground">-15% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Management Tabs */}
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter & Search Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="acknowledged">Acknowledged</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Alerts List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                System Alerts ({filteredAlerts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`border rounded-lg p-4 ${alert.status === "resolved" ? "bg-gray-50" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getCategoryIcon(alert.category)}
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                          <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
                          {alert.autoResolved && <Badge className="bg-blue-100 text-blue-800">AUTO-RESOLVED</Badge>}
                        </div>
                        <h3 className="font-medium mb-1">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Source: {alert.source}</span>
                          <span>Time: {alert.timestamp.toLocaleString()}</span>
                          {alert.assignedTo && <span>Assigned: {alert.assignedTo}</span>}
                          {alert.escalationLevel > 0 && (
                            <span className="text-red-600">Escalation Level: {alert.escalationLevel}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {alert.status === "active" && (
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline" onClick={() => handleAcknowledge(alert.id)}>
                          Acknowledge
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleResolve(alert.id)}>
                          Resolve
                        </Button>
                        {alert.severity === "critical" && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Escalate
                          </Button>
                        )}
                      </div>
                    )}

                    {alert.status === "acknowledged" && (
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline" onClick={() => handleResolve(alert.id)}>
                          Mark as Resolved
                        </Button>
                        <Button size="sm" variant="outline">
                          Add Comment
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Alert Rules Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{rule.name}</h3>
                        <p className="text-sm text-muted-foreground">{rule.condition}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={rule.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {rule.enabled ? "ENABLED" : "DISABLED"}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Threshold</p>
                        <p className="font-medium">
                          {rule.threshold}
                          {rule.condition.includes("usage") ? "%" : ""}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Notification Channels</p>
                        <div className="flex space-x-1 mt-1">
                          {rule.channels.map((channel, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Edit Rule
                      </Button>
                      <Button size="sm" variant="outline">
                        Test Alert
                      </Button>
                      <Button size="sm" variant={rule.enabled ? "destructive" : "default"}>
                        {rule.enabled ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Create New Alert Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Alert History & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">247</p>
                    <p className="text-sm text-muted-foreground">Alerts This Week</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">4.2min</p>
                    <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">94.2%</p>
                    <p className="text-sm text-muted-foreground">Auto-Resolution Rate</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Recent Resolution Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Database connection issue resolved automatically</span>
                      <span className="text-xs text-muted-foreground">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm">Memory usage alert acknowledged by DevOps</span>
                      <span className="text-xs text-muted-foreground">5 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">API response time improved after optimization</span>
                      <span className="text-xs text-muted-foreground">12 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Channels</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">ENABLED</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Slack Integration</p>
                        <p className="text-sm text-muted-foreground">Send alerts to #alerts channel</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">ENABLED</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">SMS Alerts</p>
                        <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800">DISABLED</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">PagerDuty Integration</p>
                        <p className="text-sm text-muted-foreground">Escalate critical alerts</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">ENABLED</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Alert Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Quiet Hours (No non-critical alerts)</span>
                      <Badge className="bg-blue-100 text-blue-800">10 PM - 6 AM</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-acknowledge resolved alerts</span>
                      <Badge className="bg-green-100 text-green-800">ENABLED</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Escalation timeout</span>
                      <Badge className="bg-blue-100 text-blue-800">15 minutes</Badge>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
