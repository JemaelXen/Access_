"use client"

export function Logo({ size = "md", color = "primary" }: { size?: "sm" | "md" | "lg"; color?: "primary" | "white" }) {
  const dimensions = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  }

  const colors = {
    primary: "from-indigo-600 to-purple-600",
    white: "from-white to-gray-200",
  }

  return (
    <div className={`relative ${dimensions[size]}`}>
      <div className={`absolute w-full h-full transform rotate-45 bg-gradient-to-br ${colors[color]} rounded-sm`}></div>
      <div className="absolute w-1/2 h-1/2 top-1/4 left-1/4 transform rotate-45 bg-white/20 rounded-sm"></div>
    </div>
  )
}
