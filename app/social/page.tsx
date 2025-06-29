"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
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
  Send,
  Crown,
  Verified,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { StoriesBar } from "@/components/stories-bar"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { toast } from "sonner"

const mockPosts = [
  {
    id: "1",
    author: {
      name: "Jemael Xenn",
      username: "jemael",
      avatar: "/placeholder-user.jpg",
      verified: true,
      isFounder: true,
    },
    content:
      "Just launched our new integration platform! 🚀 Excited to see what amazing connections our community will build. The future of business collaboration is here! #ProjectAccess #Innovation",
    timestamp: "2 hours ago",
    likes: 142,
    comments: 28,
    shares: 15,
    isLiked: false,
    isBookmarked: false,
    images: ["/placeholder.jpg"],
  },
  {
    id: "2",
    author: {
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "/placeholder-user.jpg",
      verified: false,
      isFounder: false,
    },
    content:
      "Amazing insights from today's investor meetup! The potential for AI-driven solutions in fintech is incredible. Looking forward to connecting with more innovators in this space.",
    timestamp: "4 hours ago",
    likes: 89,
    comments: 12,
    shares: 7,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: "3",
    author: {
      name: "Michael Chen",
      username: "mchen",
      avatar: "/placeholder-user.jpg",
      verified: true,
      isFounder: false,
    },
    content:
      "Our startup just hit $1M ARR! 🎉 Couldn't have done it without the amazing network and resources from Project Access. Thank you to everyone who supported us along the way!",
    timestamp: "6 hours ago",
    likes: 256,
    comments: 45,
    shares: 32,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: "4",
    author: {
      name: "Emily Rodriguez",
      username: "emilyrod",
      avatar: "/placeholder-user.jpg",
      verified: false,
      isFounder: false,
    },
    content:
      "Working on something exciting in the sustainability space. Can't share details yet, but I'm looking for partners who are passionate about making a real environmental impact. DM me if interested!",
    timestamp: "8 hours ago",
    likes: 67,
    comments: 18,
    shares: 9,
    isLiked: false,
    isBookmarked: false,
  },
]

export default function SocialPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState(mockPosts)
  const [newPost, setNewPost] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    toast.success("Post liked!")
  }

  const handleBookmark = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)))
    toast.success("Post bookmarked!")
  }

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`https://projectaccess.co/post/${postId}`)
    toast.success("Link copied to clipboard!")
  }

  const handleCreatePost = () => {
    if (!newPost.trim()) return

    const post = {
      id: Date.now().toString(),
      author: {
        name: user?.name || "Anonymous",
        username: user?.username || "anonymous",
        avatar: user?.avatar || "/placeholder-user.jpg",
        verified: user?.verified || false,
        isFounder: user?.role === "founder",
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
    toast.success("Post created!")
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stories */}
            <StoriesBar />

            {/* Create Post */}
            {user && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Card className="glass-effect">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-4">
                        <Textarea
                          placeholder="What's on your mind?"
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="min-h-[100px] resize-none border-0 bg-muted/50 focus-visible:ring-0"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Posts Feed */}
            <div className="space-y-6" data-testid="feed-posts">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className="glass-effect card-hover"
                    data-testid="post-card"
                    data-founder={post.author.isFounder}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{post.author.name}</h3>
                              {post.author.verified && <Verified className="h-4 w-4 text-blue-500" />}
                              {post.author.isFounder && (
                                <Badge
                                  variant="default"
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                >
                                  <Crown className="h-3 w-3 mr-1" />
                                  Founder
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
                      <p className="text-foreground leading-relaxed">{post.content}</p>

                      {post.images && (
                        <div className="rounded-lg overflow-hidden">
                          <img
                            src={post.images[0] || "/placeholder.svg"}
                            alt="Post image"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t" data-testid="post-actions">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`gap-2 ${post.isLiked ? "text-red-500" : ""}`}
                          data-testid="like-button"
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2" onClick={() => handleShare(post.id)}>
                          <Share className="h-4 w-4" />
                          {post.shares}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(post.id)}
                          className={post.isBookmarked ? "text-blue-500" : ""}
                          data-testid="bookmark-button"
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
          <div className="lg:col-span-1">
            <TrendingSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
