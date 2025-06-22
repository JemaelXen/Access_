"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AsymmetricLogo } from "@/components/asymmetric-logo"
import {
  Building,
  Shield,
  Heart,
  ShoppingCart,
  Truck,
  GraduationCap,
  Home,
  Zap,
  Crown,
  TrendingUp,
  Users,
  Target,
  Star,
  CheckCircle,
} from "lucide-react"
import { VerticalOverview } from "@/components/vertical-overview"
import { VerticalMetrics } from "@/components/vertical-metrics"
import { ComplianceTracker } from "@/components/compliance-tracker"
import { IndustryTrends } from "@/components/industry-trends"
import { VerticalBenchmarks } from "@/components/vertical-benchmarks"

export default function VerticalPeerGroupsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedVertical, setSelectedVertical] = useState("fintech")

  const verticalGroups = {
    fintech: {
      name: "Financial Technology",
      icon: <Building className="w-5 h-5" />,
      description: "Digital banking, payments, lending, and investment platforms",
      totalCompanies: 247,
      yourRank: 1,
      avgScore: 82.4,
      growthRate: 28.7,
      subVerticals: [
        {
          name: "Digital Banking",
          companies: 45,
          avgScore: 84.2,
          yourRank: 1,
          keyMetrics: ["Transaction Volume", "Account Opening Speed", "Mobile App Rating", "Regulatory Compliance"],
          challenges: ["Open Banking APIs", "Real-time Fraud Detection", "KYC Automation", "Cross-border Payments"],
          leaders: ["Your Platform", "NeoBank Pro", "DigitalFirst Bank"],
        },
        {
          name: "Payment Processing",
          companies: 67,
          avgScore: 81.8,
          yourRank: 2,
          keyMetrics: ["Processing Speed", "Success Rate", "Chargeback Rate", "PCI Compliance"],
          challenges: ["3D Secure 2.0", "Alternative Payment Methods", "Cryptocurrency Support", "Merchant Onboarding"],
          leaders: ["PaymentCore", "Your Platform", "SwiftPay Systems"],
        },
        {
          name: "Lending Platforms",
          companies: 38,
          avgScore: 79.6,
          yourRank: 3,
          keyMetrics: ["Approval Speed", "Default Rate", "Credit Scoring Accuracy", "Loan Origination Volume"],
          challenges: ["AI Credit Scoring", "Regulatory Compliance", "Risk Assessment", "Alternative Data Sources"],
          leaders: ["LendTech Pro", "CreditFlow", "Your Platform"],
        },
        {
          name: "Investment Tech",
          companies: 52,
          avgScore: 83.1,
          yourRank: 1,
          keyMetrics: ["Trade Execution Speed", "Portfolio Performance", "Risk Management", "Regulatory Reporting"],
          challenges: ["Algorithmic Trading", "ESG Integration", "Robo-Advisory", "Institutional APIs"],
          leaders: ["Your Platform", "InvestCore", "TradeTech Solutions"],
        },
        {
          name: "InsurTech",
          companies: 45,
          avgScore: 78.9,
          yourRank: "N/A",
          keyMetrics: ["Claims Processing Time", "Underwriting Accuracy", "Customer Satisfaction", "Fraud Detection"],
          challenges: ["Telematics Integration", "AI Underwriting", "Parametric Insurance", "Digital Claims"],
          leaders: ["InsureFlow", "RiskTech Pro", "ClaimsMaster"],
        },
      ],
      regulatoryFrameworks: [
        { name: "PCI DSS", compliance: 100, required: true },
        { name: "SOX", compliance: 95, required: true },
        { name: "GDPR", compliance: 98, required: true },
        { name: "PSD2", compliance: 92, required: true },
        { name: "Basel III", compliance: 88, required: false },
      ],
      industryMetrics: {
        avgResponseTime: "145ms",
        avgUptime: "99.94%",
        avgThroughput: "2,847 req/s",
        avgErrorRate: "0.8%",
        avgSecurityScore: "94/100",
        avgComplianceScore: "96/100",
      },
      marketTrends: {
        openBanking: { growth: 45.2, impact: "High" },
        cbdc: { growth: 78.9, impact: "Medium" },
        defi: { growth: 156.7, impact: "Low" },
        embeddedFinance: { growth: 67.3, impact: "High" },
        regtech: { growth: 34.8, impact: "Medium" },
      },
    },
    healthcare: {
      name: "Healthcare Technology",
      icon: <Heart className="w-5 h-5" />,
      description: "Digital health, telemedicine, health records, and medical devices",
      totalCompanies: 189,
      yourRank: "N/A",
      avgScore: 79.8,
      growthRate: 34.2,
      subVerticals: [
        {
          name: "Telemedicine",
          companies: 42,
          avgScore: 81.5,
          yourRank: "N/A",
          keyMetrics: ["Consultation Quality", "Platform Reliability", "HIPAA Compliance", "Patient Satisfaction"],
          challenges: ["Video Quality", "Prescription Management", "Insurance Integration", "Multi-state Licensing"],
          leaders: ["TeleMed Pro", "HealthConnect", "VirtualCare"],
        },
        {
          name: "EHR Systems",
          companies: 35,
          avgScore: 78.2,
          yourRank: "N/A",
          keyMetrics: ["Data Interoperability", "System Uptime", "User Experience", "Security Score"],
          challenges: ["FHIR Implementation", "Data Migration", "Workflow Integration", "Physician Adoption"],
          leaders: ["HealthRecords Pro", "MedData Systems", "ClinicalFlow"],
        },
        {
          name: "Medical Devices",
          companies: 56,
          avgScore: 82.7,
          yourRank: "N/A",
          keyMetrics: ["Device Connectivity", "Data Accuracy", "FDA Compliance", "Battery Life"],
          challenges: ["IoMT Security", "Real-time Monitoring", "Regulatory Approval", "Interoperability"],
          leaders: ["MedDevice Connect", "HealthTech Solutions", "BioMonitor"],
        },
        {
          name: "Health Analytics",
          companies: 38,
          avgScore: 80.9,
          yourRank: "N/A",
          keyMetrics: ["Prediction Accuracy", "Data Processing Speed", "Privacy Protection", "Clinical Outcomes"],
          challenges: ["AI Model Validation", "Bias Detection", "Real-world Evidence", "Population Health"],
          leaders: ["HealthAI", "ClinicalAnalytics", "PopulationHealth Pro"],
        },
        {
          name: "Pharmacy Tech",
          companies: 18,
          avgScore: 77.4,
          yourRank: "N/A",
          keyMetrics: ["Prescription Accuracy", "Delivery Speed", "Inventory Management", "Drug Interaction Alerts"],
          challenges: ["Controlled Substances", "Insurance Verification", "Medication Adherence", "Supply Chain"],
          leaders: ["PharmaTech", "RxConnect", "MedSupply Pro"],
        },
      ],
      regulatoryFrameworks: [
        { name: "HIPAA", compliance: 0, required: true },
        { name: "FDA 21 CFR Part 11", compliance: 0, required: true },
        { name: "HITECH", compliance: 0, required: true },
        { name: "GDPR", compliance: 0, required: true },
        { name: "SOC 2", compliance: 0, required: false },
      ],
      industryMetrics: {
        avgResponseTime: "234ms",
        avgUptime: "99.87%",
        avgThroughput: "1,456 req/s",
        avgErrorRate: "1.2%",
        avgSecurityScore: "96/100",
        avgComplianceScore: "98/100",
      },
      marketTrends: {
        aiDiagnostics: { growth: 89.4, impact: "High" },
        remoteMonitoring: { growth: 67.8, impact: "High" },
        digitalTherapeutics: { growth: 45.6, impact: "Medium" },
        precisionMedicine: { growth: 78.2, impact: "High" },
        mentalHealthTech: { growth: 123.5, impact: "Medium" },
      },
    },
    ecommerce: {
      name: "E-commerce & Retail",
      icon: <ShoppingCart className="w-5 h-5" />,
      description: "Online marketplaces, retail platforms, and commerce enablement",
      totalCompanies: 312,
      yourRank: 4,
      avgScore: 76.3,
      growthRate: 22.1,
      subVerticals: [
        {
          name: "Marketplace Platforms",
          companies: 78,
          avgScore: 78.9,
          yourRank: 3,
          keyMetrics: ["GMV Growth", "Seller Acquisition", "Buyer Retention", "Platform Reliability"],
          challenges: ["Multi-vendor Management", "Payment Processing", "Fraud Prevention", "Global Expansion"],
          leaders: ["MarketPlace Pro", "CommerceHub", "Your Platform"],
        },
        {
          name: "Payment Solutions",
          companies: 89,
          avgScore: 75.4,
          yourRank: 5,
          keyMetrics: ["Transaction Success Rate", "Checkout Conversion", "Payment Methods", "Security Score"],
          challenges: ["Buy Now Pay Later", "Cryptocurrency", "Cross-border Payments", "Mobile Wallets"],
          leaders: ["PayCommerce", "CheckoutPro", "PaymentFlow", "SecurePay", "Your Platform"],
        },
        {
          name: "Inventory Management",
          companies: 45,
          avgScore: 74.2,
          yourRank: "N/A",
          keyMetrics: ["Stock Accuracy", "Demand Forecasting", "Warehouse Efficiency", "Order Fulfillment"],
          challenges: ["Omnichannel Inventory", "Demand Planning", "Supply Chain Visibility", "Returns Management"],
          leaders: ["InventoryPro", "StockMaster", "WarehouseFlow"],
        },
        {
          name: "Customer Experience",
          companies: 67,
          avgScore: 77.8,
          yourRank: 2,
          keyMetrics: ["Customer Satisfaction", "Response Time", "Personalization Score", "Retention Rate"],
          challenges: ["AI Personalization", "Omnichannel Support", "Voice Commerce", "AR/VR Shopping"],
          leaders: ["CXPlatform", "Your Platform", "CustomerFirst"],
        },
        {
          name: "Logistics Tech",
          companies: 33,
          avgScore: 73.6,
          yourRank: "N/A",
          keyMetrics: ["Delivery Speed", "Cost Efficiency", "Route Optimization", "Last-mile Success"],
          challenges: ["Same-day Delivery", "Sustainable Logistics", "Drone Delivery", "International Shipping"],
          leaders: ["LogisticsPro", "DeliveryFlow", "ShipTech"],
        },
      ],
      regulatoryFrameworks: [
        { name: "PCI DSS", compliance: 89, required: true },
        { name: "GDPR", compliance: 92, required: true },
        { name: "CCPA", compliance: 87, required: true },
        { name: "Consumer Protection", compliance: 94, required: true },
        { name: "Tax Compliance", compliance: 91, required: true },
      ],
      industryMetrics: {
        avgResponseTime: "189ms",
        avgUptime: "99.89%",
        avgThroughput: "3,245 req/s",
        avgErrorRate: "1.1%",
        avgSecurityScore: "87/100",
        avgComplianceScore: "91/100",
      },
      marketTrends: {
        socialCommerce: { growth: 78.4, impact: "High" },
        voiceCommerce: { growth: 45.7, impact: "Medium" },
        sustainableCommerce: { growth: 67.2, impact: "High" },
        liveCommerce: { growth: 134.8, impact: "Medium" },
        headlessCommerce: { growth: 89.3, impact: "High" },
      },
    },
    logistics: {
      name: "Logistics & Supply Chain",
      icon: <Truck className="w-5 h-5" />,
      description: "Transportation, warehousing, freight, and supply chain management",
      totalCompanies: 156,
      yourRank: "N/A",
      avgScore: 74.8,
      growthRate: 19.4,
      subVerticals: [
        {
          name: "Transportation Management",
          companies: 42,
          avgScore: 76.3,
          yourRank: "N/A",
          keyMetrics: ["On-time Delivery", "Route Efficiency", "Fuel Consumption", "Driver Safety"],
          challenges: ["Dynamic Routing", "Fleet Electrification", "Driver Shortage", "Autonomous Vehicles"],
          leaders: ["TransportPro", "FleetMaster", "RouteOptimizer"],
        },
        {
          name: "Warehouse Management",
          companies: 38,
          avgScore: 75.1,
          yourRank: "N/A",
          keyMetrics: ["Pick Accuracy", "Throughput", "Space Utilization", "Labor Efficiency"],
          challenges: ["Warehouse Automation", "Robotics Integration", "Inventory Visibility", "Peak Season Scaling"],
          leaders: ["WarehousePro", "AutoStore", "PickMaster"],
        },
        {
          name: "Freight Management",
          companies: 35,
          avgScore: 73.8,
          yourRank: "N/A",
          keyMetrics: ["Load Optimization", "Carrier Performance", "Cost per Mile", "Damage Rate"],
          challenges: ["Digital Freight Matching", "Capacity Management", "Cross-border Compliance", "Sustainability"],
          leaders: ["FreightFlow", "CarrierConnect", "LoadMaster"],
        },
        {
          name: "Last-Mile Delivery",
          companies: 28,
          avgScore: 77.2,
          yourRank: "N/A",
          keyMetrics: ["Delivery Success Rate", "Customer Satisfaction", "Delivery Speed", "Cost per Delivery"],
          challenges: ["Urban Delivery", "Contactless Delivery", "Delivery Windows", "Returns Logistics"],
          leaders: ["LastMilePro", "DeliveryTech", "UrbanLogistics"],
        },
        {
          name: "Supply Chain Visibility",
          companies: 13,
          avgScore: 72.4,
          yourRank: "N/A",
          keyMetrics: ["Tracking Accuracy", "Visibility Coverage", "Alert Response Time", "Supplier Performance"],
          challenges: ["End-to-end Visibility", "Supplier Integration", "Risk Management", "Sustainability Tracking"],
          leaders: ["VisibilityPro", "SupplyChainFlow", "TrackMaster"],
        },
      ],
      regulatoryFrameworks: [
        { name: "DOT Regulations", compliance: 0, required: true },
        { name: "FMCSA", compliance: 0, required: true },
        { name: "Customs Compliance", compliance: 0, required: true },
        { name: "Environmental Standards", compliance: 0, required: true },
        { name: "Safety Regulations", compliance: 0, required: true },
      ],
      industryMetrics: {
        avgResponseTime: "267ms",
        avgUptime: "99.76%",
        avgThroughput: "1,234 req/s",
        avgErrorRate: "1.8%",
        avgSecurityScore: "82/100",
        avgComplianceScore: "89/100",
      },
      marketTrends: {
        autonomousVehicles: { growth: 67.8, impact: "High" },
        droneDelivery: { growth: 89.4, impact: "Medium" },
        sustainableLogistics: { growth: 45.6, impact: "High" },
        blockchainTracking: { growth: 34.7, impact: "Medium" },
        aiOptimization: { growth: 78.2, impact: "High" },
      },
    },
    education: {
      name: "Education Technology",
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Learning management, online education, and educational tools",
      totalCompanies: 134,
      yourRank: "N/A",
      avgScore: 73.2,
      growthRate: 41.8,
      subVerticals: [
        {
          name: "Learning Management Systems",
          companies: 45,
          avgScore: 75.8,
          yourRank: "N/A",
          keyMetrics: ["User Engagement", "Course Completion Rate", "System Reliability", "Mobile Experience"],
          challenges: ["Personalized Learning", "Assessment Integrity", "Accessibility", "Integration Capabilities"],
          leaders: ["EduPlatform", "LearnFlow", "AcademicPro"],
        },
        {
          name: "Online Course Platforms",
          companies: 38,
          avgScore: 72.4,
          yourRank: "N/A",
          keyMetrics: ["Content Quality", "Student Satisfaction", "Instructor Tools", "Certification Value"],
          challenges: ["Content Curation", "Peer Learning", "Skill Assessment", "Career Outcomes"],
          leaders: ["CourseHub", "SkillBuilder", "OnlineAcademy"],
        },
        {
          name: "Student Information Systems",
          companies: 28,
          avgScore: 74.6,
          yourRank: "N/A",
          keyMetrics: ["Data Accuracy", "Parent Engagement", "Administrative Efficiency", "Security Score"],
          challenges: ["Data Privacy", "System Integration", "Mobile Access", "Analytics Capabilities"],
          leaders: ["StudentPro", "SchoolFlow", "EduData"],
        },
        {
          name: "Educational Content",
          companies: 23,
          avgScore: 71.9,
          yourRank: "N/A",
          keyMetrics: ["Content Engagement", "Learning Outcomes", "Accessibility Score", "Update Frequency"],
          challenges: ["Interactive Content", "Multilingual Support", "Adaptive Learning", "Content Standards"],
          leaders: ["ContentPro", "EduCreate", "LearningLab"],
        },
      ],
      regulatoryFrameworks: [
        { name: "FERPA", compliance: 0, required: true },
        { name: "COPPA", compliance: 0, required: true },
        { name: "ADA Compliance", compliance: 0, required: true },
        { name: "GDPR", compliance: 0, required: true },
        { name: "State Privacy Laws", compliance: 0, required: true },
      ],
      industryMetrics: {
        avgResponseTime: "298ms",
        avgUptime: "99.72%",
        avgThroughput: "987 req/s",
        avgErrorRate: "2.1%",
        avgSecurityScore: "88/100",
        avgComplianceScore: "93/100",
      },
      marketTrends: {
        aiTutoring: { growth: 156.7, impact: "High" },
        vrLearning: { growth: 89.3, impact: "Medium" },
        microlearning: { growth: 67.4, impact: "High" },
        gamification: { growth: 45.8, impact: "Medium" },
        skillBasedLearning: { growth: 78.9, impact: "High" },
      },
    },
    proptech: {
      name: "Property Technology",
      icon: <Home className="w-5 h-5" />,
      description: "Real estate platforms, property management, and construction tech",
      totalCompanies: 98,
      yourRank: "N/A",
      avgScore: 71.6,
      growthRate: 26.3,
      subVerticals: [
        {
          name: "Property Management",
          companies: 32,
          avgScore: 73.4,
          yourRank: "N/A",
          keyMetrics: ["Tenant Satisfaction", "Maintenance Response", "Occupancy Rate", "Rent Collection"],
          challenges: [
            "Smart Building Integration",
            "Predictive Maintenance",
            "Tenant Experience",
            "Energy Efficiency",
          ],
          leaders: ["PropManager", "BuildingFlow", "TenantPro"],
        },
        {
          name: "Real Estate Platforms",
          companies: 28,
          avgScore: 72.1,
          yourRank: "N/A",
          keyMetrics: ["Listing Accuracy", "Search Performance", "Lead Quality", "Transaction Speed"],
          challenges: ["Virtual Tours", "Market Analytics", "Lead Conversion", "Mobile Experience"],
          leaders: ["RealtyPro", "PropertyHub", "EstateFlow"],
        },
        {
          name: "Construction Tech",
          companies: 24,
          avgScore: 69.8,
          yourRank: "N/A",
          keyMetrics: ["Project Timeline", "Cost Accuracy", "Safety Score", "Quality Control"],
          challenges: ["BIM Integration", "Project Collaboration", "Safety Monitoring", "Resource Planning"],
          leaders: ["BuildTech", "ConstructPro", "ProjectFlow"],
        },
        {
          name: "Smart Building",
          companies: 14,
          avgScore: 70.5,
          yourRank: "N/A",
          keyMetrics: ["Energy Efficiency", "System Integration", "Tenant Comfort", "Maintenance Costs"],
          challenges: ["IoT Integration", "Data Analytics", "System Interoperability", "Cybersecurity"],
          leaders: ["SmartBuild", "BuildingAI", "IoTProperty"],
        },
      ],
      regulatoryFrameworks: [
        { name: "Building Codes", compliance: 0, required: true },
        { name: "Fair Housing", compliance: 0, required: true },
        { name: "Environmental Standards", compliance: 0, required: true },
        { name: "Data Privacy", compliance: 0, required: true },
        { name: "Safety Regulations", compliance: 0, required: true },
      ],
      industryMetrics: {
        avgResponseTime: "312ms",
        avgUptime: "99.68%",
        avgThroughput: "756 req/s",
        avgErrorRate: "2.4%",
        avgSecurityScore: "84/100",
        avgComplianceScore: "87/100",
      },
      marketTrends: {
        smartBuildings: { growth: 78.4, impact: "High" },
        virtualTours: { growth: 134.7, impact: "High" },
        propTechInvestment: { growth: 45.6, impact: "Medium" },
        sustainableBuilding: { growth: 67.8, impact: "High" },
        fractionalOwnership: { growth: 89.2, impact: "Medium" },
      },
    },
    energy: {
      name: "Energy & Utilities",
      icon: <Zap className="w-5 h-5" />,
      description: "Smart grid, renewable energy, and utility management platforms",
      totalCompanies: 87,
      yourRank: "N/A",
      avgScore: 76.9,
      growthRate: 31.7,
      subVerticals: [
        {
          name: "Smart Grid",
          companies: 28,
          avgScore: 78.6,
          yourRank: "N/A",
          keyMetrics: ["Grid Reliability", "Energy Efficiency", "Demand Response", "Outage Recovery"],
          challenges: ["Grid Modernization", "Renewable Integration", "Cybersecurity", "Real-time Analytics"],
          leaders: ["GridTech", "SmartEnergy", "PowerFlow"],
        },
        {
          name: "Renewable Energy",
          companies: 24,
          avgScore: 76.8,
          yourRank: "N/A",
          keyMetrics: ["Energy Production", "Efficiency Rate", "Maintenance Costs", "Grid Integration"],
          challenges: ["Energy Storage", "Weather Forecasting", "Grid Stability", "Cost Optimization"],
          leaders: ["RenewablePro", "SolarTech", "WindFlow"],
        },
        {
          name: "Energy Management",
          companies: 21,
          avgScore: 75.4,
          yourRank: "N/A",
          keyMetrics: ["Energy Savings", "Cost Reduction", "System Efficiency", "User Engagement"],
          challenges: ["Building Automation", "Demand Forecasting", "Energy Analytics", "IoT Integration"],
          leaders: ["EnergyPro", "BuildingEnergy", "EfficiencyFlow"],
        },
        {
          name: "Utility Operations",
          companies: 14,
          avgScore: 77.2,
          yourRank: "N/A",
          keyMetrics: [
            "Service Reliability",
            "Customer Satisfaction",
            "Operational Efficiency",
            "Regulatory Compliance",
          ],
          challenges: ["Asset Management", "Workforce Optimization", "Customer Engagement", "Digital Transformation"],
          leaders: ["UtilityPro", "ServiceFlow", "OperationsTech"],
        },
      ],
      regulatoryFrameworks: [
        { name: "NERC CIP", compliance: 0, required: true },
        { name: "FERC Orders", compliance: 0, required: true },
        { name: "Environmental Standards", compliance: 0, required: true },
        { name: "Safety Regulations", compliance: 0, required: true },
        { name: "Cybersecurity Standards", compliance: 0, required: true },
      ],
      industryMetrics: {
        avgResponseTime: "198ms",
        avgUptime: "99.91%",
        avgThroughput: "1,567 req/s",
        avgErrorRate: "0.9%",
        avgSecurityScore: "92/100",
        avgComplianceScore: "95/100",
      },
      marketTrends: {
        energyStorage: { growth: 89.4, impact: "High" },
        smartMeters: { growth: 45.7, impact: "High" },
        electricVehicles: { growth: 134.8, impact: "High" },
        hydrogenEnergy: { growth: 67.2, impact: "Medium" },
        carbonCapture: { growth: 78.9, impact: "Medium" },
      },
    },
  }

  const verticalStats = {
    totalVerticals: 7,
    activeGroups: 4,
    totalCompanies: 1223,
    avgGrowthRate: 29.2,
    topRankings: 3,
  }

  const getVerticalIcon = (vertical: string) => {
    const icons = {
      fintech: <Building className="w-4 h-4" />,
      healthcare: <Heart className="w-4 h-4" />,
      ecommerce: <ShoppingCart className="w-4 h-4" />,
      logistics: <Truck className="w-4 h-4" />,
      education: <GraduationCap className="w-4 h-4" />,
      proptech: <Home className="w-4 h-4" />,
      energy: <Zap className="w-4 h-4" />,
    }
    return icons[vertical as keyof typeof icons] || <Building className="w-4 h-4" />
  }

  const getGrowthColor = (growth: number) => {
    if (growth >= 30) return "text-green-300"
    if (growth >= 20) return "text-blue-300"
    if (growth >= 10) return "text-yellow-300"
    return "text-red-300"
  }

  const getRankColor = (rank: number | string) => {
    if (rank === "N/A") return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    if (rank === 1) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    if (rank === 2) return "bg-gray-400/20 text-gray-300 border-gray-400/30"
    if (rank === 3) return "bg-orange-500/20 text-orange-300 border-orange-500/30"
    return "bg-gray-600/20 text-gray-400 border-gray-600/30"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AsymmetricLogo className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold text-white">Vertical Industry Peer Groups</h1>
                <p className="text-purple-200">Specialized benchmarking for niche industry verticals</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-purple-400 text-purple-300">
                <Crown className="w-3 h-3 mr-1" />
                Founder Access
              </Badge>
              <div className="flex items-center gap-2">
                <select
                  value={selectedVertical}
                  onChange={(e) => setSelectedVertical(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
                >
                  {Object.entries(verticalGroups).map(([key, vertical]) => (
                    <option key={key} value={key}>
                      {vertical.name}
                    </option>
                  ))}
                </select>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Target className="w-4 h-4 mr-2" />
                  Join Vertical
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-4 text-center">
              <Building className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{verticalStats.totalVerticals}</p>
              <p className="text-sm text-gray-400">Industry Verticals</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{verticalStats.totalCompanies}</p>
              <p className="text-sm text-gray-400">Total Companies</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{verticalStats.avgGrowthRate}%</p>
              <p className="text-sm text-gray-400">Avg Growth Rate</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{verticalStats.topRankings}</p>
              <p className="text-sm text-gray-400">#1 Rankings</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{verticalStats.activeGroups}</p>
              <p className="text-sm text-gray-400">Active Groups</p>
            </CardContent>
          </Card>
        </div>

        {/* Vertical Overview Grid */}
        <Card className="bg-black/40 border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building className="w-5 h-5" />
              Industry Vertical Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(verticalGroups).map(([key, vertical]) => (
                <div
                  key={key}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedVertical === key
                      ? "bg-purple-500/10 border-purple-500/30"
                      : "bg-black/20 border-white/10 hover:border-white/20"
                  }`}
                  onClick={() => setSelectedVertical(key)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getVerticalIcon(key)}
                      <h3 className="font-semibold text-white">{vertical.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {vertical.yourRank !== "N/A" && (
                        <Badge className={getRankColor(vertical.yourRank)}>#{vertical.yourRank}</Badge>
                      )}
                      <Badge variant="outline" className="border-gray-400 text-gray-300 text-xs">
                        {vertical.totalCompanies}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-3">{vertical.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                    <div>
                      <p className="text-gray-400">Avg Score</p>
                      <p className="font-medium text-white">{vertical.avgScore}/100</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Growth Rate</p>
                      <p className={`font-medium ${getGrowthColor(vertical.growthRate)}`}>+{vertical.growthRate}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs text-gray-400">{vertical.subVerticals.length} Sub-verticals</span>
                    <div className="flex gap-1">
                      {vertical.yourRank !== "N/A" && (
                        <Badge className="bg-green-500/20 border-green-400 text-green-300 text-xs">
                          <CheckCircle className="w-2 h-2 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/20 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              <Building className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-purple-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-purple-600">
              <Shield className="w-4 h-4 mr-2" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-purple-600">
              <Star className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="data-[state=active]:bg-purple-600">
              <Target className="w-4 h-4 mr-2" />
              Benchmarks
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <VerticalOverview vertical={verticalGroups[selectedVertical]} verticalKey={selectedVertical} />
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics">
            <VerticalMetrics vertical={verticalGroups[selectedVertical]} verticalKey={selectedVertical} />
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance">
            <ComplianceTracker vertical={verticalGroups[selectedVertical]} verticalKey={selectedVertical} />
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends">
            <IndustryTrends vertical={verticalGroups[selectedVertical]} verticalKey={selectedVertical} />
          </TabsContent>

          {/* Benchmarks Tab */}
          <TabsContent value="benchmarks">
            <VerticalBenchmarks vertical={verticalGroups[selectedVertical]} verticalKey={selectedVertical} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
