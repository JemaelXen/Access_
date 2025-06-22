"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, CheckCircle, AlertTriangle, Star, Target, TrendingUp, Shield, Clock, Users, Award } from "lucide-react"

export function BestPractices() {
  const practiceCategories = [
    {
      category: "Performance Optimization",
      icon: Zap,
      practices: [
        {
          title: "Implement Response Caching",
          description: "Cache frequently requested data to reduce response times by up to 60%",
          impact: "High",
          effort: "Medium",
          implemented: true,
          industryAdoption: 78,
          recommendation: "Extend caching to include personalized responses",
        },
        {
          title: "Use Connection Pooling",
          description: "Maintain persistent database connections to reduce latency",
          impact: "Medium",
          effort: "Low",
          implemented: true,
          industryAdoption: 92,
          recommendation: "Optimize pool size based on traffic patterns",
        },
        {
          title: "Enable Request Compression",
          description: "Compress API responses to reduce bandwidth and improve speed",
          impact: "Medium",
          effort: "Low",
          implemented: false,
          industryAdoption: 65,
          recommendation: "Implement gzip compression for responses >1KB",
        },
        {
          title: "Implement CDN Distribution",
          description: "Use content delivery networks for global performance optimization",
          impact: "High",
          effort: "High",
          implemented: true,
          industryAdoption: 84,
          recommendation: "Add more edge locations in APAC region",
        },
      ],
    },
    {
      category: "Reliability & Resilience",
      icon: Shield,
      practices: [
        {
          title: "Circuit Breaker Pattern",
          description: "Prevent cascade failures by implementing circuit breakers",
          impact: "High",
          effort: "Medium",
          implemented: false,
          industryAdoption: 56,
          recommendation: "Critical for maintaining 99.99% uptime target",
        },
        {
          title: "Graceful Degradation",
          description: "Provide reduced functionality when systems are under stress",
          impact: "Medium",
          effort: "Medium",
          implemented: true,
          industryAdoption: 43,
          recommendation: "Expand to cover more non-critical features",
        },
        {
          title: "Health Check Endpoints",
          description: "Implement comprehensive health monitoring endpoints",
          impact: "Medium",
          effort: "Low",
          implemented: true,
          industryAdoption: 89,
          recommendation: "Add dependency health checks",
        },
        {
          title: "Automated Failover",
          description: "Automatically switch to backup systems during failures",
          impact: "High",
          effort: "High",
          implemented: true,
          industryAdoption: 67,
          recommendation: "Test failover procedures monthly",
        },
      ],
    },
    {
      category: "Security & Compliance",
      icon: Shield,
      practices: [
        {
          title: "Rate Limiting",
          description: "Implement intelligent rate limiting to prevent abuse",
          impact: "High",
          effort: "Medium",
          implemented: true,
          industryAdoption: 94,
          recommendation: "Add user-based dynamic rate limits",
        },
        {
          title: "API Key Rotation",
          description: "Regularly rotate API keys and provide rotation tools",
          impact: "Medium",
          effort: "Medium",
          implemented: false,
          industryAdoption: 38,
          recommendation: "Implement automated 90-day rotation",
        },
        {
          title: "Request Signing",
          description: "Use cryptographic signatures to verify request authenticity",
          impact: "High",
          effort: "High",
          implemented: true,
          industryAdoption: 72,
          recommendation: "Consider implementing webhook signing",
        },
        {
          title: "Audit Logging",
          description: "Comprehensive logging of all API access and changes",
          impact: "Medium",
          effort: "Low",
          implemented: true,
          industryAdoption: 81,
          recommendation: "Add real-time anomaly detection",
        },
      ],
    },
    {
      category: "Developer Experience",
      icon: Users,
      practices: [
        {
          title: "Interactive Documentation",
          description: "Provide interactive API documentation with live examples",
          impact: "High",
          effort: "Medium",
          implemented: false,
          industryAdoption: 76,
          recommendation: "Critical for developer adoption",
        },
        {
          title: "SDK Code Generation",
          description: "Auto-generate SDKs from API specifications",
          impact: "Medium",
          effort: "High",
          implemented: true,
          industryAdoption: 52,
          recommendation: "Add more programming languages",
        },
        {
          title: "Sandbox Environment",
          description: "Provide isolated testing environment for developers",
          impact: "Medium",
          effort: "Medium",
          implemented: true,
          industryAdoption: 68,
          recommendation: "Add realistic test data scenarios",
        },
        {
          title: "Error Message Standards",
          description: "Consistent, helpful error messages with resolution guidance",
          impact: "Medium",
          effort: "Low",
          implemented: true,
          industryAdoption: 45,
          recommendation: "Add error code documentation",
        },
      ],
    },
  ]

  const industryBenchmarks = [
    {
      metric: "API Response Time",
      yourValue: "145ms",
      industryBest: "89ms",
      industryAvg: "220ms",
      recommendation: "Target sub-100ms for competitive advantage",
    },
    {
      metric: "Uptime SLA",
      yourValue: "99.97%",
      industryBest: "99.99%",
      industryAvg: "99.5%",
      recommendation: "Aim for 99.99% to match industry leaders",
    },
    {
      metric: "Error Rate",
      yourValue: "0.8%",
      industryBest: "0.1%",
      industryAvg: "2.1%",
      recommendation: "Implement better error handling and validation",
    },
    {
      metric: "MTTR",
      yourValue: "4.2 min",
      industryBest: "1.8 min",
      industryAvg: "8.7 min",
      recommendation: "Automate incident response procedures",
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "border-red-400 text-red-300 bg-red-500/10"
      case "Medium":
        return "border-yellow-400 text-yellow-300 bg-yellow-500/10"
      case "Low":
        return "border-green-400 text-green-300 bg-green-500/10"
      default:
        return "border-gray-400 text-gray-300 bg-gray-500/10"
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "High":
        return "border-red-400 text-red-300"
      case "Medium":
        return "border-yellow-400 text-yellow-300"
      case "Low":
        return "border-green-400 text-green-300"
      default:
        return "border-gray-400 text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Best Practices Overview */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5" />
            Industry Best Practices Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Implemented</h3>
              <p className="text-2xl font-bold text-green-300">12</p>
              <p className="text-sm text-gray-400">Best practices in use</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Pending</h3>
              <p className="text-2xl font-bold text-yellow-300">4</p>
              <p className="text-sm text-gray-400">Recommended additions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Adoption Rate</h3>
              <p className="text-2xl font-bold text-purple-300">75%</p>
              <p className="text-sm text-gray-400">vs industry average</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Maturity Score</h3>
              <p className="text-2xl font-bold text-blue-300">8.2</p>
              <p className="text-sm text-gray-400">out of 10</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practice Categories */}
      {practiceCategories.map((category, categoryIndex) => {
        const IconComponent = category.icon
        return (
          <Card key={categoryIndex} className="bg-black/40 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <IconComponent className="w-5 h-5" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.practices.map((practice, practiceIndex) => (
                  <div
                    key={practiceIndex}
                    className={`p-4 rounded-lg border ${
                      practice.implemented
                        ? "bg-green-500/5 border-green-500/20"
                        : "bg-yellow-500/5 border-yellow-500/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-white">{practice.title}</h3>
                          {practice.implemented ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{practice.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Badge className={getImpactColor(practice.impact)}>{practice.impact} Impact</Badge>
                        <Badge variant="outline" className={getEffortColor(practice.effort)}>
                          {practice.effort} Effort
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-blue-300 mb-2">Industry Adoption</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${practice.industryAdoption}%` }}
                            />
                          </div>
                          <span className="text-sm text-blue-300">{practice.industryAdoption}%</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-purple-300 mb-2">Recommendation</h4>
                        <p className="text-xs text-gray-300">{practice.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Industry Benchmarks */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Performance Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {industryBenchmarks.map((benchmark, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">{benchmark.metric}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Your Value</p>
                      <p className="font-medium text-purple-300">{benchmark.yourValue}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Industry Best</p>
                      <p className="font-medium text-green-300">{benchmark.industryBest}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Industry Avg</p>
                      <p className="font-medium text-gray-300">{benchmark.industryAvg}</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                  <p className="text-sm text-blue-300">{benchmark.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Roadmap */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Implementation Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h3 className="font-medium text-green-300 mb-3">Quick Wins (1-4 weeks)</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  Enable request compression
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  Implement API key rotation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  Add error code documentation
                </li>
              </ul>
              <Badge className="mt-3 bg-green-500/20 border-green-400 text-green-300">Low effort, high impact</Badge>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h3 className="font-medium text-blue-300 mb-3">Medium Term (1-3 months)</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-blue-400 mt-0.5" />
                  Implement circuit breaker pattern
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-blue-400 mt-0.5" />
                  Build interactive documentation
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-blue-400 mt-0.5" />
                  Add real-time anomaly detection
                </li>
              </ul>
              <Badge className="mt-3 bg-blue-500/20 border-blue-400 text-blue-300">Medium effort, high value</Badge>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <h3 className="font-medium text-purple-300 mb-3">Long Term (3-6 months)</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-purple-400 mt-0.5" />
                  Advanced SDK code generation
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-purple-400 mt-0.5" />
                  AI-powered optimization
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-purple-400 mt-0.5" />
                  Multi-region expansion
                </li>
              </ul>
              <Badge className="mt-3 bg-purple-500/20 border-purple-400 text-purple-300">Strategic investments</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
