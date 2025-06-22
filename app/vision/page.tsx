export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Access Vision</h1>
        <p className="mb-6">The world's most powerful, automated, self-evolving superapp</p>

        <div className="space-y-6">
          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Self-Evolving AI</h2>
            <p>Autonomous system that upgrades itself without developer intervention</p>
          </div>

          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">In-App Shareholding</h2>
            <p>Complete investment ecosystem within the platform</p>
          </div>

          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Elite World Access Club</h2>
            <p>Exclusive areas for world leaders and high-profile individuals</p>
          </div>
        </div>

        <div className="mt-6">
          <a href="/" className="text-indigo-600 hover:underline">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
