"use client"

import { useState } from "react"
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
import { AlertTriangle, Bell, CheckCircle, Plus, Settings, Trash2, Edit, Save, X } from "lucide-react"

interface AlertRule {
  id: string
  name: string
  description: string
  condition: string
  threshold: number
  severity: "critical" | "high" | "medium" | "low"
  enabled: boolean
  channels: string[]
  frequency: number
  cooldown: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface AlertChannel {
  id: string
  name: string
  type: "email" | "slack" | "webhook" | "sms" | "pagerduty"
  enabled: boolean
  config: Record<string, any>
}

export function AlertRules() {
  const [rules, setRules] = useState<AlertRule[]>([
    {
      id: "rule-1",
      name: "High CPU Usage",
      description: "Alert when CPU usage exceeds threshold for sustained period",
      condition: "cpu_usage > threshold",
      threshold: 80,
      severity: "high",
      enabled: true,
      channels: ["email", "slack"],
      frequency: 5,
      cooldown: 15,
      tags: ["performance", "infrastructure"],
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 3600000),
    },
    {
      id: "rule-2",
      name: "Memory Usage Critical",
      description: "Critical alert for memory usage above 90%",
      condition: "memory_usage > threshold",
      threshold: 90,
      severity: "critical",
      enabled: true,
      channels: ["email", "slack", "pagerduty"],
      frequency: 1,
      cooldown: 5,
      tags: ["performance", "critical"],
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date(Date.now() - 7200000),
    },
    {
      id: "rule-3",
      name: "Error Rate Spike",
      description: "Alert when error rate increases significantly",
      condition: "error_rate > threshold",
      threshold: 1,
      severity: "medium",
      enabled: true,
      channels: ["email", "slack"],
      frequency: 10,
      cooldown: 30,
      tags: ["errors", "application"],
      createdAt: new Date(Date.now() - 259200000),
      updatedAt: new Date(Date.now() - 10800000),
    },
  ])

  const [channels, setChannels] = useState<AlertChannel[]>([
    {
      id: "email",
      name: "Email Notifications",
      type: "email",
      enabled: true,
      config: { recipients: ["admin@projectaccess.co", "alerts@projectaccess.co"] },
    },
    {
      id: "slack",
      name: "Slack #alerts",
      type: "slack",
      enabled: true,
      config: { webhook: "https://hooks.slack.com/services/...", channel: "#alerts" },
    },
    {
      id: "pagerduty",
      name: "PagerDuty",
      type: "pagerduty",
      enabled: true,
      config: { integration_key: "abc123..." },
    },
  ])

  const [editingRule, setEditingRule] = useState<AlertRule | null>(null)
  const [newRule, setNewRule] = useState<Partial<AlertRule>>({
    name: "",
    description: "",
    condition: "",
    threshold: 50,
    severity: "medium",
    enabled: true,
    channels: [],
    frequency: 5,
    cooldown: 15,
    tags: [],
  })

  const [isCreating, setIsCreating] = useState(false)

  const handleCreateRule = () => {
    if (newRule.name && newRule.condition) {
      const rule: AlertRule = {
        id: `rule-${Date.now()}`,
        name: newRule.name,
        description: newRule.description || "",
        condition: newRule.condition,
        threshold: newRule.threshold || 50,
        severity: newRule.severity || "medium",
        enabled: newRule.enabled || true,
        channels: newRule.channels || [],
        frequency: newRule.frequency || 5,
        cooldown: newRule.cooldown || 15,
        tags: newRule.tags || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setRules([...rules, rule])
      setNewRule({
        name: "",
        description: "",
        condition: "",
        threshold: 50,
        severity: "medium",
        enabled: true,
        channels: [],
        frequency: 5,
        cooldown: 15,
        tags: [],
      })
      setIsCreating(false)
    }
  }

  const handleUpdateRule = (updatedRule: AlertRule) => {
    setRules(rules.map((rule) => (rule.id === updatedRule.id ? { ...updatedRule, updatedAt: new Date() } : rule)))
    setEditingRule(null)
  }

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter((rule) => rule.id !== ruleId))
  }

  const handleToggleRule = (ruleId: string) => {
    setRules(
      rules.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled, updatedAt: new Date() } : rule)),
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "email":
        return "📧"
      case "slack":
        return "💬"
      case "webhook":
        return "🔗"
      case "sms":
        return "📱"
      case "pagerduty":
        return "📟"
      default:
        return "🔔"
    }
  }

  return (
    <div className="space-y-6">
      {/* Alert Rules Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rules</CardTitle>
            <Settings className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rules.length}</div>
            <p className="text-xs text-muted-foreground">Alert rules configured</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{rules.filter((r) => r.enabled).length}</div>
            <p className="text-xs text-muted-foreground">Currently monitoring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Rules</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {rules.filter((r) => r.severity === "critical").length}
            </div>
            <p className="text-xs text-muted-foreground">High priority alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notification Channels</CardTitle>
            <Bell className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channels.filter((c) => c.enabled).length}</div>
            <p className="text-xs text-muted-foreground">Active channels</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Rules Management */}
      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
          <TabsTrigger value="channels">Notification Channels</TabsTrigger>
          <TabsTrigger value="templates">Rule Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Alert Rules ({rules.length})</CardTitle>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Create New Rule Form */}
                {isCreating && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="font-medium mb-4">Create New Alert Rule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rule-name">Rule Name</Label>
                        <Input
                          id="rule-name"
                          value={newRule.name || ""}
                          onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                          placeholder="Enter rule name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="rule-condition">Condition</Label>
                        <Input
                          id="rule-condition"
                          value={newRule.condition || ""}
                          onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                          placeholder="e.g., cpu_usage > threshold"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="rule-description">Description</Label>
                      <Textarea
                        id="rule-description"
                        value={newRule.description || ""}
                        onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                        placeholder="Describe what this rule monitors"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <Label htmlFor="rule-threshold">Threshold</Label>
                        <div className="mt-2">
                          <Slider
                            value={[newRule.threshold || 50]}
                            onValueChange={(value) => setNewRule({ ...newRule, threshold: value[0] })}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                          <div className="text-sm text-muted-foreground mt-1">{newRule.threshold || 50}%</div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="rule-severity">Severity</Label>
                        <Select
                          value={newRule.severity || "medium"}
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
                      <div>
                        <Label htmlFor="rule-frequency">Check Frequency (min)</Label>
                        <Input
                          id="rule-frequency"
                          type="number"
                          value={newRule.frequency || 5}
                          onChange={(e) => setNewRule({ ...newRule, frequency: Number.parseInt(e.target.value) })}
                          min={1}
                          max={60}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label>Notification Channels</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {channels.map((channel) => (
                          <div key={channel.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`channel-${channel.id}`}
                              checked={newRule.channels?.includes(channel.id) || false}
                              onCheckedChange={(checked) => {
                                const currentChannels = newRule.channels || []
                                if (checked) {
                                  setNewRule({ ...newRule, channels: [...currentChannels, channel.id] })
                                } else {
                                  setNewRule({
                                    ...newRule,
                                    channels: currentChannels.filter((c) => c !== channel.id),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={`channel-${channel.id}`} className="text-sm">
                              {getChannelIcon(channel.type)} {channel.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button onClick={handleCreateRule}>
                        <Save className="h-4 w-4 mr-2" />
                        Create Rule
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreating(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Existing Rules */}
                {rules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    {editingRule?.id === rule.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Rule Name</Label>
                            <Input
                              value={editingRule.name}
                              onChange={(e) => setEditingRule({ ...editingRule, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Condition</Label>
                            <Input
                              value={editingRule.condition}
                              onChange={(e) => setEditingRule({ ...editingRule, condition: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={editingRule.description}
                            onChange={(e) => setEditingRule({ ...editingRule, description: e.target.value })}
                            rows={2}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Threshold: {editingRule.threshold}%</Label>
                            <Slider
                              value={[editingRule.threshold]}
                              onValueChange={(value) => setEditingRule({ ...editingRule, threshold: value[0] })}
                              max={100}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Severity</Label>
                            <Select
                              value={editingRule.severity}
                              onValueChange={(value: any) => setEditingRule({ ...editingRule, severity: value })}
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
                          <div>
                            <Label>Frequency (min)</Label>
                            <Input
                              type="number"
                              value={editingRule.frequency}
                              onChange={(e) =>
                                setEditingRule({ ...editingRule, frequency: Number.parseInt(e.target.value) })
                              }
                              min={1}
                              max={60}
                            />
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button onClick={() => handleUpdateRule(editingRule)}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setEditingRule(null)}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-medium">{rule.name}</h3>
                              <Badge className={getSeverityColor(rule.severity)}>{rule.severity.toUpperCase()}</Badge>
                              <Badge
                                className={rule.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                              >
                                {rule.enabled ? "ENABLED" : "DISABLED"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                            <div className="text-xs text-muted-foreground">
                              <span>Condition: {rule.condition}</span>
                              <span className="mx-2">•</span>
                              <span>Threshold: {rule.threshold}%</span>
                              <span className="mx-2">•</span>
                              <span>Check every: {rule.frequency}min</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">Channels:</span>
                              <div className="flex space-x-1">
                                {rule.channels.map((channelId) => {
                                  const channel = channels.find((c) => c.id === channelId)
                                  return channel ? (
                                    <Badge key={channelId} variant="outline" className="text-xs">
                                      {getChannelIcon(channel.type)} {channel.name}
                                    </Badge>
                                  ) : null
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={`toggle-${rule.id}`} className="text-sm">
                                Enabled
                              </Label>
                              <Switch
                                id={`toggle-${rule.id}`}
                                checked={rule.enabled}
                                onCheckedChange={() => handleToggleRule(rule.id)}
                              />
                            </div>
                            <Button size="sm" variant="outline" onClick={() => setEditingRule(rule)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteRule(rule.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                          <span>Created: {rule.createdAt.toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span>Updated: {rule.updatedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channels.map((channel) => (
                  <div key={channel.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getChannelIcon(channel.type)}</span>
                        <div>
                          <h3 className="font-medium">{channel.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{channel.type} notifications</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={channel.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {channel.enabled ? "ENABLED" : "DISABLED"}
                        </Badge>
                        <Switch
                          checked={channel.enabled}
                          onCheckedChange={(checked) =>
                            setChannels(channels.map((c) => (c.id === channel.id ? { ...c, enabled: checked } : c)))
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-muted-foreground">
                      {channel.type === "email" && <span>Recipients: {channel.config.recipients?.join(", ")}</span>}
                      {channel.type === "slack" && <span>Channel: {channel.config.channel}</span>}
                      {channel.type === "pagerduty" && <span>Integration configured</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rule Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Performance Monitoring</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Standard performance alerts for CPU, memory, and disk usage
                  </p>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Error Rate Monitoring</h3>
                  <p className="text-sm text-muted-foreground mb-3">Application error rate and exception monitoring</p>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Security Alerts</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Security-focused alerts for suspicious activities
                  </p>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Business Metrics</h3>
                  <p className="text-sm text-muted-foreground mb-3">Business KPI monitoring and threshold alerts</p>
                  <Button size="sm" variant="outline">
                    Use Template
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
