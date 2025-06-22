"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Plus, Edit, Trash2, Users, Target } from "lucide-react"

export function CustomGroups() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingGroup, setEditingGroup] = useState<string | null>(null)

  const customGroups = [
    {
      id: "custom-1",
      name: "High-Performance APIs",
      description: "Companies with sub-200ms response times and 99.9%+ uptime",
      criteria: {
        responseTime: "< 200ms",
        uptime: "> 99.9%",
        throughput: "> 1000 req/s",
        industry: "Any",
        size: "Any",
      },
      members: 8,
      yourRank: 1,
      avgScore: 84.2,
      created: "2024-01-15",
      lastUpdated: "2024-01-20",
      status: "active",
    },
    {
      id: "custom-2",
      name: "FinTech Unicorns",
      description: "Billion-dollar valuation financial technology companies",
      criteria: {
        industry: "FinTech",
        valuation: "> $1B",
        revenue: "> $100M",
        employees: "> 500",
        geography: "Global",
      },
      members: 15,
      yourRank: 3,
      avgScore: 79.8,
      created: "2024-01-10",
      lastUpdated: "2024-01-18",
      status: "active",
    },
    {
      id: "custom-3",
      name: "API-First Platforms",
      description: "Companies built with API-first architecture and developer focus",
      criteria: {
        architecture: "API-First",
        developerFocus: "High",
        sdkSupport: "> 5 languages",
        documentation: "Interactive",
        industry: "Cross-industry",
      },
      members: 22,
      yourRank: 2,
      avgScore: 81.5,
      created: "2024-01-05",
      lastUpdated: "2024-01-22",
      status: "active",
    },
    {
      id: "custom-4",
      name: "Compliance Leaders",
      description: "Companies with strong regulatory compliance and security standards",
      criteria: {
        compliance: "SOC 2 Type II",
        security: "> 90/100",
        certifications: "Multiple",
        industry: "Regulated",
        auditFreq: "Annual",
      },
      members: 12,
      yourRank: 1,
      avgScore: 88.3,
      created: "2023-12-20",
      lastUpdated: "2024-01-15",
      status: "active",
    },
  ]

  const groupTemplates = [
    {
      name: "Industry Leaders",
      description: "Top 10 companies in specific industry verticals",
      criteria: ["Industry vertical", "Market share", "Revenue", "Growth rate"],
      estimatedMembers: "8-12",
    },
    {
      name: "Growth Stage Peers",
      description: "Companies in similar growth stages and funding rounds",
      criteria: ["Funding stage", "Employee count", "Revenue range", "Growth metrics"],
      estimatedMembers: "15-25",
    },
    {
      name: "Technology Stack Peers",
      description: "Companies using similar technology architectures",
      criteria: ["Tech stack", "Architecture", "Cloud provider", "Development practices"],
      estimatedMembers: "20-30",
    },
    {
      name: "Performance Tier",
      description: "Companies with similar performance characteristics",
      criteria: ["Response time", "Uptime", "Throughput", "Error rates"],
      estimatedMembers: "10-15",
    },
  ]

  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    criteria: {
      industry: "",
      size: "",
      revenue: "",
      techStack: "",
      geography: "",
      customMetrics: [],
    },
  })

  const handleCreateGroup = () => {
    // Handle group creation logic
    setShowCreateForm(false)
    setNewGroup({
      name: "",
      description: "",
      criteria: {
        industry: "",
        size: "",
        revenue: "",
        techStack: "",
        geography: "",
        customMetrics: [],
      },
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-green-400 text-green-300 bg-green-500/10"
      case "inactive":
        return "border-gray-400 text-gray-300 bg-gray-500/10"
      case "draft":
        return "border-yellow-400 text-yellow-300 bg-yellow-500/10"
      default:
        return "border-gray-400 text-gray-300 bg-gray-500/10"
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case 2:
        return "bg-gray-400/20 text-gray-300 border-gray-400/30"
      case 3:
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Custom Peer Groups</h2>
          <p className="text-gray-400">Create and manage your own peer comparison groups</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Create Group Form */}
      {showCreateForm && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Custom Peer Group
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Group Name</label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white"
                    placeholder="Enter group name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <input
                    type="text"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white"
                    placeholder="Brief description of the group"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                  <select
                    value={newGroup.criteria.industry}
                    onChange={(e) =>
                      setNewGroup({
                        ...newGroup,
                        criteria: { ...newGroup.criteria, industry: e.target.value },
                      })
                    }
                    className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white"
                  >
                    <option value="">Any Industry</option>
                    <option value="fintech">FinTech</option>
                    <option value="saas">SaaS</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="healthcare">Healthcare</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company Size</label>
                  <select
                    value={newGroup.criteria.size}
                    onChange={(e) =>
                      setNewGroup({
                        ...newGroup,
                        criteria: { ...newGroup.criteria, size: e.target.value },
                      })
                    }
                    className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white"
                  >
                    <option value="">Any Size</option>
                    <option value="startup">Startup (1-100)</option>
                    <option value="growth">Growth (100-1000)</option>
                    <option value="enterprise">Enterprise (1000+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Revenue Range</label>
                  <select
                    value={newGroup.criteria.revenue}
                    onChange={(e) =>
                      setNewGroup({
                        ...newGroup,
                        criteria: { ...newGroup.criteria, revenue: e.target.value },
                      })
                    }
                    className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white"
                  >
                    <option value="">Any Revenue</option>
                    <option value="1m-10m">$1M-$10M</option>
                    <option value="10m-100m">$10M-$100M</option>
                    <option value="100m+">$100M+</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="border-gray-400 text-gray-300"
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateGroup} className="bg-purple-600 hover:bg-purple-700">
                  Create Group
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Custom Groups */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Your Custom Groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {customGroups.map((group) => (
              <div key={group.id} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{group.name}</h3>
                    <p className="text-sm text-gray-400">Created {group.created}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(group.status)}>{group.status}</Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingGroup(group.id)}
                        className="border-blue-400 text-blue-300 p-1"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-400 text-red-300 p-1">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3">{group.description}</p>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-xs text-gray-400">Members</p>
                    <p className="font-medium text-white">{group.members}</p>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-xs text-gray-400">Your Rank</p>
                    <div
                      className={`w-6 h-6 rounded border mx-auto flex items-center justify-center text-xs ${getRankColor(group.yourRank)}`}
                    >
                      {group.yourRank}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-xs text-gray-400">Avg Score</p>
                    <p className="font-medium text-white">{group.avgScore}</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  {Object.entries(group.criteria).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                      <span className="text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1 border-purple-400 text-purple-300">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-blue-400 text-blue-300">
                    Compare
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Group Templates */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Quick Start Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupTemplates.map((template, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h3 className="font-medium text-white mb-2">{template.name}</h3>
                <p className="text-sm text-gray-300 mb-3">{template.description}</p>

                <div className="mb-3">
                  <p className="text-xs text-blue-300 mb-2">Matching Criteria</p>
                  <div className="flex flex-wrap gap-1">
                    {template.criteria.map((criterion, criterionIndex) => (
                      <Badge key={criterionIndex} variant="secondary" className="text-xs">
                        {criterion}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400">Estimated Members:</span>
                  <span className="text-xs text-gray-300">{template.estimatedMembers}</span>
                </div>

                <Button size="sm" variant="outline" className="w-full border-purple-400 text-purple-300">
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Advanced Group Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">Auto-Update Settings</h4>
              <div className="space-y-3">
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-300">Auto-refresh member list monthly</span>
                  </label>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-300">Notify when new matches found</span>
                  </label>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-300">Auto-remove inactive companies</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-white mb-3">Sharing & Privacy</h4>
              <div className="space-y-3">
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-300">Make groups public</span>
                  </label>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-300">Allow group invitations</span>
                  </label>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-300">Export group data</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="border-gray-400 text-gray-300">
              Reset to Defaults
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
