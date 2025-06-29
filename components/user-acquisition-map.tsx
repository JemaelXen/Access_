"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const regions = [
  { name: "North America", users: 12500, growth: 15.2, color: "bg-blue-500" },
  { name: "Europe", users: 8900, growth: 12.8, color: "bg-green-500" },
  { name: "Asia Pacific", users: 6700, growth: 22.1, color: "bg-purple-500" },
  { name: "South America", users: 3200, growth: 8.5, color: "bg-orange-500" },
  { name: "Africa", users: 1800, growth: 18.9, color: "bg-pink-500" },
]

export function UserAcquisitionMap() {
  return (
    <div className="space-y-4" data-testid="user-acquisition-map">
      <div className="grid grid-cols-1 gap-4">
        {regions.map((region) => (
          <Card key={region.name} className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${region.color}`} />
                  <div>
                    <p className="font-medium">{region.name}</p>
                    <p className="text-sm text-muted-foreground">{region.users.toLocaleString()} users</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-green-600">
                  +{region.growth}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
