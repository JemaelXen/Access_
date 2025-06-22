"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Search,
  Star,
  Download,
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  CreditCard,
  BarChart3,
  Users,
  Globe,
  Code,
  Webhook,
} from "lucide-react"

interface AvailableIntegration {
  id: string
  name: string
  description: string
  category: string
  provider: string
  rating: number
  downloads: number
  price: "free" | "paid" | "freemium"
  icon: React.ReactNode
  features: string[]
  setupComplexity: "easy" | "medium" | "advanced"
  documentation: string
  supportLevel: "community" | "standard" | "premium"
}

interface InstallationJob {
  id: string
  integrationId: string
  integrationName: string
  status: "pending" | "installing" | "configuring" | "testing" | "completed" | "failed"
  progress: number
  startTime: Date
  endTime?: Date
  logs: string[]
}

interface CustomIntegration {
  name: string
  description: string
  endpoint: string
  method: string
  headers: Record<string, string>
  authentication: "none" | "api-key" | "oauth" | "basic"
  webhookUrl: string
}

export function NewIntegrations() {
  const [availableIntegrations, setAvailableIntegrations] = useState<AvailableIntegration[]>([
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Connect with Salesforce CRM for customer data synchronization and lead management",
      category: "CRM",
      provider: "Salesforce",
      rating: 4.8,
      downloads: 125000,
      price: "freemium",
      icon: <Users className="h-5 w-5" />,
      features: ["Contact Sync", "Lead Management", "Opportunity Tracking", "Custom Fields"],
      setupComplexity: "medium",
      documentation: "https://docs.salesforce.com/api",
      supportLevel: "premium",
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description: "Marketing automation and CRM integration for lead nurturing and analytics",
      category: "Marketing",
      provider: "HubSpot",
      rating: 4.7,
      downloads: 89000,
      price: "freemium",
      icon: <BarChart3 className="h-5 w-5" />,
      features: ["Email Marketing", "Lead Scoring", "Analytics", "Workflows"],
      setupComplexity: "easy",
      documentation: "https://developers.hubspot.com",
      supportLevel: "standard",
    },
    {
      id: "zendesk",
      name: "Zendesk",
      description: "Customer support integration for ticket management and help desk functionality",
      category: "Support",
      provider: "Zendesk",
      rating: 4.6,
      downloads: 67000,
      price: "paid",
      icon: <MessageSquare className="h-5 w-5" />,
      features: ["Ticket Management", "Knowledge Base", "Live Chat", "Reporting"],
      setupComplexity: "easy",
      documentation: "https://developer.zendesk.com",
      supportLevel: "premium",
    },
    {
      id: "github",
      name: "GitHub",
      description: "Development workflow integration for code repository management and CI/CD",
      category: "Development",
      provider: "GitHub",
      rating: 4.9,
      downloads: 234000,
      price: "free",
      icon: <Code className="h-5 w-5" />,
      features: ["Repository Sync", "Issue Tracking", "Pull Requests", "Actions"],
      setupComplexity: "medium",
      documentation: "https://docs.github.com/api",
      supportLevel: "community",
    },
    {
      id: "jira",
      name: "Jira",
      description: "Project management and issue tracking integration for agile development teams",
      category: "Project Management",
      provider: "Atlassian",
      rating: 4.5,
      downloads: 156000,
      price: "paid",
      icon: <Settings className="h-5 w-5" />,
      features: ["Issue Tracking", "Sprint Planning", "Reporting", "Workflows"],
      setupComplexity: "advanced",
      documentation: "https://developer.atlassian.com/jira",
      supportLevel: "standard",
    },
    {
      id: "discord",
      name: "Discord",
      description: "Team communication integration with channels, notifications, and bot functionality",
      category: "Communication",
      provider: "Discord",
      rating: 4.4,
      downloads: 78000,
      price: "free",
      icon: <MessageSquare className="h-5 w-5" />,
      features: ["Channel Integration", "Notifications", "Bot Commands", "Voice Chat"],
      setupComplexity: "easy",
      documentation: "https://discord.com/developers/docs",
      supportLevel: "community",
    },
    {
      id: "shopify",
      name: "Shopify",
      description: "E-commerce platform integration for order management and inventory sync",
      category: "E-commerce",
      provider: "Shopify",
      rating: 4.7,
      downloads: 92000,
      price: "freemium",
      icon: <CreditCard className="h-5 w-5" />,
      features: ["Order Sync", "Inventory Management", "Customer Data", "Analytics"],
      setupComplexity: "medium",
      documentation: "https://shopify.dev/api",
      supportLevel: "standard",
    },
    {
      id: "datadog",
      name: "Datadog",
      description: "Monitoring and observability platform for infrastructure and application metrics",
      category: "Monitoring",
      provider: "Datadog",
      rating: 4.6,
      downloads: 45000,
      price: "paid",
      icon: <BarChart3 className="h-5 w-5" />,
      features: ["Metrics Collection", "Log Management", "APM", "Alerting"],
      setupComplexity: "advanced",
      documentation: "https://docs.datadoghq.com/api",
      supportLevel: "premium",
    },
  ])

  const [installationJobs, setInstallationJobs] = useState<InstallationJob[]>([])
  
  const [customIntegration, setCustomIntegration] = useState<CustomIntegration>({
    name: "",
    description: "",
    endpoint: "",
    method: "GET",
    headers: {},
    authentication: "none",
    webhookUrl: "",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedComplexity, setSelectedComplexity] = useState("all")

  const categories = ["all", "CRM", "Marketing", "Support", "Development", "Project Management", "Communication", "E-commerce", "Monitoring"]
  const complexityLevels = ["all", "easy", "medium", "advanced"]

  useEffect(() => {
    // Simulate installation progress
    const interval = setInterval(() => {
      setInstallationJobs((prev) =>
        prev.map((job) => {
          if (job.status === "installing" && job.progress < 100) {
            const newProgress = Math.min(100, job.progress + Math.random() * 15)
            let newStatus = job.status
            const newLogs = [...job.logs]

            if (newProgress >= 30 && job.status === "installing") {
              newStatus = "configuring"
              newLogs.push("Installation completed, starting configuration...")
            } else if (newProgress >= 70 && job.status === "configuring") {
              newStatus = "testing"
              newLogs.push("Configuration completed, running tests...")
            } else if (newProgress >= 100) {
              newStatus = "completed"
              newLogs.push("Integration successfully installed and configured!")
            }

            return {
              ...job,
              progress: newProgress,
              status: newStatus,
              logs: newLogs,
              endTime: newProgress >= 100 ? new Date() : undefined,
            }
          }
          return job
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const filteredIntegrations = availableIntegrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    const matchesComplexity = selectedComplexity === "all" || integration.setupComplexity === selectedComplexity
    
    return matchesSearch && matchesCategory && matchesComplexity
  })

  const handleInstallIntegration = (integration: AvailableIntegration) => {
    const newJob: InstallationJob = {
      id: `install-${Date.now()}`,
      integrationId: integration.id,
      integrationName: integration.name,
      status: "installing",
      progress: 0,
      startTime: new Date(),
      logs: [`Starting installation of ${integration.name}...`],
    }
    setInstallationJobs((prev) => [newJob, ...prev])
  }

  const handleCreateCustomIntegration = () => {
    if (customIntegration.name && customIntegration.endpoint) {
      const newJob: InstallationJob = {
        id: `custom-${Date.now()}`,
        integrationId: "custom",
        integrationName: customIntegration.name,
        status: "installing",
        progress: 0,
        startTime: new Date(),
        logs: [`Creating custom integration: ${customIntegration.name}...`],
      }
      setInstallationJobs((prev) => [newJob, ...prev])
      setCustomIntegration({
        name: "",
        description: "",
        endpoint: "",
        method: "GET",
        headers: {},
        authentication: "none",
        webhookUrl: "",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "installing":
      case "configuring":
      case "testing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "installing":
      case "configuring":
      case "testing":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriceColor = (price: string) => {
    switch (price) {
      case "free":
        return "bg-green-100 text-green-800"
      case "freemium":
        return "bg-blue-100 text-blue-800"
      case "paid":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const activeInstallations = installationJobs.filter((job) => 
    job.status === "installing" || job.status === "configuring" || job.status === "testing"
  ).length
  const completedInstallations = installationJobs.filter((job) => job.status === "completed").length

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Integrations</CardTitle>
            <Globe className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableIntegrations.length}</div>
            <p className="text-xs text-muted-foreground">Ready to install</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Installing</CardTitle>
            <Download className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{activeInstallations}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedInstallations}</div>
            <p className="text-xs text-muted-foreground">Successfully installed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Settings className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length - 1}</div>
            <p className="text-xs text-muted-foreground">Integration types</p>
          </CardContent>
        </Card>
      </div>

      {/* Integration Management Tabs */}
      <Tabs defaultValue="marketplace" className="space-y-4">
        <TabsList>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="installations">Installations</TabsTrigger>
          <TabsTrigger value="custom">Custom Integration</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Integration Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search integrations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    {complexityLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level === "all" ? "All Levels" : level.charAt(0).toUpperCase() + level.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIntegrations.map((integration) => (
                  <div key={integration.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {integration.icon}
                        <div>
                          <h3 className="font-medium">{integration.name}</h3>
                          <p className="text-sm text-muted-foreground">{integration.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{integration.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {integration.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">{integration.category}</Badge>
                      <Badge className={getPriceColor(integration.price)} variant="secondary">
                        {integration.price.toUpperCase()}
                      </Badge>
                      <Badge className={getComplexityColor(integration.setupComplexity)} variant="secondary">
                        {integration.setupComplexity.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium">Key Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {integration.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{integration.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{integration.downloads.toLocaleString()} downloads</span>
                      <span>{integration.supportLevel} support</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleInstallIntegration(integration)} className="flex-1">
                        <Plus className="h-3 w-3 mr-1" />
                        Install
                      </Button>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="installations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Installation Jobs ({installationJobs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {installationJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No installation jobs yet</p>
                    <p className="text-sm text-muted-foreground">Install integrations from the marketplace to see them here</p>
                  </div>
                ) : (
                  installationJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(job.status)}
                          <div>
                            <h3 className="font-medium">{job.integrationName}</h3>
                            <p className="text-sm text-muted-foreground">
                              Started: {job.startTime.toLocaleString()}
                              {job.endTime && ` • Completed: ${job.endTime.toLocaleString()}`}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(job.status)}>{job.status.toUpperCase()}</Badge>
                      </div>

                      {(job.status === "installing" || job.status === "configuring" || job.status === "testing") && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{job.progress.toFixed(0)}%</span>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                        </div>
                      )}

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Installation Logs:</p>
                        <div className="bg-gray-50 rounded p-3 max-h-32 overflow-y-auto">
                          {job.logs.map((log, index) => (
                            <p key={index} className="text-xs text-muted-foreground">
                              {log}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {job.status === "completed" && (
                          <Button size="sm">
                            Configure
                          </Button>
                        )}
                        {(job.status === "installing" || job.status === "configuring" || job.status === "testing") && (
                          <Button size="sm" variant="destructive">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Create Custom Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="integration-name">Integration Name</Label>
                    <Input
                      id="integration-name"
                      value={customIntegration.name}
                      onChange={(e) => setCustomIntegration({ ...customIntegration, name: e.target.value })}
                      placeholder="My Custom API"
                    />
                  </div>
                  <div>
                    <Label htmlFor="integration-endpoint">API Endpoint</Label>
                    <Input
                      id="integration-endpoint"
                      value={customIntegration.endpoint}
                      onChange={(e) => setCustomIntegration({ ...customIntegration, endpoint: e.target.value })}
                      placeholder="https://api.example.com/v1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="integration-description">Description</Label>
                  <Textarea
                    id="integration-description"
                    value={customIntegration.description}
                    onChange={(e) => setCustomIntegration({ ...customIntegration, description: e.target.value })}
                    placeholder="Describe what this integration does..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="http-method">HTTP Method</Label>
                    <Select value={customIntegration.method} onValueChange={(value) => setCustomIntegration({ ...customIntegration, method: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="authentication">Authentication</Label>
                    <Select value={customIntegration.authentication} onValueChange={(value: any) => setCustomIntegration({ ...customIntegration, authentication: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="api-key">API Key</SelectItem>
                        <SelectItem value="oauth">OAuth 2.0</SelectItem>
                        <SelectItem value="basic">Basic Auth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="webhook-url">Webhook URL (Optional)</Label>
                  <Input
                    id="webhook-url"
                    value={customIntegration.webhookUrl}
                    onChange={(e) => setCustomIntegration({ ...customIntegration, webhookUrl: e.target.value })}
                    placeholder="https://your-app.com/webhooks/custom-integration"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Request Headers</Label>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Header Name" />
                      <Input placeholder="Header Value" />
                    </div>
                    <Button size="sm" variant="outline">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Header
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleCreateCustomIntegration} className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Integration
                  </Button>
                  <Button variant="outline">
                    Test Connection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhook Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Webhook Endpoints</h4>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Integration Events</span>
                          <Badge className="bg-green-100 text-green-800">ACTIVE</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          https://api.projectaccess.com/webhooks/integrations
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">Configure</Button>
                          <Button size="sm" variant="outline">Test</Button>
                        </div>
                      </div>

                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">System Alerts</span>
                          <Badge className="bg-green-100 text-green-800">ACTIVE</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          https://api.projectaccess.com/webhooks/alerts
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">Configure</Button>
                          <Button size="sm" variant="outline">Test</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Recent Webhook Activity</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span className="text-sm">Integration installed: Salesforce</span>
                        <span className="text-xs text-muted-foreground">2 min ago</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <span className="text-sm">System alert: High CPU usage</span>
                        <span className="text-xs text-muted-foreground">5 min ago</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                        <span className="text-sm">Custom integration created</span>
                        <span className="text-xs text-muted-foreground">12 min ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Webhook Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="webhook-secret">Webhook Secret</Label>
                      <Input
                        id="webhook-secret"
                        type="password"
                        placeholder="Enter webhook secret"
                      />
                    </div>
                    <div>
                      <Label htmlFor="retry-attempts">Retry Attempts</Label>
                      <Select defaultValue="3">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 attempt</SelectItem>
                          <SelectItem value="3">3 attempts</SelectItem>
                          <SelectItem value="5">5 attempts</SelectItem>
                          <SelectItem value="10">10 attempts</SelectItem>
                        </SelectContent>
                      </Select>\
