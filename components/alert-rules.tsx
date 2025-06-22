"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertTriangle,
  Bell,
  Clock,
  Mail,
  MessageSquare,
  Smartphone,
  Settings,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Activity,
  TrendingUp,
  Database,
  Shield,
  Zap,
} from "lucide-react"

interface AlertRule {
  id: string
  name: string
  description: string
  condition: string
  threshold: number
  operator: ">" | "<" | "=" | ">=" | "<="
  metric: string
  severity: "low" | "medium" | "high" | "critical"
  enabled: boolean
  channels: string[]
  cooldown: number
  lastTriggered?: Date
  triggerCount: number
  createdAt: Date
}

interface NotificationChannel {
  id: string
  name: string
  type: "email" | "sms" | "slack" | "discord" | "webhook" | "pagerduty"
  config: Record<string, any>
  enabled: boolean
  testStatus: "success" | "failed" | "pending" | null
}

interface AlertHistory {
  id: string
  ruleId: string
  ruleName: string
  severity: string
  message: string
  triggeredAt: Date
  resolvedAt?: Date
  status: "active" | "resolved" | "acknowledged"
  channels: string[]
}

export function AlertRules() {
  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: "cpu-high",
      name: "High CPU Usage",
      description: "Alert when CPU usage exceeds 80% for more than 5 minutes",
      condition: "avg(cpu_usage) > 80 for 5m",
      threshold: 80,
      operator: ">",
      metric: "cpu_usage",
      severity: "high",
      enabled: true,
      channels: ["email-ops", "slack-alerts"],
      cooldown: 300,
      lastTriggered: new Date(Date.now() - 3600000),
      triggerCount: 12,
      createdAt: new Date(Date.now() - 86400000 * 7),
    },
    {
      id: "memory-critical",
      name: "Critical Memory Usage",
      description: "Alert when memory usage exceeds 95%",
      condition: "avg(memory_usage) > 95",
      threshold: 95,
      operator: ">",
      metric: "memory_usage",
      severity: "critical",
      enabled: true,
      channels: ["email-ops", "sms-oncall", "pagerduty"],
      cooldown: 60,
      lastTriggered: new Date(Date.now() - 7200000),
      triggerCount: 3,
      createdAt: new Date(Date.now() - 86400000 * 14),
    },
    {
      id: "api-errors",
      name: "API Error Rate",
      description: "Alert when API error rate exceeds 5%",
      condition: "rate(api_errors) > 0.05",
      threshold: 5,
      operator: ">",
      metric: "api_error_rate",
      severity: "medium",
      enabled: true,
      channels: ["email-dev", "slack-dev"],
      cooldown: 600,
      triggerCount: 8,
      createdAt: new Date(Date.now() - 86400000 * 3),
    },
    {
      id: "disk-space",
      name: "Low Disk Space",
      description: "Alert when disk space falls below 10%",
      condition: "disk_free < 10",
      threshold: 10,
      operator: "<",
      metric: "disk_free_percent",
      severity: "high",
      enabled: false,
      channels: ["email-ops"],
      cooldown: 1800,
      triggerCount: 0,
      createdAt: new Date(Date.now() - 86400000 * 1),
    },
  ])

  const [notificationChannels, setNotificationChannels] = useState<NotificationChannel[]>([
    {
      id: "email-ops",
      name: "Operations Team Email",
      type: "email",
      config: { recipients: ["ops@projectaccess.com", "admin@projectaccess.com"] },
      enabled: true,
      testStatus: "success",
    },
    {
      id: "email-dev",
      name: "Development Team Email",
      type: "email",
      config: { recipients: ["dev@projectaccess.com"] },
      enabled: true,
      testStatus: "success",
    },
    {
      id: "slack-alerts",
      name: "Slack #alerts",
      type: "slack",
      config: { webhook: "https://hooks.slack.com/services/...", channel: "#alerts" },
      enabled: true,
      testStatus: "success",
    },
    {
      id: "slack-dev",
      name: "Slack #development",
      type: "slack",
      config: { webhook: "https://hooks.slack.com/services/...", channel: "#development" },
      enabled: true,
      testStatus: null,
    },
    {
      id: "sms-oncall",
      name: "On-Call SMS",
      type: "sms",
      config: { numbers: ["+1234567890"] },
      enabled: true,
      testStatus: "pending",
    },
    {
      id: "pagerduty",
      name: "PagerDuty",
      type: "pagerduty",
      config: { integrationKey: "abc123..." },
      enabled: false,
      testStatus: null,
    },
  ])

  const [alertHistory, setAlertHistory] = useState<AlertHistory[]>([
    {
      id: "alert-1",
      ruleId: "cpu-high",
      ruleName: "High CPU Usage",
      severity: "high",
      message: "CPU usage is 85.3% (threshold: 80%)",
      triggeredAt: new Date(Date.now() - 3600000),
      resolvedAt: new Date(Date.now() - 3000000),
      status: "resolved",
      channels: ["email-ops", "slack-alerts"],
    },
    {
      id: "alert-2",
      ruleId: "memory-critical",
      ruleName: "Critical Memory Usage",
      severity: "critical",
      message: "Memory usage is 97.2% (threshold: 95%)",
      triggeredAt: new Date(Date.now() - 7200000),
      status: "active",
      channels: ["email-ops", "sms-oncall", "pagerduty"],
    },
    {
      id: "alert-3",
      ruleId: "api-errors",
      ruleName: "API Error Rate",
      severity: "medium",
      message: "API error rate is 7.8% (threshold: 5%)",
      triggeredAt: new Date(Date.now() - 10800000),
      resolvedAt: new Date(Date.now() - 9000000),
      status: "resolved",
      channels: ["email-dev", "slack-dev"],
    },
  ])

  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    metric: "",
    operator: ">" as const,
    threshold: 0,
    severity: "medium" as const,
    channels: [] as string[],
    cooldown: 300,
  })

  const [newChannel, setNewChannel] = useState({
    name: "",
    type: "email" as const,
    config: {} as Record<string, any>,
  })

  const availableMetrics = [
    { value: "cpu_usage", label: "CPU Usage (%)", icon: <Activity className="h-4 w-4" /> },
    { value: "memory_usage", label: "Memory Usage (%)", icon: <Database className="h-4 w-4" /> },
    { value: "disk_free_percent", label: "Disk Free Space (%)", icon: <Database className="h-4 w-4" /> },
    { value: "api_response_time", label: "API Response Time (ms)", icon: <Clock className="h-4 w-4" /> },
    { value: "api_error_rate", label: "API Error Rate (%)", icon: <AlertTriangle className="h-4 w-4" /> },
    { value: "active_connections", label: "Active Connections", icon: <Activity className="h-4 w-4" /> },
    { value: "queue_size", label: "Queue Size", icon: <TrendingUp className="h-4 w-4" /> },
    { value: "security_events", label: "Security Events", icon: <Shield className="h-4 w-4" /> },
  ]

  useEffect(() => {
    // Simulate real-time alert updates
    const interval = setInterval(() => {
      // Randomly trigger alerts for demonstration
      if (Math.random() < 0.1) {
        const activeRules = alertRules.filter((rule) => rule.enabled)
        if (activeRules.length > 0) {
          const randomRule = activeRules[Math.floor(Math.random() * activeRules.length)]
          const newAlert: AlertHistory = {
            id: `alert-${Date.now()}`,
            ruleId: randomRule.id,
            ruleName: randomRule.name,
            severity: randomRule.severity,
            message: `${randomRule.metric} threshold exceeded`,
            triggeredAt: new Date(),
            status: "active",
            channels: randomRule.channels,
          }
          setAlertHistory((prev) => [newAlert, ...prev.slice(0, 9)])

          // Update rule trigger count
          setAlertRules((prev) =>
            prev.map((rule) =>
              rule.id === randomRule.id
                ? { ...rule, triggerCount: rule.triggerCount + 1, lastTriggered: new Date() }
                : rule,
            ),
          )
        }
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [alertRules])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "acknowledged":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <Smartphone className="h-4 w-4" />
      case "slack":
      case "discord":
        return <MessageSquare className="h-4 w-4" />
      case "webhook":
        return <Zap className="h-4 w-4" />
      case "pagerduty":
        return <Bell className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const handleCreateRule = () => {
    if (newRule.name && newRule.metric && newRule.channels.length > 0) {
      const rule: AlertRule = {
        id: `rule-${Date.now()}`,
        name: newRule.name,
        description: newRule.description,
        condition: `${newRule.metric} ${newRule.operator} ${newRule.threshold}`,
        threshold: newRule.threshold,
        operator: newRule.operator,
        metric: newRule.metric,
        severity: newRule.severity,
        enabled: true,
        channels: newRule.channels,
        cooldown: newRule.cooldown,
        triggerCount: 0,
        createdAt: new Date(),
      }
      setAlertRules((prev) => [rule, ...prev])
      setNewRule({
        name: "",
        description: "",
        metric: "",
        operator: ">",
        threshold: 0,
        severity: "medium",
        channels: [],
        cooldown: 300,
      })
    }
  }

  const handleCreateChannel = () => {
    if (newChannel.name && newChannel.type) {
      const channel: NotificationChannel = {
        id: `channel-${Date.now()}`,
        name: newChannel.name,
        type: newChannel.type,
        config: newChannel.config,
        enabled: true,
        testStatus: null,
      }
      setNotificationChannels((prev) => [channel, ...prev])
      setNewChannel({
        name: "",
        type: "email",
        config: {},
      })
    }
  }

  const handleToggleRule = (ruleId: string) => {
    setAlertRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const handleTestChannel = (channelId: string) => {
    setNotificationChannels((prev) =>
      prev.map((channel) => (channel.id === channelId ? { ...channel, testStatus: "pending" } : channel)),
    )

    // Simulate test result
    setTimeout(() => {
      setNotificationChannels((prev) =>
        prev.map((channel) =>
          channel.id === channelId ? { ...channel, testStatus: Math.random() > 0.2 ? "success" : "failed" } : channel,
        ),
      )
    }, 2000)
  }

  const activeAlerts = alertHistory.filter((alert) => alert.status === "active").length
  const enabledRules = alertRules.filter((rule) => rule.enabled).length
  const enabledChannels = notificationChannels.filter((channel) => channel.enabled).length
  const totalTriggers = alertRules.reduce((sum, rule) => sum + rule.triggerCount, 0)

  return (
    <div className="space-y-6">
      {/* Alert Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{activeAlerts}</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alert Rules</CardTitle>
            <Settings className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enabledRules}</div>
            <p className="text-xs text-muted-foreground">of {alertRules.length} enabled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notification Channels</CardTitle>
            <Bell className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{enabledChannels}</div>
            <p className="text-xs text-muted-foreground">Active channels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Triggers</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTriggers}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Management Tabs */}
      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
          <TabsTrigger value="channels">Notification Channels</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
          <TabsTrigger value="create">Create Rule</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Alert Rules ({alertRules.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Switch checked={rule.enabled} onCheckedChange={() => handleToggleRule(rule.id)} />
                        <div>
                          <h3 className="font-medium">{rule.name}</h3>
                          <p className="text-sm text-muted-foreground">{rule.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(rule.severity)}>{rule.severity.toUpperCase()}</Badge>
                        <Badge variant="outline">{rule.triggerCount} triggers</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Condition</p>
                        <p className="font-medium font-mono text-xs">{rule.condition}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cooldown</p>
                        <p className="font-medium">{rule.cooldown}s</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Channels</p>
                        <div className="flex flex-wrap gap-1">
                          {rule.channels.slice(0, 2).map((channelId) => {
                            const channel = notificationChannels.find((c) => c.id === channelId)
                            return channel ? (
                              <Badge key={channelId} variant="outline" className="text-xs">
                                {channel.name}
                              </Badge>
                            ) : null
                          })}
                          {rule.channels.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{rule.channels.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Triggered</p>
                        <p className="font-medium">
                          {rule.lastTriggered ? rule.lastTriggered.toLocaleDateString() : "Never"}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Test Rule
                      </Button>
                      <Button size="sm" variant="outline">
                        View History
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Channels ({notificationChannels.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationChannels.map((channel) => (
                  <div key={channel.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getChannelIcon(channel.type)}
                        <div>
                          <h3 className="font-medium">{channel.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{channel.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {channel.testStatus && (
                          <Badge
                            className={
                              channel.testStatus === "success"
                                ? "bg-green-100 text-green-800"
                                : channel.testStatus === "failed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {channel.testStatus === "success"
                              ? "TEST PASSED"
                              : channel.testStatus === "failed"
                                ? "TEST FAILED"
                                : "TESTING"}
                          </Badge>
                        )}
                        <Switch checked={channel.enabled} />
                      </div>
                    </div>

                    <div className="text-sm">
                      <p className="text-muted-foreground">Configuration:</p>
                      <div className="mt-1 p-2 bg-gray-50 rounded text-xs font-mono">
                        {JSON.stringify(channel.config, null, 2)}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTestChannel(channel.id)}
                        disabled={channel.testStatus === "pending"}
                      >
                        {channel.testStatus === "pending" ? "Testing..." : "Test Channel"}
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-medium mb-2">Add New Channel</h3>
                    <div className="space-y-3 max-w-md mx-auto">
                      <Input
                        placeholder="Channel name"
                        value={newChannel.name}
                        onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                      />
                      <Select
                        value={newChannel.type}
                        onValueChange={(value: any) => setNewChannel({ ...newChannel, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="slack">Slack</SelectItem>
                          <SelectItem value="discord">Discord</SelectItem>
                          <SelectItem value="webhook">Webhook</SelectItem>
                          <SelectItem value="pagerduty">PagerDuty</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleCreateChannel} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Channel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Alert History ({alertHistory.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertHistory.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {alert.status === "active" ? (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        ) : alert.status === "resolved" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        <div>
                          <h3 className="font-medium">{alert.ruleName}</h3>
                          <p className="text-sm text-muted-foreground">{alert.message}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                        <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Triggered</p>
                        <p className="font-medium">{alert.triggeredAt.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">
                          {alert.resolvedAt
                            ? `${Math.round((alert.resolvedAt.getTime() - alert.triggeredAt.getTime()) / 60000)}m`
                            : `${Math.round((Date.now() - alert.triggeredAt.getTime()) / 60000)}m (ongoing)`}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Notified Channels</p>
                        <div className="flex flex-wrap gap-1">
                          {alert.channels.slice(0, 2).map((channelId) => {
                            const channel = notificationChannels.find((c) => c.id === channelId)
                            return channel ? (
                              <Badge key={channelId} variant="outline" className="text-xs">
                                {channel.name}
                              </Badge>
                            ) : null
                          })}
                          {alert.channels.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{alert.channels.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {alert.status === "active" && (
                        <>
                          <Button size="sm">Acknowledge</Button>
                          <Button size="sm" variant="outline">
                            Resolve
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Alert Rule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rule-name">Rule Name</Label>
                    <Input
                      id="rule-name"
                      value={newRule.name}
                      onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                      placeholder="High CPU Usage Alert"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rule-severity">Severity</Label>
                    <Select
                      value={newRule.severity}
                      onValueChange={(value: any) => setNewRule({ ...newRule, severity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="rule-description">Description</Label>
                  <Textarea
                    id="rule-description"
                    value={newRule.description}
                    onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                    placeholder="Describe when this alert should trigger..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="rule-metric">Metric</Label>
                    <Select value={newRule.metric} onValueChange={(value) => setNewRule({ ...newRule, metric: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMetrics.map((metric) => (
                          <SelectItem key={metric.value} value={metric.value}>
                            <div className="flex items-center space-x-2">
                              {metric.icon}
                              <span>{metric.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rule-operator">Operator</Label>
                    <Select
                      value={newRule.operator}
                      onValueChange={(value: any) => setNewRule({ ...newRule, operator: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="&gt;">Greater than (&gt;)</SelectItem>
                        <SelectItem value=">=">Greater than or equal (&gt;=)</SelectItem>
                        <SelectItem value="<">Less than (&lt;)</SelectItem>
                        <SelectItem value="<=">Less than or equal (&lt;=)</SelectItem>
                        <SelectItem value="=">Equal to (=)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rule-threshold">Threshold</Label>
                    <Input
                      id="rule-threshold"
                      type="number"
                      value={newRule.threshold}
                      onChange={(e) => setNewRule({ ...newRule, threshold: Number.parseFloat(e.target.value) })}
                      placeholder="80"
                    />
                  </div>
                </div>

                <div>
                  <Label>Cooldown Period (seconds)</Label>
                  <div className="mt-2">
                    <Slider
                      value={[newRule.cooldown]}
                      onValueChange={(value) => setNewRule({ ...newRule, cooldown: value[0] })}
                      max={3600}
                      min={60}
                      step={60}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>1 minute</span>
                      <span>{Math.round(newRule.cooldown / 60)} minutes</span>
                      <span>1 hour</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Notification Channels</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {notificationChannels
                      .filter((c) => c.enabled)
                      .map((channel) => (
                        <div key={channel.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={channel.id}
                            checked={newRule.channels.includes(channel.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewRule({ ...newRule, channels: [...newRule.channels, channel.id] })
                              } else {
                                setNewRule({ ...newRule, channels: newRule.channels.filter((id) => id !== channel.id) })
                              }
                            }}
                          />
                          <Label htmlFor={channel.id} className="flex items-center space-x-2">
                            {getChannelIcon(channel.type)}
                            <span>{channel.name}</span>
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>

                <Button onClick={handleCreateRule} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Alert Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
