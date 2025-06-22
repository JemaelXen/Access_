"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PenTool, Video, Camera, Mic, TrendingUp, Briefcase, Crown, BarChart3, Globe, Zap, Star } from "lucide-react"

export function QuickActions() {
  const { user } = useAuth()
  const [stats] = useState({
    followers: 1247,
    following: 892,
    posts: 156,
    investments: 12,
  })

  const quickActions = [
    { icon: <PenTool size={16} />, label: "Create Post", color: "bg-blue-500", href: "/create/post" },
    { icon: <Video size={16} />, label: "Go Live", color: "bg-red-500", href: "/create/live" },
    { icon: <Camera size={16} />, label: "Add Story", color: "bg-purple-500", href: "/create/story" },
    { icon: <Mic size={16} />, label: "Voice Note", color: "bg-green-500", href: "/create/voice" },
  ]

  const businessActions = [
    { icon: <BarChart3 size={16} />, label: "Invest", color: "bg-emerald-500", href: "/invest" },
    { icon: <Briefcase size={16} />, label: "Partner", color: "bg-orange-500", href: "/partnerships" },
    { icon: <Globe size={16} />, label: "PR Wire", color: "bg-cyan-500", href: "/pr" },
    { icon: <Crown size={16} />, label: "Elite", color: "bg-yellow-500", href: "/elite" },
  ]

  const isFounder = user?.role === "founder"

  return (
    <div className="space-y-4">
      {/* User Profile Card */}
      {user && (
        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                  {isFounder && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                      <Crown size={10} className="mr-1" />
                      Founder
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-purple-600">{stats.followers.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-lg font-bold text-pink-600">{stats.following.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
              <div>
                <p className="text-lg font-bold text-blue-600">{stats.posts}</p>
                <p className="text-xs text-gray-500">Posts</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">{stats.investments}</p>
                <p className="text-xs text-gray-500">Investments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Zap size={16} className="text-purple-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              >
                <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center text-white`}>
                  {action.icon}
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Actions */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Star size={16} className="text-orange-500" />
            Business Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            {businessActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              >
                <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center text-white`}>
                  {action.icon}
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

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
            {[
              { topic: "#ProjectAccess", posts: "12.5K posts" },
              { topic: "#TechInvesting", posts: "8.2K posts" },
              { topic: "#StartupLife", posts: "5.7K posts" },
              { topic: "#EliteClub", posts: "3.1K posts" },
            ].map((trend, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{trend.topic}</p>
                  <p className="text-xs text-gray-500">{trend.posts}</p>
                </div>
                <TrendingUp size={14} className="text-green-500" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
