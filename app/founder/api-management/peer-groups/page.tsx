"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AsymmetricLogo } from "@/components/asymmetric-logo"
import {
  Users,
  Target,
  TrendingUp,
  Filter,
  Plus,
  Settings,
  Crown,
  Star,
  Building,
  Code,
  DollarSign,
  Globe,
  Zap,
  Shield,
  RefreshCw,
} from "lucide-react"
import { PeerGroupOverview } from "@/components/peer-group-overview"
import { PeerMatching } from "@/components/peer-matching"
import { GroupAnalytics } from "@/components/group-analytics"
import { CustomGroups } from "@/components/custom-groups"
import { PeerComparison } from "@/components/peer-comparison"

export default function PeerGroupsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedGroup, setSelectedGroup] = useState("fintech-enterprise")

  const peerGroups = {
    "fintech-enterprise": {
      name: "FinTech Enterprise",
      description: "Large-scale financial technology platforms",
      criteria: {
        industry: "Financial Technology",
        size: "Enterprise (1000+ employees)",
        revenue: "$100M+ ARR",
        techStack: "Cloud-native, Microservices",
        geography: "Global",
      },
      members: 12,
      yourRank: 1,
      avgScore: 78.5,
      companies: [
        {
          name: "Your Platform",
          score: 87,
          rank: 1,
          isYou: true,
          metrics: {
            responseTime: "145ms",
            uptime: "99.97%",
            throughput: "2,847 req/s",
            errorRate: "0.8%",
          },
          logo: "🚀",
          employees: "1,200+",
          revenue: "$150M",
          founded: 2018,
        },
        {
          name: "PayFlow Systems",
          score: 84,
          rank: 2,
          isYou: false,
          metrics: {
            responseTime: "167ms",
            uptime: "99.89%",
            throughput: "2,234 req/s",
            errorRate: "1.2%",
          },
          logo: "💳",
          employees: "1,800+",
          revenue: "$200M",
          founded: 2015,
        },
        {
          name: "FinanceCore",
          score: 81,
          rank: 3,
          isYou: false,
          metrics: {
            responseTime: "189ms",
            uptime: "99.82%",
            throughput: "1,987 req/s",
            errorRate: "1.5%",
          },
          logo: "🏦",
          employees: "2,200+",
          revenue: "$180M",
          founded: 2014,
        },
        {
          name: "TradeTech Pro",
          score: 79,
          rank: 4,
          isYou: false,
          metrics: {
            responseTime: "203ms",
            uptime: "99.76%",
            throughput: "1,756 req/s",
            errorRate: "1.8%",
          },
          logo: "📈",
          employees: "1,500+",
          revenue: "$120M",
          founded: 2016,
        },
      ],
      trends: {
        avgScoreChange: 2.3,
        topPerformerChange: 1.8,
        industryGrowth: 15.7,
        newEntrants: 2,
      },
    },
    "fintech-growth": {
      name: "FinTech Growth",
      description: "Mid-stage financial technology companies",
      criteria: {
        industry: "Financial Technology",
        size: "Growth (100-1000 employees)",
        revenue: "$10M-$100M ARR",
        techStack: "Modern APIs, Cloud-first",
        geography: "North America",
      },
      members: 18,
      yourRank: "N/A",
      avgScore: 72.1,
      companies: [],
      trends: {
        avgScoreChange: 3.8,
        topPerformerChange: 2.9,
        industryGrowth: 28.4,
        newEntrants: 5,
      },
    },
    "api-first-platforms": {
      name: "API-First Platforms",
      description: "Companies with API-first architecture across industries",
      criteria: {
        industry: "Cross-industry",
        size: "Enterprise",
        revenue: "$50M+ ARR",
        techStack: "API-first, Developer-focused",
        geography: "Global",
      },
      members: 24,
      yourRank: 2,
      avgScore: 81.2,
      companies: [],
      trends: {
        avgScoreChange: 1.9,
        topPerformerChange: 2.1,
        industryGrowth: 22.3,
        newEntrants: 3,
      },
    },
    "high-volume-apis": {
      name: "High-Volume APIs",
      description: "Platforms handling 1M+ requests per day",
      criteria: {
        industry: "Cross-industry",
        size: "Any",
        revenue: "Any",
        techStack: "High-performance, Scalable",
        geography: "Global",
      },
      members: 31,
      yourRank: 1,
      avgScore: 76.8,
      companies: [],
      trends: {
        avgScoreChange: 2.7,
        topPerformerChange: 1.5,
        industryGrowth: 19.8,
        newEntrants: 4,
      },
    },
  }

  const suggestedGroups = [
    {
      name: "B2B SaaS Integrations",
      match: 89,
      reason: "Similar integration patterns and customer base",
      members: 16,
      avgScore: 79.3,
      criteria: ["B2B focus", "SaaS model", "Integration-heavy"],
    },
    {
      name: "Real-time Processing",
      match: 85,
      reason: "Low-latency requirements and real-time capabilities",
      members: 22,
      avgScore: 82.1,
      criteria: ["<200ms response", "Real-time data", "High throughput"],
    },
    {
      name: "Compliance-Heavy Industries",
      match: 82,
      reason: "Similar regulatory and security requirements",
      members: 14,
      avgScore: 84.7,
      criteria: ["SOC 2", "GDPR", "Industry regulations"],
    },
  ]

  const groupMetrics = {
    totalGroups: 8,
    activeGroups: 4,
    avgGroupSize: 18.5,
    topRankings: 3,
    benchmarkCoverage: "94%",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AsymmetricLogo className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold text-white">Industry Peer Groups</h1>
                <p className="text-purple-200">Targeted comparisons with similar companies</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-purple-400 text-purple-300">
                <Crown className="w-3 h-3 mr-1" />
                Founder Access
              </Badge>
              <div className="flex items-center gap-2">
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
                >
                  {Object.entries(peerGroups).map(([key, group]) => (
                    <option key={key} value={key}>
                      {group.name}
                    </option>
                  ))}
                </select>
                <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Group
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{groupMetrics.totalGroups}</p>
              <p className="text-sm text-gray-400">Total Groups</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{groupMetrics.activeGroups}</p>
              <p className="text-sm text-gray-400">Active Groups</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{groupMetrics.avgGroupSize}</p>
              <p className="text-sm text-gray-400">Avg Group Size</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{groupMetrics.topRankings}</p>
              <p className="text-sm text-gray-400">#1 Rankings</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{groupMetrics.benchmarkCoverage}</p>
              <p className="text-sm text-gray-400">Coverage</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/20 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="matching" className="data-[state=active]:bg-purple-600">
              <Target className="w-4 h-4 mr-2" />
              Peer Matching
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-purple-600">
              <Filter className="w-4 h-4 mr-2" />
              Comparison
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-purple-600">
              <Settings className="w-4 h-4 mr-2" />
              Custom Groups
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Current Peer Groups */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Your Peer Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Object.entries(peerGroups).map(([key, group]) => (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedGroup === key
                          ? "bg-purple-500/10 border-purple-500/30"
                          : "bg-black/20 border-white/10 hover:border-white/20"
                      }`}
                      onClick={() => setSelectedGroup(key)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white">{group.name}</h3>
                        <div className="flex items-center gap-2">
                          {group.yourRank !== "N/A" && (
                            <Badge
                              className={
                                group.yourRank === 1
                                  ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                                  : group.yourRank <= 3
                                    ? "bg-green-500/20 border-green-400 text-green-300"
                                    : "bg-blue-500/20 border-blue-400 text-blue-300"
                              }
                            >
                              #{group.yourRank}
                            </Badge>
                          )}
                          <Badge variant="outline" className="border-gray-400 text-gray-300">
                            {group.members} members
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 mb-3">{group.description}</p>

                      <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                        <div className="flex items-center gap-2">
                          <Building className="w-3 h-3 text-blue-400" />
                          <span className="text-gray-400">{group.criteria.size}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-3 h-3 text-green-400" />
                          <span className="text-gray-400">{group.criteria.revenue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Code className="w-3 h-3 text-purple-400" />
                          <span className="text-gray-400">{group.criteria.techStack}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3 text-orange-400" />
                          <span className="text-gray-400">{group.criteria.geography}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div>
                          <p className="text-xs text-gray-400">Avg Score</p>
                          <p className="font-medium text-white">{group.avgScore}/100</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">Growth</p>
                          <p className="font-medium text-green-300">+{group.trends.industryGrowth}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Group Details */}
            {selectedGroup && (
              <PeerGroupOverview
                group={peerGroups[selectedGroup]}
                groupKey={selectedGroup}
                onGroupChange={setSelectedGroup}
              />
            )}

            {/* Suggested Groups */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Suggested Peer Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {suggestedGroups.map((suggestion, index) => (
                    <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-white">{suggestion.name}</h3>
                        <Badge className="bg-green-500/20 border-green-400 text-green-300">
                          {suggestion.match}% match
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-300 mb-3">{suggestion.reason}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Members:</span>
                          <span className="text-white">{suggestion.members}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Avg Score:</span>
                          <span className="text-white">{suggestion.avgScore}/100</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-blue-300 mb-2">Key Criteria</p>
                        <div className="flex flex-wrap gap-1">
                          {suggestion.criteria.map((criterion, criterionIndex) => (
                            <Badge key={criterionIndex} variant="secondary" className="text-xs">
                              {criterion}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button size="sm" variant="outline" className="w-full border-purple-400 text-purple-300">
                        Join Group
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Peer Matching Tab */}
          <TabsContent value="matching">
            <PeerMatching />
          </TabsContent>

          {/* Group Analytics Tab */}
          <TabsContent value="analytics">
            <GroupAnalytics selectedGroup={selectedGroup} groupData={peerGroups[selectedGroup]} />
          </TabsContent>

          {/* Peer Comparison Tab */}
          <TabsContent value="comparison">
            <PeerComparison selectedGroup={selectedGroup} groupData={peerGroups[selectedGroup]} />
          </TabsContent>

          {/* Custom Groups Tab */}
          <TabsContent value="custom">
            <CustomGroups />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
