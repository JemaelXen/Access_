"use client"

import { Card } from "@/components/ui/card"

export function UserAcquisitionMap({ height = 300 }: { height?: number }) {
  return (
    <div className="relative" style={{ height: `${height}px` }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-3">
          <div className="text-sm font-medium">North America</div>
          <div className="text-2xl font-bold">6.2M</div>
          <div className="text-xs text-muted-foreground">+12% growth</div>
        </Card>
        <Card className="p-3">
          <div className="text-sm font-medium">Europe</div>
          <div className="text-2xl font-bold">5.8M</div>
          <div className="text-xs text-muted-foreground">+9% growth</div>
        </Card>
        <Card className="p-3">
          <div className="text-sm font-medium">Asia</div>
          <div className="text-2xl font-bold">8.4M</div>
          <div className="text-xs text-muted-foreground">+18% growth</div>
        </Card>
        <Card className="p-3">
          <div className="text-sm font-medium">Other Regions</div>
          <div className="text-2xl font-bold">4.3M</div>
          <div className="text-xs text-muted-foreground">+15% growth</div>
        </Card>
      </div>
    </div>
  )
}
