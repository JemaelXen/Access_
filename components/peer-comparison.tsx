"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Trophy, TrendingUp, Star, Crown, ArrowUp, ArrowDown, Minus } from "lucide-react"

interface PeerComparisonProps {
  selectedGroup: string
  groupData: any
}

export function PeerComparison({ selectedGroup, groupData }: PeerComparisonProps) {
  const comparisonData = {
    headToHead: [
      {
        company: "Your Platform",
        isYou: true,
        metrics: {
          responseTime: { value: 145, unit: "ms", rank: 1, trend: "improving" },
          uptime: { value: 99.97, unit: "%", rank: 1, trend: "stable" },
          throughput: { value: 2847, unit: "req/s", rank: 1, trend: "improving" },
          errorRate: { value: 0.8, unit: "%", rank: 1, trend: "improving" },
          securityScore: { value: 94, unit: "/100", rank: 1, trend: "stable" },
          devExperience: { value: 81, unit: "/100", rank: 4, trend: "improving" },
        },
        overallScore: 87,
        rank: 1,
      },
      {
        company: "PayFlow Systems",
        isYou: false,
        metrics: {
          responseTime: { value: 167, unit: "ms", rank: 2, trend: "stable" },
          uptime: { value: 99.89, unit: "%", rank: 2, trend: "improving" },
          throughput: { value: 2234, unit: "req/s", rank: 2, trend: "stable" },
          errorRate: { value: 1.2, unit: "%", rank: 2, trend: "stable" },
          securityScore: { value: 88, unit: "/100", rank: 2, trend: "improving" },
          devExperience: { value: 89, unit: "/100", rank: 1, trend: "stable" },
        },
        overallScore: 84,
        rank: 2,
      },
      {
        company: "FinanceCore",
        isYou: false,
        metrics: {
          responseTime: { value: 189, unit: "ms", rank: 3, trend: "declining" },
          uptime: { value: 99.82, unit: "%", rank: 3, trend: "stable" },
          throughput: { value: 1987, unit: "req/s", rank: 3, trend: "improving" },
          errorRate: { value: 1.5, unit: "%", rank: 3, trend: "stable" },
          securityScore: { value: 91, unit: "/100", rank: 3, trend: "stable" },
          devExperience: { value: 85, unit: "/100", rank: 2, trend: "improving" },
        },
        overallScore: 81,
        rank: 3,
      },
    ],
    categoryComparison: [
      {
        category: "Performance",
        weight: 30,
        yourScore: 92,
        groupAverage: 78,
        leader: "Your Platform",
        leaderScore: 92,
        gap: "+14 points",
        trend: "widening",
      },
      {
        category: "Reliability",
        weight: 25,
        yourScore: 95,
        groupAverage: 82,
        leader: "Your Platform",
        leaderScore: 95,
        gap: "+13 points",
        trend: "stable",
      },
      {
        category: "Scalability",
        weight: 20,
        yourScore: 89,
        groupAverage: 75,
        leader: "Your Platform",
        leaderScore: 89,
        gap: "+14 points",
        trend: "improving",
      },
      {
        category: "Security",
        weight: 15,
        yourScore: 94,
        groupAverage: 85,
        leader: "Your Platform",
        leaderScore: 94,
        gap: "+9 points",
        trend: "stable",
      },
      {
        category: "Developer Experience",
        weight: 10,
        yourScore: 81,
        groupAverage: 84,
        leader: "PayFlow Systems",
        leaderScore: 89,
        gap: "-8 points",
        trend: "narrowing",
      },
    ],
    strengthsWeaknesses: {
      yourStrengths: [
        { area: "Response Time", advantage: "19ms faster than #2", impact: "High" },
        { area: "Uptime", advantage: "0.08% higher than #2", impact: "High" },
        { area: "Throughput", advantage: "613 req/s more than #2", impact: "High" },
        { area: "Security", advantage: "6 points higher than average", impact: "Medium" },
      ],
      yourWeaknesses: [
        { area: "Developer Experience", disadvantage: "8 points behind leader", impact: "Medium" },
        { area: "Documentation", disadvantage: "Limited interactive examples", impact: "Low" },
        { area: "SDK Coverage", disadvantage: "4 fewer languages than leader", impact: "Medium" },
      ],
      competitorStrengths: [
        { company: "PayFlow Systems", area: "Developer Experience", strength: "Comprehensive SDKs" },
        { company: "FinanceCore", area: "Enterprise Features", strength: "Advanced compliance tools" },
        { company: "TradeTech Pro", area: "Analytics", strength: "Real-time insights dashboard" },
      ],
    },
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <ArrowUp className="w-3 h-3 text-green-400" />
      case "declining":
        return <ArrowDown className="w-3 h-3 text-red-400" />
      default:
        return <Minus className="w-3 h-3 text-gray-400" />
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-300"
    if (score >= 80) return "text-blue-300"
    if (score >= 70) return "text-yellow-300"
    return "text-red-300"
  }

  return (
    <div className="space-y-6">
      {/* Head-to-Head Comparison */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Head-to-Head Metric Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Company</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Response Time</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Uptime</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Throughput</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Error Rate</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Security</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Dev Experience</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Overall</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.headToHead.map((company, index) => (
                  <tr
                    key={index}
                    className={`border-b border-white/5 ${company.isYou ? "bg-purple-500/5" : "hover:bg-white/5"}`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded border flex items-center justify-center text-xs ${getRankColor(company.rank)}`}
                        >
                          {company.rank}
                        </div>
                        <span className={`font-medium ${company.isYou ? "text-purple-300" : "text-white"}`}>
                          {company.company}
                        </span>
                        {company.isYou && (
                          <Badge className="bg-purple-500/20 border-purple-400 text-purple-300">
                            <Crown className="w-3 h-3 mr-1" />
                            You
                          </Badge>
                        )}
                      </div>
                    </td>
                    {Object.entries(company.metrics).map(([key, metric]) => (
                      <td key={key} className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-1">
                            <span
                              className={`text-sm font-medium ${metric.rank === 1 ? "text-green-300" : "text-gray-300"}`}
                            >
                              {metric.value}
                              {metric.unit}
                            </span>
                            {getTrendIcon(metric.trend)}
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${getRankColor(metric.rank)}`}
                          >
                            {metric.rank}
                          </div>
                        </div>
                      </td>
                    ))}
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-lg font-bold ${getScoreColor(company.overallScore)}`}>
                          {company.overallScore}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${getRankColor(company.rank)}`}
                        >
                          {company.rank}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Category Comparison */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Category Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparisonData.categoryComparison.map((category, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-white">{category.category}</h3>
                    <Badge variant="outline" className="border-gray-400 text-gray-300">
                      {category.weight}% weight
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        category.leader === "Your Platform"
                          ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                          : "bg-gray-500/20 border-gray-400 text-gray-300"
                      }
                    >
                      {category.leader === "Your Platform" ? "Leading" : `Behind ${category.leader}`}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        category.trend === "widening"
                          ? "border-green-400 text-green-300"
                          : category.trend === "narrowing"
                            ? "border-red-400 text-red-300"
                            : category.trend === "improving"
                              ? "border-blue-400 text-blue-300"
                              : "border-gray-400 text-gray-300"
                      }
                    >
                      {category.trend}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-xs text-gray-400">Your Score</p>
                    <p className={`text-lg font-bold ${getScoreColor(category.yourScore)}`}>{category.yourScore}</p>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-xs text-gray-400">Group Average</p>
                    <p className="text-lg font-bold text-gray-300">{category.groupAverage}</p>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-xs text-gray-400">Leader Score</p>
                    <p className="text-lg font-bold text-green-300">{category.leaderScore}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Gap to Leader:</span>
                  <span
                    className={`text-sm font-medium ${category.gap.includes("+") ? "text-green-300" : "text-red-300"}`}
                  >
                    {category.gap}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Weaknesses Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5" />
              Your Competitive Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comparisonData.strengthsWeaknesses.yourStrengths.map((strength, index) => (
                <div key={index} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-green-300">{strength.area}</h4>
                    <Badge
                      className={
                        strength.impact === "High"
                          ? "bg-red-500/20 border-red-400 text-red-300"
                          : strength.impact === "Medium"
                            ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                            : "bg-green-500/20 border-green-400 text-green-300"
                      }
                    >
                      {strength.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300">{strength.advantage}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Improvement Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comparisonData.strengthsWeaknesses.yourWeaknesses.map((weakness, index) => (
                <div key={index} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-red-300">{weakness.area}</h4>
                    <Badge
                      className={
                        weakness.impact === "High"
                          ? "bg-red-500/20 border-red-400 text-red-300"
                          : weakness.impact === "Medium"
                            ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                            : "bg-green-500/20 border-green-400 text-green-300"
                      }
                    >
                      {weakness.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300">{weakness.disadvantage}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitor Strengths */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Competitor Strengths to Watch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparisonData.strengthsWeaknesses.competitorStrengths.map((competitor, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h3 className="font-medium text-white mb-2">{competitor.company}</h3>
                <div className="mb-2">
                  <Badge className="bg-blue-500/20 border-blue-400 text-blue-300">{competitor.area}</Badge>
                </div>
                <p className="text-sm text-gray-300">{competitor.strength}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Strategic Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-green-300">Maintain Leadership</h4>
              <div className="space-y-2">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-300 font-medium">Performance Optimization</p>
                  <p className="text-xs text-gray-300">Continue investing in response time improvements</p>
                </div>
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-300 font-medium">Reliability Excellence</p>
                  <p className="text-xs text-gray-300">Maintain 99.97%+ uptime standards</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-blue-300">Close Gaps</h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-300 font-medium">Developer Experience</p>
                  <p className="text-xs text-gray-300">Expand SDK coverage and improve documentation</p>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-300 font-medium">Interactive Tools</p>
                  <p className="text-xs text-gray-300">Build API playground and testing environment</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="border-gray-400 text-gray-300">
              Export Comparison
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Create Action Plan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
