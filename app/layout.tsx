import type React from "react"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Italea - Guilt-Free Indulgence</title>
        <meta
          name="description"
          content="Wellness bakery and deli rooted in flavor, soul, and community. Opening soon at Highway Mall."
        />
        <meta name="generator" content="v0.dev" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Preload critical above-the-fold images */}
        <link rel="preload" as="image" href="/images/hero-flat-lay.png" type="image/png" />
        <link rel="preload" as="image" href="/images/uji-power-bowl.png" type="image/png" />
        <link rel="preload" as="image" href="/images/plantain-porridge-bowl.png" type="image/png" />
        <link rel="preload" as="image" href="/images/chocolate-chip-scones.png" type="image/png" />
        {/* DNS prefetch for external image sources */}
        <link rel="dns-prefetch" href="//hebbkx1anhila5yf.public.blob.vercel-storage.com" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
