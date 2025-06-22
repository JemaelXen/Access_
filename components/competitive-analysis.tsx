"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, TrendingUp, Star, Crown, Award } from "lucide-react"

export function CompetitiveAnalysis() {
  const competitors = [
    {
      name: "Your Platform",
      rank: 1,
      score: 87,
      marketShare: 12.3,
      strengths: ["Superior uptime", "Excellent throughput", "Fast response times"],
      weaknesses: ["Documentation could improve", "Limited SDK languages"],
      pricing: "Premium",
      customers: "2,400+",
      growth: 23.4,
      isYou: true,
      logo: "🚀",
      features: {
        reliability: 92,
        performance: 89,
        scalability: 85,
        security: 94,
        devEx: 81,
      },
    },
    {
      name: "TechFlow API",
      rank: 2,
      score: 82,
      marketShare: 18.7,
      strengths: ["Strong documentation", "Wide SDK support", "Good pricing"],
      weaknesses: ["Lower uptime", "Slower response times", "Limited scalability"],
      pricing: "Competitive",
      customers: "3,200+",
      growth: 15.2,
      isYou: false,
      logo: "⚡",
      features: {
        reliability: 78,
        performance: 82,
        scalability: 79,
        security: 88,
        devEx: 91,
      },
    },
    {
      name: "CloudBridge",
      rank: 3,
      score: 79,
      marketShare: 15.4,
      strengths: ["Enterprise features", "Compliance certifications", "24/7 support"],
      weaknesses: ["Complex setup", "Higher latency", "Expensive pricing"],
      pricing: "Enterprise",
      customers: "1,800+",
      growth: 8.9,
      isYou: false,
      logo: "☁️",
      features: {
        reliability: 85,
        performance: 74,
        scalability: 82,
        security: 96,
        devEx: 68,
      },
    },
    {
      name: "DataSync Pro",
      rank: 4,
      score: 76,
      marketShare: 11.2,
      strengths: ["Real-time sync", "Data transformation", "Analytics"],
      weaknesses: ["Limited integrations", "Steep learning curve", "Reliability issues"],
      pricing: "Mid-range",
      customers: "1,500+",
      growth: 12.7,
      isYou: false,
      logo: "🔄",
      features: {
        reliability: 71,
        performance: 79,
        scalability: 76,
        security: 82,
        devEx: 74,
      },
    },
    {
      name: "IntegrateNow",
      rank: 5,
      score: 73,
      marketShare: 9.8,
      strengths: ["Easy setup", "Visual builder", "Good for beginners"],
      weaknesses: ["Limited customization", "Performance issues", "Basic security"],
      pricing: "Budget",
      customers: "2,800+",
      growth: 19.3,
      isYou: false,
      logo: "🔗",
      features: {
        reliability: 69,
        performance: 71,
        scalability: 73,
        security: 65,
        devEx: 87,
      },
    },
  ]

  const competitiveMatrix = [
    {
      feature: "Response Time",
      you: "145ms",
      competitors: {
        "TechFlow API": "189ms",
        CloudBridge: "234ms",
        "DataSync Pro": "198ms",
        IntegrateNow: "267ms",
      },
      winner: "you",
    },
    {
      feature: "Uptime SLA",
      you: "99.97%",
      competitors: {
        "TechFlow API": "99.5%",
        CloudBridge: "99.8%",
        "DataSync Pro": "99.2%",
        IntegrateNow: "99.1%",
      },
      winner: "you",
    },
    {
      feature: "Throughput",
      you: "2,847 req/s",
      competitors: {
        "TechFlow API": "1,234 req/s",
        CloudBridge: "1,890 req/s",
        "DataSync Pro": "1,567 req/s",
        IntegrateNow: "892 req/s",
      },
      winner: "you",
    },
    {
      feature: "SDK Languages",
      you: "8",
      competitors: {
        "TechFlow API": "12",
        CloudBridge: "6",
        "DataSync Pro": "5",
        IntegrateNow: "4",
      },
      winner: "TechFlow API",
    },
    {
      feature: "Pricing (per 1M calls)",
      you: "$49",
      competitors: {
        "TechFlow API": "$39",
        CloudBridge: "$89",
        "DataSync Pro": "$59",
        IntegrateNow: "$29",
        CloudBridge: "$89",
        "DataSync Pro": "$59",
        IntegrateNow: "$29",
      },
      winner: "IntegrateNow",
    },
    {
      feature: "Support Response",
      you: "2.3h",
      competitors: {
        "TechFlow API": "4.1h",
        CloudBridge: "1.8h",
        "DataSync Pro": "6.2h",
        IntegrateNow: "8.5h",
      },
      winner: "CloudBridge",
    },
  ]

  const marketTrends = [
    {
      trend: "API-First Architecture",
      impact: "High",
      yourPosition: "Leading",
      description: "Growing demand for API-first development approaches",
      opportunity: "Expand developer tools and documentation",
    },
    {
      trend: "Real-time Integration",
      impact: "Medium",
      yourPosition: "Competitive",
      description: "Increasing need for real-time data synchronization",
      opportunity: "Enhance streaming capabilities",
    },
    {
      trend: "AI-Powered Automation",
      impact: "High",
      yourPosition: "Emerging",
      description: "AI-driven integration configuration and optimization",
      opportunity: "Invest in ML-powered features",
    },
    {
      trend: "Multi-Cloud Strategy",
      impact: "Medium",
      yourPosition: "Strong",
      description: "Organizations adopting multi-cloud architectures",
      opportunity: "Expand cloud provider partnerships",
    },
  ]

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Leading":
        return "border-green-400 text-green-300 bg-green-500/10"
      case "Strong":
        return "border-blue-400 text-blue-300 bg-blue-500/10"
      case "Competitive":
        return "border-yellow-400 text-yellow-300 bg-yellow-500/10"
      case "Emerging":
        return "border-purple-400 text-purple-300 bg-purple-500/10"
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
      {/* Competitive Landscape */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Competitive Landscape
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitors.map((competitor, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  competitor.isYou ? "bg-purple-500/10 border-purple-500/30" : "bg-black/20 border-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg border flex items-center justify-center text-lg ${getRankColor(competitor.rank)}`}
                    >
                      {competitor.rank}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{competitor.logo}</span>
                        <h3 className={`font-semibold ${competitor.isYou ? "text-purple-300" : "text-white"}`}>
                          {competitor.name}
                        </h3>
                        {competitor.isYou && (
                          <Badge className="bg-purple-500/20 border-purple-400 text-purple-300">
                            <Crown className="w-3 h-3 mr-1" />
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        Score: {competitor.score}/100 • {competitor.marketShare}% market share
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 font-medium">+{competitor.growth}%</span>
                    </div>
                    <p className="text-sm text-gray-400">{competitor.customers} customers</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-300 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {competitor.strengths.map((strength, strengthIndex) => (
                        <li key={strengthIndex} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-300 mb-2">Weaknesses</h4>
                    <ul className="space-y-1">
                      {competitor.weaknesses.map((weakness, weaknessIndex) => (
                        <li key={weaknessIndex} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Feature Comparison Radar */}
                <div className="grid grid-cols-5 gap-2 text-center">
                  {Object.entries(competitor.features).map(([feature, score]) => (
                    <div key={feature} className="p-2 bg-black/20 rounded">
                      <p className="text-xs text-gray-400 mb-1 capitalize">{feature}</p>
                      <p
                        className={`text-sm font-medium ${score >= 85 ? "text-green-300" : score >= 75 ? "text-blue-300" : "text-yellow-300"}`}
                      >
                        {score}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Comparison Matrix */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Feature Comparison Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Feature</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-purple-300">Your Platform</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">TechFlow API</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">CloudBridge</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">DataSync Pro</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">IntegrateNow</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Winner</th>
                </tr>
              </thead>
              <tbody>
                {competitiveMatrix.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 font-medium text-white">{row.feature}</td>
                    <td
                      className={`py-3 px-4 font-medium ${row.winner === "you" ? "text-green-300" : "text-purple-300"}`}
                    >
                      {row.you}
                      {row.winner === "you" && <Star className="w-3 h-3 inline ml-1 text-yellow-400" />}
                    </td>
                    {Object.entries(row.competitors).map(([competitor, value]) => (
                      <td
                        key={competitor}
                        className={`py-3 px-4 ${row.winner === competitor ? "text-green-300 font-medium" : "text-gray-300"}`}
                      >
                        {value}
                        {row.winner === competitor && <Star className="w-3 h-3 inline ml-1 text-yellow-400" />}
                      </td>
                    ))}
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          row.winner === "you" ? "border-green-400 text-green-300" : "border-gray-400 text-gray-300"
                        }
                      >
                        {row.winner === "you" ? "You" : row.winner}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Market Trends Analysis */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Market Trends & Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketTrends.map((trend, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">{trend.trend}</h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${trend.impact === "High" ? "border-red-400 text-red-300" : "border-yellow-400 text-yellow-300"}`}
                    >
                      {trend.impact} Impact
                    </Badge>
                    <Badge className={getPositionColor(trend.yourPosition)}>{trend.yourPosition}</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-3">{trend.description}</p>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                  <h4 className="text-sm font-medium text-blue-300 mb-1">Opportunity</h4>
                  <p className="text-xs text-gray-300">{trend.opportunity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Advantages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5" />
              Your Competitive Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="font-medium text-green-300 mb-1">Performance Leadership</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Best-in-class response times and throughput in the industry
                </p>
                <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                  19% faster than nearest competitor
                </Badge>
              </div>

              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="font-medium text-green-300 mb-1">Reliability Excellence</h4>
                <p className="text-sm text-gray-300 mb-2">Industry-leading uptime with superior error recovery</p>
                <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                  99.97% uptime vs 99.5% average
                </Badge>
              </div>

              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="font-medium text-green-300 mb-1">Security Standards</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Comprehensive security with multiple compliance certifications
                </p>
                <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                  SOC 2 Type II + GDPR compliant
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Strategic Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-medium text-blue-300 mb-1">Expand SDK Coverage</h4>
                <p className="text-sm text-gray-300 mb-2">Add 4 more programming languages to match TechFlow API</p>
                <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                  Priority: High
                </Badge>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-medium text-blue-300 mb-1">Enhance Documentation</h4>
                <p className="text-sm text-gray-300 mb-2">Improve developer experience with interactive docs</p>
                <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                  Priority: Medium
                </Badge>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-medium text-blue-300 mb-1">AI Integration Features</h4>
                <p className="text-sm text-gray-300 mb-2">Lead the market with AI-powered integration tools</p>
                <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                  Priority: Strategic
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Position Summary */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Market Position Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Market Leader</h3>
              <p className="text-sm text-gray-400">#1 in performance and reliability metrics across the industry</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Strong Growth</h3>
              <p className="text-sm text-gray-400">23.4% YoY growth, outpacing industry average of 14.2%</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Innovation Focus</h3>
              <p className="text-sm text-gray-400">Positioned to lead in AI-powered integration technologies</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
