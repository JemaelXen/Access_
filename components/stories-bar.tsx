"use client"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Story {
  id: string
  user: string
  username: string
  avatar?: string
  hasStory: boolean
  isViewed: boolean
}

const stories = [
  {
    id: "1",
    user: "Sarah Wilson",
    username: "sarahw",
    avatar: "/placeholder-user.jpg",
    hasStory: true,
    isViewed: false,
  },
  {
    id: "2",
    user: "Mike Johnson",
    username: "mikej",
    avatar: "/placeholder-user.jpg",
    hasStory: true,
    isViewed: true,
  },
  {
    id: "3",
    user: "Emily Chen",
    username: "emilyc",
    avatar: "/placeholder-user.jpg",
    hasStory: true,
    isViewed: false,
  },
  {
    id: "4",
    user: "David Brown",
    username: "davidb",
    avatar: "/placeholder-user.jpg",
    hasStory: true,
    isViewed: true,
  },
  {
    id: "5",
    user: "Lisa Garcia",
    username: "lisag",
    avatar: "/placeholder-user.jpg",
    hasStory: true,
    isViewed: false,
  },
]

export function StoriesBar() {
  const { user } = useAuth()

  return (
    <Card className="p-4 mb-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        {/* Add Story Button */}
        {user && (
          <div className="flex-shrink-0 text-center">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-2 border-white dark:border-gray-900"
              >
                <Plus size={12} />
              </Button>
            </div>
            <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">Your Story</p>
          </div>
        )}

        {/* Stories */}
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0 text-center cursor-pointer group">
            <div className="relative">
              <div
                className={`w-16 h-16 rounded-full p-0.5 ${
                  story.isViewed
                    ? "bg-gray-300 dark:bg-gray-600"
                    : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                }`}
              >
                <Avatar className="w-full h-full border-2 border-white dark:border-gray-900">
                  <AvatarImage src={story.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {story.user.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <p className="text-xs mt-2 text-gray-600 dark:text-gray-400 truncate w-16">{story.user.split(" ")[0]}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
