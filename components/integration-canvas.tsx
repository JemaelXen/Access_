"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Database, Shield, Code, Plus, Settings, Play, Save, Download, Trash2, Copy } from "lucide-react"

interface Node {
  id: string
  type: "trigger" | "action" | "condition" | "transform"
  name: string
  description: string
  icon: any
  position: { x: number; y: number }
  inputs: string[]
  outputs: string[]
  config: Record<string, any>
  apiVersion?: string
  status: "active" | "inactive" | "error" | "warning"
}

interface Connection {
  id: string
  from: string
  to: string
  fromOutput: string
  toInput: string
}

export function IntegrationCanvas() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "trigger-1",
      type: "trigger",
      name: "New Post Created",
      description: "Triggers when a new post is created",
      icon: Zap,
      position: { x: 100, y: 100 },
      inputs: [],
      outputs: ["post_data"],
      config: { event: "post.created" },
      apiVersion: "v3.0",
      status: "active",
    },
    {
      id: "condition-1",
      type: "condition",
      name: "Check User Tier",
      description: "Check if user is Elite member",
      icon: Shield,
      position: { x: 400, y: 100 },
      inputs: ["user_data"],
      outputs: ["elite_user", "regular_user"],
      config: { condition: 'user.tier === "elite"' },
      apiVersion: "v3.0",
      status: "active",
    },
    {
      id: "action-1",
      type: "action",
      name: "Send Notification",
      description: "Send push notification to followers",
      icon: Database,
      position: { x: 700, y: 50 },
      inputs: ["notification_data"],
      outputs: ["result"],
      config: { service: "push_notifications" },
      apiVersion: "v3.0",
      status: "active",
    },
    {
      id: "action-2",
      type: "action",
      name: "Update Analytics",
      description: "Update user engagement analytics",
      icon: Code,
      position: { x: 700, y: 200 },
      inputs: ["analytics_data"],
      outputs: ["result"],
      config: { service: "analytics" },
      apiVersion: "v4.0",
      status: "warning",
    },
  ])

  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "conn-1",
      from: "trigger-1",
      to: "condition-1",
      fromOutput: "post_data",
      toInput: "user_data",
    },
    {
      id: "conn-2",
      from: "condition-1",
      to: "action-1",
      fromOutput: "elite_user",
      toInput: "notification_data",
    },
    {
      id: "conn-3",
      from: "condition-1",
      to: "action-2",
      fromOutput: "regular_user",
      toInput: "analytics_data",
    },
  ])

  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleNodeMouseDown = useCallback(
    (nodeId: string, event: React.MouseEvent) => {
      const node = nodes.find((n) => n.id === nodeId)
      if (!node) return

      setSelectedNode(nodeId)
      setIsDragging(true)
      setDragOffset({
        x: event.clientX - node.position.x,
        y: event.clientY - node.position.y,
      })
    },
    [nodes],
  )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!isDragging || !selectedNode) return

      setNodes((prev) =>
        prev.map((node) =>
          node.id === selectedNode
            ? {
                ...node,
                position: {
                  x: event.clientX - dragOffset.x,
                  y: event.clientY - dragOffset.y,
                },
              }
            : node,
        ),
      )
    },
    [isDragging, selectedNode, dragOffset],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setDragOffset({ x: 0, y: 0 })
  }, [])

  const getNodeColor = (type: string, status: string) => {
    const baseColors = {
      trigger: "from-green-500 to-emerald-600",
      condition: "from-yellow-500 to-orange-600",
      action: "from-blue-500 to-indigo-600",
      transform: "from-purple-500 to-pink-600",
    }

    const statusOverlay = {
      active: "",
      inactive: "opacity-50",
      error: "ring-2 ring-red-500",
      warning: "ring-2 ring-yellow-500",
    }

    return `bg-gradient-to-br ${baseColors[type as keyof typeof baseColors]} ${statusOverlay[status as keyof typeof statusOverlay]}`
  }

  const renderConnections = () => {
    return connections.map((connection) => {
      const fromNode = nodes.find((n) => n.id === connection.from)
      const toNode = nodes.find((n) => n.id === connection.to)

      if (!fromNode || !toNode) return null

      const fromX = fromNode.position.x + 200 // Node width
      const fromY = fromNode.position.y + 50 // Node height / 2
      const toX = toNode.position.x
      const toY = toNode.position.y + 50

      const midX = (fromX + toX) / 2

      return (
        <g key={connection.id}>
          <path
            d={`M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`}
            stroke="rgba(147, 51, 234, 0.6)"
            strokeWidth="2"
            fill="none"
            className="hover:stroke-purple-400 cursor-pointer"
          />
          <circle cx={fromX} cy={fromY} r="4" fill="rgb(147, 51, 234)" />
          <circle cx={toX} cy={toY} r="4" fill="rgb(147, 51, 234)" />
        </g>
      )
    })
  }

  return (
    <Card className="bg-black/40 border-white/10 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Code className="w-5 h-5" />
            Integration Canvas
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
              <Play className="w-4 h-4 mr-1" />
              Test
            </Button>
            <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={canvasRef}
          className="relative w-full h-[700px] bg-gradient-to-br from-gray-900/50 to-black/50 overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">{renderConnections()}</svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const IconComponent = node.icon
            return (
              <div
                key={node.id}
                className={`absolute w-48 cursor-move transition-all duration-200 ${
                  selectedNode === node.id ? "scale-105 z-10" : "z-0"
                }`}
                style={{
                  left: node.position.x,
                  top: node.position.y,
                }}
                onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
              >
                <Card className={`${getNodeColor(node.type, node.status)} border-white/20 backdrop-blur-sm`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-white" />
                        <Badge variant="secondary" className="text-xs">
                          {node.type}
                        </Badge>
                      </div>
                      {node.apiVersion && (
                        <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                          {node.apiVersion}
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-white text-sm mb-1">{node.name}</h3>
                    <p className="text-xs text-white/70 mb-3">{node.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white/70 hover:text-white">
                          <Settings className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white/70 hover:text-white">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white/70 hover:text-white">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      <div
                        className={`w-2 h-2 rounded-full ${
                          node.status === "active"
                            ? "bg-green-400"
                            : node.status === "warning"
                              ? "bg-yellow-400"
                              : node.status === "error"
                                ? "bg-red-400"
                                : "bg-gray-400"
                        }`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}

          {/* Add Node Button */}
          <Button
            className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 rounded-full w-12 h-12 p-0"
            onClick={() => {
              // Add new node logic
            }}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
