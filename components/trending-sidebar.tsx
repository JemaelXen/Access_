"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Hash } from "lucide-react"

const trendingTopics = [
  { tag: "StartupFunding", posts: "12.5K", growth: "+15%" },
  { tag: "AI", posts: "8.9K", growth: "+23%" },
  { tag: "Blockchain", posts: "6.2K", growth: "+8%" },
  { tag: "FinTech", posts: "4.8K", growth: "+12%" },
  { tag: "SaaS", posts: "3.9K", growth: "+18%" },
]

export function TrendingSidebar() {
  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trending Topics
        </CardTitle>
        <CardDescription>What's happening in your network</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {trendingTopics.map((topic, index) => (
          <div
            key={topic.tag}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Hash className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">#{topic.tag}</p>
                <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs text-green-600">
              {topic.growth}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
