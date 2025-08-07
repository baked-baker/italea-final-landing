import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Italea - Guilt-Free Indulgence",
  description: "Wellness bakery and deli rooted in flavor, soul, and community. Opening soon at Highway Mall.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical above-the-fold images */}
        <link rel="preload" as="image" href="/images/hero-flat-lay.png" type="image/png" />
        <link rel="preload" as="image" href="/images/uji-power-bowl.png" type="image/png" />
        <link rel="preload" as="image" href="/images/plantain-porridge-bowl.png" type="image/png" />
        <link rel="preload" as="image" href="/images/chocolate-chip-scones.png" type="image/png" />
        {/* DNS prefetch for external image sources */}
        <link rel="dns-prefetch" href="//hebbkx1anhila5yf.public.blob.vercel-storage.com" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  )
}
