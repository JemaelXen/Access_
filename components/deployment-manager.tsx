"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Rocket,
  Monitor,
  Globe,
  CheckCircle,
  AlertTriangle,
  Clock,
  GitBranch,
  Server,
  Download,
  RefreshCw,
} from "lucide-react"

export function DeploymentManager() {
  const [selectedEnvironment, setSelectedEnvironment] = useState("production")
  const [isDeploying, setIsDeploying] = useState(false)

  const environments = [
    {
      id: "development",
      name: "Development",
      url: "https://dev-api.projectaccess.co",
      status: "active",
      version: "v4.0.0-dev.123",
      lastDeployed: "2 hours ago",
      health: 98.5,
      requests: "1.2K/day",
    },
    {
      id: "staging",
      name: "Staging",
      url: "https://staging-api.projectaccess.co",
      status: "active",
      version: "v3.2.1",
      lastDeployed: "1 day ago",
      health: 99.1,
      requests: "45K/day",
    },
    {
      id: "production",
      name: "Production",
      url: "https://api.projectaccess.co",
      status: "active",
      version: "v3.2.0",
      lastDeployed: "3 days ago",
      health: 99.7,
      requests: "2.4M/day",
    },
  ]

  const deploymentHistory = [
    {
      id: "1",
      version: "v3.2.1",
      environment: "Production",
      status: "success",
      timestamp: "2024-01-12 09:15:30",
      duration: "4m 32s",
      deployedBy: "Jemael Xenn (Founder)",
      changes: ["Added new webhook validation", "Performance improvements", "Bug fixes"],
    },
    {
      id: "2",
      version: "v3.2.0",
      environment: "Production",
      status: "success",
      timestamp: "2024-01-10 14:22:15",
      duration: "3m 45s",
      deployedBy: "Auto Deploy",
      changes: ["New integration templates", "Enhanced error handling"],
    },
    {
      id: "3",
      version: "v3.1.9",
      environment: "Production",
      status: "rollback",
      timestamp: "2024-01-08 11:30:45",
      duration: "1m 12s",
      deployedBy: "Emergency Rollback",
      changes: ["Reverted breaking changes"],
    },
  ]

  const deploymentMetrics = {
    totalDeployments: 247,
    successRate: 98.4,
    avgDeployTime: "3m 42s",
    uptime: 99.7,
    activeIntegrations: 47,
    dailyRequests: "2.4M",
  }

  const handleDeploy = async () => {
    setIsDeploying(true)
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false)
    }, 5000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-300"
      case "deploying":
        return "text-blue-300"
      case "error":
        return "text-red-300"
      default:
        return "text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "rollback":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "deploying":
        return <Clock className="w-4 h-4 text-blue-400 animate-spin" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-400" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Deployment Controls */}
      <div className="space-y-4">
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Deploy Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Target Environment</label>
              <select
                value={selectedEnvironment}
                onChange={(e) => setSelectedEnvironment(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
              >
                {environments.map((env) => (
                  <option key={env.id} value={env.id}>
                    {env.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Deployment Strategy</label>
              <select className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm">
                <option value="rolling">Rolling Deployment</option>
                <option value="blue-green">Blue-Green</option>
                <option value="canary">Canary Release</option>
                <option value="immediate">Immediate</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-white">
                <input type="checkbox" className="rounded" defaultChecked />
                Run pre-deployment tests
              </label>
              <label className="flex items-center gap-2 text-sm text-white">
                <input type="checkbox" className="rounded" defaultChecked />
                Enable health checks
              </label>
              <label className="flex items-center gap-2 text-sm text-white">
                <input type="checkbox" className="rounded" />
                Auto-rollback on failure
              </label>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleDeploy} disabled={isDeploying}>
              {isDeploying ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4 mr-2" />
                  Deploy to {environments.find((e) => e.id === selectedEnvironment)?.name}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Environment Status */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="w-5 h-5" />
              Environments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {environments.map((env) => (
              <div key={env.id} className="p-3 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{env.name}</h3>
                  <Badge variant="outline" className={`border-green-400 ${getStatusColor(env.status)}`}>
                    {env.status}
                  </Badge>
                </div>

                <div className="space-y-1 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="text-white">{env.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Health:</span>
                    <span className="text-green-300">{env.health}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Requests:</span>
                    <span className="text-purple-300">{env.requests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Deploy:</span>
                    <span>{env.lastDeployed}</span>
                  </div>
                </div>

                <div className="flex gap-1 mt-3">
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-white/70 hover:text-white">
                    <Globe className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-white/70 hover:text-white">
                    <Monitor className="w-3 h-3 mr-1" />
                    Logs
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Deployment History & Metrics */}
      <div className="lg:col-span-2 space-y-4">
        {/* Deployment Metrics */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Deployment Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-sm text-gray-400">Total Deployments</div>
                <div className="text-xl font-semibold text-white">{deploymentMetrics.totalDeployments}</div>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-sm text-gray-400">Success Rate</div>
                <div className="text-xl font-semibold text-green-300">{deploymentMetrics.successRate}%</div>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-sm text-gray-400">Avg Deploy Time</div>
                <div className="text-xl font-semibold text-blue-300">{deploymentMetrics.avgDeployTime}</div>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-sm text-gray-400">Uptime</div>
                <div className="text-xl font-semibold text-green-300">{deploymentMetrics.uptime}%</div>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-sm text-gray-400">Active Integrations</div>
                <div className="text-xl font-semibold text-purple-300">{deploymentMetrics.activeIntegrations}</div>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-sm text-gray-400">Daily Requests</div>
                <div className="text-xl font-semibold text-orange-300">{deploymentMetrics.dailyRequests}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment History */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Deployment History
              </CardTitle>
              <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {deploymentHistory.map((deployment) => (
                <div key={deployment.id} className="p-4 bg-black/20 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(deployment.status)}
                      <span className="font-medium text-white">{deployment.version}</span>
                      <Badge variant="secondary" className="text-xs">
                        {deployment.environment}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">{deployment.duration}</div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Deployed by:</span>
                      <span className="text-white">{deployment.deployedBy}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Timestamp:</span>
                      <span>{deployment.timestamp}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm text-gray-400 mb-1">Changes:</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {deployment.changes.map((change, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
