export default function InvestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Invest in Access&Co</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Investment Opportunities</h2>
          <p className="mb-6">Users can invest, track, and trade shares of Access&Co directly inside the app.</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Tier</th>
                  <th className="border p-2 text-left">Amount (₱ / $)</th>
                  <th className="border p-2 text-left">Shares Received</th>
                  <th className="border p-2 text-left">Privileges</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Starter Investor</td>
                  <td className="border p-2">₱10,000 / $200</td>
                  <td className="border p-2">0.01%</td>
                  <td className="border p-2">Investor badge, voting access</td>
                </tr>
                <tr>
                  <td className="border p-2">Pro Investor</td>
                  <td className="border p-2">₱100,000 / $2K</td>
                  <td className="border p-2">0.1%</td>
                  <td className="border p-2">Pro badge, access to investor group</td>
                </tr>
                <tr>
                  <td className="border p-2">Elite Investor</td>
                  <td className="border p-2">₱1M / $20K</td>
                  <td className="border p-2">1%</td>
                  <td className="border p-2">VVIP badge, invitation to global events, revenue cut</td>
                </tr>
                <tr>
                  <td className="border p-2">Partner+</td>
                  <td className="border p-2">₱10M / $200K</td>
                  <td className="border p-2">10%</td>
                  <td className="border p-2">Listed on company founders page + elite privileges</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
              Become an Investor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
