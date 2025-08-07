"use client"

import { motion } from "framer-motion"

export function HoneyDripAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"
          style={{
            left: `${30 + i * 20}%`,
            top: "10%",
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: ["0px", "40px", "60px", "40px"],
            opacity: [0, 0.8, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
