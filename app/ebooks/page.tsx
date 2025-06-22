import { MainNav } from "@/components/main-nav"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { Book, Bookmark, Search, Star } from "lucide-react"

export default function EbooksPage() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <div className="w-64">
        <MainNav />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">E-Book Library</h1>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm focus:outline-none"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Featured Books</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
                      <Book className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                      <button className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full">
                        <Bookmark className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm mb-1">Book Title {i}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Author Name</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <Star className="h-3 w-3 text-gray-300 dark:text-gray-600" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">4.0</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Categories</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {["Fiction", "Non-Fiction", "Science", "History", "Business", "Self-Help"].map((category) => (
                  <div
                    key={category}
                    className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <h3 className="font-medium">{category}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.floor(Math.random() * 1000) + 100} books
                    </p>
                  </div>
                ))}
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
