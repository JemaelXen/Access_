export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Daily Revenue</h2>
          <p className="text-2xl font-bold">$8,742,389</p>
          <p className="text-xs text-gray-500">+20.1% from last month</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Active Users</h2>
          <p className="text-2xl font-bold">2.4M</p>
          <p className="text-xs text-gray-500">+12.3% from last week</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Global Partnerships</h2>
          <p className="text-2xl font-bold">1,284</p>
          <p className="text-xs text-gray-500">+34 new this week</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Media Coverage</h2>
          <p className="text-2xl font-bold">347</p>
          <p className="text-xs text-gray-500">Articles published this month</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Revenue Streams</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Advertising</span>
                <span>$3.2M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Subscriptions</span>
                <span>$2.1M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Creator Revenue</span>
                <span>$1.8M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">User Acquisition</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium">North America</h4>
              <p className="text-2xl font-bold">6.2M</p>
              <p className="text-xs text-gray-500">+12% growth</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium">Europe</h4>
              <p className="text-2xl font-bold">5.8M</p>
              <p className="text-xs text-gray-500">+9% growth</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium">Asia</h4>
              <p className="text-2xl font-bold">8.4M</p>
              <p className="text-xs text-gray-500">+18% growth</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium">Other Regions</h4>
              <p className="text-2xl font-bold">4.3M</p>
              <p className="text-xs text-gray-500">+15% growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
