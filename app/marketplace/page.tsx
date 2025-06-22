import { MainNav } from "@/components/main-nav"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { Search, ShoppingBag, Star } from "lucide-react"

export default function MarketplacePage() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <div className="w-64">
        <MainNav />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Marketplace</h1>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm focus:outline-none"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <div className="h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <ShoppingBag className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Product {i}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(24)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">${(i * 10).toFixed(2)}</span>
                      <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
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
