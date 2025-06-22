"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Star, Zap, AlertTriangle, Target, BarChart3 } from "lucide-react"

interface IndustryTrendsProps {
  vertical: any
  verticalKey: string
}

export function IndustryTrends({ vertical, verticalKey }: IndustryTrendsProps) {
  const getTrendColor = (growth: number) => {
    if (growth >= 100) return "text-green-300"
    if (growth >= 50) return "text-blue-300"
    if (growth >= 25) return "text-yellow-300"
    return "text-orange-300"
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-500/20 border-red-400 text-red-300"
      case "Medium":
        return "bg-yellow-500/20 border-yellow-400 text-yellow-300"
      case "Low":
        return "bg-green-500/20 border-green-400 text-green-300"
      default:
        return "bg-gray-500/20 border-gray-400 text-gray-300"
    }
  }

  const trendDetails = {
    fintech: {
      openBanking: {
        description: "Open banking APIs enabling third-party financial services",
        drivers: ["Regulatory mandates", "Consumer demand", "Innovation opportunities"],
        challenges: ["Security concerns", "Legacy system integration", "Standardization"],
        opportunities: ["New revenue streams", "Enhanced customer experience", "Partnership ecosystem"],
        timeline: "2024-2026",
        adoptionRate: "67%",
        marketSize: "$43.15B",
      },
      cbdc: {
        description: "Central Bank Digital Currencies transforming monetary systems",
        drivers: ["Government initiatives", "Digital transformation", "Financial inclusion"],
        challenges: ["Privacy concerns", "Technical infrastructure", "Regulatory framework"],
        opportunities: ["Reduced transaction costs", "Financial inclusion", "Programmable money"],
        timeline: "2025-2030",
        adoptionRate: "23%",
        marketSize: "$213.7B",
      },
      defi: {
        description: "Decentralized Finance protocols and applications",
        drivers: ["Blockchain adoption", "Yield farming", "Financial innovation"],
        challenges: ["Regulatory uncertainty", "Security risks", "Scalability issues"],
        opportunities: ["Disintermediation", "Global access", "Programmable finance"],
        timeline: "2024-2027",
        adoptionRate: "12%",
        marketSize: "$78.4B",
      },
      embeddedFinance: {
        description: "Financial services integrated into non-financial platforms",
        drivers: ["API economy", "Customer experience", "Revenue diversification"],
        challenges: ["Compliance complexity", "Risk management", "Technology integration"],
        opportunities: ["Market expansion", "Customer stickiness", "New business models"],
        timeline: "2024-2025",
        adoptionRate: "45%",
        marketSize: "$138.2B",
      },
      regtech: {
        description: "Technology solutions for regulatory compliance and risk management",
        drivers: ["Regulatory complexity", "Cost reduction", "Automation needs"],
        challenges: ["Data quality", "Integration complexity", "Regulatory changes"],
        opportunities: ["Operational efficiency", "Risk reduction", "Competitive advantage"],
        timeline: "2024-2026",
        adoptionRate: "78%",
        marketSize: "$19.5B",
      },
    },
    ecommerce: {
      socialCommerce: {
        description: "Shopping experiences integrated with social media platforms",
        drivers: ["Social media usage", "Influencer marketing", "Mobile commerce"],
        challenges: ["Platform dependencies", "Content moderation", "Attribution tracking"],
        opportunities: ["Viral marketing", "Community building", "Direct sales"],
        timeline: "2024-2025",
        adoptionRate: "56%",
        marketSize: "$724.1B",
      },
      voiceCommerce: {
        description: "Voice-activated shopping through smart speakers and assistants",
        drivers: ["Smart speaker adoption", "Convenience factor", "AI improvements"],
        challenges: ["Product discovery", "Security concerns", "Limited visual feedback"],
        opportunities: ["Hands-free shopping", "Personalization", "Recurring purchases"],
        timeline: "2024-2027",
        adoptionRate: "34%",
        marketSize: "$19.4B",
      },
      sustainableCommerce: {
        description: "Eco-friendly and socially responsible commerce practices",
        drivers: ["Consumer awareness", "Regulatory pressure", "Brand differentiation"],
        challenges: ["Supply chain complexity", "Cost implications", "Verification challenges"],
        opportunities: ["Brand loyalty", "Premium pricing", "Market differentiation"],
        timeline: "2024-2026",
        adoptionRate: "67%",
        marketSize: "$15.7B",
      },
      liveCommerce: {
        description: "Real-time shopping experiences through live streaming",
        drivers: ["Social engagement", "Interactive experiences", "Influencer culture"],
        challenges: ["Content creation", "Technology requirements", "Audience building"],
        opportunities: ["Higher engagement", "Impulse purchases", "Community building"],
        timeline: "2024-2025",
        adoptionRate: "28%",
        marketSize: "$32.6B",
      },
      headlessCommerce: {
        description: "Decoupled frontend and backend commerce architectures",
        drivers: ["Omnichannel needs", "Developer flexibility", "Performance requirements"],
        challenges: ["Technical complexity", "Integration challenges", "Skill requirements"],
        opportunities: ["Faster innovation", "Better performance", "Omnichannel experiences"],
        timeline: "2024-2026",
        adoptionRate: "41%",
        marketSize: "$8.9B",
      },
    },
  }

  const emergingTechnologies = {
    fintech: [
      { name: "Quantum Computing", impact: "Revolutionary", timeline: "2030+", readiness: "Research" },
      { name: "AI/ML Risk Models", impact: "High", timeline: "2024-2025", readiness: "Pilot" },
      { name: "Biometric Authentication", impact: "Medium", timeline: "2024-2026", readiness: "Production" },
      { name: "Blockchain Infrastructure", impact: "High", timeline: "2025-2027", readiness: "Development" },
    ],
    ecommerce: [
      { name: "AR/VR Shopping", impact: "High", timeline: "2025-2027", readiness: "Pilot" },
      { name: "AI Personalization", impact: "High", timeline: "2024-2025", readiness: "Production" },
      { name: "Drone Delivery", impact: "Medium", timeline: "2026-2028", readiness: "Pilot" },
      { name: "IoT Commerce", impact: "Medium", timeline: "2025-2027", readiness: "Development" },
    ],
  }

  const competitiveIntelligence = [
    {
      trend: "API-First Architecture",
      yourPosition: "Leader",
      marketShare: "23%",
      competitors: ["TechCorp", "InnovatePay", "DigitalFirst"],
      advantage: "Early adoption and comprehensive API suite",
    },
    {
      trend: "Real-time Processing",
      yourPosition: "Strong",
      marketShare: "18%",
      competitors: ["SpeedTech", "RealTimePay", "FastFlow"],
      advantage: "Superior latency and throughput performance",
    },
    {
      trend: "Embedded Finance",
      yourPosition: "Emerging",
      marketShare: "8%",
      competitors: ["EmbedPay", "FinanceFlow", "IntegratedTech"],
      advantage: "Strong partnership ecosystem and integration capabilities",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Market Trends Overview */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Key Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(vertical.marketTrends).map(([trend, data]: [string, any]) => (
              <div key={trend} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white capitalize">{trend.replace(/([A-Z])/g, " $1").trim()}</h3>
                  <Badge className={getImpactColor(data.impact)}>{data.impact}</Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400">Growth Rate</p>
                    <p className={`text-2xl font-bold ${getTrendColor(data.growth)}`}>+{data.growth}%</p>
                  </div>

                  {trendDetails[verticalKey as keyof typeof trendDetails]?.[
                    trend as keyof typeof trendDetails.fintech
                  ] && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Adoption Rate:</span>
                        <span className="text-white">
                          {
                            trendDetails[verticalKey as keyof typeof trendDetails][
                              trend as keyof typeof trendDetails.fintech
                            ].adoptionRate
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Market Size:</span>
                        <span className="text-white">
                          {
                            trendDetails[verticalKey as keyof typeof trendDetails][
                              trend as keyof typeof trendDetails.fintech
                            ].marketSize
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Timeline:</span>
                        <span className="text-white">
                          {
                            trendDetails[verticalKey as keyof typeof trendDetails][
                              trend as keyof typeof trendDetails.fintech
                            ].timeline
                          }
                        </span>
                      </div>
                    </div>
                  )}

                  <Button size="sm" variant="outline" className="w-full border-purple-400 text-purple-300">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Trend Analysis */}
      {trendDetails[verticalKey as keyof typeof trendDetails] && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5" />
              Detailed Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(trendDetails[verticalKey as keyof typeof trendDetails])
                .slice(0, 2)
                .map(([trend, details]: [string, any]) => (
                  <div key={trend} className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white capitalize">{trend.replace(/([A-Z])/g, " $1").trim()}</h3>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-500/20 border-blue-400 text-blue-300">
                          {details.adoptionRate} adoption
                        </Badge>
                        <Badge className="bg-green-500/20 border-green-400 text-green-300">{details.marketSize}</Badge>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{details.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-300 mb-2">Key Drivers</h4>
                        <ul className="space-y-1">
                          {details.drivers.map((driver: string, index: number) => (
                            <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                              <TrendingUp className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                              {driver}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-orange-300 mb-2">Challenges</h4>
                        <ul className="space-y-1">
                          {details.challenges.map((challenge: string, index: number) => (
                            <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                              <AlertTriangle className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-blue-300 mb-2">Opportunities</h4>
                        <ul className="space-y-1">
                          {details.opportunities.map((opportunity: string, index: number) => (
                            <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                              <Target className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                              {opportunity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="border-green-400 text-green-300">
                        Strategic Assessment
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-400 text-blue-300">
                        Implementation Roadmap
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
                        Competitive Analysis
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emerging Technologies */}
      {emergingTechnologies[verticalKey as keyof typeof emergingTechnologies] && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Emerging Technologies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergingTechnologies[verticalKey as keyof typeof emergingTechnologies].map((tech, index) => (
                <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">{tech.name}</h3>
                    <Badge
                      className={
                        tech.impact === "Revolutionary"
                          ? "bg-purple-500/20 border-purple-400 text-purple-300"
                          : tech.impact === "High"
                            ? "bg-red-500/20 border-red-400 text-red-300"
                            : "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                      }
                    >
                      {tech.impact}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Timeline:</span>
                      <span className="text-white">{tech.timeline}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Readiness:</span>
                      <Badge
                        className={
                          tech.readiness === "Production"
                            ? "bg-green-500/20 border-green-400 text-green-300"
                            : tech.readiness === "Pilot"
                              ? "bg-blue-500/20 border-blue-400 text-blue-300"
                              : tech.readiness === "Development"
                                ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                                : "bg-gray-500/20 border-gray-400 text-gray-300"
                        }
                      >
                        {tech.readiness}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Competitive Intelligence */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Competitive Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitiveIntelligence.map((intel, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">{intel.trend}</h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        intel.yourPosition === "Leader"
                          ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                          : intel.yourPosition === "Strong"
                            ? "bg-green-500/20 border-green-400 text-green-300"
                            : "bg-blue-500/20 border-blue-400 text-blue-300"
                      }
                    >
                      {intel.yourPosition}
                    </Badge>
                    <Badge variant="outline" className="border-purple-400 text-purple-300">
                      {intel.marketShare} share
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3">{intel.advantage}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Key Competitors</p>
                    <div className="flex gap-1 mt-1">
                      {intel.competitors.map((competitor, compIndex) => (
                        <Badge key={compIndex} variant="secondary" className="text-xs">
                          {competitor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-blue-400 text-blue-300">
                    Deep Dive
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trend Impact Assessment */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Strategic Impact Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-green-300 mb-3">High Priority Trends</h3>
              <div className="space-y-3">
                {Object.entries(vertical.marketTrends)
                  .filter(([_, data]: [string, any]) => data.impact === "High")
                  .map(([trend, data]: [string, any]) => (
                    <div key={trend} className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex justify-between items-center">
                        <span className="text-white capitalize">{trend.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="text-green-300">+{data.growth}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-blue-300 mb-3">Strategic Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="font-medium text-white mb-1">Invest in API Infrastructure</h4>
                  <p className="text-sm text-gray-300">
                    Strengthen API-first capabilities to capitalize on embedded finance trend
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="font-medium text-white mb-1">Enhance Security Posture</h4>
                  <p className="text-sm text-gray-300">
                    Implement advanced security measures for regulatory compliance
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="font-medium text-white mb-1">Develop Partnership Ecosystem</h4>
                  <p className="text-sm text-gray-300">Build strategic partnerships to accelerate market penetration</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
