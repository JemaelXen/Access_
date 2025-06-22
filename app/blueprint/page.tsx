import { MainNav } from "@/components/main-nav"
import { TrendingSidebar } from "@/components/trending-sidebar"
import {
  Activity,
  AlertCircle,
  Award,
  BarChart,
  Book,
  ChevronRight,
  Eye,
  FileText,
  Globe,
  Key,
  Lock,
  MessageCircle,
  MessageSquare,
  PieChart,
  Shield,
  User,
  Users,
  Video,
  Wallet,
} from "lucide-react"

export default function BlueprintPage() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <div className="w-64">
        <MainNav />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 transform rotate-45"></div>
                <h1 className="text-2xl font-bold">Access Blueprint</h1>
              </div>
              <div className="flex gap-2">
                <a href="/" className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                  Home
                </a>
                <a
                  href="/company"
                  className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Company
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-3">Access System Blueprint</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The comprehensive all-in-one social media platform with advanced automations, social features, financial
                tools, and media capabilities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Activity className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-semibold">Automations</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">User verification, payments, and more</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-purple-500 mr-2" />
                    <h3 className="font-semibold">Social Features</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Complete social networking tools</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-red-500 mr-2" />
                    <h3 className="font-semibold">Security</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Multi-layer protection for all users</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Core Automations</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <User className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">User Verification</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Auto-check government-issued ID, face scan + iris scan verification
                    </p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Verification based on user country</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Face scan + iris scan verification</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Approval/denial within 30 minutes</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Key className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Required for high-security access (wallet, login, account settings)
                    </p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>SMS verification</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Email verification</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Authenticator app support</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Wallet className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Payment Processing</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automated payment processing via multiple methods
                    </p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>PayPal integration</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Debit card processing</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>E-wallet support</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Award className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">VIP Subscription</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automatically adjusts VIP rank & features based on investment
                    </p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Tier-based benefits</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Investment amount tracking</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Automatic rank upgrades</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <MessageCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Messaging System</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Chat is only unlocked if both users are friends
                    </p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Privacy protection</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Spam prevention</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Friend verification</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <BarChart className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Trading System</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Users aged 16+ can trade shares with real-time automation
                    </p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Age verification</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Real-time market data</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Buy/sell automation</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Social Features</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Twitter/X-Inspired Section</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Complete social posting and interaction system
                    </p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-purple-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Post, comment, react (likes, emojis)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-purple-500 mt-1 mr-1 flex-shrink-0" />
                    <span>MyDay (stories feature)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-purple-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Page creation</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Users className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Social Connections</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Comprehensive friend and connection management
                    </p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-purple-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Add/unfriend functionality</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-purple-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Follow/unfollow options</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-purple-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Block/restrict capabilities</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Globe className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Litmatch-Inspired Section</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Live room socializing and forum features</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-purple-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Random live room matching</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-purple-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Public rooms for debates</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-purple-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Live forum rooms</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Financial Features</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <PieChart className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Casino Section (18+ Only)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Complete casino system with real money integration
                    </p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-green-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Age verification (18+)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-green-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Wallet integration</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-green-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Real money games</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <BarChart className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Trading Section (16+ Only)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Global stock and Access Group shares trading
                    </p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-green-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Age verification (16+)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-green-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Real-time market data</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-green-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Buy/sell functionality</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Wallet className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Payment & Wallet System</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Comprehensive financial management system
                    </p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-green-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Casino transactions</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-green-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Virtual gift economy</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-green-500 mt-1 mr-1 flex-shrink-0" />
                    <span>VIP subscriptions</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Media Features</h2>

            <div className="grid gap-4 md:grid-cols-2 mb-8">
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Book className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">E-Book Section</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Access to all existing books worldwide</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-orange-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Digital reader</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-orange-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Bookmarking functionality</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-orange-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Note-taking features</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Video className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Live Streaming</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive live streaming platform</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-orange-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Solo or multi-user streams</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-orange-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Virtual gift system</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-orange-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Viewer interaction</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Security Features</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <FileText className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">ID Verification</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Government-issued ID verification system</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-red-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Document scanning</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-red-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Automated verification</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Eye className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Biometric Verification</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Face and iris scan verification</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-red-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Facial recognition</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-red-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Iris scanning</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Lock className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Multi-layer security for sensitive areas</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-red-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Login protection</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-red-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Wallet access security</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Suspicious Activity Detection</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Automated security monitoring</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-7">
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-red-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Suspicious user flagging</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={12} className="text-red-500 mt-1 mr-1 flex-shrink-0" />
                    <span>Automatic restrictions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Implementation Roadmap</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                      1
                    </div>
                    <h3 className="text-lg font-semibold">Core Platform Development</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 ml-11">
                    Building the foundational architecture and essential features
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                      2
                    </div>
                    <h3 className="text-lg font-semibold">AI Integration & Automation Systems</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 ml-11">
                    Implementing self-evolving intelligence and automation capabilities
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                      3
                    </div>
                    <h3 className="text-lg font-semibold">Financial & Investment Infrastructure</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 ml-11">
                    Developing the in-app shareholding system and financial tools
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                      4
                    </div>
                    <h3 className="text-lg font-semibold">Elite & Business Partnership Systems</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 ml-11">
                    Creating exclusive areas and business collaboration tools
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                      5
                    </div>
                    <h3 className="text-lg font-semibold">Global Expansion & Localization</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 ml-11">
                    Scaling the platform worldwide with cultural adaptations
                  </p>
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
