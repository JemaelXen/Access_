import { MainNav } from "@/components/main-nav"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { Gift, MessageSquare, Play, User, Users } from "lucide-react"

export default function StreamingPage() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <div className="w-64">
        <MainNav />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Live Streaming</h1>

            <div className="mb-6">
              <div className="relative">
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <Play className="h-16 w-16 text-white opacity-70" />
                </div>
                <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                  LIVE
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  <Users className="h-3 w-3 inline mr-1" />
                  1,245 viewers
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">A</span>
                  </div>
                  <div>
                    <h2 className="font-medium">Gaming Stream</h2>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Streamer Name</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    Follow
                  </button>
                  <button className="px-3 py-1.5 bg-pink-600 text-white text-sm rounded-md flex items-center">
                    <Gift className="h-4 w-4 mr-1" />
                    Send Gift
                  </button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="p-3 border-b bg-gray-50 dark:bg-gray-700">
                <h3 className="font-medium">Live Chat</h3>
              </div>

              <div className="h-60 overflow-auto p-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="mb-3 flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium text-xs">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm">User {i}</span>
                        {i % 3 === 0 && (
                          <span className="text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-1 rounded">
                            VIP
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        This is an amazing stream! Keep up the good work.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none"
                  />
                  <button className="p-2 rounded-md bg-indigo-600 text-white">
                    <MessageSquare size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-80">
        <TrendingSidebar />
      </div>
    </div>
  )
}
