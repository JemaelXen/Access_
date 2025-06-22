"use client"

import { InvestmentCard } from "./investment-card"
import { TrendingUp } from "lucide-react"

export function RightSidebar() {
  const trendingTopics = [
    {
      id: 1,
      topic: "Access&Co Launch",
      posts: "24.5K posts",
    },
    {
      id: 2,
      topic: "Investment Opportunity",
      posts: "18.2K posts",
    },
    {
      id: 3,
      topic: "Global Partnership",
      posts: "12.7K posts",
    },
    {
      id: 4,
      topic: "Elite Access",
      posts: "9.3K posts",
    },
    {
      id: 5,
      topic: "Digital Revolution",
      posts: "7.8K posts",
    },
  ]

  return (
    <div className="w-80 h-full border-l bg-gray-50 dark:bg-gray-900 p-4 overflow-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={18} />
          <h3 className="font-semibold">Trending Topics</h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.id}
              className={`p-3 ${
                index !== trendingTopics.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""
              }`}
            >
              <div className="font-medium text-sm">{topic.topic}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{topic.posts}</div>
            </div>
          ))}
        </div>
      </div>

      <InvestmentCard />
    </div>
  )
}
