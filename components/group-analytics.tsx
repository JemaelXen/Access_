"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Target, Star, Trophy, ArrowUp, ArrowDown } from "lucide-react"

interface GroupAnalyticsProps {
  selectedGroup: string
  groupData: any
}

export function GroupAnalytics({ selectedGroup, groupData }: GroupAnalyticsProps) {
  const analyticsData = {
    performanceDistribution: [
      { range: "90-100", count: 2, percentage: 16.7, color: "bg-green-500" },
      { range: "80-89", count: 4, percentage: 33.3, color: "bg-blue-500" },
      { range: "70-79", count: 3, percentage: 25.0, color: "bg-yellow-500" },
      { range: "60-69", count: 2, percentage: 16.7, color: "bg-orange-500" },
      { range: "50-59", count: 1, percentage: 8.3, color: "bg-red-500" },
    ],
    metricTrends: [
      {
        metric: "Response Time",
        trend: -8.5,
        groupAvg: "178ms",
        yourValue: "145ms",
        bestInGroup: "132ms",
        worstInGroup: "245ms",
        improvement: "Improving",
      },
      {
        metric: "Success Rate",
        trend: 1.2,
        groupAvg: "98.7%",
        yourValue: "99.2%",
        bestInGroup: "99.5%",
        worstInGroup: "97.1%",
        improvement: "Stable",
      },
      {
        metric: "Uptime",
        trend: 0.3,
        groupAvg: "99.84%",
        yourValue: "99.97%",
        bestInGroup: "99.98%",
        worstInGroup: "99.45%",
        improvement: "Leading",
      },
      {
        metric: "Throughput",
        trend: 15.7,
        groupAvg: "1,987 req/s",
        yourValue: "2,847 req/s",
        bestInGroup: "3,124 req/s",
        worstInGroup: "892 req/s",
        improvement: "Strong",
      },
    ],
    competitiveGaps: [
      {
        area: "Response Time",
        yourPosition: 1,
        gap: "+19ms advantage",
        trend: "widening",
        impact: "high",
      },
      {
        area: "Developer Experience",
        yourPosition: 4,
        gap: "-2.3 points behind",
        trend: "narrowing",
        impact: "medium",
      },
      {
        area: "Security Score",
        yourPosition: 1,
        gap: "+6 points advantage",
        trend: "stable",
        impact: "high",
      },
      {
        area: "Documentation Quality",
        yourPosition: 3,
        gap: "-1.8 points behind",
        trend: "improving",
        impact: "medium",
      },
    ],
    growthMetrics: {
      customerGrowth: 23.4,
      revenueGrowth: 28.7,
      marketShareGrowth: 2.1,
      employeeGrowth: 15.8,
    },
    benchmarkHistory: [
      { quarter: "Q1 2024", score: 82, rank: 2 },
      { quarter: "Q2 2024", score: 84, rank: 1 },
      { quarter: "Q3 2024", score: 86, rank: 1 },
      { quarter: "Q4 2024", score: 87, rank: 1 },
    ],
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="w-3 h-3 text-green-400" />
    if (trend < 0) return <ArrowDown className="w-3 h-3 text-red-400" />
    return <span className="w-3 h-3 text-gray-400">—</span>
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "border-red-400 text-red-300 bg-red-500/10"
      case "medium":
        return "border-yellow-400 text-yellow-300 bg-yellow-500/10"
      case "low":
        return "border-green-400 text-green-300 bg-green-500/10"
      default:
        return "border-gray-400 text-gray-300 bg-gray-500/10"
    }
  }

  const getPositionColor = (position: number) => {
    if (position === 1) return "text-yellow-300"
    if (position <= 3) return "text-green-300"
    if (position <= 5) return "text-blue-300"
    return "text-gray-300"
  }

  return (
    <div className="space-y-6">
      {/* Performance Distribution */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Group Performance Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.performanceDistribution.map((range, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm text-gray-300">{range.range}</div>
                <div className="flex-1 bg-gray-700 rounded-full h-6 relative">
                  <div
                    className={`${range.color} h-6 rounded-full flex items-center justify-end pr-2`}
                    style={{ width: `${range.percentage}%` }}
                  >
                    <span className="text-white text-xs font-medium">{range.count}</span>
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-300 text-right">{range.percentage}%</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-sm text-purple-300">
              <Star className="w-4 h-4 inline mr-1" />
              You're in the top 17% of performers in this peer group
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Metric Trends */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Group Metric Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {analyticsData.metricTrends.map((metric, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">{metric.metric}</h3>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(metric.trend)}
                    <span
                      className={`text-sm font-medium ${metric.trend > 0 ? "text-green-300" : metric.trend < 0 ? "text-red-300" : "text-gray-300"}`}
                    >
                      {metric.trend > 0 ? "+" : ""}
                      {metric.trend}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Value:</span>
                    <span className="text-purple-300 font-medium">{metric.yourValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Group Average:</span>
                    <span className="text-gray-300">{metric.groupAvg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Best in Group:</span>
                    <span className="text-green-300">{metric.bestInGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Worst in Group:</span>
                    <span className="text-red-300">{metric.worstInGroup}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10">
                  <Badge
                    className={
                      metric.improvement === "Leading"
                        ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                        : metric.improvement === "Strong"
                          ? "bg-green-500/20 border-green-400 text-green-300"
                          : metric.improvement === "Improving"
                            ? "bg-blue-500/20 border-blue-400 text-blue-300"
                            : "bg-gray-500/20 border-gray-400 text-gray-300"
                    }
                  >
                    {metric.improvement}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Gaps */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Competitive Gap Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.competitiveGaps.map((gap, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${getPositionColor(gap.yourPosition)}`}
                    >
                      #{gap.yourPosition}
                    </div>
                    <h3 className="font-medium text-white">{gap.area}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getImpactColor(gap.impact)}>{gap.impact} impact</Badge>
                    <Badge
                      variant="outline"
                      className={
                        gap.trend === "widening"
                          ? "border-green-400 text-green-300"
                          : gap.trend === "narrowing"
                            ? "border-red-400 text-red-300"
                            : gap.trend === "improving"
                              ? "border-blue-400 text-blue-300"
                              : "border-gray-400 text-gray-300"
                      }
                    >
                      {gap.trend}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Gap:</span>
                  <span className={`text-sm font-medium ${gap.gap.includes("+") ? "text-green-300" : "text-red-300"}`}>
                    {gap.gap}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Growth Metrics vs Peers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <span className="text-gray-300">Customer Growth</span>
                <div className="text-right">
                  <p className="text-green-300 font-medium">+{analyticsData.growthMetrics.customerGrowth}%</p>
                  <p className="text-xs text-gray-400">vs +18.2% group avg</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <span className="text-gray-300">Revenue Growth</span>
                <div className="text-right">
                  <p className="text-green-300 font-medium">+{analyticsData.growthMetrics.revenueGrowth}%</p>
                  <p className="text-xs text-gray-400">vs +21.5% group avg</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <span className="text-gray-300">Market Share Growth</span>
                <div className="text-right">
                  <p className="text-blue-300 font-medium">+{analyticsData.growthMetrics.marketShareGrowth}%</p>
                  <p className="text-xs text-gray-400">vs +1.8% group avg</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <span className="text-gray-300">Employee Growth</span>
                <div className="text-right">
                  <p className="text-blue-300 font-medium">+{analyticsData.growthMetrics.employeeGrowth}%</p>
                  <p className="text-xs text-gray-400">vs +19.3% group avg</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Benchmark History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.benchmarkHistory.map((period, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-gray-300">{period.quarter}</span>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-white font-medium">{period.score}/100</p>
                      <p className="text-xs text-gray-400">Score</p>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        period.rank === 1
                          ? "bg-yellow-500/20 text-yellow-300"
                          : period.rank === 2
                            ? "bg-gray-400/20 text-gray-300"
                            : "bg-orange-500/20 text-orange-300"
                      }`}
                    >
                      #{period.rank}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm text-green-300">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Consistent #1 ranking for 3 consecutive quarters
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5" />
            Key Analytics Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-green-300">Strengths</h4>
              <div className="space-y-2">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-300 font-medium">Performance Leadership</p>
                  <p className="text-xs text-gray-300">Consistently outperforming peer group average by 8.5 points</p>
                </div>
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-300 font-medium">Growth Trajectory</p>
                  <p className="text-xs text-gray-300">23.4% customer growth vs 18.2% peer group average</p>
                </div>
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-300 font-medium">Market Position</p>
                  <p className="text-xs text-gray-300">Maintained #1 ranking for 3 consecutive quarters</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-blue-300">Opportunities</h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-300 font-medium">Developer Experience</p>
                  <p className="text-xs text-gray-300">Currently ranked #4 in group - opportunity for improvement</p>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-300 font-medium">Documentation Quality</p>
                  <p className="text-xs text-gray-300">1.8 points behind group leader - quick win potential</p>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-300 font-medium">Market Share Growth</p>
                  <p className="text-xs text-gray-300">Slightly above average but room for acceleration</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
