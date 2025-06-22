"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Zap, Filter, Building, DollarSign, Code, Globe, Users, Star } from "lucide-react"

export function PeerMatching() {
  const [selectedCriteria, setSelectedCriteria] = useState({
    industry: ["fintech", "saas"],
    size: ["growth", "enterprise"],
    revenue: ["10m-100m", "100m+"],
    techStack: ["api-first", "microservices"],
    geography: ["north-america", "global"],
    businessModel: ["b2b", "platform"],
  })

  const matchingAlgorithms = [
    {
      name: "Multi-Dimensional Clustering",
      description: "Advanced ML algorithm that considers multiple company attributes",
      accuracy: 94,
      factors: ["Industry vertical", "Company size", "Revenue range", "Tech stack", "Geography", "Business model"],
      status: "active",
    },
    {
      name: "Performance-Based Matching",
      description: "Groups companies with similar performance characteristics",
      accuracy: 89,
      factors: ["Response times", "Uptime patterns", "Throughput levels", "Error rates", "Scalability"],
      status: "active",
    },
    {
      name: "Behavioral Similarity",
      description: "Matches based on API usage patterns and integration behaviors",
      accuracy: 87,
      factors: ["Usage patterns", "Peak traffic times", "Integration complexity", "Customer segments"],
      status: "beta",
    },
    {
      name: "Market Position Clustering",
      description: "Groups companies with similar market positioning and competitive landscape",
      accuracy: 91,
      factors: ["Market share", "Competitive position", "Growth trajectory", "Customer base"],
      status: "active",
    },
  ]

  const potentialMatches = [
    {
      name: "CloudSync Enterprise",
      matchScore: 96,
      industry: "SaaS",
      size: "Enterprise",
      revenue: "$120M",
      employees: "1,400+",
      logo: "☁️",
      reasons: [
        "Similar enterprise customer base",
        "Comparable API complexity",
        "Matching performance requirements",
        "Same geographic markets",
      ],
      metrics: {
        responseTime: "152ms",
        uptime: "99.94%",
        throughput: "2,456 req/s",
        errorRate: "0.9%",
      },
      commonChallenges: ["Enterprise security requirements", "High availability demands", "Complex integrations"],
    },
    {
      name: "DataFlow Systems",
      matchScore: 93,
      industry: "FinTech",
      size: "Growth",
      revenue: "$85M",
      employees: "800+",
      logo: "📊",
      reasons: [
        "Similar growth stage",
        "Comparable technical architecture",
        "Matching compliance requirements",
        "Similar customer segments",
      ],
      metrics: {
        responseTime: "168ms",
        uptime: "99.89%",
        throughput: "1,987 req/s",
        errorRate: "1.1%",
      },
      commonChallenges: ["Scaling infrastructure", "Regulatory compliance", "Real-time processing"],
    },
    {
      name: "IntegrationHub Pro",
      matchScore: 91,
      industry: "Cross-industry",
      size: "Enterprise",
      revenue: "$200M",
      employees: "2,100+",
      logo: "🔗",
      reasons: [
        "API-first architecture",
        "Developer-focused platform",
        "Similar integration patterns",
        "Comparable scale",
      ],
      metrics: {
        responseTime: "143ms",
        uptime: "99.96%",
        throughput: "3,124 req/s",
        errorRate: "0.7%",
      },
      commonChallenges: ["Developer experience", "Platform scalability", "Multi-tenant architecture"],
    },
    {
      name: "TechBridge Solutions",
      matchScore: 88,
      industry: "B2B SaaS",
      size: "Growth",
      revenue: "$65M",
      employees: "600+",
      logo: "🌉",
      reasons: ["B2B focus", "Similar technology stack", "Comparable growth metrics", "Matching market position"],
      metrics: {
        responseTime: "189ms",
        uptime: "99.82%",
        throughput: "1,654 req/s",
        errorRate: "1.3%",
      },
      commonChallenges: ["Customer acquisition", "Product-market fit", "Technical debt"],
    },
  ]

  const criteriaOptions = {
    industry: [
      { value: "fintech", label: "FinTech", count: 247 },
      { value: "saas", label: "SaaS", count: 312 },
      { value: "ecommerce", label: "E-commerce", count: 189 },
      { value: "healthcare", label: "Healthcare", count: 156 },
      { value: "logistics", label: "Logistics", count: 98 },
    ],
    size: [
      { value: "startup", label: "Startup (1-100)", count: 156 },
      { value: "growth", label: "Growth (100-1000)", count: 234 },
      { value: "enterprise", label: "Enterprise (1000+)", count: 189 },
    ],
    revenue: [
      { value: "1m-10m", label: "$1M-$10M", count: 145 },
      { value: "10m-100m", label: "$10M-$100M", count: 198 },
      { value: "100m+", label: "$100M+", count: 167 },
    ],
    techStack: [
      { value: "api-first", label: "API-First", count: 234 },
      { value: "microservices", label: "Microservices", count: 189 },
      { value: "serverless", label: "Serverless", count: 123 },
      { value: "monolith", label: "Monolithic", count: 87 },
    ],
    geography: [
      { value: "north-america", label: "North America", count: 298 },
      { value: "europe", label: "Europe", count: 234 },
      { value: "asia-pacific", label: "Asia Pacific", count: 156 },
      { value: "global", label: "Global", count: 189 },
    ],
    businessModel: [
      { value: "b2b", label: "B2B", count: 345 },
      { value: "b2c", label: "B2C", count: 234 },
      { value: "platform", label: "Platform", count: 189 },
      { value: "marketplace", label: "Marketplace", count: 123 },
    ],
  }

  const toggleCriteria = (category: string, value: string) => {
    setSelectedCriteria((prev) => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].includes(value)
        ? prev[category as keyof typeof prev].filter((item) => item !== value)
        : [...prev[category as keyof typeof prev], value],
    }))
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 95) return "text-green-300"
    if (score >= 90) return "text-blue-300"
    if (score >= 85) return "text-yellow-300"
    return "text-orange-300"
  }

  return (
    <div className="space-y-6">
      {/* Matching Algorithms */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Peer Matching Algorithms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {matchingAlgorithms.map((algorithm, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">{algorithm.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        algorithm.status === "active"
                          ? "bg-green-500/20 border-green-400 text-green-300"
                          : "bg-blue-500/20 border-blue-400 text-blue-300"
                      }
                    >
                      {algorithm.status}
                    </Badge>
                    <Badge variant="outline" className="border-purple-400 text-purple-300">
                      {algorithm.accuracy}% accuracy
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3">{algorithm.description}</p>

                <div>
                  <h4 className="text-xs font-medium text-blue-300 mb-2">Matching Factors</h4>
                  <div className="flex flex-wrap gap-1">
                    {algorithm.factors.map((factor, factorIndex) => (
                      <Badge key={factorIndex} variant="secondary" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Matching Criteria */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Matching Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(criteriaOptions).map(([category, options]) => (
              <div key={category}>
                <h3 className="font-medium text-white mb-3 capitalize flex items-center gap-2">
                  {category === "industry" && <Building className="w-4 h-4" />}
                  {category === "size" && <Users className="w-4 h-4" />}
                  {category === "revenue" && <DollarSign className="w-4 h-4" />}
                  {category === "techStack" && <Code className="w-4 h-4" />}
                  {category === "geography" && <Globe className="w-4 h-4" />}
                  {category === "businessModel" && <Target className="w-4 h-4" />}
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleCriteria(category, option.value)}
                      className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                        selectedCriteria[category as keyof typeof selectedCriteria].includes(option.value)
                          ? "bg-purple-500/20 border-purple-500/30 text-purple-300"
                          : "bg-black/20 border-white/10 text-gray-300 hover:border-white/20"
                      }`}
                    >
                      {option.label}
                      <span className="ml-1 text-xs opacity-70">({option.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="border-gray-400 text-gray-300">
              Reset Filters
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Target className="w-4 h-4 mr-2" />
              Find Matches
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Potential Matches */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5" />
              Potential Peer Matches
            </CardTitle>
            <Badge variant="outline" className="border-green-400 text-green-300">
              {potentialMatches.length} matches found
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {potentialMatches.map((match, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{match.logo}</span>
                    <div>
                      <h3 className="font-semibold text-white">{match.name}</h3>
                      <p className="text-sm text-gray-400">
                        {match.industry} • {match.size} • {match.employees} employees
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getMatchScoreColor(match.matchScore)}`}>{match.matchScore}%</p>
                    <p className="text-sm text-gray-400">Match Score</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium text-green-300 mb-2">Why This Match?</h4>
                    <ul className="space-y-1">
                      {match.reasons.map((reason, reasonIndex) => (
                        <li key={reasonIndex} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-300 mb-2">Common Challenges</h4>
                    <ul className="space-y-1">
                      {match.commonChallenges.map((challenge, challengeIndex) => (
                        <li key={challengeIndex} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-xs text-gray-400">Response Time</p>
                    <p className="text-sm font-medium text-white">{match.metrics.responseTime}</p>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-xs text-gray-400">Uptime</p>
                    <p className="text-sm font-medium text-white">{match.metrics.uptime}</p>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-xs text-gray-400">Throughput</p>
                    <p className="text-sm font-medium text-white">{match.metrics.throughput}</p>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded">
                    <p className="text-xs text-gray-400">Error Rate</p>
                    <p className="text-sm font-medium text-white">{match.metrics.errorRate}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Add to Peer Group
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-400 text-blue-300">
                    View Detailed Comparison
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-400 text-gray-300">
                    Save for Later
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
