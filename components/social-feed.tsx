"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  ImageIcon,
  Video,
  Smile,
  MapPin,
  Crown,
  Verified,
  Play,
} from "lucide-react"

interface Post {
  id: string
  user: {
    name: string
    username: string
    avatar?: string
    verified?: boolean
    role?: string
  }
  content: string
  images?: string[]
  video?: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isBookmarked: boolean
  location?: string
  type: "text" | "image" | "video" | "poll" | "investment"
}

export function SocialFeed() {
  const { user } = useAuth()
  const [newPost, setNewPost] = useState("")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      user: {
        name: "Jemael Xenn",
        username: "jemaelxenn",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        role: "founder",
      },
      content:
        "Excited to announce Project Access - the future of social investing and collaboration! 🚀 This platform combines the best of all social media with powerful investment tools. #ProjectAccess #Innovation",
      timestamp: "2h",
      likes: 247,
      comments: 32,
      shares: 18,
      isLiked: false,
      isBookmarked: false,
      type: "text",
    },
    {
      id: "2",
      user: {
        name: "Tech Investor",
        username: "techinvestor",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      content:
        "Just discovered an amazing investment opportunity on Project Access. The due diligence tools are incredible! 📈",
      images: ["/placeholder.svg?height=300&width=500"],
      timestamp: "4h",
      likes: 156,
      comments: 24,
      shares: 12,
      isLiked: true,
      isBookmarked: true,
      location: "Silicon Valley",
      type: "image",
    },
    {
      id: "3",
      user: {
        name: "Startup Founder",
        username: "startupfounder",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Looking for strategic partners for our AI startup. Project Access makes it so easy to connect with the right investors and collaborators! 🤝",
      timestamp: "6h",
      likes: 89,
      comments: 15,
      shares: 8,
      isLiked: false,
      isBookmarked: false,
      type: "text",
    },
  ])

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleBookmark = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)))
  }

  const handleCreatePost = () => {
    if (!newPost.trim() || !user) return

    const post: Post = {
      id: Date.now().toString(),
      user: {
        name: user.name || "User",
        username: user.username || "user",
        avatar: user.avatar,
        verified: user.role === "founder" || user.role === "admin",
        role: user.role,
      },
      content: newPost,
      timestamp: "now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false,
      type: "text",
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  return (
    <div className="space-y-6">
      {/* Create Post */}
      {user && (
        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="What's happening on Project Access?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[80px] border-0 bg-transparent resize-none focus:ring-0 text-lg placeholder:text-gray-500"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                      <ImageIcon size={18} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                      <Video size={18} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                      <Smile size={18} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                      <MapPin size={18} />
                    </Button>
                  </div>
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts Feed */}
      {posts.map((post) => (
        <Card
          key={post.id}
          className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {post.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{post.user.name}</h3>
                    {post.user.verified && <Verified size={14} className="text-blue-500" />}
                    {post.user.role === "founder" && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                        <Crown size={10} className="mr-1" />
                        Founder
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>@{post.user.username}</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                    {post.location && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {post.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-sm leading-relaxed mb-3">{post.content}</p>

            {/* Media */}
            {post.images && post.images.length > 0 && (
              <div className="mb-3 rounded-xl overflow-hidden">
                <img src={post.images[0] || "/placeholder.svg"} alt="Post image" className="w-full h-64 object-cover" />
              </div>
            )}

            {post.video && (
              <div className="mb-3 rounded-xl overflow-hidden relative">
                <video src={post.video} className="w-full h-64 object-cover" controls={false} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="rounded-full bg-black/50 hover:bg-black/70">
                    <Play size={24} className="text-white ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 ${
                    post.isLiked ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  <Heart size={16} className={post.isLiked ? "fill-current" : ""} />
                  <span className="text-xs">{post.likes}</span>
                </Button>

                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                  <MessageCircle size={16} />
                  <span className="text-xs">{post.comments}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-500 hover:text-green-500"
                >
                  <Share size={16} />
                  <span className="text-xs">{post.shares}</span>
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBookmark(post.id)}
                className={`${
                  post.isBookmarked ? "text-purple-500 hover:text-purple-600" : "text-gray-500 hover:text-purple-500"
                }`}
              >
                <Bookmark size={16} className={post.isBookmarked ? "fill-current" : ""} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
