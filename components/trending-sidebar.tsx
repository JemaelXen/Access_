"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"

// Mock data for trending topics
const trendingTopics = [
  { id: 1, title: "AI Revolution", posts: 1234, growth: "+15%" },
  { id: 2, title: "Green Energy", posts: 987, growth: "+8%" },
  { id: 3, title: "Crypto Markets", posts: 756, growth: "+22%" },
  { id: 4, title: "Space Tech", posts: 543, growth: "+12%" },
]

// Mock data for investment opportunities
const investments = [
  {
    id: 1,
    company: "TechCorp",
    sector: "Technology",
    minInvestment: 1000,
    expectedReturn: "12-15%",
    riskLevel: "Medium",
    shares: 150,
  },
  {
    id: 2,
    company: "GreenEnergy Co",
    sector: "Renewable Energy",
    minInvestment: 2500,
    expectedReturn: "8-12%",
    riskLevel: "Low",
    shares: 75,
  },
]

function InvestmentCard({ investment }: { investment: (typeof investments)[0] }) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-sm">{investment.company}</h4>
          <Badge variant="outline" className="text-xs">
            {investment.riskLevel}
          </Badge>
        </div>
        <p className="text-xs text-gray-600 mb-2">{investment.sector}</p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Min Investment:</span>
            <span className="font-medium">${investment.minInvestment.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Expected Return:</span>
            <span className="font-medium text-green-600">{investment.expectedReturn}</span>
          </div>
          <div className="flex justify-between">
            <span>Your Shares:</span>
            <span className="font-medium">{investment.shares}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TrendingSidebar() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic) => (
            <div key={topic.id} className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-sm">{topic.title}</h4>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {topic.posts.toLocaleString()} posts
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {topic.growth}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Investment Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ErrorBoundary fallback={<div className="p-4 text-sm text-gray-500">Unable to load investments</div>}>
            <div className="p-4 space-y-2">
              {investments.map((investment) => (
                <InvestmentCard key={investment.id} investment={investment} />
              ))}
            </div>
          </ErrorBoundary>
        </CardContent>
      </Card>
    </div>
  )
}
