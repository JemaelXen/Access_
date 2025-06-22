"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp, Users, Target, Star, Crown, Building, DollarSign, Code, Globe } from "lucide-react"

interface PeerGroupOverviewProps {
  group: any
  groupKey: string
  onGroupChange: (key: string) => void
}

export function PeerGroupOverview({ group, groupKey, onGroupChange }: PeerGroupOverviewProps) {
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

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-300"
    if (score >= 75) return "text-blue-300"
    if (score >= 65) return "text-yellow-300"
    return "text-red-300"
  }

  return (
    <div className="space-y-6">
      {/* Group Header */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                {group.name}
              </CardTitle>
              <p className="text-gray-300 mt-1">{group.description}</p>
            </div>
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
                  <Trophy className="w-3 h-3 mr-1" />
                  Rank #{group.yourRank}
                </Badge>
              )}
              <Badge variant="outline" className="border-purple-400 text-purple-300">
                {group.members} members
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
              <Building className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Company Size</p>
                <p className="text-sm text-white">{group.criteria.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
              <DollarSign className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">Revenue Range</p>
                <p className="text-sm text-white">{group.criteria.revenue}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
              <Code className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">Tech Stack</p>
                <p className="text-sm text-white">{group.criteria.techStack}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
              <Globe className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-xs text-gray-400">Geography</p>
                <p className="text-sm text-white">{group.criteria.geography}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Group Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Group Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">{group.avgScore}</p>
                <p className="text-sm text-gray-400">Average Score</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Your Score:</span>
                  <span className="text-purple-300 font-medium">87/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Above Average:</span>
                  <span className="text-green-300 font-medium">+8.5 points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Percentile:</span>
                  <span className="text-yellow-300 font-medium">92nd</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Group Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Avg Score Change</span>
                  <span className="text-green-300">+{group.trends.avgScoreChange}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Industry Growth</span>
                  <span className="text-blue-300">+{group.trends.industryGrowth}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">New Entrants</span>
                  <span className="text-purple-300">{group.trends.newEntrants} companies</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5" />
              Your Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
                <p className="font-semibold text-white">Group Leader</p>
                <p className="text-sm text-gray-400">Top performer in {group.name}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Lead Margin:</span>
                  <span className="text-green-300">+3 points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Consistency:</span>
                  <span className="text-blue-300">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Trend:</span>
                  <span className="text-green-300">Improving</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peer Companies */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Peer Company Rankings
            </CardTitle>
            <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
              View All {group.members}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {group.companies?.map((company: any, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  company.isYou ? "bg-purple-500/10 border-purple-500/30" : "bg-black/20 border-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg border flex items-center justify-center ${getRankColor(company.rank)}`}
                    >
                      {company.rank}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{company.logo}</span>
                        <h3 className={`font-semibold ${company.isYou ? "text-purple-300" : "text-white"}`}>
                          {company.name}
                        </h3>
                        {company.isYou && (
                          <Badge className="bg-purple-500/20 border-purple-400 text-purple-300">
                            <Crown className="w-3 h-3 mr-1" />
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {company.employees} employees • {company.revenue} revenue • Founded {company.founded}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${getScoreColor(company.score)}`}>{company.score}</p>
                    <p className="text-sm text-gray-400">Score</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-gray-400 text-xs">Response Time</p>
                    <p className="text-white font-medium">{company.metrics.responseTime}</p>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-gray-400 text-xs">Uptime</p>
                    <p className="text-white font-medium">{company.metrics.uptime}</p>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-gray-400 text-xs">Throughput</p>
                    <p className="text-white font-medium">{company.metrics.throughput}</p>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-gray-400 text-xs">Error Rate</p>
                    <p className="text-white font-medium">{company.metrics.errorRate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
