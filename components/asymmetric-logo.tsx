"use client"

interface AsymmetricLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "primary" | "white" | "dark"
  animated?: boolean
}

export function AsymmetricLogo({ size = "md", variant = "primary", animated = false }: AsymmetricLogoProps) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const colorClasses = {
    primary: "from-blue-600 via-purple-600 to-pink-600",
    white: "from-white to-gray-100",
    dark: "from-gray-800 to-gray-900",
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${animated ? "animate-pulse" : ""}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id={`gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-color-blue-600" />
            <stop offset="50%" className="stop-color-purple-600" />
            <stop offset="100%" className="stop-color-pink-600" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Asymmetric geometric design */}
        <path
          d="M20 20 L80 30 L70 80 L30 70 Z"
          fill={`url(#gradient-${variant})`}
          filter="url(#glow)"
          className="drop-shadow-lg"
        />
        <path d="M40 15 L85 25 L75 60 L45 50 Z" fill="rgba(255,255,255,0.2)" className="mix-blend-overlay" />
        <circle cx="60" cy="45" r="8" fill="rgba(255,255,255,0.8)" className="drop-shadow-sm" />
        <path d="M15 60 L35 85 L60 75 L50 55 Z" fill="rgba(0,0,0,0.1)" className="mix-blend-multiply" />
      </svg>
    </div>
  )
}
