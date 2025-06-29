"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ImageIcon,
  Video,
  Smile,
  Send,
  Users,
  Calendar,
  MapPin,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { StoriesBar } from "@/components/stories-bar"
import { TrendingSidebar } from "@/components/trending-sidebar"

interface Post {
  id: string
  author: {
    name: string
    username: string
    avatar: string
    verified: boolean
  }
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isBookmarked: boolean
}

interface Story {
  id: string
  author: {
    name: string
    avatar: string
  }
  preview: string
  isViewed: boolean
}

export default function SocialPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [newPost, setNewPost] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch social feed data
    const fetchSocialData = async () => {
      setIsLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockPosts: Post[] = [
        {
          id: "1",
          author: {
            name: "Sarah Johnson",
            username: "sarahj",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
          },
          content:
            "Just closed our Series A funding round! 🎉 Excited to announce $5M raised to revolutionize the fintech space. Thank you to all our investors and supporters who believed in our vision. The journey is just beginning! #startup #funding #fintech",
          image: "/placeholder.svg?height=300&width=500",
          timestamp: "2 hours ago",
          likes: 234,
          comments: 45,
          shares: 12,
          isLiked: false,
          isBookmarked: false,
        },
        {
          id: "2",
          author: {
            name: "Michael Chen",
            username: "mchen",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: false,
          },
          content:
            "The future of AI is here, and it's more accessible than ever. Just launched our new machine learning platform that democratizes AI for small businesses. What are your thoughts on AI adoption in SMEs? #AI #MachineLearning #SmallBusiness",
          timestamp: "4 hours ago",
          likes: 156,
          comments: 28,
          shares: 8,
          isLiked: true,
          isBookmarked: true,
        },
        {
          id: "3",
          author: {
            name: "Emily Rodriguez",
            username: "emilyrod",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
          },
          content:
            "Networking event was incredible tonight! Met so many inspiring entrepreneurs and investors. The energy in the startup ecosystem is absolutely electric. Special thanks to @ProjectAccess for hosting such an amazing event! 🚀",
          timestamp: "6 hours ago",
          likes: 89,
          comments: 15,
          shares: 5,
          isLiked: false,
          isBookmarked: false,
        },
      ]

      const mockStories: Story[] = [
        {
          id: "1",
          author: {
            name: "Your Story",
            avatar: user?.avatar || "/placeholder.svg?height=40&width=40",
          },
          preview: "/placeholder.svg?height=60&width=60",
          isViewed: false,
        },
        {
          id: "2",
          author: {
            name: "TechCorp",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          preview: "/placeholder.svg?height=60&width=60",
          isViewed: false,
        },
        {
          id: "3",
          author: {
            name: "StartupHub",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          preview: "/placeholder.svg?height=60&width=60",
          isViewed: true,
        },
      ]

      setPosts(mockPosts)
      setStories(mockStories)
      setIsLoading(false)
    }

    fetchSocialData()
  }, [user])

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
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: user?.name || "Anonymous",
        username: user?.email?.split("@")[0] || "user",
        avatar: user?.avatar || "/placeholder.svg?height=40&width=40",
        verified: user?.role === "founder" || user?.role === "admin",
      },
      content: newPost,
      timestamp: "now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false,
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stories */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <StoriesBar stories={stories} />
            </motion.div>

            {/* Create Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-effect">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="What's on your mind?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="min-h-[80px] resize-none border-0 focus-visible:ring-0 bg-transparent"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Photo
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Video
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Smile className="h-4 w-4 mr-2" />
                        Emoji
                      </Button>
                    </div>
                    <Button onClick={handleCreatePost} disabled={!newPost.trim()} className="btn-primary">
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="glass-effect">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{post.author.name}</h4>
                              {post.author.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  ✓ Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              @{post.author.username} • {post.timestamp}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed">{post.content}</p>

                      {post.image && (
                        <div className="rounded-lg overflow-hidden">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post content"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={`gap-2 ${post.isLiked ? "text-red-500" : ""}`}
                          >
                            <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Share2 className="h-4 w-4" />
                            {post.shares}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(post.id)}
                          className={post.isBookmarked ? "text-blue-500" : ""}
                        >
                          <Bookmark className={`h-4 w-4 ${post.isBookmarked ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <TrendingSidebar />

            {/* Suggested Connections */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Suggested Connections
                </CardTitle>
                <CardDescription>People you might know</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Alex Thompson", role: "Product Manager", mutual: 12 },
                  { name: "Lisa Wang", role: "UX Designer", mutual: 8 },
                  { name: "David Kim", role: "Software Engineer", mutual: 15 },
                ].map((person, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {person.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{person.name}</p>
                        <p className="text-xs text-muted-foreground">{person.role}</p>
                        <p className="text-xs text-muted-foreground">{person.mutual} mutual connections</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Connect
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Tech Startup Meetup",
                    date: "Dec 15, 2024",
                    location: "San Francisco, CA",
                    attendees: 124,
                  },
                  {
                    title: "Investment Summit 2024",
                    date: "Dec 20, 2024",
                    location: "New York, NY",
                    attendees: 89,
                  },
                ].map((event, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50">
                    <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{event.attendees} attending</span>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
