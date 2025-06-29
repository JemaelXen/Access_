"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { country: "USA", users: 12500, growth: 15.2 },
  { country: "UK", users: 8900, growth: 12.8 },
  { country: "Germany", users: 7200, growth: 18.5 },
  { country: "France", users: 6800, growth: 14.3 },
  { country: "Canada", users: 5400, growth: 22.1 },
  { country: "Australia", users: 4200, growth: 19.7 },
  { country: "Japan", users: 3800, growth: 16.9 },
  { country: "Brazil", users: 3200, growth: 25.4 },
]

export function UserAcquisitionMap() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="country" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
          <YAxis
            className="text-xs fill-muted-foreground"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number, name: string) => [
              name === "users" ? `${value.toLocaleString()} users` : `${value}% growth`,
              name === "users" ? "Total Users" : "Growth Rate",
            ]}
          />
          <Bar
            dataKey="users"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
