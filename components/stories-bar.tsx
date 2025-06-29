"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

interface Story {
  id: string
  author: {
    name: string
    avatar: string
  }
  preview: string
  isViewed: boolean
}

interface StoriesBarProps {
  stories: Story[]
}

export function StoriesBar({ stories }: StoriesBarProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-2 min-w-[80px]">
          <div
            className={`relative p-1 rounded-full ${
              story.isViewed ? "bg-gray-300 dark:bg-gray-600" : "bg-gradient-to-r from-pink-500 to-purple-500"
            }`}
          >
            <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-900">
              <AvatarImage src={story.preview || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {story.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {story.id === "1" && (
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                <Plus className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          <span className="text-xs text-center font-medium truncate w-full">{story.author.name}</span>
        </div>
      ))}
    </div>
  )
}
