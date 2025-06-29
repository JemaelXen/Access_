"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Zap } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  animated?: boolean
}

export function Logo({ size = "md", showText = true, animated = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  const LogoIcon = animated ? motion.div : "div"
  const LogoText = animated ? motion.span : "span"

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <LogoIcon
        className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
        {...(animated && {
          whileHover: { scale: 1.05, rotate: 5 },
          whileTap: { scale: 0.95 },
          animate: {
            background: [
              "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
              "linear-gradient(45deg, #8b5cf6, #ec4899, #3b82f6)",
              "linear-gradient(45deg, #ec4899, #3b82f6, #8b5cf6)",
              "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
            ],
          },
          transition: {
            background: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          },
        })}
      >
        <Zap className="h-1/2 w-1/2 text-white" />
      </LogoIcon>

      {showText && (
        <LogoText
          className={`${textSizeClasses[size]} font-bold font-heading text-gradient group-hover:scale-105 transition-transform duration-300`}
          {...(animated && {
            initial: { opacity: 0, x: -10 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.2 },
          })}
        >
          Project Access
        </LogoText>
      )}
    </Link>
  )
}
