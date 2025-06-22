import { MainNav } from "@/components/main-nav"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { ArrowRight, Building, Check, Globe, Handshake, Users } from "lucide-react"

export default function PartnersPage() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <div className="w-64">
        <MainNav />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Business Partnerships</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Apply to become a global business partner with Access&Co and join our worldwide network of collaborators.
            </p>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-3">
                  <Globe size={24} />
                </div>
                <h3 className="font-semibold mb-1">Global Reach</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Access to markets in over 190 countries worldwide
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mb-3">
                  <Users size={24} />
                </div>
                <h3 className="font-semibold mb-1">Millions of Users</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Connect with our massive and growing user base
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-3">
                  <Handshake size={24} />
                </div>
                <h3 className="font-semibold mb-1">Elite Connections</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Network with world leaders and global influencers
                </p>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-semibold">Partnership Types</h2>
              </div>

              <div className="p-4 space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Building className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Local Distributor</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Manage regional Access&Co branding and local market penetration.
                      </p>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                          <span>Regional marketing rights</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                          <span>Local event organization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Globe className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Platform Reseller</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Resell Access&Co products and services to your existing client base.
                      </p>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                          <span>Competitive commission structure</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                          <span>White-label options available</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Handshake className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Strategic Alliance</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Form a deep strategic partnership with Access&Co for mutual growth.
                      </p>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                          <span>Co-branded initiatives</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                          <span>Joint venture opportunities</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md flex items-center gap-2">
                <span>Apply for Partnership</span>
                <ArrowRight size={16} />
              </button>
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
