"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, Users, Hash } from "lucide-react"

const trendingTopics = [
  { tag: "ProjectAccess", posts: 1234 },
  { tag: "StartupLife", posts: 987 },
  { tag: "Innovation", posts: 756 },
  { tag: "TechTrends", posts: 654 },
  { tag: "Entrepreneurship", posts: 543 },
]

const suggestedUsers = [
  {
    id: "1",
    name: "Alex Thompson",
    username: "alexthompson",
    avatar: "/placeholder-user.jpg",
    followers: "12.5K",
    isVerified: true,
  },
  {
    id: "2",
    name: "Maria Santos",
    username: "mariasantos",
    avatar: "/placeholder-user.jpg",
    followers: "8.9K",
    isVerified: false,
  },
  {
    id: "3",
    name: "James Wilson",
    username: "jameswilson",
    avatar: "/placeholder-user.jpg",
    followers: "15.2K",
    isVerified: true,
  },
]

const upcomingEvents = [
  {
    id: "1",
    title: "Startup Pitch Night",
    date: "Dec 15, 2024",
    attendees: 234,
  },
  {
    id: "2",
    title: "AI Innovation Summit",
    date: "Dec 20, 2024",
    attendees: 567,
  },
  {
    id: "3",
    title: "Investor Meetup",
    date: "Dec 25, 2024",
    attendees: 123,
  },
]

export function TrendingSidebar() {
  return (
    <div className="space-y-6" data-testid="trending-sidebar">
      {/* Trending Topics */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.tag}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                <div>
                  <p className="font-medium">#{topic.tag}</p>
                  <p className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} posts</p>
                </div>
              </div>
              <Hash className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggested Users */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Who to Follow
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-medium text-sm">{user.name}</p>
                    {user.isVerified && (
                      <Badge variant="secondary" className="h-4 w-4 p-0">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{user.followers} followers</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Follow
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors">
              <h4 className="font-medium text-sm">{event.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
              <div className="flex items-center gap-1 mt-2">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{event.attendees} attending</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
