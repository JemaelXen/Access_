"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <span className="text-xl font-bold font-heading text-gradient">Project Access</span>
      </motion.div>
    </Link>
  )
}
