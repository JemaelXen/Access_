"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Globe, Calendar, TrendingUp, Clock, Smartphone, Monitor, Tablet, MapPin, BarChart3 } from "lucide-react"

export function UsageAnalytics() {
  const usageMetrics = {
    totalUsers: "12,847",
    activeUsers: "8,923",
    newUsers: "1,234",
    userGrowth: 23.4,
    sessionsPerUser: "4.2",
    avgSessionDuration: "12m 34s",
    bounceRate: "23.1%",
    retentionRate: "78.9%",
  }

  const geographicData = [
    { country: "United States", users: "3,247", percentage: 25.3, flag: "🇺🇸" },
    { country: "United Kingdom", users: "2,156", percentage: 16.8, flag: "🇬🇧" },
    { country: "Canada", users: "1,834", percentage: 14.3, flag: "🇨🇦" },
    { country: "Germany", users: "1,523", percentage: 11.9, flag: "🇩🇪" },
    { country: "Australia", users: "1,289", percentage: 10.0, flag: "🇦🇺" },
    { country: "France", users: "987", percentage: 7.7, flag: "🇫🇷" },
    { country: "Japan", users: "756", percentage: 5.9, flag: "🇯🇵" },
    { country: "Others", users: "1,055", percentage: 8.1, flag: "🌍" },
  ]

  const deviceData = [
    { type: "Desktop", users: "7,234", percentage: 56.3, icon: Monitor, color: "bg-blue-500" },
    { type: "Mobile", users: "4,567", percentage: 35.5, icon: Smartphone, color: "bg-green-500" },
    { type: "Tablet", users: "1,046", percentage: 8.2, icon: Tablet, color: "bg-purple-500" },
  ]

  const timePatterns = [
    { hour: "00", usage: 12 },
    { hour: "01", usage: 8 },
    { hour: "02", usage: 6 },
    { hour: "03", usage: 4 },
    { hour: "04", usage: 5 },
    { hour: "05", usage: 8 },
    { hour: "06", usage: 15 },
    { hour: "07", usage: 25 },
    { hour: "08", usage: 45 },
    { hour: "09", usage: 78 },
    { hour: "10", usage: 89 },
    { hour: "11", usage: 92 },
    { hour: "12", usage: 85 },
    { hour: "13", usage: 88 },
    { hour: "14", usage: 95 },
    { hour: "15", usage: 100 },
    { hour: "16", usage: 87 },
    { hour: "17", usage: 76 },
    { hour: "18", usage: 65 },
    { hour: "19", usage: 54 },
    { hour: "20", usage: 43 },
    { hour: "21", usage: 35 },
    { hour: "22", usage: 28 },
    { hour: "23", usage: 18 },
  ]

  const integrationUsage = [
    {
      name: "Social Media Sync",
      users: "8,234",
      sessions: "45,678",
      avgDuration: "8m 23s",
      growth: 18.7,
      category: "Social",
    },
    {
      name: "Payment Processing",
      users: "6,789",
      sessions: "23,456",
      avgDuration: "3m 45s",
      growth: 34.2,
      category: "Finance",
    },
    {
      name: "AI Content Generation",
      users: "4,567",
      sessions: "12,345",
      avgDuration: "15m 12s",
      growth: 67.8,
      category: "AI/ML",
    },
    {
      name: "Analytics Dashboard",
      users: "3,456",
      sessions: "18,901",
      avgDuration: "22m 34s",
      growth: 12.4,
      category: "Analytics",
    },
    {
      name: "Notification Hub",
      users: "2,345",
      sessions: "34,567",
      avgDuration: "2m 15s",
      growth: -5.3,
      category: "Communication",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-black/40 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <Badge variant="outline" className="border-green-400 text-green-300">
                <TrendingUp className="w-3 h-3 mr-1" />
                {usageMetrics.userGrowth}%
              </Badge>
            </div>
            <h3 className="text-sm text-gray-400 mb-1">Total Users</h3>
            <p className="text-2xl font-bold text-white mb-2">{usageMetrics.totalUsers}</p>
            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Active:</span>
                <span className="text-green-300">{usageMetrics.activeUsers}</span>
              </div>
              <div className="flex justify-between">
                <span>New:</span>
                <span className="text-blue-300">{usageMetrics.newUsers}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <Badge variant="outline" className="border-blue-400 text-blue-300">
                Sessions
              </Badge>
            </div>
            <h3 className="text-sm text-gray-400 mb-1">Sessions per User</h3>
            <p className="text-2xl font-bold text-white mb-2">{usageMetrics.sessionsPerUser}</p>
            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Avg Duration:</span>
                <span>{usageMetrics.avgSessionDuration}</span>
              </div>
              <div className="flex justify-between">
                <span>Bounce Rate:</span>
                <span>{usageMetrics.bounceRate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-green-400" />
              </div>
              <Badge variant="outline" className="border-green-400 text-green-300">
                Engagement
              </Badge>
            </div>
            <h3 className="text-sm text-gray-400 mb-1">Avg Session Duration</h3>
            <p className="text-2xl font-bold text-white mb-2">{usageMetrics.avgSessionDuration}</p>
            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Retention:</span>
                <span className="text-green-300">{usageMetrics.retentionRate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Globe className="w-5 h-5 text-orange-400" />
              </div>
              <Badge variant="outline" className="border-orange-400 text-orange-300">
                Global
              </Badge>
            </div>
            <h3 className="text-sm text-gray-400 mb-1">Geographic Reach</h3>
            <p className="text-2xl font-bold text-white mb-2">47</p>
            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Countries:</span>
                <span>47</span>
              </div>
              <div className="flex justify-between">
                <span>Continents:</span>
                <span>6</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution & Device Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {geographicData.map((country, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{country.flag}</span>
                    <div>
                      <h3 className="font-medium text-white">{country.country}</h3>
                      <p className="text-sm text-gray-400">{country.users} users</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-purple-300">{country.percentage}%</p>
                    <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                      <div className="bg-purple-500 h-1 rounded-full" style={{ width: `${country.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Device Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceData.map((device, index) => {
                const IconComponent = device.icon
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${device.color}/20`}>
                          <IconComponent className={`w-4 h-4 ${device.color.replace("bg-", "text-")}`} />
                        </div>
                        <span className="font-medium text-white">{device.type}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">{device.users}</p>
                        <p className="text-xs text-gray-400">{device.percentage}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className={`h-2 rounded-full ${device.color}`} style={{ width: `${device.percentage}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 p-4 bg-black/20 rounded-lg">
              <h4 className="font-medium text-white mb-2">Usage Insights</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Desktop users have 40% longer session duration</p>
                <p>• Mobile usage peaks during commute hours (8-9 AM, 5-6 PM)</p>
                <p>• Tablet users show highest engagement with visual content</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Patterns */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Usage Patterns by Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-1 mb-4">
            {timePatterns.map((pattern, index) => (
              <div key={index} className="text-center">
                <div
                  className="bg-purple-500 rounded-sm mb-1 transition-all hover:bg-purple-400"
                  style={{ height: `${pattern.usage}px` }}
                />
                <span className="text-xs text-gray-400">{pattern.hour}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Peak: 3:00 PM (100% usage)</span>
            <span>Low: 3:00 AM (4% usage)</span>
          </div>
        </CardContent>
      </Card>

      {/* Integration Usage Details */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Integration Usage Details
            </CardTitle>
            <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Integration</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Users</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Sessions</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Avg Duration</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Growth</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Category</th>
                </tr>
              </thead>
              <tbody>
                {integrationUsage.map((integration, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4">
                      <span className="font-medium text-white">{integration.name}</span>
                    </td>
                    <td className="py-3 px-4 text-purple-300">{integration.users}</td>
                    <td className="py-3 px-4 text-blue-300">{integration.sessions}</td>
                    <td className="py-3 px-4 text-green-300">{integration.avgDuration}</td>
                    <td className="py-3 px-4">
                      <span className={`${integration.growth > 0 ? "text-green-300" : "text-red-300"}`}>
                        {integration.growth > 0 ? "+" : ""}
                        {integration.growth}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="text-xs">
                        {integration.category}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
