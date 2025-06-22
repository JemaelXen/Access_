"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, BarChart3, Activity, Zap, Shield } from "lucide-react"

interface VerticalMetricsProps {
  vertical: any
  verticalKey: string
}

export function VerticalMetrics({ vertical, verticalKey }: VerticalMetricsProps) {
  const isParticipating = vertical.yourRank !== "N/A"

  // Mock your performance data for participating verticals
  const yourMetrics = {
    fintech: {
      responseTime: "145ms",
      uptime: "99.97%",
      throughput: "2,847 req/s",
      errorRate: "0.8%",
      securityScore: "96/100",
      complianceScore: "98/100",
    },
    ecommerce: {
      responseTime: "178ms",
      uptime: "99.91%",
      throughput: "3,456 req/s",
      errorRate: "1.1%",
      securityScore: "89/100",
      complianceScore: "92/100",
    },
  }

  const getMetricComparison = (yourValue: string, industryAvg: string, isLowerBetter = false) => {
    const yourNum = Number.parseFloat(yourValue.replace(/[^\d.-]/g, ""))
    const avgNum = Number.parseFloat(industryAvg.replace(/[^\d.-]/g, ""))

    const diff = isLowerBetter ? avgNum - yourNum : yourNum - avgNum
    const percentage = Math.abs((diff / avgNum) * 100)

    if (diff > 0) {
      return { status: "better", percentage: percentage.toFixed(1), color: "text-green-300" }
    } else if (diff < 0) {
      return { status: "worse", percentage: percentage.toFixed(1), color: "text-red-300" }
    } else {
      return { status: "equal", percentage: "0", color: "text-gray-300" }
    }
  }

  const verticalSpecificMetrics = {
    fintech: [
      { name: "Transaction Volume", value: "2.4M/day", benchmark: "1.8M/day", unit: "transactions" },
      { name: "Fraud Detection Rate", value: "99.7%", benchmark: "98.9%", unit: "accuracy" },
      { name: "KYC Processing Time", value: "2.3 min", benchmark: "4.1 min", unit: "minutes" },
      { name: "Regulatory Reporting", value: "100%", benchmark: "96.8%", unit: "compliance" },
      { name: "Cross-border Success", value: "97.2%", benchmark: "94.1%", unit: "success rate" },
      { name: "Mobile App Rating", value: "4.8/5", benchmark: "4.3/5", unit: "rating" },
    ],
    healthcare: [
      { name: "Patient Data Security", value: "N/A", benchmark: "98.5%", unit: "compliance" },
      { name: "Interoperability Score", value: "N/A", benchmark: "87.2%", unit: "compatibility" },
      { name: "Clinical Decision Support", value: "N/A", benchmark: "91.4%", unit: "accuracy" },
      { name: "Patient Engagement", value: "N/A", benchmark: "76.8%", unit: "engagement" },
      { name: "Telehealth Quality", value: "N/A", benchmark: "89.3%", unit: "quality score" },
      { name: "Medication Adherence", value: "N/A", benchmark: "82.7%", unit: "adherence rate" },
    ],
    ecommerce: [
      { name: "Conversion Rate", value: "3.8%", benchmark: "2.9%", unit: "conversion" },
      { name: "Cart Abandonment", value: "67.2%", benchmark: "71.4%", unit: "abandonment" },
      { name: "Page Load Speed", value: "1.8s", benchmark: "2.4s", unit: "seconds" },
      { name: "Mobile Experience", value: "94/100", benchmark: "87/100", unit: "score" },
      { name: "Payment Success", value: "98.7%", benchmark: "96.2%", unit: "success rate" },
      { name: "Customer Satisfaction", value: "4.6/5", benchmark: "4.1/5", unit: "rating" },
    ],
    logistics: [
      { name: "On-time Delivery", value: "N/A", benchmark: "94.2%", unit: "delivery rate" },
      { name: "Route Optimization", value: "N/A", benchmark: "87.6%", unit: "efficiency" },
      { name: "Fuel Efficiency", value: "N/A", benchmark: "8.2 MPG", unit: "miles per gallon" },
      { name: "Damage Rate", value: "N/A", benchmark: "0.8%", unit: "damage rate" },
      { name: "Driver Safety Score", value: "N/A", benchmark: "92.4/100", unit: "safety score" },
      { name: "Customer Tracking", value: "N/A", benchmark: "96.7%", unit: "visibility" },
    ],
    education: [
      { name: "Student Engagement", value: "N/A", benchmark: "78.4%", unit: "engagement" },
      { name: "Course Completion", value: "N/A", benchmark: "67.8%", unit: "completion rate" },
      { name: "Learning Outcomes", value: "N/A", benchmark: "84.2%", unit: "achievement" },
      { name: "Platform Accessibility", value: "N/A", benchmark: "91.5%", unit: "accessibility" },
      { name: "Instructor Satisfaction", value: "N/A", benchmark: "4.2/5", unit: "rating" },
      { name: "Content Quality", value: "N/A", benchmark: "89.7%", unit: "quality score" },
    ],
    proptech: [
      { name: "Tenant Satisfaction", value: "N/A", benchmark: "82.6%", unit: "satisfaction" },
      { name: "Maintenance Response", value: "N/A", benchmark: "4.2 hours", unit: "response time" },
      { name: "Occupancy Rate", value: "N/A", benchmark: "94.8%", unit: "occupancy" },
      { name: "Energy Efficiency", value: "N/A", benchmark: "87.3%", unit: "efficiency" },
      { name: "Rent Collection", value: "N/A", benchmark: "96.7%", unit: "collection rate" },
      { name: "Property Valuation", value: "N/A", benchmark: "92.4%", unit: "accuracy" },
    ],
    energy: [
      { name: "Grid Reliability", value: "N/A", benchmark: "99.8%", unit: "reliability" },
      { name: "Energy Efficiency", value: "N/A", benchmark: "89.4%", unit: "efficiency" },
      { name: "Renewable Integration", value: "N/A", benchmark: "34.7%", unit: "renewable mix" },
      { name: "Demand Response", value: "N/A", benchmark: "78.9%", unit: "response rate" },
      { name: "Outage Recovery", value: "N/A", benchmark: "2.3 hours", unit: "recovery time" },
      { name: "Customer Satisfaction", value: "N/A", benchmark: "86.2%", unit: "satisfaction" },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Core Performance Metrics */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Core Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(vertical.industryMetrics).map(([metric, industryValue]) => {
              const metricKey = metric.replace("avg", "").toLowerCase()
              const yourValue =
                isParticipating && yourMetrics[verticalKey as keyof typeof yourMetrics]
                  ? yourMetrics[verticalKey as keyof typeof yourMetrics][metricKey as keyof typeof yourMetrics.fintech]
                  : null

              const isLowerBetter = metric.includes("errorRate") || metric.includes("responseTime")
              const comparison = yourValue
                ? getMetricComparison(yourValue, industryValue as string, isLowerBetter)
                : null

              return (
                <div key={metric} className="p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white capitalize">
                      {metric
                        .replace(/([A-Z])/g, " $1")
                        .replace("avg", "")
                        .trim()}
                    </h3>
                    {comparison && (
                      <Badge
                        className={`${comparison.color.replace("text-", "bg-").replace("-300", "-500/20")} border-${comparison.color.replace("text-", "").replace("-300", "-400")} ${comparison.color}`}
                      >
                        {comparison.status === "better" ? "↑" : comparison.status === "worse" ? "↓" : "="}
                        {comparison.percentage}%
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    {yourValue && (
                      <div>
                        <p className="text-xs text-purple-300">Your Performance</p>
                        <p className="text-lg font-bold text-white">{yourValue}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-400">Industry Average</p>
                      <p className="text-sm font-medium text-gray-300">{industryValue as string}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Vertical-Specific Metrics */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            {vertical.name} Specific Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verticalSpecificMetrics[verticalKey as keyof typeof verticalSpecificMetrics]?.map((metric, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{metric.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {metric.unit}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {metric.value !== "N/A" ? (
                    <>
                      <div>
                        <p className="text-xs text-purple-300">Your Performance</p>
                        <p className="text-lg font-bold text-white">{metric.value}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Industry Benchmark</p>
                        <p className="text-sm font-medium text-gray-300">{metric.benchmark}</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="text-xs text-gray-400">Industry Benchmark</p>
                      <p className="text-lg font-bold text-gray-300">{metric.benchmark}</p>
                      <Badge className="bg-orange-500/20 border-orange-400 text-orange-300 mt-2">Join to Compare</Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Distribution */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Performance Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {vertical.subVerticals.map((subVertical: any, index: number) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{subVertical.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        subVertical.yourRank === "N/A"
                          ? "bg-gray-600/20 text-gray-400 border-gray-600/30"
                          : subVertical.yourRank === 1
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      }
                    >
                      {subVertical.yourRank === "N/A" ? "Not Participating" : `#${subVertical.yourRank}`}
                    </Badge>
                    <span className="text-sm text-gray-400">{subVertical.avgScore}/100</span>
                  </div>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full relative"
                    style={{ width: `${subVertical.avgScore}%` }}
                  >
                    {subVertical.yourRank !== "N/A" && (
                      <div
                        className="absolute top-0 w-1 h-3 bg-yellow-400 rounded-full"
                        style={{ left: `${Math.min(95, Math.max(5, subVertical.yourRank === 1 ? 95 : 85))}%` }}
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-400">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metric Trends */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Metric Trends (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-green-300">Improving Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <span className="text-white">Response Time</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">-12.5%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <span className="text-white">Security Score</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">+8.3%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <span className="text-white">Throughput</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">+15.7%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-orange-300">Areas for Focus</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <span className="text-white">Error Rate</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-400 rotate-180" />
                    <span className="text-orange-300">+2.1%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <span className="text-white">Compliance Score</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-400 rotate-180" />
                    <span className="text-orange-300">-1.8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-500/10 rounded-lg border border-gray-500/20">
                  <span className="text-white">Uptime</span>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 text-gray-400">—</span>
                    <span className="text-gray-300">Stable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Positioning */}
      {isParticipating && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Competitive Positioning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-300">{vertical.yourRank}</p>
                <p className="text-sm text-gray-400">Overall Rank</p>
                <p className="text-xs text-yellow-300 mt-1">
                  Top {Math.round((vertical.yourRank / vertical.totalCompanies) * 100)}%
                </p>
              </div>

              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-300">
                  {vertical.subVerticals.filter((sv: any) => sv.yourRank === 1).length}
                </p>
                <p className="text-sm text-gray-400">Category Leaders</p>
                <p className="text-xs text-green-300 mt-1">
                  {Math.round(
                    (vertical.subVerticals.filter((sv: any) => sv.yourRank === 1).length /
                      vertical.subVerticals.length) *
                      100,
                  )}
                  % dominance
                </p>
              </div>

              <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-300">+{(vertical.yourRank === 1 ? 8.5 : 5.2).toFixed(1)}</p>
                <p className="text-sm text-gray-400">Points Above Avg</p>
                <p className="text-xs text-blue-300 mt-1">Strong performance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
