"use client"

import { CardContent } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

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
          {
            name: "Feature Adoption",
            your: "67%",
            avg: "54%",
            top: "78%",
            unit: "percentage",
          },
          { name: "Market Expansion", your: "12%", avg: "8%", top: "18%", unit: "percentage" },
          {
            name: "Innovation Index",
            your: "73/100",
            avg: "65/100",
            top: "84/100",
            unit: "score",
          },
        ],
      },
    ],
    healthcare: [
      {
        category: "Patient Data Security",
        weight: 35,
        yourScore: 94,
        industryAvg: 87.2,
        topPerformer: 98,
        metrics: [
          { name: "HIPAA Compliance", your: "98%", avg: "91%", top: "100%", unit: "percentage" },
          { name: "Data Encryption", your: "256-bit", avg: "128-bit", top: "256-bit", unit: "encryption" },
          { name: "Access Control", your: "99.2%", avg: "94.8%", top: "99.9%", unit: "percentage" },
          { name: "Audit Trail", your: "100%", avg: "89%", top: "100%", unit: "percentage" },
        ],
      },
      {
        category: "System Reliability",
        weight: 25,
        yourScore: 91,
        industryAvg: 83.4,
        topPerformer: 96,
        metrics: [
          { name: "Uptime", your: "99.95%", avg: "99.2%", top: "99.99%", unit: "percentage" },
          { name: "Response Time", your: "89ms", avg: "156ms", top: "67ms", unit: "milliseconds" },
          { name: "Error Rate", your: "0.12%", avg: "0.8%", top: "0.05%", unit: "percentage" },
          { name: "Recovery Time", your: "2.1min", avg: "8.7min", top: "1.2min", unit: "minutes" },
        ],
      },
      {
        category: "Interoperability",
        weight: 20,
        yourScore: 88,
        industryAvg: 74.6,
        topPerformer: 93,
        metrics: [
          { name: "HL7 FHIR Support", your: "R4", avg: "DSTU2", top: "R4", unit: "version" },
          { name: "API Coverage", your: "92%", avg: "67%", top: "96%", unit: "percentage" },
          { name: "Data Exchange", your: "Real-time", avg: "Batch", top: "Real-time", unit: "mode" },
          { name: "Standards Compliance", your: "94%", avg: "78%", top: "98%", unit: "percentage" },
        ],
      },
      {
        category: "Patient Experience",
        weight: 15,
        yourScore: 86,
        industryAvg: 79.1,
        topPerformer: 92,
        metrics: [
          { name: "Patient Satisfaction", your: "4.7/5", avg: "4.1/5", top: "4.9/5", unit: "rating" },
          { name: "Portal Usage", your: "78%", avg: "54%", top: "84%", unit: "percentage" },
          { name: "Mobile Access", your: "89%", avg: "67%", top: "93%", unit: "percentage" },
          { name: "Support Response", your: "3.2min", avg: "12.8min", top: "2.1min", unit: "minutes" },
        ],
      },
      {
        category: "Innovation & Growth",
        weight: 5,
        yourScore: 82,
        industryAvg: 68.9,
        topPerformer: 89,
        metrics: [
          { name: "AI Integration", your: "Advanced", avg: "Basic", top: "Advanced", unit: "level" },
          { name: "Telemedicine", your: "Full", avg: "Limited", top: "Full", unit: "support" },
          { name: "Research Participation", your: "Active", avg: "Minimal", top: "Leading", unit: "level" },
          { name: "Technology Adoption", your: "85%", avg: "62%", top: "91%", unit: "percentage" },
        ],
      },
    ],
  }

  const currentVertical = benchmarkCategories[verticalKey as keyof typeof benchmarkCategories] || []
  const overallScore = currentVertical.reduce((acc, cat) => acc + (cat.yourScore * cat.weight) / 100, 0)
  const industryAvgScore = currentVertical.reduce((acc, cat) => acc + (cat.industryAvg * cat.weight) / 100, 0)

  return (
    <div className="space-y-6">
      {/* Overall Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Performance Score</span>
            <Badge
              className={
                overallScore > industryAvgScore ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }
            >
              {overallScore > industryAvgScore ? "Above Average" : "Below Average"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{overallScore.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Your Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">{industryAvgScore.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Industry Average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {currentVertical.reduce((acc, cat) => Math.max(acc, cat.topPerformer), 0).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Top Performer</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Category Benchmarks */}
      <div className="space-y-4">
        {currentVertical.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{category.category}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Weight: {category.weight}%</span>
                  <Badge
                    className={
                      category.yourScore > category.industryAvg
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {category.yourScore > category.industryAvg ? "Leading" : "Lagging"}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{category.yourScore}</div>
                    <div className="text-sm text-muted-foreground">Your Score</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-600">{category.industryAvg}</div>
                    <div className="text-sm text-muted-foreground">Industry Avg</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{category.topPerformer}</div>
                    <div className="text-sm text-muted-foreground">Top Performer</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{metric.name}</span>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-blue-600 font-medium">You: {metric.your}</span>
                          <span className="text-gray-600">Avg: {metric.avg}</span>
                          <span className="text-green-600">Top: {metric.top}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isParticipating && (
        <Card>
          <CardHeader>
            <CardTitle>Improvement Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentVertical
                .filter((cat) => cat.yourScore < cat.industryAvg)
                .map((category, index) => (
                  <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="font-medium text-yellow-800">{category.category}</div>
                    <div className="text-sm text-yellow-700 mt-1">
                      Focus on improving this area to reach industry standards. Gap:{" "}
                      {(category.industryAvg - category.yourScore).toFixed(1)} points
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
