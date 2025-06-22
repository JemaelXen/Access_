"use client"

import { TrendingUp, Users, Crown, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"
import dynamic from "next/dynamic"

// Dynamically import the InvestmentCard component
const DynamicInvestmentCard = dynamic(() => import("./investment-card").then((mod) => mod.InvestmentCard), {
  ssr: false,
  loading: () => (
    <Card>
      <CardContent className="p-4">
        <div className="h-40 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
      </CardContent>
    </Card>
  ),
})

type TrendingTopic = {
  id: number
  topic: string
  posts: string
  category?: string
}

type SuggestedUser = {
  id: string
  name: string
  username: string
  avatar: string
  verified?: boolean
  followers: number
}

export function TrendingSidebar() {
  const trendingTopics: TrendingTopic[] = [
    {
      id: 1,
      topic: "Access&Co Launch",
      posts: "24.5K posts",
      category: "Technology",
    },
    {
      id: 2,
      topic: "Investment Opportunity",
      posts: "18.2K posts",
      category: "Finance",
    },
    {
      id: 3,
      topic: "Global Partnership",
      posts: "12.7K posts",
      category: "Business",
    },
    {
      id: 4,
      topic: "Elite Access",
      posts: "9.3K posts",
      category: "Lifestyle",
    },
    {
      id: 5,
      topic: "Digital Revolution",
      posts: "7.8K posts",
      category: "Technology",
    },
  ]

  const suggestedUsers: SuggestedUser[] = [
    {
      id: "1",
      name: "Jemael Xenn",
      username: "aries",
      avatar: "A",
      verified: true,
      followers: 1200000,
    },
    {
      id: "2",
      name: "Global Tech News",
      username: "techupdate",
      avatar: "G",
      verified: true,
      followers: 542000,
    },
    {
      id: "3",
      name: "Investment Daily",
      username: "investnow",
      avatar: "I",
      verified: true,
      followers: 328000,
    },
  ]

  const formatFollowers = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M"
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K"
    }
    return count.toString()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <TrendingUp size={18} className="mr-2" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="divide-y">
            {trendingTopics.map((topic) => (
              <div key={topic.id} className="py-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{topic.topic}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{topic.posts}</p>
                  </div>
                  {topic.category && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                      {topic.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2">
            Show more
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Users size={18} className="mr-2" />
            Who to Follow
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="divide-y">
            {suggestedUsers.map((user) => (
              <div key={user.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-medium mr-3">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium text-sm">{user.name}</p>
                      {user.verified && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 ml-1 text-blue-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      @{user.username} · {formatFollowers(user.followers)} followers
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2">
            Show more
          </Button>
        </CardContent>
      </Card>

      <ErrorBoundary
        fallback={
          <Card>
            <CardContent className="p-4">Unable to load investment options</CardContent>
          </Card>
        }
      >
        <DynamicInvestmentCard />
      </ErrorBoundary>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Crown size={18} className="mr-2" />
            Elite Access
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Join our exclusive club for world leaders, celebrities, and high-net-worth individuals.
          </p>
          <Link href="/elite">
            <Button className="w-full">Request Access</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Globe size={18} className="mr-2" />
            Global Partnerships
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Apply to become a global business partner with Access&Co and join our worldwide network.
          </p>
          <Link href="/partners">
            <Button variant="outline" className="w-full">
              Apply for Partnership
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
