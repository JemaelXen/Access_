"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Target, BarChart3, Globe, Zap, Clock } from "lucide-react"

interface IndustryComparisonProps {
  selectedIndustry: string
  companySize: string
}

export function IndustryComparison({ selectedIndustry, companySize }: IndustryComparisonProps) {
  const industryData = {
    fintech: {
      name: "Financial Technology",
      description: "Digital financial services and payment platforms",
      totalCompanies: 247,
      avgScore: 73,
      topPerformers: ["Stripe", "Square", "PayPal", "Adyen"],
      keyMetrics: {
        responseTime: { avg: "180ms", top10: "120ms", bottom10: "340ms" },
        successRate: { avg: "98.5%", top10: "99.8%", bottom10: "96.2%" },
        uptime: { avg: "99.8%", top10: "99.99%", bottom10: "99.2%" },
        throughput: { avg: "1,200 req/s", top10: "3,500 req/s", bottom10: "450 req/s" },
      },
      trends: {
        responseTime: -8.5,
        successRate: 1.2,
        uptime: 0.3,
        throughput: 15.7,
      },
      challenges: [
        "High-frequency trading demands",
        "Regulatory compliance overhead",
        "Security and fraud prevention",
        "Real-time transaction processing",
      ],
      opportunities: [
        "Open banking APIs",
        "Cryptocurrency integration",
        "AI-powered risk assessment",
        "Mobile-first experiences",
      ],
    },
    ecommerce: {
      name: "E-commerce & Retail",
      description: "Online retail platforms and marketplaces",
      totalCompanies: 189,
      avgScore: 68,
      topPerformers: ["Amazon", "Shopify", "BigCommerce", "WooCommerce"],
      keyMetrics: {
        responseTime: { avg: "220ms", top10: "150ms", bottom10: "420ms" },
        successRate: { avg: "97.8%", top10: "99.5%", bottom10: "95.1%" },
        uptime: { avg: "99.6%", top10: "99.95%", bottom10: "98.8%" },
        throughput: { avg: "2,100 req/s", top10: "5,200 req/s", bottom10: "680 req/s" },
      },
      trends: {
        responseTime: -12.3,
        successRate: 2.1,
        uptime: 0.8,
        throughput: 23.4,
      },
      challenges: [
        "Peak traffic during sales events",
        "Inventory synchronization",
        "Payment gateway reliability",
        "Global CDN optimization",
      ],
      opportunities: [
        "Headless commerce architecture",
        "AI-powered personalization",
        "Voice commerce integration",
        "Augmented reality shopping",
      ],
    },
    saas: {
      name: "Software as a Service",
      description: "Cloud-based software applications and platforms",
      totalCompanies: 312,
      avgScore: 76,
      topPerformers: ["Salesforce", "Microsoft", "Google", "Atlassian"],
      keyMetrics: {
        responseTime: { avg: "165ms", top10: "95ms", bottom10: "285ms" },
        successRate: { avg: "99.1%", top10: "99.9%", bottom10: "97.8%" },
        uptime: { avg: "99.9%", top10: "99.99%", bottom10: "99.5%" },
        throughput: { avg: "890 req/s", top10: "2,800 req/s", bottom10: "320 req/s" },
      },
      trends: {
        responseTime: -6.7,
        successRate: 0.9,
        uptime: 0.2,
        throughput: 18.9,
      },
      challenges: [
        "Multi-tenant architecture complexity",
        "API rate limiting and quotas",
        "Data sovereignty requirements",
        "Integration ecosystem management",
      ],
      opportunities: [
        "Microservices architecture",
        "Event-driven integrations",
        "GraphQL API adoption",
        "Serverless computing",
      ],
    },
    healthcare: {
      name: "Healthcare Technology",
      description: "Digital health platforms and medical software",
      totalCompanies: 156,
      avgScore: 81,
      topPerformers: ["Epic", "Cerner", "Veracyte", "Teladoc"],
      keyMetrics: {
        responseTime: { avg: "145ms", top10: "85ms", bottom10: "245ms" },
        successRate: { avg: "99.7%", top10: "99.95%", bottom10: "98.9%" },
        uptime: { avg: "99.95%", top10: "99.99%", bottom10: "99.7%" },
        throughput: { avg: "450 req/s", top10: "1,200 req/s", bottom10: "180 req/s" },
      },
      trends: {
        responseTime: -4.2,
        successRate: 0.5,
        uptime: 0.1,
        throughput: 12.8,
      },
      challenges: [
        "HIPAA compliance requirements",
        "Critical system reliability",
        "Interoperability standards",
        "Legacy system integration",
      ],
      opportunities: [
        "FHIR API standardization",
        "Telehealth platform growth",
        "AI diagnostic tools",
        "IoT medical device integration",
      ],
    },
  }

  const currentIndustry = industryData[selectedIndustry as keyof typeof industryData]

  const sizeMultipliers = {
    startup: { companies: 0.3, score: -5 },
    growth: { companies: 0.6, score: 0 },
    enterprise: { companies: 1.0, score: 5 },
  }

  const adjustedData = {
    ...currentIndustry,
    totalCompanies: Math.floor(
      currentIndustry.totalCompanies * sizeMultipliers[companySize as keyof typeof sizeMultipliers].companies,
    ),
    avgScore: currentIndustry.avgScore + sizeMultipliers[companySize as keyof typeof sizeMultipliers].score,
  }

  const yourMetrics = {
    responseTime: "145ms",
    successRate: "99.2%",
    uptime: "99.97%",
    throughput: "2,847 req/s",
  }

  const getPerformanceComparison = (yourValue: string, industryAvg: string, metric: string) => {
    const extractNumber = (value: string) => {
      return Number.parseFloat(value.replace(/[^\d.]/g, ""))
    }

    const yourNum = extractNumber(yourValue)
    const avgNum = extractNumber(industryAvg)

    let percentDiff: number
    let isGood: boolean

    if (metric === "responseTime") {
      percentDiff = ((avgNum - yourNum) / avgNum) * 100
      isGood = yourNum < avgNum
    } else {
      percentDiff = ((yourNum - avgNum) / avgNum) * 100
      isGood = yourNum > avgNum
    }

    return {
      percentDiff: Math.abs(percentDiff),
      isGood,
      status: isGood ? "better" : "worse",
    }
  }

  return (
    <div className="space-y-6">
      {/* Industry Overview */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {currentIndustry.name} Industry Overview
            </CardTitle>
            <Badge variant="outline" className="border-purple-400 text-purple-300">
              {companySize.charAt(0).toUpperCase() + companySize.slice(1)} Companies
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-300 mb-4">{currentIndustry.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Companies:</span>
                  <span className="text-white font-medium">{adjustedData.totalCompanies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Average Score:</span>
                  <span className="text-white font-medium">{adjustedData.avgScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Your Rank:</span>
                  <span className="text-green-300 font-medium">#1 (Top 1%)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Top Performers</h4>
              <div className="space-y-2">
                {currentIndustry.topPerformers.map((company, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-xs text-purple-300">
                      {index + 1}
                    </div>
                    <span className="text-gray-300">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Comparison */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(currentIndustry.keyMetrics).map(([key, values]) => {
              const comparison = getPerformanceComparison(yourMetrics[key as keyof typeof yourMetrics], values.avg, key)
              return (
                <div key={key} className="p-4 bg-black/20 rounded-lg">
                  <h3 className="font-medium text-white mb-3 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h3>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Your Value</span>
                        <Badge
                          className={
                            comparison.isGood
                              ? "bg-green-500/20 border-green-400 text-green-300"
                              : "bg-red-500/20 border-red-400 text-red-300"
                          }
                        >
                          {comparison.isGood ? "Better" : "Needs Work"}
                        </Badge>
                      </div>
                      <p className="text-lg font-semibold text-purple-300">
                        {yourMetrics[key as keyof typeof yourMetrics]}
                      </p>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Industry Avg:</span>
                        <span className="text-gray-300">{values.avg}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Top 10%:</span>
                        <span className="text-green-300">{values.top10}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bottom 10%:</span>
                        <span className="text-red-300">{values.bottom10}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <p className={`text-xs ${comparison.isGood ? "text-green-300" : "text-red-300"}`}>
                        {comparison.percentDiff.toFixed(1)}% {comparison.status} than average
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Industry Trends (YoY)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(currentIndustry.trends).map(([metric, trend]) => (
                <div key={metric} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    {trend > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-white capitalize">{metric.replace(/([A-Z])/g, " $1").trim()}</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-medium ${trend > 0 ? "text-green-300" : "text-red-300"}`}>
                      {trend > 0 ? "+" : ""}
                      {trend}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Industry Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-red-300 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Key Challenges
                </h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  {currentIndustry.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-green-300 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Growth Opportunities
                </h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  {currentIndustry.opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      {opportunity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-green-300">Strengths to Leverage</h4>
              <div className="space-y-2">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-300 font-medium">Exceptional Uptime</p>
                  <p className="text-xs text-gray-300">
                    Your 99.97% uptime is in the top 5% of {currentIndustry.name} companies
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-300 font-medium">Superior Throughput</p>
                  <p className="text-xs text-gray-300">137% above industry average - excellent scalability</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-blue-300">Areas for Improvement</h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-300 font-medium">Success Rate Optimization</p>
                  <p className="text-xs text-gray-300">Target 99.5%+ to match top 10% performers</p>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-300 font-medium">Error Handling Enhancement</p>
                  <p className="text-xs text-gray-300">Implement advanced retry mechanisms</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
