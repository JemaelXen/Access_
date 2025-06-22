"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Edit,
  MapPin,
  LinkIcon,
  Calendar,
  User,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react"

type Post = {
  id: number
  content: string
  image?: string
  createdAt: string
  likes: number
  comments: number
  shares: number
  isLiked?: boolean
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      content:
        "Excited to announce the launch of Access&Co - the world's most advanced social platform! #AccessYourPotential",
      createdAt: "2 hours ago",
      likes: 1243,
      comments: 89,
      shares: 356,
    },
    {
      id: 2,
      content:
        "Just released our new investment feature. Now you can buy shares directly through the platform! #InvestInTheFuture",
      image: "/placeholder.svg?height=400&width=600",
      createdAt: "1 day ago",
      likes: 842,
      comments: 56,
      shares: 201,
    },
    {
      id: 3,
      content:
        "The Elite World Access Club is now open for applications. Connect with world leaders, celebrities, and high-profile individuals.",
      createdAt: "3 days ago",
      likes: 567,
      comments: 42,
      shares: 128,
    },
  ])

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

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Please log in to view your profile.</p>
        <Button className="mt-4" asChild>
          <a href="/login">Log In</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white"
            >
              <Edit size={16} />
            </Button>
          </div>

          <CardContent className="pt-0 pb-6">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="flex flex-col md:flex-row">
                <div className="-mt-12 mr-4">
                  <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-900 bg-indigo-100 dark:bg-indigo-900">
                    <AvatarFallback className="text-2xl">{user.avatar}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="mt-4 md:mt-3">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-xl font-bold">{user.name}</h1>
                    {user.verified && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 mr-1"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Verified
                      </Badge>
                    )}
                    {user.role === "admin" && (
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                      >
                        Founder
                      </Badge>
                    )}
                    {user.role === "elite" && (
                      <Badge
                        variant="secondary"
                        className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                      >
                        Elite
                      </Badge>
                    )}
                    {user.investmentTier && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        {user.investmentTier.charAt(0).toUpperCase() + user.investmentTier.slice(1)} Investor
                      </Badge>
                    )}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">@{user.username}</div>
                </div>
              </div>

              <div className="mt-4 md:mt-3 flex gap-2">
                <Button>Follow</Button>
                <Button variant="outline">Message</Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={18} />
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Founder of Access&Co - The all-in-one intelligent global platform revolutionizing how people connect,
                invest, and grow.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={16} className="mr-1" />
                  Philippines
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <LinkIcon size={16} className="mr-1" />
                  <a href="#" className="text-indigo-600 hover:underline dark:text-indigo-400">
                    access.co
                  </a>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={16} className="mr-1" />
                  Joined {user.joinDate}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <User size={16} className="mr-1" />
                  20 years old
                </div>
              </div>
            </div>

            <div className="flex border-t mt-6 pt-4">
              <div className="w-1/3 text-center">
                <div className="font-bold">{user.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold">{user.following.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold">{user.posts.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Tabs defaultValue="posts">
            <TabsList className="w-full">
              <TabsTrigger value="posts" className="flex-1">
                Posts
              </TabsTrigger>
              <TabsTrigger value="media" className="flex-1">
                Media
              </TabsTrigger>
              <TabsTrigger value="likes" className="flex-1">
                Likes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-4">
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm">{post.createdAt}</div>
                          </div>
                        </div>
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

                      <div className="border-t border-b border-gray-100 dark:border-gray-800 py-2 flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={post.isLiked ? "text-red-500" : "text-gray-500"}
                          onClick={() => toggleLike(post.id)}
                        >
                          <Heart size={18} className="mr-1" fill={post.isLiked ? "currentColor" : "none"} />
                          <span>Like</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <MessageCircle size={18} className="mr-1" />
                          <span>Comment</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Share2 size={18} className="mr-1" />
                          <span>Share</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Bookmark size={18} className="mr-1" />
                          <span>Save</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="media" className="mt-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
            </TabsContent>
            <TabsContent value="likes" className="mt-4">
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">No liked posts to show</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
