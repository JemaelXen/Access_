"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AsymmetricLogo } from "@/components/asymmetric-logo"
import {
  Zap,
  Plus,
  Play,
  Upload,
  Code,
  Shield,
  Monitor,
  Layers,
  Workflow,
  BarChart3,
  Globe,
  Cloud,
  Crown,
} from "lucide-react"
import { IntegrationCanvas } from "@/components/integration-canvas"
import { NodeLibrary } from "@/components/node-library"
import { IntegrationPreview } from "@/components/integration-preview"
import { CodeGenerator } from "@/components/code-generator"
import { TestingEnvironment } from "@/components/testing-environment"
import { DeploymentManager } from "@/components/deployment-manager"

export default function IntegrationBuilderPage() {
  const [activeTab, setActiveTab] = useState("builder")
  const [selectedIntegration, setSelectedIntegration] = useState(null)
  const [isBuilding, setIsBuilding] = useState(false)

  const integrationTemplates = [
    {
      id: "social-sync",
      name: "Social Media Sync",
      description: "Sync posts across Twitter, Instagram, Facebook",
      category: "Social",
      complexity: "Medium",
      apiVersions: ["v3.0", "v4.0"],
      nodes: 12,
      connections: 8,
      status: "Template",
      icon: Globe,
      color: "bg-blue-500",
    },
    {
      id: "payment-flow",
      name: "Payment Processing",
      description: "Handle payments with Stripe, PayPal integration",
      category: "Finance",
      complexity: "High",
      apiVersions: ["v3.0", "v4.0"],
      nodes: 18,
      connections: 15,
      status: "Template",
      icon: Shield,
      color: "bg-green-500",
    },
    {
      id: "ai-content",
      name: "AI Content Generation",
      description: "Generate content using OpenAI, Claude APIs",
      category: "AI/ML",
      complexity: "Medium",
      apiVersions: ["v4.0"],
      nodes: 10,
      connections: 6,
      status: "Beta",
      icon: Zap,
      color: "bg-purple-500",
    },
    {
      id: "analytics-dashboard",
      name: "Analytics Dashboard",
      description: "Real-time analytics with Google Analytics, Mixpanel",
      category: "Analytics",
      complexity: "High",
      apiVersions: ["v3.0", "v4.0"],
      nodes: 22,
      connections: 18,
      status: "Template",
      icon: BarChart3,
      color: "bg-orange-500",
    },
  ]

  const recentIntegrations = [
    {
      id: "custom-1",
      name: "Investment Alerts",
      description: "Custom investment opportunity notifications",
      status: "Active",
      lastModified: "2 hours ago",
      apiVersion: "v3.0",
      performance: 99.2,
    },
    {
      id: "custom-2",
      name: "Partner Onboarding",
      description: "Automated partner registration workflow",
      status: "Testing",
      lastModified: "1 day ago",
      apiVersion: "v4.0",
      performance: 97.8,
    },
    {
      id: "custom-3",
      name: "Elite Member Sync",
      description: "Sync elite member data across platforms",
      status: "Draft",
      lastModified: "3 days ago",
      apiVersion: "v3.0",
      performance: null,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AsymmetricLogo className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold text-white">Integration Builder</h1>
                <p className="text-purple-200">Visual tool for building custom integrations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-purple-400 text-purple-300">
                <Crown className="w-3 h-3 mr-1" />
                Founder Access
              </Badge>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Integration
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-black/20 backdrop-blur-sm">
            <TabsTrigger value="builder" className="data-[state=active]:bg-purple-600">
              <Workflow className="w-4 h-4 mr-2" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-purple-600">
              <Layers className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="code" className="data-[state=active]:bg-purple-600">
              <Code className="w-4 h-4 mr-2" />
              Code
            </TabsTrigger>
            <TabsTrigger value="testing" className="data-[state=active]:bg-purple-600">
              <Play className="w-4 h-4 mr-2" />
              Testing
            </TabsTrigger>
            <TabsTrigger value="deploy" className="data-[state=active]:bg-purple-600">
              <Cloud className="w-4 h-4 mr-2" />
              Deploy
            </TabsTrigger>
            <TabsTrigger value="monitor" className="data-[state=active]:bg-purple-600">
              <Monitor className="w-4 h-4 mr-2" />
              Monitor
            </TabsTrigger>
          </TabsList>

          {/* Builder Tab */}
          <TabsContent value="builder" className="space-y-6">
            <div className="grid grid-cols-12 gap-6 h-[800px]">
              {/* Node Library */}
              <div className="col-span-3">
                <NodeLibrary />
              </div>

              {/* Canvas */}
              <div className="col-span-6">
                <IntegrationCanvas />
              </div>

              {/* Properties Panel */}
              <div className="col-span-3">
                <IntegrationPreview />
              </div>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template Gallery */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Integration Templates</h2>
                  <Button variant="outline" className="border-purple-400 text-purple-300">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Template
                  </Button>
                </div>

                <div className="grid gap-4">
                  {integrationTemplates.map((template) => {
                    const IconComponent = template.icon
                    return (
                      <Card
                        key={template.id}
                        className="bg-black/40 border-white/10 hover:border-purple-400/50 transition-all cursor-pointer"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${template.color}`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-white">{template.name}</h3>
                                <p className="text-sm text-gray-400">{template.description}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="border-green-400 text-green-300">
                              {template.status}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                            <span>Category: {template.category}</span>
                            <span>Complexity: {template.complexity}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>{template.nodes} nodes</span>
                              <span>{template.connections} connections</span>
                            </div>
                            <div className="flex gap-2">
                              {template.apiVersions.map((version) => (
                                <Badge key={version} variant="secondary" className="text-xs">
                                  {version}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                              Use Template
                            </Button>
                            <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
                              Preview
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Recent Integrations */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Recent Integrations</h2>

                <div className="grid gap-4">
                  {recentIntegrations.map((integration) => (
                    <Card
                      key={integration.id}
                      className="bg-black/40 border-white/10 hover:border-purple-400/50 transition-all"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-white">{integration.name}</h3>
                            <p className="text-sm text-gray-400">{integration.description}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              integration.status === "Active"
                                ? "border-green-400 text-green-300"
                                : integration.status === "Testing"
                                  ? "border-yellow-400 text-yellow-300"
                                  : "border-gray-400 text-gray-300"
                            }
                          >
                            {integration.status}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <span>Modified: {integration.lastModified}</span>
                          <span>API: {integration.apiVersion}</span>
                        </div>

                        {integration.performance && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-400">Performance</span>
                              <span className="text-green-300">{integration.performance}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${integration.performance}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
                            Clone
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code">
            <CodeGenerator />
          </TabsContent>

          {/* Testing Tab */}
          <TabsContent value="testing">
            <TestingEnvironment />
          </TabsContent>

          {/* Deploy Tab */}
          <TabsContent value="deploy">
            <DeploymentManager />
          </TabsContent>

          {/* Monitor Tab */}
          <TabsContent value="monitor">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Integration Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Success Rate</span>
                      <span className="text-green-300 font-semibold">99.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Avg Response Time</span>
                      <span className="text-blue-300 font-semibold">145ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Daily Executions</span>
                      <span className="text-purple-300 font-semibold">2.4M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Error Rate</span>
                      <span className="text-red-300 font-semibold">0.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Usage Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Active Integrations</span>
                      <span className="text-green-300 font-semibold">47</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total API Calls</span>
                      <span className="text-blue-300 font-semibold">12.8M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Data Processed</span>
                      <span className="text-purple-300 font-semibold">2.1TB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Cost Savings</span>
                      <span className="text-green-300 font-semibold">$45K/mo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
