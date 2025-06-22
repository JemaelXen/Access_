"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Target, Star, Crown, AlertTriangle, CheckCircle } from "lucide-react"

interface VerticalOverviewProps {
  vertical: any
  verticalKey: string
}

export function VerticalOverview({ vertical, verticalKey }: VerticalOverviewProps) {
  const getRankColor = (rank: number | string) => {
    if (rank === "N/A") return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    if (rank === 1) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    if (rank === 2) return "bg-gray-400/20 text-gray-300 border-gray-400/30"
    if (rank === 3) return "bg-orange-500/20 text-orange-300 border-orange-500/30"
    return "bg-gray-600/20 text-gray-400 border-gray-600/30"
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-300"
    if (score >= 75) return "text-blue-300"
    if (score >= 65) return "text-yellow-300"
    return "text-red-300"
  }

  const isParticipating = vertical.yourRank !== "N/A"

  return (
    <div className="space-y-6">
      {/* Vertical Header */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {vertical.icon}
              <div>
                <CardTitle className="text-white">{vertical.name}</CardTitle>
                <p className="text-gray-300 mt-1">{vertical.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isParticipating ? (
                <Badge className="bg-green-500/20 border-green-400 text-green-300">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Participating
                </Badge>
              ) : (
                <Badge className="bg-gray-500/20 border-gray-400 text-gray-300">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Not Participating
                </Badge>
              )}
              <Badge variant="outline" className="border-purple-400 text-purple-300">
                {vertical.totalCompanies} companies
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-gray-400">Your Rank</p>
              <div
                className={`w-8 h-8 rounded border mx-auto flex items-center justify-center ${getRankColor(vertical.yourRank)}`}
              >
                {vertical.yourRank === "N/A" ? "-" : vertical.yourRank}
              </div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-gray-400">Avg Score</p>
              <p className={`text-lg font-bold ${getScoreColor(vertical.avgScore)}`}>{vertical.avgScore}</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-gray-400">Growth Rate</p>
              <p className="text-lg font-bold text-green-300">+{vertical.growthRate}%</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-gray-400">Sub-verticals</p>
              <p className="text-lg font-bold text-white">{vertical.subVerticals.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sub-verticals */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Sub-vertical Breakdown
            </CardTitle>
            {!isParticipating && (
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Star className="w-4 h-4 mr-2" />
                Join {vertical.name}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vertical.subVerticals.map((subVertical: any, index: number) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{subVertical.name}</h3>
                    <p className="text-sm text-gray-400">{subVertical.companies} companies</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getRankColor(subVertical.yourRank)}>
                      {subVertical.yourRank === "N/A" ? "Not Participating" : `#${subVertical.yourRank}`}
                    </Badge>
                    <Badge variant="outline" className="border-blue-400 text-blue-300">
                      {subVertical.avgScore}/100
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-300 mb-2">Key Metrics</h4>
                    <div className="flex flex-wrap gap-1">
                      {subVertical.keyMetrics.map((metric: string, metricIndex: number) => (
                        <Badge key={metricIndex} variant="secondary" className="text-xs">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-orange-300 mb-2">Key Challenges</h4>
                    <div className="flex flex-wrap gap-1">
                      {subVertical.challenges.map((challenge: string, challengeIndex: number) => (
                        <Badge
                          key={challengeIndex}
                          variant="outline"
                          className="text-xs border-orange-400 text-orange-300"
                        >
                          {challenge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-yellow-300 mb-2">Market Leaders</h4>
                  <div className="flex items-center gap-2">
                    {subVertical.leaders.map((leader: string, leaderIndex: number) => (
                      <Badge
                        key={leaderIndex}
                        className={
                          leader === "Your Platform"
                            ? "bg-purple-500/20 border-purple-400 text-purple-300"
                            : "bg-gray-600/20 border-gray-400 text-gray-300"
                        }
                      >
                        {leader === "Your Platform" && <Crown className="w-3 h-3 mr-1" />}
                        {leader}
                      </Badge>
                    ))}
                  </div>
                </div>

                {subVertical.yourRank !== "N/A" && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="border-blue-400 text-blue-300">
                      View Detailed Metrics
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-400 text-green-300">
                      Compare with Leaders
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Performance Metrics */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Industry Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-gray-400">Response Time</p>
              <p className="text-sm font-medium text-white">{vertical.industryMetrics.avgResponseTime}</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-gray-400">Uptime</p>
              <p className="text-sm font-medium text-white">{vertical.industryMetrics.avgUptime}</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-gray-400">Throughput</p>
              <p className="text-sm font-medium text-white">{vertical.industryMetrics.avgThroughput}</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-gray-400">Error Rate</p>
              <p className="text-sm font-medium text-white">{vertical.industryMetrics.avgErrorRate}</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-gray-400">Security Score</p>
              <p className="text-sm font-medium text-white">{vertical.industryMetrics.avgSecurityScore}</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-gray-400">Compliance</p>
              <p className="text-sm font-medium text-white">{vertical.industryMetrics.avgComplianceScore}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Trends Preview */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5" />
              Key Market Trends
            </CardTitle>
            <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
              View All Trends
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(vertical.marketTrends)
              .slice(0, 3)
              .map(([trend, data]: [string, any]) => (
                <div key={trend} className="p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white capitalize">{trend.replace(/([A-Z])/g, " $1").trim()}</h4>
                    <Badge
                      className={
                        data.impact === "High"
                          ? "bg-red-500/20 border-red-400 text-red-300"
                          : data.impact === "Medium"
                            ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                            : "bg-green-500/20 border-green-400 text-green-300"
                      }
                    >
                      {data.impact}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-green-300">+{data.growth}%</p>
                  <p className="text-xs text-gray-400">Growth Rate</p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
