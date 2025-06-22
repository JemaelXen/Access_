"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export function IntegrationHeatmap() {
  const heatmapData = [
    // Days of week (rows) x Hours (columns)
    { day: "Monday", hours: Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * 100)) },
    { day: "Tuesday", hours: Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * 100)) },
    { day: "Wednesday", hours: Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * 100)) },
    { day: "Thursday", hours: Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * 100)) },
    { day: "Friday", hours: Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * 100)) },
    { day: "Saturday", hours: Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * 100)) },
    { day: "Sunday", hours: Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * 100)) },
  ]

  const getIntensityColor = (value: number) => {
    if (value >= 80) return "bg-red-500"
    if (value >= 60) return "bg-orange-500"
    if (value >= 40) return "bg-yellow-500"
    if (value >= 20) return "bg-green-500"
    return "bg-blue-500"
  }

  const getIntensityOpacity = (value: number) => {
    return Math.max(0.1, value / 100)
  }

  const integrationStats = [
    {
      name: "Peak Usage",
      value: "Thursday 3:00 PM",
      icon: TrendingUp,
      color: "text-green-400",
      description: "Highest activity period",
    },
    {
      name: "Low Usage",
      value: "Sunday 4:00 AM",
      icon: Clock,
      color: "text-blue-400",
      description: "Lowest activity period",
    },
    {
      name: "Error Hotspot",
      value: "Friday 11:00 AM",
      icon: AlertTriangle,
      color: "text-red-400",
      description: "Highest error concentration",
    },
    {
      name: "Best Performance",
      value: "Tuesday 2:00 AM",
      icon: CheckCircle,
      color: "text-green-400",
      description: "Optimal response times",
    },
  ]

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Integration Activity Heatmap
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-purple-400 text-purple-300">
              Last 7 Days
            </Badge>
            <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Heatmap */}
          <div className="lg:col-span-3">
            <div className="space-y-2">
              {/* Hour labels */}
              <div className="flex gap-1 ml-16">
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="w-4 text-xs text-gray-400 text-center">
                    {i.toString().padStart(2, "0")}
                  </div>
                ))}
              </div>

              {/* Heatmap grid */}
              {heatmapData.map((dayData, dayIndex) => (
                <div key={dayIndex} className="flex items-center gap-1">
                  <div className="w-14 text-sm text-gray-400 text-right">{dayData.day.slice(0, 3)}</div>
                  <div className="flex gap-1">
                    {dayData.hours.map((value, hourIndex) => (
                      <div
                        key={hourIndex}
                        className={`w-4 h-4 rounded-sm cursor-pointer transition-all hover:scale-110 ${getIntensityColor(value)}`}
                        style={{ opacity: getIntensityOpacity(value) }}
                        title={`${dayData.day} ${hourIndex}:00 - ${value}% usage`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                <span>Less</span>
                <div className="flex gap-1">
                  {[10, 30, 50, 70, 90].map((opacity) => (
                    <div
                      key={opacity}
                      className="w-3 h-3 bg-purple-500 rounded-sm"
                      style={{ opacity: opacity / 100 }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white mb-3">Activity Insights</h3>
            {integrationStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className={`w-4 h-4 ${stat.color}`} />
                    <span className="font-medium text-white text-sm">{stat.name}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.description}</p>
                </div>
              )
            })}

            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <h4 className="font-medium text-purple-300 mb-2">Pattern Analysis</h4>
              <div className="space-y-1 text-xs text-gray-300">
                <p>• Weekday peaks: 9-11 AM, 2-4 PM</p>
                <p>• Weekend usage 40% lower</p>
                <p>• Error rates spike during peak hours</p>
                <p>• Best performance during off-hours</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
