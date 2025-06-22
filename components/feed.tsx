"use client"

import { useState } from "react"
import { Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react"

export function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Jemael Xenn",
      handle: "@aries",
      avatar: "A",
      content:
        "Excited to announce the launch of Access&Co - the world's most advanced social platform! #AccessYourPotential",
      time: "2h ago",
      likes: 1243,
      comments: 89,
      shares: 356,
      isLiked: false,
    },
    {
      id: 2,
      author: "Global Tech News",
      handle: "@techupdate",
      avatar: "G",
      content:
        "Breaking: Access&Co secures major partnerships with global brands. The platform is set to revolutionize how we connect online.",
      time: "4h ago",
      likes: 842,
      comments: 56,
      shares: 201,
      isLiked: false,
    },
    {
      id: 3,
      author: "Investment Daily",
      handle: "@investnow",
      avatar: "I",
      content:
        "Access&Co opens in-app investment opportunities. Users can now buy shares directly through the platform. #InvestInTheFuture",
      time: "6h ago",
      likes: 567,
      comments: 42,
      shares: 128,
      isLiked: false,
    },
  ])

  const toggleLike = (id: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
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

  return (
    <div className="max-w-xl mx-auto">
      <div className="p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">A</span>
            </div>
            <input
              type="text"
              placeholder="What's on your mind?"
              className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="flex justify-between">
            <button className="text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md">
              Photo/Video
            </button>
            <button className="text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md">
              Feeling/Activity
            </button>
            <button className="text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md">
              Go Live
            </button>
          </div>
        </div>

        {posts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">{post.avatar}</span>
                  </div>
                  <div>
                    <div className="font-medium">{post.author}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {post.handle} · {post.time}
                    </div>
                  </div>
                </div>
                <button className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <p className="text-gray-800 dark:text-gray-200 mb-3">{post.content}</p>

              <div className="border-t border-b border-gray-100 dark:border-gray-700 py-2 px-1 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <div>{post.likes} likes</div>
                <div>
                  {post.comments} comments · {post.shares} shares
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-md ${
                    post.isLiked
                      ? "text-red-500"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart size={16} fill={post.isLiked ? "currentColor" : "none"} />
                  <span>Like</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <MessageCircle size={16} />
                  <span>Comment</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
