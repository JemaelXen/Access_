"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Eye, Code, Play, Save, AlertTriangle, CheckCircle, Edit, Trash2, Copy, ExternalLink } from "lucide-react"

export function IntegrationPreview() {
  const [selectedNode, setSelectedNode] = useState("trigger-1")
  const [nodeConfig, setNodeConfig] = useState({
    name: "New Post Created",
    description: "Triggers when a new post is created",
    event: "post.created",
    filters: {
      userTier: "all",
      postType: "all",
      minFollowers: 0,
    },
    outputs: ["post_data", "user_data", "timestamp"],
  })

  const integrationStats = {
    totalNodes: 4,
    totalConnections: 3,
    estimatedExecutions: "2.4K/day",
    avgExecutionTime: "145ms",
    successRate: "99.2%",
    lastTested: "2 hours ago",
    status: "active",
  }

  const executionHistory = [
    {
      id: "1",
      timestamp: "2024-01-15 14:30:25",
      status: "success",
      duration: "142ms",
      trigger: "New Post Created",
      result: "Notification sent to 1,247 followers",
    },
    {
      id: "2",
      timestamp: "2024-01-15 14:28:15",
      status: "success",
      duration: "156ms",
      trigger: "New Post Created",
      result: "Analytics updated successfully",
    },
    {
      id: "3",
      timestamp: "2024-01-15 14:25:42",
      status: "warning",
      duration: "234ms",
      trigger: "New Post Created",
      result: "Rate limit approached (85%)",
    },
    {
      id: "4",
      timestamp: "2024-01-15 14:22:18",
      status: "success",
      duration: "138ms",
      trigger: "New Post Created",
      result: "Elite member notification sent",
    },
  ]

  return (
    <Card className="bg-black/40 border-white/10 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Integration Preview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 max-h-[700px] overflow-y-auto">
        {/* Integration Overview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Integration Overview</h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/20 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Nodes</div>
              <div className="text-xl font-semibold text-white">{integrationStats.totalNodes}</div>
            </div>
            <div className="bg-black/20 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Connections</div>
              <div className="text-xl font-semibold text-white">{integrationStats.totalConnections}</div>
            </div>
            <div className="bg-black/20 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Daily Executions</div>
              <div className="text-xl font-semibold text-purple-300">{integrationStats.estimatedExecutions}</div>
            </div>
            <div className="bg-black/20 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Success Rate</div>
              <div className="text-xl font-semibold text-green-300">{integrationStats.successRate}</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  integrationStats.status === "active"
                    ? "bg-green-400"
                    : integrationStats.status === "warning"
                      ? "bg-yellow-400"
                      : "bg-red-400"
                }`}
              />
              <span className="text-white font-medium">
                {integrationStats.status === "active"
                  ? "Active"
                  : integrationStats.status === "warning"
                    ? "Warning"
                    : "Error"}
              </span>
            </div>
            <span className="text-sm text-gray-400">Last tested: {integrationStats.lastTested}</span>
          </div>
        </div>

        {/* Node Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Node Configuration</h3>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Node Name</label>
              <Input
                value={nodeConfig.name}
                onChange={(e) => setNodeConfig((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-black/20 border-white/10 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Description</label>
              <Textarea
                value={nodeConfig.description}
                onChange={(e) => setNodeConfig((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-black/20 border-white/10 text-white resize-none"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Event Type</label>
              <select
                value={nodeConfig.event}
                onChange={(e) => setNodeConfig((prev) => ({ ...prev, event: e.target.value }))}
                className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
              >
                <option value="post.created">Post Created</option>
                <option value="post.updated">Post Updated</option>
                <option value="post.deleted">Post Deleted</option>
                <option value="user.followed">User Followed</option>
                <option value="user.unfollowed">User Unfollowed</option>
              </select>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-white">Filters</h4>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">User Tier</label>
                <select
                  value={nodeConfig.filters.userTier}
                  onChange={(e) =>
                    setNodeConfig((prev) => ({
                      ...prev,
                      filters: { ...prev.filters, userTier: e.target.value },
                    }))
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
                >
                  <option value="all">All Users</option>
                  <option value="elite">Elite Only</option>
                  <option value="partner">Partners Only</option>
                  <option value="regular">Regular Users</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Minimum Followers</label>
                <Input
                  type="number"
                  value={nodeConfig.filters.minFollowers}
                  onChange={(e) =>
                    setNodeConfig((prev) => ({
                      ...prev,
                      filters: { ...prev.filters, minFollowers: Number.parseInt(e.target.value) || 0 },
                    }))
                  }
                  className="bg-black/20 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Save className="w-4 h-4 mr-1" />
                Save Config
              </Button>
              <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
                <Play className="w-4 h-4 mr-1" />
                Test Node
              </Button>
            </div>
          </div>
        </div>

        {/* Execution History */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Recent Executions</h3>

          <div className="space-y-2">
            {executionHistory.map((execution) => (
              <div key={execution.id} className="p-3 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {execution.status === "success" ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : execution.status === "warning" ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-sm font-medium text-white">{execution.trigger}</span>
                  </div>
                  <span className="text-xs text-gray-400">{execution.duration}</span>
                </div>

                <p className="text-sm text-gray-300 mb-1">{execution.result}</p>
                <p className="text-xs text-gray-500">{execution.timestamp}</p>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full border-purple-400 text-purple-300">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Full History
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
              <Code className="w-4 h-4 mr-1" />
              View Code
            </Button>
            <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
              <Copy className="w-4 h-4 mr-1" />
              Duplicate
            </Button>
            <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="outline" className="border-red-400 text-red-300">
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
