"use client"

export function RevenueChart({ height = 350 }: { height?: number }) {
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <div className="bg-indigo-600 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-medium">Advertising</h3>
            <p className="text-white text-2xl font-bold">$3.2M</p>
          </div>
          <div className="h-16 bg-indigo-500 rounded-md mt-2"></div>
        </div>

        <div className="bg-purple-600 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-medium">Subscriptions</h3>
            <p className="text-white text-2xl font-bold">$2.1M</p>
          </div>
          <div className="h-12 bg-purple-500 rounded-md mt-2"></div>
        </div>

        <div className="bg-pink-600 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-medium">Creator Revenue</h3>
            <p className="text-white text-2xl font-bold">$1.8M</p>
          </div>
          <div className="h-10 bg-pink-500 rounded-md mt-2"></div>
        </div>

        <div className="bg-green-600 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-medium">Marketplace</h3>
            <p className="text-white text-2xl font-bold">$0.9M</p>
          </div>
          <div className="h-8 bg-green-500 rounded-md mt-2"></div>
        </div>

        <div className="bg-amber-600 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-medium">Casino/Gaming</h3>
            <p className="text-white text-2xl font-bold">$1.2M</p>
          </div>
          <div className="h-9 bg-amber-500 rounded-md mt-2"></div>
        </div>

        <div className="bg-gray-600 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-medium">Other Revenue</h3>
            <p className="text-white text-2xl font-bold">$1.1M</p>
          </div>
          <div className="h-8 bg-gray-500 rounded-md mt-2"></div>
        </div>
      </div>
    </div>
  )
}
