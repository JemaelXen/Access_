"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AsymmetricLogo } from "@/components/asymmetric-logo"
import {
  BarChart3,
  TrendingUp,
  Award,
  Target,
  Zap,
  Shield,
  Crown,
  Download,
  RefreshCw,
  Star,
  Trophy,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"
import { IndustryComparison } from "@/components/industry-comparison"
import { PerformanceScoring } from "@/components/performance-scoring"
import { CompetitiveAnalysis } from "@/components/competitive-analysis"
import { BestPractices } from "@/components/best-practices"
import { BenchmarkReports } from "@/components/benchmark-reports"

export default function IntegrationBenchmarksPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedIndustry, setSelectedIndustry] = useState("fintech")
  const [companySize, setCompanySize] = useState("enterprise")

  const overallScore = {
    score: 87,
    grade: "A",
    percentile: 92,
    improvement: 5.2,
    previousScore: 82,
  }

  const industryBenchmarks = {
    fintech: {
      name: "FinTech",
      avgResponseTime: "180ms",
      avgSuccessRate: "98.5%",
      avgUptime: "99.8%",
      avgThroughput: "1,200 req/s",
      companies: 247,
    },
    ecommerce: {
      name: "E-commerce",
      avgResponseTime: "220ms",
      avgSuccessRate: "97.8%",
      avgUptime: "99.6%",
      avgThroughput: "2,100 req/s",
      companies: 189,
    },
    saas: {
      name: "SaaS",
      avgResponseTime: "165ms",
      avgSuccessRate: "99.1%",
      avgUptime: "99.9%",
      avgThroughput: "890 req/s",
      companies: 312,
    },
    healthcare: {
      name: "Healthcare",
      avgResponseTime: "145ms",
      avgSuccessRate: "99.7%",
      avgUptime: "99.95%",
      avgThroughput: "450 req/s",
      companies: 156,
    },
  }

  const performanceMetrics = [
    {
      metric: "Response Time",
      yourValue: "145ms",
      industryAvg: industryBenchmarks[selectedIndustry].avgResponseTime,
      percentile: 85,
      trend: "up",
      status: "excellent",
      improvement: "19% faster than average",
    },
    {
      metric: "Success Rate",
      yourValue: "99.2%",
      industryAvg: industryBenchmarks[selectedIndustry].avgSuccessRate,
      percentile: 78,
      trend: "up",
      status: "good",
      improvement: "0.7% above average",
    },
    {
      metric: "Uptime",
      yourValue: "99.97%",
      industryAvg: industryBenchmarks[selectedIndustry].avgUptime,
      percentile: 95,
      trend: "stable",
      status: "excellent",
      improvement: "Top 5% performer",
    },
    {
      metric: "Throughput",
      yourValue: "2,847 req/s",
      industryAvg: industryBenchmarks[selectedIndustry].avgThroughput,
      percentile: 92,
      trend: "up",
      status: "excellent",
      improvement: "137% above average",
    },
    {
      metric: "Error Rate",
      yourValue: "0.8%",
      industryAvg: "1.5%",
      percentile: 88,
      trend: "down",
      status: "excellent",
      improvement: "47% lower than average",
    },
    {
      metric: "MTTR",
      yourValue: "4.2 min",
      industryAvg: "8.7 min",
      percentile: 91,
      trend: "down",
      status: "excellent",
      improvement: "52% faster recovery",
    },
  ]

  const competitorData = [
    {
      name: "Your Platform",
      score: 87,
      responseTime: "145ms",
      successRate: "99.2%",
      uptime: "99.97%",
      rank: 1,
      isYou: true,
    },
    {
      name: "Competitor A",
      score: 82,
      responseTime: "167ms",
      successRate: "98.9%",
      uptime: "99.85%",
      rank: 2,
      isYou: false,
    },
    {
      name: "Competitor B",
      score: 79,
      responseTime: "189ms",
      successRate: "98.4%",
      uptime: "99.72%",
      rank: 3,
      isYou: false,
    },
    {
      name: "Competitor C",
      score: 76,
      responseTime: "203ms",
      successRate: "97.8%",
      uptime: "99.68%",
      rank: 4,
      isYou: false,
    },
    {
      name: "Industry Average",
      score: 73,
      responseTime: "220ms",
      successRate: "97.2%",
      uptime: "99.45%",
      rank: 5,
      isYou: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "border-green-400 text-green-300 bg-green-500/10"
      case "good":
        return "border-blue-400 text-blue-300 bg-blue-500/10"
      case "average":
        return "border-yellow-400 text-yellow-300 bg-yellow-500/10"
      case "poor":
        return "border-red-400 text-red-300 bg-red-500/10"
      default:
        return "border-gray-400 text-gray-300 bg-gray-500/10"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-3 h-3 text-green-400" />
      case "down":
        return <ArrowDown className="w-3 h-3 text-red-400" />
      default:
        return <Minus className="w-3 h-3 text-gray-400" />
    }
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
                <h1 className="text-2xl font-bold text-white">Integration Benchmarks</h1>
                <p className="text-purple-200">Compare performance against industry standards</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-purple-400 text-purple-300">
                <Crown className="w-3 h-3 mr-1" />
                Founder Access
              </Badge>
              <div className="flex items-center gap-2">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
                >
                  <option value="fintech">FinTech</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">SaaS</option>
                  <option value="healthcare">Healthcare</option>
                </select>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
                >
                  <option value="startup">Startup</option>
                  <option value="growth">Growth</option>
                  <option value="enterprise">Enterprise</option>
                </select>
                <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Overall Score Card */}
        <Card className="bg-black/40 border-white/10 mb-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20" />
                  <div className="relative text-3xl font-bold text-white">{overallScore.score}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Overall Score</h3>
                <Badge className={`${getStatusColor("excellent")} mb-2`}>Grade {overallScore.grade}</Badge>
                <p className="text-sm text-gray-400">
                  {overallScore.percentile}th percentile in {industryBenchmarks[selectedIndustry].name}
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-24 h-24 mb-4 mx-auto">
                  <Trophy className="w-12 h-12 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Industry Rank</h3>
                <p className="text-2xl font-bold text-yellow-400 mb-2">#1</p>
                <p className="text-sm text-gray-400">
                  Out of {industryBenchmarks[selectedIndustry].companies} companies
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-24 h-24 mb-4 mx-auto">
                  <TrendingUp className="w-12 h-12 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Improvement</h3>
                <p className="text-2xl font-bold text-green-400 mb-2">+{overallScore.improvement}</p>
                <p className="text-sm text-gray-400">Points since last quarter</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-24 h-24 mb-4 mx-auto">
                  <Star className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Recognition</h3>
                <Badge className="bg-purple-500/20 border-purple-400 text-purple-300 mb-2">Top Performer</Badge>
                <p className="text-sm text-gray-400">Industry leader status</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-black/20 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-purple-600">
              <Target className="w-4 h-4 mr-2" />
              Comparison
            </TabsTrigger>
            <TabsTrigger value="scoring" className="data-[state=active]:bg-purple-600">
              <Award className="w-4 h-4 mr-2" />
              Scoring
            </TabsTrigger>
            <TabsTrigger value="competitive" className="data-[state=active]:bg-purple-600">
              <Trophy className="w-4 h-4 mr-2" />
              Competitive
            </TabsTrigger>
            <TabsTrigger value="practices" className="data-[state=active]:bg-purple-600">
              <Zap className="w-4 h-4 mr-2" />
              Best Practices
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-purple-600">
              <Shield className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Performance Metrics Comparison */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Performance vs Industry Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-black/20 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-white">{metric.metric}</h3>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(metric.trend)}
                          <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Your Value:</span>
                          <span className="font-semibold text-purple-300">{metric.yourValue}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Industry Avg:</span>
                          <span className="text-gray-300">{metric.industryAvg}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Percentile</span>
                          <span>{metric.percentile}th</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${metric.percentile}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-green-300">{metric.improvement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Competitive Ranking */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Competitive Ranking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {competitorData.map((competitor, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        competitor.isYou ? "bg-purple-500/10 border-purple-500/30" : "bg-black/20 border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              competitor.rank === 1
                                ? "bg-yellow-500/20 text-yellow-300"
                                : competitor.rank === 2
                                  ? "bg-gray-400/20 text-gray-300"
                                  : competitor.rank === 3
                                    ? "bg-orange-500/20 text-orange-300"
                                    : "bg-gray-600/20 text-gray-400"
                            }`}
                          >
                            {competitor.rank}
                          </div>
                          <div>
                            <h3 className={`font-medium ${competitor.isYou ? "text-purple-300" : "text-white"}`}>
                              {competitor.name}
                              {competitor.isYou && (
                                <Badge className="ml-2 bg-purple-500/20 border-purple-400 text-purple-300">You</Badge>
                              )}
                            </h3>
                            <p className="text-sm text-gray-400">Score: {competitor.score}/100</p>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div className="grid grid-cols-3 gap-4 text-gray-300">
                            <div>
                              <p className="text-xs text-gray-400">Response</p>
                              <p>{competitor.responseTime}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Success</p>
                              <p>{competitor.successRate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Uptime</p>
                              <p>{competitor.uptime}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Industry Comparison Tab */}
          <TabsContent value="comparison">
            <IndustryComparison selectedIndustry={selectedIndustry} companySize={companySize} />
          </TabsContent>

          {/* Performance Scoring Tab */}
          <TabsContent value="scoring">
            <PerformanceScoring />
          </TabsContent>

          {/* Competitive Analysis Tab */}
          <TabsContent value="competitive">
            <CompetitiveAnalysis />
          </TabsContent>

          {/* Best Practices Tab */}
          <TabsContent value="practices">
            <BestPractices />
          </TabsContent>

          {/* Benchmark Reports Tab */}
          <TabsContent value="reports">
            <BenchmarkReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
