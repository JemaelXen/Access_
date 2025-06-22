"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Zap,
  Database,
  Webhook,
  Shield,
  Code,
  Globe,
  DollarSign,
  Users,
  Mail,
  ImageIcon,
  Calendar,
  Bell,
  Lock,
  Cpu,
  Layers,
} from "lucide-react"

interface NodeTemplate {
  id: string
  name: string
  description: string
  category: string
  type: "trigger" | "action" | "condition" | "transform"
  icon: any
  apiVersions: string[]
  complexity: "Low" | "Medium" | "High"
  popular: boolean
}

export function NodeLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const nodeTemplates: NodeTemplate[] = [
    // Triggers
    {
      id: "trigger-post-created",
      name: "Post Created",
      description: "Triggers when a new post is created",
      category: "Social",
      type: "trigger",
      icon: Zap,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "Low",
      popular: true,
    },
    {
      id: "trigger-user-registered",
      name: "User Registered",
      description: "Triggers when a new user registers",
      category: "User Management",
      type: "trigger",
      icon: Users,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "Low",
      popular: true,
    },
    {
      id: "trigger-payment-received",
      name: "Payment Received",
      description: "Triggers when a payment is received",
      category: "Finance",
      type: "trigger",
      icon: DollarSign,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "Medium",
      popular: true,
    },
    {
      id: "trigger-webhook",
      name: "Webhook Received",
      description: "Triggers when a webhook is received",
      category: "Integration",
      type: "trigger",
      icon: Webhook,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "Medium",
      popular: false,
    },

    // Actions
    {
      id: "action-send-email",
      name: "Send Email",
      description: "Send an email notification",
      category: "Communication",
      type: "action",
      icon: Mail,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "Low",
      popular: true,
    },
    {
      id: "action-push-notification",
      name: "Push Notification",
      description: "Send a push notification",
      category: "Communication",
      type: "action",
      icon: Bell,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "Low",
      popular: true,
    },
    {
      id: "action-database-insert",
      name: "Database Insert",
      description: "Insert data into database",
      category: "Database",
      type: "action",
      icon: Database,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "Medium",
      popular: false,
    },
    {
      id: "action-api-call",
      name: "API Call",
      description: "Make an external API call",
      category: "Integration",
      type: "action",
      icon: Globe,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "High",
      popular: true,
    },

    // Conditions
    {
      id: "condition-user-tier",
      name: "Check User Tier",
      description: "Check if user meets tier requirements",
      category: "User Management",
      type: "condition",
      icon: Shield,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "Low",
      popular: true,
    },
    {
      id: "condition-time-based",
      name: "Time Condition",
      description: "Check time-based conditions",
      category: "Logic",
      type: "condition",
      icon: Calendar,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "Low",
      popular: false,
    },
    {
      id: "condition-data-validation",
      name: "Data Validation",
      description: "Validate data against rules",
      category: "Logic",
      type: "condition",
      icon: Lock,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "Medium",
      popular: false,
    },

    // Transforms
    {
      id: "transform-data-mapper",
      name: "Data Mapper",
      description: "Transform data between formats",
      category: "Data Processing",
      type: "transform",
      icon: Code,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "Medium",
      popular: true,
    },
    {
      id: "transform-ai-content",
      name: "AI Content Generator",
      description: "Generate content using AI",
      category: "AI/ML",
      type: "transform",
      icon: Cpu,
      apiVersions: ["v4.0"],
      complexity: "High",
      popular: true,
    },
    {
      id: "transform-image-processor",
      name: "Image Processor",
      description: "Process and transform images",
      category: "Media",
      type: "transform",
      icon: ImageIcon,
      apiVersions: ["v3.0", "v4.0"],
      complexity: "High",
      popular: false,
    },
  ]

  const categories = [
    "All",
    "Social",
    "User Management",
    "Finance",
    "Integration",
    "Communication",
    "Database",
    "Logic",
    "Data Processing",
    "AI/ML",
    "Media",
  ]
  const types = ["All", "trigger", "action", "condition", "transform"]

  const filteredNodes = nodeTemplates.filter((node) => {
    const matchesSearch =
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || node.category === selectedCategory
    const matchesType = selectedType === "All" || node.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  const handleDragStart = (event: React.DragEvent, node: NodeTemplate) => {
    event.dataTransfer.setData("application/json", JSON.stringify(node))
  }

  const getTypeColor = (type: string) => {
    const colors = {
      trigger: "bg-green-500",
      action: "bg-blue-500",
      condition: "bg-yellow-500",
      transform: "bg-purple-500",
    }
    return colors[type as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <Card className="bg-black/40 border-white/10 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Node Library
        </CardTitle>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {filteredNodes.map((node) => {
          const IconComponent = node.icon
          return (
            <div
              key={node.id}
              draggable
              onDragStart={(e) => handleDragStart(e, node)}
              className="p-3 bg-black/20 border border-white/10 rounded-lg cursor-move hover:border-purple-400/50 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getTypeColor(node.type)}`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white text-sm truncate">{node.name}</h3>
                    {node.popular && (
                      <Badge variant="secondary" className="text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 mb-2 line-clamp-2">{node.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {node.apiVersions.map((version) => (
                        <Badge key={version} variant="outline" className="text-xs border-white/20 text-white/70">
                          {version}
                        </Badge>
                      ))}
                    </div>

                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        node.complexity === "Low"
                          ? "border-green-400 text-green-300"
                          : node.complexity === "Medium"
                            ? "border-yellow-400 text-yellow-300"
                            : "border-red-400 text-red-300"
                      }`}
                    >
                      {node.complexity}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {filteredNodes.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No nodes found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
