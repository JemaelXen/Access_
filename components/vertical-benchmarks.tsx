"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Trophy, TrendingUp, BarChart3, Star, Crown } from "lucide-react"

interface VerticalBenchmarksProps {
  vertical: any
  verticalKey: string
}

export function VerticalBenchmarks({ vertical, verticalKey }: VerticalBenchmarksProps) {
  const isParticipating = vertical.yourRank !== "N/A"

  const benchmarkCategories = {
    fintech: [
      {
        category: "Transaction Processing",
        weight: 25,
        yourScore: 92,
        industryAvg: 78.4,
        topPerformer: 95,
        metrics: [
          { name: "Processing Speed", your: "145ms", avg: "234ms", top: "98ms", unit: "milliseconds" },
          { name: "Success Rate", your: "99.7%", avg: "97.8%", top: "99.9%", unit: "percentage" },
          { name: "Throughput", your: "2,847/s", avg: "1,456/s", top: "3,200/s", unit: "requests/sec" },
          { name: "Error Rate", your: "0.8%", avg: "1.9%", top: "0.3%", unit: "percentage" },
        ],
      },
      {
        category: "Security & Compliance",
        weight: 30,
        yourScore: 96,
        industryAvg: 84.2,
        topPerformer: 98,
        metrics: [
          { name: "Security Score", your: "96/100", avg: "84/100", top: "98/100", unit: "score" },
          { name: "Compliance Rate", your: "98%", avg: "89%", top: "100%", unit: "percentage" },
          { name: "Audit Pass Rate", your: "100%", avg: "92%", top: "100%", unit: "percentage" },
          { name: "Incident Response", your: "15min", avg: "45min", top: "8min", unit: "minutes" },
        ],
      },
      {
        category: "Customer Experience",
        weight: 20,
        yourScore: 88,
        industryAvg: 76.8,
        topPerformer: 94,
        metrics: [
          { name: "App Rating", your: "4.8/5", avg: "4.2/5", top: "4.9/5", unit: "rating" },
          { name: "Support Response", your: "2.3min", avg: "8.7min", top: "1.8min", unit: "minutes" },
          { name: "Onboarding Time", your: "3.2min", avg: "12.4min", top: "2.1min", unit: "minutes" },
          { name: "Customer Satisfaction", your: "94%", avg: "82%", top: "97%", unit: "percentage" },
        ],
      },
      {
        category: "Innovation & Technology",
        weight: 15,
        yourScore: 85,
        industryAvg: 71.3,
        topPerformer: 91,
        metrics: [
          { name: "API Coverage", your: "95%", avg: "78%", top: "98%", unit: "percentage" },
          { name: "Feature Velocity", your: "2.3/week", avg: "1.1/week", top: "2.8/week", unit: "releases" },
          { name: "Tech Debt Ratio", your: "12%", avg: "28%", top: "8%", unit: "percentage" },
          { name: "Innovation Index", your: "87/100", avg: "64/100", top: "93/100", unit: "score" },
        ],
      },
      {
        category: "Business Performance",
        weight: 10,
        yourScore: 91,
        industryAvg: 73.6,
        topPerformer: 96,
        metrics: [
          { name: "Revenue Growth", your: "28.7%", avg: "18.2%", top: "34.5%", unit: "percentage" },
          { name: "Customer Growth", your: "23.4%", avg: "15.8%", top: "29.1%", unit: "percentage" },
          { name: "Market Share", your: "2.1%", avg: "0.8%", top: "4.7%", unit: "percentage" },
          { name: "Profitability", your: "18.5%", avg: "12.3%", top: "22.8%", unit: "percentage" },
        ],
      },
    ],
    ecommerce: [
      {
        category: "Platform Performance",
        weight: 30,
        yourScore: 84,
        industryAvg: 72.1,
        topPerformer: 91,
        metrics: [
          { name: "Page Load Speed", your: "1.8s", avg: "2.4s", top: "1.2s", unit: "seconds" },
          { name: "Uptime", your: "99.91%", avg: "99.76%", top: "99.98%", unit: "percentage" },
          { name: "Mobile Performance", your: "94/100", avg: "78/100", top: "97/100", unit: "score" },
          { name: "API Response Time", your: "178ms", avg: "267ms", top: "134ms", unit: "milliseconds" },
        ],
      },
      {
        category: "Conversion & Sales",
        weight: 25,
        yourScore: 79,
        industryAvg: 68.4,
        topPerformer: 87,
        metrics: [
          { name: "Conversion Rate", your: "3.8%", avg: "2.9%", top: "4.7%", unit: "percentage" },
          { name: "Cart Abandonment", your: "67.2%", avg: "71.4%", top: "58.9%", unit: "percentage" },
          { name: "Average Order Value", your: "$127", avg: "$98", top: "$156", unit: "dollars" },
          { name: "Checkout Success", your: "98.7%", avg: "94.2%", top: "99.3%", unit: "percentage" },
        ],
      },
      {
        category: "Customer Experience",
        weight: 20,
        yourScore: 82,
        industryAvg: 74.8,
        topPerformer: 89,
        metrics: [
          { name: "Customer Satisfaction", your: "4.6/5", avg: "4.1/5", top: "4.8/5", unit: "rating" },
          { name: "Return Rate", your: "8.2%", avg: "12.7%", top: "6.1%", unit: "percentage" },
          { name: "Support Response", your: "4.2min", avg: "12.8min", top: "2.7min", unit: "minutes" },
          { name: "Personalization Score", your: "87/100", avg: "64/100", top: "94/100", unit: "score" },
        ],
      },
      {
        category: "Security & Compliance",
        weight: 15,
        yourScore: 76,
        industryAvg: 71.2,
        topPerformer: 93,
        metrics: [
          { name: "Security Score", your: "89/100", avg: "78/100", top: "96/100", unit: "score" },
          { name: "PCI Compliance", your: "89%", avg: "82%", top: "100%", unit: "percentage" },
          { name: "Data Protection", your: "92%", avg: "85%", top: "98%", unit: "percentage" },
          { name: "Fraud Detection", your: "97.8%", avg: "93.4%", top: "99.2%", unit: "percentage" },
        ],
      },
      {
        category: "Innovation & Growth",
        weight: 10,
        yourScore: 73,
        industryAvg: 65.9,
        topPerformer: 84,
        metrics: [
          { name: "Feature Adoption", your: "67%", avg: "54%", top: "78%", unit: "percentage" },
          { name: "Market Expansion", your: "12%", avg: "8%", top: "18%", unit: "percentage" },
          { name: "Technology Stack", your: "82/100", avg: "71/100", top: "91/100", unit: "score" },
          { name: "Innovation Pipeline", your: "76/100", avg: "62/100", top: "87/100", unit: "score" },
        ],
      },
    ],
  }

  const calculateOverallScore = (categories: any[]) => {
    return categories.reduce((total, cat) => total + (cat.yourScore * cat.weight) / 100, 0)
  }

  const getScoreColor = (score: number, comparison: number) => {
    const diff = score - comparison
    if (diff >= 10) return "text-green-300"
    if (diff >= 5) return "text-blue-300"
    if (diff >= 0) return "text-yellow-300"
    return "text-red-300"
  }

  const getPerformanceBadge = (your: number, avg: number, top: number) => {
    if (your >= top * 0.95)
      return { text: "Top Performer", color: "bg-yellow-500/20 border-yellow-400 text-yellow-300" }
    if (your >= avg * 1.1) return { text: "Above Average", color: "bg-green-500/20 border-green-400 text-green-300" }
    if (your >= avg * 0.9) return { text: "Average", color: "bg-blue-500/20 border-blue-400 text-blue-300" }
    return { text: "Below Average", color: "bg-red-500/20 border-red-400 text-red-300" }
  }

  const currentCategories = benchmarkCategories[verticalKey as keyof typeof benchmarkCategories] || []
  const overallScore = isParticipating ? calculateOverallScore(currentCategories) : 0

  return (
    <div className="space-y-6">
      {/* Overall Benchmark Score */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Overall Benchmark Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isParticipating ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">{overallScore.toFixed(1)}</p>
                <p className="text-sm text-gray-400">Your Overall Score</p>
                <Badge className="mt-2 bg-purple-500/20 border-purple-400 text-purple-300">
                  #{vertical.yourRank} of {vertical.totalCompanies}
                </Badge>
              </div>

              <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">{vertical.avgScore}</p>
                <p className="text-sm text-gray-400">Industry Average</p>
                <Badge className="mt-2 bg-blue-500/20 border-blue-400 text-blue-300">
                  +{(overallScore - vertical.avgScore).toFixed(1)} pts
                </Badge>
              </div>

              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <Star className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">94.2</p>
                <p className="text-sm text-gray-400">Top Performer</p>
                <Badge className="mt-2 bg-green-500/20 border-green-400 text-green-300">
                  Gap: {(94.2 - overallScore).toFixed(1)} pts
                </Badge>
              </div>

              <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">+{vertical.growthRate}%</p>
                <p className="text-sm text-gray-400">Growth Rate</p>
                <Badge className="mt-2 bg-yellow-500/20 border-yellow-400 text-yellow-300">
                  vs {(vertical.growthRate * 0.7).toFixed(1)}% avg
                </Badge>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Join {vertical.name} to Access Benchmarks</h3>
              <p className="text-gray-400 mb-4">Get detailed performance comparisons and industry insights</p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Star className="w-4 h-4 mr-2" />
                Join Vertical Group
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Benchmarks */}
      {isParticipating && currentCategories.length > 0 && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Category Performance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentCategories.map((category, index) => (
                <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white">{category.category}</h3>
                      <p className="text-sm text-gray-400">Weight: {category.weight}%</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          getPerformanceBadge(category.yourScore, category.industryAvg, category.topPerformer).color
                        }
                      >
                        {getPerformanceBadge(category.yourScore, category.industryAvg, category.topPerformer).text}
                      </Badge>
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">{category.yourScore}/100</p>
                        <p className="text-xs text-gray-400">vs {category.industryAvg} avg</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                    <div className="relative w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full"
                        style={{ width: "100%" }}
                      />
                      <div
                        className="absolute top-0 w-1 h-3 bg-white rounded-full shadow-lg"
                        style={{ left: `${category.yourScore}%` }}
                      />
                      <div
                        className="absolute top-0 w-1 h-3 bg-gray-400 rounded-full"
                        style={{ left: `${category.industryAvg}%` }}
                      />
                      <div
                        className="absolute top-0 w-1 h-3 bg-yellow-400 rounded-full"
                        style={{ left: `${category.topPerformer}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-400">Industry Avg: {category.industryAvg}</span>
                      <span className="text-yellow-300">Top: {category.topPerformer}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {category.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="p-3 bg-black/30 rounded border border-white/5">
                        <h4 className="text-xs font-medium text-gray-400 mb-1">{metric.name}</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs text-purple-300">You:</span>
                            <span className="text-xs font-medium text-white">{metric.your}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-400">Avg:</span>
                            <span className="text-xs text-gray-300">{metric.avg}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-yellow-400">Top:</span>
                            <span className="text-xs text-yellow-300">{metric.top}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Insights */}
      {isParticipating && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Performance Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-green-300 mb-3">Strengths</h3>
                <div className="space-y-3">
                  {currentCategories
                    .filter((cat) => cat.yourScore > cat.industryAvg + 10)
                    .slice(0, 3)
                    .map((cat, index) => (
                      <div key={index} className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-white">{cat.category}</span>
                          <Badge className="bg-green-500/20 border-green-400 text-green-300">
                            +{(cat.yourScore - cat.industryAvg).toFixed(1)}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-300 mt-1">Significantly outperforming industry average</p>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-orange-300 mb-3">Improvement Opportunities</h3>
                <div className="space-y-3">
                  {currentCategories
                    .filter((cat) => cat.yourScore < cat.topPerformer - 5)
                    .slice(0, 3)
                    .map((cat, index) => (
                      <div key={index} className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-white">{cat.category}</span>
                          <Badge className="bg-orange-500/20 border-orange-400 text-orange-300">
                            -{(cat.topPerformer - cat.yourScore).toFixed(1)} gap
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-300 mt-1">Opportunity to reach top performer level</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Competitive Positioning */}
      {isParticipating && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Crown className="w-5 h-5" />
              Competitive Positioning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-300">
                  {currentCategories.filter((cat) => cat.yourScore >= cat.topPerformer * 0.95).length}
                </p>
                <p className="text-sm text-gray-400">Categories Leading</p>
                <p className="text-xs text-yellow-300 mt-1">
                  {Math.round(
                    (currentCategories.filter((cat) => cat.yourScore >= cat.topPerformer * 0.95).length /
                      currentCategories.length) *
                      100,
                  )}
                  % dominance
                </p>
              </div>

              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-300">
                  {currentCategories.filter((cat) => cat.yourScore > cat.industryAvg).length}
                </p>
                <p className="text-sm text-gray-400">Above Average</p>
                <p className="text-xs text-green-300 mt-1">
                  {Math.round(
                    (currentCategories.filter((cat) => cat.yourScore > cat.industryAvg).length /
                      currentCategories.length) *
                      100,
                  )}
                  % categories
                </p>
              </div>

              <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-300">{(overallScore - vertical.avgScore).toFixed(1)}</p>
                <p className="text-sm text-gray-400">Points Above Average</p>
                <p className="text-xs text-blue-300 mt-1">Strong overall performance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
