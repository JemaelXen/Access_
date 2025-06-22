"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Heart, MessageCircle, Share, MoreHorizontal, ImageIcon, Smile, Send } from "lucide-react"
import Link from "next/link"

type Post = {
  id: number
  author: {
    id: string
    name: string
    username: string
    avatar: string
  }
  content: string
  image?: string
  createdAt: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
}

export default function SocialPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [newPostContent, setNewPostContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    // Simulate fetching posts
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          author: {
            id: "1",
            name: "Jemael Xenn",
            username: "aries",
            avatar: "A",
          },
          content:
            "Excited to announce the launch of Access&Co - the world's most advanced social platform! #AccessYourPotential",
          createdAt: "2 hours ago",
          likes: 1243,
          comments: 89,
          shares: 356,
          isLiked: false,
        },
        {
          id: 2,
          author: {
            id: "2",
            name: "Global Tech News",
            username: "techupdate",
            avatar: "G",
          },
          content:
            "Breaking: Access&Co secures major partnerships with global brands. The platform is set to revolutionize how we connect online.",
          image: "/placeholder.svg?height=400&width=600",
          createdAt: "4 hours ago",
          likes: 842,
          comments: 56,
          shares: 201,
          isLiked: false,
        },
        {
          id: 3,
          author: {
            id: "3",
            name: "Investment Daily",
            username: "investnow",
            avatar: "I",
          },
          content:
            "Access&Co opens in-app investment opportunities. Users can now buy shares directly through the platform. #InvestInTheFuture",
          createdAt: "6 hours ago",
          likes: 567,
          comments: 42,
          shares: 128,
          isLiked: false,
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleLike = (postId: number) => {
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

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPostContent.trim() || !user) return

    const newPost: Post = {
      id: Date.now(),
      author: {
        id: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      },
      content: newPostContent,
      createdAt: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <form onSubmit={handleCreatePost}>
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium mr-3">
                {user ? user.avatar : "?"}
              </div>
              <textarea
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="What's on your mind?"
                rows={3}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button type="button" className="flex items-center text-gray-500 hover:text-indigo-600">
                  <ImageIcon size={18} className="mr-1" />
                  <span className="text-sm">Photo</span>
                </button>
                <button type="button" className="flex items-center text-gray-500 hover:text-indigo-600">
                  <Smile size={18} className="mr-1" />
                  <span className="text-sm">Feeling</span>
                </button>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                disabled={!newPostContent.trim()}
              >
                Post
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <Link href={`/profile/${post.author.username}`} className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium mr-3">
                      {post.author.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="text-gray-500 text-sm">
                        @{post.author.username} · {post.createdAt}
                      </div>
                    </div>
                  </Link>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <p className="mb-4">{post.content}</p>

                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img src={post.image || "/placeholder.svg"} alt="Post image" className="w-full h-auto" />
                  </div>
                )}

                <div className="flex justify-between text-gray-500 text-sm mb-2">
                  <span>{post.likes} likes</span>
                  <span>
                    {post.comments} comments · {post.shares} shares
                  </span>
                </div>

                <div className="border-t border-b border-gray-100 py-2 flex justify-between">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center ${
                      post.isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                    }`}
                  >
                    <Heart size={18} className="mr-1" fill={post.isLiked ? "currentColor" : "none"} />
                    <span>Like</span>
                  </button>
                  <button
                    onClick={() => handleComment(post.id)}
                    className="flex items-center text-gray-500 hover:text-indigo-600"
                  >
                    <MessageCircle size={18} className="mr-1" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-indigo-600">
                    <Share size={18} className="mr-1" />
                    <span>Share</span>
                  </button>
                </div>

                {activeCommentId === post.id && (
                  <div className="mt-4 flex">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium mr-2">
                      {user ? user.avatar : "?"}
                    </div>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        className="w-full p-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600"
                        onClick={() => submitComment(post.id)}
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
