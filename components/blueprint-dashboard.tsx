"use client"

import { useState } from "react"
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Award,
  BarChart,
  Book,
  Check,
  ChevronRight,
  CreditCard,
  Eye,
  FileText,
  Globe,
  Home,
  Key,
  Layout,
  Lock,
  MessageCircle,
  MessageSquare,
  PieChart,
  Settings,
  Shield,
  Tv,
  User,
  Users,
  Video,
  Wallet,
} from "lucide-react"

export function BlueprintDashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", name: "Overview", icon: <Layout size={18} /> },
    { id: "automations", name: "Automations", icon: <Activity size={18} /> },
    { id: "social", name: "Social Features", icon: <Users size={18} /> },
    { id: "financial", name: "Financial Features", icon: <BarChart size={18} /> },
    { id: "media", name: "Media Features", icon: <Tv size={18} /> },
    { id: "security", name: "Security", icon: <Shield size={18} /> },
  ]

  const automations = [
    {
      title: "User Verification Automation",
      icon: <User className="h-8 w-8 text-blue-500" />,
      description: "Auto-check government-issued ID, face scan + iris scan verification",
      details: [
        "Verification based on user country",
        "Face scan + iris scan verification",
        "Approval/denial within 30 minutes",
      ],
    },
    {
      title: "Two-Factor Authentication (2FA)",
      icon: <Key className="h-8 w-8 text-blue-500" />,
      description: "Required for high-security access (wallet, login, account settings)",
      details: ["SMS verification", "Email verification", "Authenticator app support"],
    },
    {
      title: "Casino Section Top-Up/Withdrawal",
      icon: <Wallet className="h-8 w-8 text-blue-500" />,
      description: "Automated payment processing via multiple methods",
      details: ["PayPal integration", "Debit card processing", "E-wallet support", "Auto-send to Lead Bank Account"],
    },
    {
      title: "VIP Subscription Automation",
      icon: <Award className="h-8 w-8 text-blue-500" />,
      description: "Automatically adjusts VIP rank & features based on investment",
      details: [
        "Tier-based benefits",
        "Investment amount tracking",
        "Automatic rank upgrades",
        "Special feature unlocks",
      ],
    },
    {
      title: "Mutual-Friend Messaging System",
      icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
      description: "Chat is only unlocked if both users are friends",
      details: ["Privacy protection", "Spam prevention", "Friend verification", "Connection requests"],
    },
    {
      title: "User Trading & Share System",
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
      description: "Users aged 16+ can trade shares with real-time automation",
      details: ["Age verification", "Real-time market data", "Buy/sell automation", "Portfolio tracking"],
    },
  ]

  const socialFeatures = [
    {
      title: "Twitter/X-Inspired Section",
      icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
      description: "Complete social posting and interaction system",
      details: [
        "Post, comment, react (likes, emojis)",
        "MyDay (stories feature)",
        "Page creation",
        "Group page creation",
        "Custom post visibility options",
      ],
    },
    {
      title: "Social Connections",
      icon: <Users className="h-8 w-8 text-purple-500" />,
      description: "Comprehensive friend and connection management",
      details: [
        "Add/unfriend functionality",
        "Follow/unfollow options",
        "Block/restrict capabilities",
        "Mutual friend chat",
        "Messaging with rich features",
        "Video and voice calls",
      ],
    },
    {
      title: "Litmatch-Inspired Section",
      icon: <Globe className="h-8 w-8 text-purple-500" />,
      description: "Live room socializing and forum features",
      details: ["Random live room matching", "Public rooms for debates", "Live forum rooms", "Topic-based discussions"],
    },
    {
      title: "User Profiles",
      icon: <User className="h-8 w-8 text-purple-500" />,
      description: "Highly customizable user profiles",
      details: [
        "Profile picture and avatar upload",
        "Bio + website links",
        "Customizable fonts (style, size, color)",
        "VIP badge for subscribers",
        "Activity history and highlights",
      ],
    },
  ]

  const financialFeatures = [
    {
      title: "Casino Section (18+ Only)",
      icon: <PieChart className="h-8 w-8 text-green-500" />,
      description: "Complete casino system with real money integration",
      details: [
        "Age verification (18+)",
        "Wallet integration",
        "Real money games",
        "Multiple payment methods",
        "Secure withdrawals",
      ],
    },
    {
      title: "Trading Section (16+ Only)",
      icon: <BarChart className="h-8 w-8 text-green-500" />,
      description: "Global stock and Access Group shares trading",
      details: [
        "Age verification (16+)",
        "Real-time market data",
        "Buy/sell functionality",
        "Portfolio management",
        "Trading history and analytics",
      ],
    },
    {
      title: "Payment & Wallet System",
      icon: <Wallet className="h-8 w-8 text-green-500" />,
      description: "Comprehensive financial management system",
      details: [
        "Casino transactions",
        "Virtual gift economy",
        "Font and premium feature purchases",
        "VIP subscriptions",
        "Currency conversion support",
      ],
    },
  ]

  const mediaFeatures = [
    {
      title: "E-Book Section",
      icon: <Book className="h-8 w-8 text-orange-500" />,
      description: "Access to all existing books worldwide",
      details: [
        "Digital reader",
        "Bookmarking functionality",
        "Note-taking features",
        "Font customization",
        "Library management",
      ],
    },
    {
      title: "Live Streaming",
      icon: <Video className="h-8 w-8 text-orange-500" />,
      description: "Comprehensive live streaming platform",
      details: [
        "Solo or multi-user streams",
        "Virtual gift system",
        "Viewer interaction",
        "Stream scheduling",
        "Recording and playback",
      ],
    },
  ]

  const securityFeatures = [
    {
      title: "ID Verification",
      icon: <FileText className="h-8 w-8 text-red-500" />,
      description: "Government-issued ID verification system",
      details: [
        "Document scanning",
        "Automated verification",
        "Manual review backup",
        "Secure storage of verification data",
      ],
    },
    {
      title: "Biometric Verification",
      icon: <Eye className="h-8 w-8 text-red-500" />,
      description: "Face and iris scan verification",
      details: ["Facial recognition", "Iris scanning", "Match verification", "Liveness detection"],
    },
    {
      title: "Two-Factor Authentication",
      icon: <Lock className="h-8 w-8 text-red-500" />,
      description: "Multi-layer security for sensitive areas",
      details: ["Login protection", "Wallet access security", "Settings changes verification", "Multiple 2FA methods"],
    },
    {
      title: "Suspicious Activity Detection",
      icon: <AlertCircle className="h-8 w-8 text-red-500" />,
      description: "Automated security monitoring",
      details: [
        "Suspicious user flagging",
        "Automatic restrictions",
        "Gambling/trading abuse detection",
        "Account protection measures",
      ],
    },
  ]

  const adminFeatures = [
    {
      title: "User Management",
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      description: "Complete control over user accounts and data",
      details: ["View all user profiles", "Edit user information", "Manage permissions", "Account status control"],
    },
    {
      title: "System Configuration",
      icon: <Settings className="h-8 w-8 text-indigo-500" />,
      description: "Control over all system features and settings",
      details: ["Feature toggles", "System parameters", "Global settings", "Feature rollouts"],
    },
    {
      title: "Financial Oversight",
      icon: <CreditCard className="h-8 w-8 text-indigo-500" />,
      description: "Complete visibility of all financial transactions",
      details: ["Wallet transactions", "Trading logs", "Casino activity", "Payment processing"],
    },
    {
      title: "Verification Management",
      icon: <Check className="h-8 w-8 text-indigo-500" />,
      description: "Oversight of user verification process",
      details: [
        "ID verification review",
        "Biometric verification logs",
        "Manual approval options",
        "Verification statistics",
      ],
    },
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Access System Blueprint</h2>
        <p className="text-gray-700 mb-4">
          The comprehensive all-in-one social media platform with advanced automations, social features, financial
          tools, and media capabilities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Activity className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-semibold">6 Core Automations</h3>
            </div>
            <p className="text-sm text-gray-600">Automated verification, payments, and more</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Layout className="h-5 w-5 text-purple-500 mr-2" />
              <h3 className="font-semibold">15+ Core Features</h3>
            </div>
            <p className="text-sm text-gray-600">Social, financial, and media capabilities</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Shield className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="font-semibold">Advanced Security</h3>
            </div>
            <p className="text-sm text-gray-600">Multi-layer protection for all users</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.slice(1).map((section) => (
          <div
            key={section.id}
            className="border rounded-lg p-5 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
            onClick={() => setActiveSection(section.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {section.icon}
                <h3 className="font-semibold ml-2">{section.name}</h3>
              </div>
              <ArrowRight size={16} className="text-blue-500" />
            </div>
            <p className="text-sm text-gray-600">
              {section.id === "automations" && "Automated systems for verification, payments, and more"}
              {section.id === "social" && "Complete social networking and communication tools"}
              {section.id === "financial" && "Trading, casino, and payment systems"}
              {section.id === "media" && "E-books, streaming, and content creation"}
              {section.id === "security" && "Multi-layer security and verification systems"}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <p className="text-gray-700 mb-4">
          Complete control center for Jemael with full oversight of all system aspects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {adminFeatures.map((feature, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                {feature.icon}
                <h3 className="font-semibold ml-2">{feature.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
              <ul className="text-xs text-gray-500 space-y-1">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-start">
                    <ChevronRight size={12} className="text-indigo-500 mt-1 mr-1 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderFeatureSection = (title, features) => (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={() => setActiveSection("overview")}
          className="text-blue-500 hover:text-blue-700 flex items-center mr-2"
        >
          <Home size={16} className="mr-1" /> Home
        </button>
        <span className="text-gray-400 mx-2">/</span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="border rounded-lg p-5 hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="font-semibold ml-2">{feature.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
            <ul className="text-sm text-gray-500 space-y-2">
              {feature.details.map((detail, i) => (
                <li key={i} className="flex items-start">
                  <ChevronRight size={14} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-600 transform rotate-45 mr-3"></div>
          <h1 className="text-2xl font-bold">Access Blueprint</h1>
        </div>
        <div className="flex space-x-2">
          <a href="/" className="px-4 py-2 border rounded-md hover:bg-gray-50">
            Home
          </a>
          <a href="/dashboard" className="px-4 py-2 border rounded-md hover:bg-gray-50">
            Dashboard
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                activeSection === section.id ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
              }`}
            >
              {section.icon}
              <span className="ml-2">{section.name}</span>
            </button>
          ))}
        </div>

        <div className="flex-1">
          {activeSection === "overview" && renderOverview()}
          {activeSection === "automations" && renderFeatureSection("Automations", automations)}
          {activeSection === "social" && renderFeatureSection("Social Features", socialFeatures)}
          {activeSection === "financial" && renderFeatureSection("Financial Features", financialFeatures)}
          {activeSection === "media" && renderFeatureSection("Media Features", mediaFeatures)}
          {activeSection === "security" && renderFeatureSection("Security Features", securityFeatures)}
        </div>
      </div>
    </div>
  )
}
