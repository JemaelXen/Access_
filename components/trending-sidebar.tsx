"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, BarChart3, Crown, Verified, Plus, ArrowUpRight } from "lucide-react"

export function TrendingSidebar() {
  const [trendingTopics] = useState([
    { topic: "#ProjectAccess", posts: "25.4K posts", trend: "+12%" },
    { topic: "#TechInvesting", posts: "18.2K posts", trend: "+8%" },
    { topic: "#StartupLife", posts: "12.7K posts", trend: "+15%" },
    { topic: "#EliteClub", posts: "9.1K posts", trend: "+22%" },
    { topic: "#Innovation", posts: "7.8K posts", trend: "+5%" },
  ])

  const [suggestedUsers] = useState([
    {
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      role: "Investor",
      followers: "125K",
    },
    {
      name: "Tech Insider",
      username: "techinsider",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      role: "Media",
      followers: "89K",
    },
    {
      name: "Elite Member",
      username: "elitemember",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Elite",
      followers: "45K",
    },
  ])

  const [investments] = useState([
    {
      company: "AI Startup Inc",
      sector: "Artificial Intelligence",
      funding: "$2.5M",
      investors: 156,
      growth: "+24%",
    },
    {
      company: "GreenTech Solutions",
      sector: "Clean Energy",
      funding: "$1.8M",
      investors: 89,
      growth: "+18%",
    },
    {
      company: "FinTech Pro",
      sector: "Financial Technology",
      funding: "$3.2M",
      investors: 203,
      growth: "+31%",
    },
  ])

  return (
    <div className="space-y-4">
      {/* Trending Topics */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp size={16} className="text-green-500" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {trendingTopics.map((trend, index) => (
              <div
                key={index}
                className="flex justify-between items-start cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50 p-2 rounded-lg -m-2"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{trend.topic}</p>
                  <p className="text-xs text-gray-500">{trend.posts}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-green-500 font-medium">{trend.trend}</span>
                  <TrendingUp size={12} className="text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Users */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Users size={16} className="text-blue-500" />
            Who to Follow
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {suggestedUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      {user.verified && <Verified size={12} className="text-blue-500" />}
                      {user.role === "Elite" && <Crown size={12} className="text-yellow-500" />}
                    </div>
                    <p className="text-xs text-gray-500">@{user.username}</p>
                    <p className="text-xs text-gray-400">{user.followers} followers</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs">
                  <Plus size={12} className="mr-1" />
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Opportunities */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <BarChart3 size={16} className="text-emerald-500" />
            Hot Investments
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {investments.map((investment, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-sm font-semibold">{investment.company}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{investment.sector}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-gray-400" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-emerald-600">{investment.funding}</span>
                    <span className="text-xs text-gray-500">{investment.investors} investors</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs">
                    {investment.growth}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
