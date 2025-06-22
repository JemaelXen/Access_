"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Heart, MessageCircle, Share2, MoreHorizontal, ImageIcon, Smile, Send, Bookmark } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

type Post = {
  id: number
  author: {
    id: string
    name: string
    username: string
    avatar: string
    verified?: boolean
    role?: string
  }
  content: string
  image?: string
  createdAt: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isSaved: boolean
}

export function SocialFeed() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("forYou")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        id: "1",
        name: "Jemael Xenn",
        username: "aries",
        avatar: "A",
        verified: true,
        role: "admin",
      },
      content:
        "Excited to announce the launch of Access&Co - the world's most advanced social platform! #AccessYourPotential",
      createdAt: "2h ago",
      likes: 1243,
      comments: 89,
      shares: 356,
      isLiked: false,
      isSaved: false,
    },
    {
      id: 2,
      author: {
        id: "2",
        name: "Global Tech News",
        username: "techupdate",
        avatar: "G",
        verified: true,
      },
      content:
        "Breaking: Access&Co secures major partnerships with global brands. The platform is set to revolutionize how we connect online.",
      image: "/placeholder.svg?height=400&width=600",
      createdAt: "4h ago",
      likes: 842,
      comments: 56,
      shares: 201,
      isLiked: false,
      isSaved: false,
    },
    {
      id: 3,
      author: {
        id: "3",
        name: "Investment Daily",
        username: "investnow",
        avatar: "I",
        verified: true,
      },
      content:
        "Access&Co opens in-app investment opportunities. Users can now buy shares directly through the platform. #InvestInTheFuture",
      createdAt: "6h ago",
      likes: 567,
      comments: 42,
      shares: 128,
      isLiked: false,
      isSaved: false,
    },
    {
      id: 4,
      author: {
        id: "4",
        name: "Elite Club",
        username: "eliteclub",
        avatar: "E",
        verified: true,
        role: "elite",
      },
      content:
        "Join the Elite World Access Club - exclusive areas for world leaders, politicians, royal families, celebrities, and high-net-worth individuals. Apply now for membership.",
      image: "/placeholder.svg?height=400&width=600",
      createdAt: "1d ago",
      likes: 1892,
      comments: 145,
      shares: 432,
      isLiked: false,
      isSaved: false,
    },
  ])
  const [newPostContent, setNewPostContent] = useState("")
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")

  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  const toggleSave = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isSaved: !post.isSaved,
          }
        }
        return post
      }),
    )
  }

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPostContent.trim() || !user) return

    const newPost: Post = {
      id: Date.now(),
      author: {
        id: user.id || "unknown",
        name: user.name || "Unknown User",
        username: user.username || "unknown",
        avatar: user.avatar || "?",
        verified: user.verified,
        role: user.role,
      },
      content: newPostContent,
      createdAt: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
  }

  const handleComment = (postId: number) => {
    if (activeCommentId === postId) {
      setActiveCommentId(null)
    } else {
      setActiveCommentId(postId)
      setCommentText("")
    }
  }

  const submitComment = (postId: number) => {
    if (!commentText.trim()) return

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1,
          }
        }
        return post
      }),
    )

    setCommentText("")
    setActiveCommentId(null)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {user ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <form onSubmit={handleCreatePost}>
            <div className="flex items-start gap-3 mb-4">
              <Avatar>
                <AvatarFallback>{user?.avatar || "?"}</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="flex-1 resize-none"
                rows={3}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button type="button" variant="ghost" size="sm" className="text-gray-500">
                  <ImageIcon size={18} className="mr-1" />
                  <span className="text-sm">Photo</span>
                </Button>
                <Button type="button" variant="ghost" size="sm" className="text-gray-500">
                  <Smile size={18} className="mr-1" />
                  <span className="text-sm">Feeling</span>
                </Button>
              </div>
              <Button type="submit" disabled={!newPostContent.trim()}>
                Post
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <p className="mb-4">Sign in to create posts and interact with the community.</p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="forYou" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="forYou" className="flex-1" onClick={() => setActiveTab("forYou")}>
            For You
          </TabsTrigger>
          <TabsTrigger value="following" className="flex-1" onClick={() => setActiveTab("following")}>
            Following
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex-1" onClick={() => setActiveTab("trending")}>
            Trending
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <Link href={`/profile/${post.author?.username || "unknown"}`} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{post.author?.avatar || "?"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">{post.author?.name || "Unknown User"}</span>
                      {post.author?.verified && (
                        <Badge
                          variant="secondary"
                          className="ml-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </Badge>
                      )}
                      {post.author?.role === "admin" && (
                        <Badge
                          variant="secondary"
                          className="ml-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                        >
                          Founder
                        </Badge>
                      )}
                      {post.author?.role === "elite" && (
                        <Badge
                          variant="secondary"
                          className="ml-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        >
                          Elite
                        </Badge>
                      )}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      @{post.author?.username || "unknown"} · {post.createdAt}
                    </div>
                  </div>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal size={18} />
                </Button>
              </div>

              <p className="mb-4">{post.content}</p>

              {post.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-auto" />
                </div>
              )}

              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mb-2">
                <span>{post.likes} likes</span>
                <span>
                  {post.comments} comments · {post.shares} shares
                </span>
              </div>

              <div className="border-t border-b border-gray-100 dark:border-gray-700 py-2 flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className={post.isLiked ? "text-red-500" : "text-gray-500"}
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart size={18} className="mr-1" fill={post.isLiked ? "currentColor" : "none"} />
                  <span>Like</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500" onClick={() => handleComment(post.id)}>
                  <MessageCircle size={18} className="mr-1" />
                  <span>Comment</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Share2 size={18} className="mr-1" />
                  <span>Share</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={post.isSaved ? "text-indigo-500" : "text-gray-500"}
                  onClick={() => toggleSave(post.id)}
                >
                  <Bookmark size={18} className="mr-1" fill={post.isSaved ? "currentColor" : "none"} />
                  <span>Save</span>
                </Button>
              </div>

              {activeCommentId === post.id && (
                <div className="mt-4 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.avatar || "?"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full p-2 pr-10 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-indigo-600 h-7 w-7"
                      onClick={() => submitComment(post.id)}
                      disabled={!commentText.trim()}
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
