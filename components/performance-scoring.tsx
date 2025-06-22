"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Target, TrendingUp, Star, Zap, Shield } from "lucide-react"

export function PerformanceScoring() {
  const scoringCategories = [
    {
      category: "Reliability",
      weight: 30,
      score: 92,
      maxScore: 100,
      grade: "A",
      metrics: [
        { name: "Uptime", score: 95, weight: 40, value: "99.97%" },
        { name: "Success Rate", score: 88, weight: 35, value: "99.2%" },
        { name: "Error Recovery", score: 94, weight: 25, value: "4.2 min MTTR" },
      ],
      improvements: [
        "Implement circuit breakers for better fault tolerance",
        "Add automated failover mechanisms",
        "Enhance monitoring and alerting systems",
      ],
    },
    {
      category: "Performance",
      weight: 25,
      score: 89,
      maxScore: 100,
      grade: "A-",
      metrics: [
        { name: "Response Time", score: 91, weight: 45, value: "145ms avg" },
        { name: "Throughput", score: 95, weight: 35, value: "2,847 req/s" },
        { name: "Latency P95", score: 82, weight: 20, value: "234ms" },
      ],
      improvements: [
        "Optimize database queries for faster response times",
        "Implement caching strategies for frequently accessed data",
        "Consider CDN optimization for global performance",
      ],
    },
    {
      category: "Scalability",
      weight: 20,
      score: 85,
      maxScore: 100,
      grade: "B+",
      metrics: [
        { name: "Auto Scaling", score: 88, weight: 40, value: "Enabled" },
        { name: "Load Distribution", score: 83, weight: 35, value: "Multi-region" },
        { name: "Resource Efficiency", score: 84, weight: 25, value: "78% utilization" },
      ],
      improvements: [
        "Implement predictive scaling based on usage patterns",
        "Optimize resource allocation algorithms",
        "Add more geographic regions for better distribution",
      ],
    },
    {
      category: "Security",
      weight: 15,
      score: 94,
      maxScore: 100,
      grade: "A",
      metrics: [
        { name: "Authentication", score: 96, weight: 35, value: "Multi-factor" },
        { name: "Encryption", score: 95, weight: 30, value: "End-to-end" },
        { name: "Compliance", score: 92, weight: 35, value: "SOC 2 Type II" },
      ],
      improvements: [
        "Implement zero-trust architecture",
        "Add advanced threat detection",
        "Enhance audit logging capabilities",
      ],
    },
    {
      category: "Developer Experience",
      weight: 10,
      score: 81,
      maxScore: 100,
      grade: "B+",
      metrics: [
        { name: "Documentation", score: 85, weight: 40, value: "Comprehensive" },
        { name: "SDK Quality", score: 79, weight: 35, value: "8 languages" },
        { name: "Support Response", score: 78, weight: 25, value: "2.3h avg" },
      ],
      improvements: [
        "Add interactive API documentation",
        "Improve SDK error handling and debugging",
        "Implement self-service troubleshooting tools",
      ],
    },
  ]

  const overallScore = scoringCategories.reduce((total, category) => {
    return total + (category.score * category.weight) / 100
  }, 0)

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "border-green-400 text-green-300 bg-green-500/10"
      case "A-":
        return "border-blue-400 text-blue-300 bg-blue-500/10"
      case "B+":
        return "border-yellow-400 text-yellow-300 bg-yellow-500/10"
      case "B":
        return "border-orange-400 text-orange-300 bg-orange-500/10"
      default:
        return "border-red-400 text-red-300 bg-red-500/10"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-300"
    if (score >= 80) return "text-blue-300"
    if (score >= 70) return "text-yellow-300"
    if (score >= 60) return "text-orange-300"
    return "text-red-300"
  }

  const industryBenchmarks = {
    excellent: { min: 90, label: "Industry Leading", color: "bg-green-500" },
    good: { min: 80, label: "Above Average", color: "bg-blue-500" },
    average: { min: 70, label: "Industry Average", color: "bg-yellow-500" },
    poor: { min: 60, label: "Below Average", color: "bg-orange-500" },
    critical: { min: 0, label: "Needs Improvement", color: "bg-red-500" },
  }

  const getPerformanceBand = (score: number) => {
    if (score >= 90) return industryBenchmarks.excellent
    if (score >= 80) return industryBenchmarks.good
    if (score >= 70) return industryBenchmarks.average
    if (score >= 60) return industryBenchmarks.poor
    return industryBenchmarks.critical
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="bg-black/40 border-white/10">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20" />
              <div className="relative">
                <div className="text-4xl font-bold text-white">{Math.round(overallScore)}</div>
                <div className="text-sm text-gray-400">/ 100</div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Overall Performance Score</h2>
            <Badge className={getGradeColor("A")} size="lg">
              Grade A - Excellent
            </Badge>
            <p className="text-gray-400 mt-4">
              Your integration platform scores in the top 8% of all platforms in your industry
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scoringCategories.map((category, index) => (
          <Card key={index} className="bg-black/40 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  {category.category === "Reliability" && <Shield className="w-5 h-5" />}
                  {category.category === "Performance" && <Zap className="w-5 h-5" />}
                  {category.category === "Scalability" && <TrendingUp className="w-5 h-5" />}
                  {category.category === "Security" && <Shield className="w-5 h-5" />}
                  {category.category === "Developer Experience" && <Star className="w-5 h-5" />}
                  {category.category}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={getGradeColor(category.grade)}>{category.grade}</Badge>
                  <span className="text-sm text-gray-400">{category.weight}% weight</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Category Score */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-white">{category.score}</span>
                  <div className="flex-1 mx-4">
                    <Progress value={category.score} className="h-3" />
                  </div>
                  <span className={`text-sm font-medium ${getScoreColor(category.score)}`}>
                    {getPerformanceBand(category.score).label}
                  </span>
                </div>

                {/* Metrics Breakdown */}
                <div className="space-y-3">
                  {category.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="p-3 bg-black/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">{metric.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{metric.weight}%</span>
                          <span className={`text-sm font-medium ${getScoreColor(metric.score)}`}>{metric.score}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Progress value={metric.score} className="h-2 flex-1 mr-3" />
                        <span className="text-xs text-purple-300">{metric.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Improvements */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-medium text-blue-300 mb-2">Improvement Opportunities</h4>
                  <ul className="space-y-1">
                    {category.improvements.slice(0, 2).map((improvement, improvementIndex) => (
                      <li key={improvementIndex} className="text-xs text-gray-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scoring Methodology */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Scoring Methodology
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">Weighted Categories</h4>
              <div className="space-y-2">
                {scoringCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-black/20 rounded">
                    <span className="text-sm text-gray-300">{category.category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${(category.weight / 30) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-purple-300 w-8">{category.weight}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-white mb-3">Performance Bands</h4>
              <div className="space-y-2">
                {Object.entries(industryBenchmarks).map(([key, band]) => (
                  <div key={key} className="flex items-center gap-3 p-2 bg-black/20 rounded">
                    <div className={`w-3 h-3 rounded-full ${band.color}`} />
                    <span className="text-sm text-gray-300 flex-1">{band.label}</span>
                    <span className="text-xs text-gray-400">{band.min}+ points</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <h4 className="font-medium text-purple-300 mb-2">How Scores Are Calculated</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p className="mb-2">• Each metric is scored 0-100 based on industry benchmarks</p>
                <p className="mb-2">• Category scores are weighted averages of metric scores</p>
                <p>• Overall score combines all categories using their weights</p>
              </div>
              <div>
                <p className="mb-2">• Benchmarks updated monthly from industry data</p>
                <p className="mb-2">• Scores adjusted for company size and industry vertical</p>
                <p>• Historical trends tracked for performance improvement</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="font-medium text-green-300 mb-2">Quick Wins (1-2 weeks)</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Enable advanced caching for API responses</li>
                <li>• Implement request compression</li>
                <li>• Optimize database connection pooling</li>
              </ul>
              <p className="text-xs text-green-400 mt-2">Potential +3-5 point improvement</p>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="font-medium text-blue-300 mb-2">Medium Term (1-3 months)</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Implement circuit breaker patterns</li>
                <li>• Add predictive auto-scaling</li>
                <li>• Enhance monitoring and alerting</li>
              </ul>
              <p className="text-xs text-blue-400 mt-2">Potential +5-8 point improvement</p>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <h4 className="font-medium text-purple-300 mb-2">Long Term (3-6 months)</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Migrate to microservices architecture</li>
                <li>• Implement advanced AI-powered optimization</li>
                <li>• Add multi-region disaster recovery</li>
              </ul>
              <p className="text-xs text-purple-400 mt-2">Potential +8-12 point improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
