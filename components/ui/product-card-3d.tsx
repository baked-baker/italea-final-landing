"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"
import type { Product } from "@/types/product"

interface ProductCard3DProps {
product: Product
onSelect: (product: Product) => void
index: number
}

// Helper function to get the correct image path for each product
const getProductImage = (productName: string) => {
switch (productName) {
  case "Ginger Dawg":
    return "/images/ginger-dawa-shot.png"
  case "Beetroot Energy":
    return "/images/beetroot-energy-shot.png"
  case "Moringa Detox":
    return "/images/moringa-detox-shot.png"
  case "Collagen Shot":
    return "/images/collagen-glow-shot.png"
  case "Soul Coffee":
    return "/images/soul-coffee-tea.png"
  case "Soul Tea":
    return "/images/soul-coffee-tea.png"
  case "Much Soul":
    return "/images/matcha-drinks.png"
  case "Chocolate & Caramel Oouui":
    return "/images/chocolate-caramel-oouui.png" // Updated image
  case "Uji Power":
    return "/images/uji-power-bowl.png"
  case "Jamaican Plantain Porridge":
    return "/images/plantain-porridge-bowl.png"
  case "Mama Jr's Uji":
    return "/images/mama-jrs-uji.png" // Updated image
  case "Granola Fruit Bowl":
    return "/images/colorful-granola-bowl.png"
  case "Oats Parfait":
    return "/images/overnight-oats-parfait-new.png"
  case "Eggless Scones":
    return "/images/chocolate-chip-scones-new.png"
  case "Vegan Sweet Potato Brownie":
    return "/images/vegan-brownie-variety.png"
  case "Double Choco Banana Bread":
    return "/images/double-choco-banana-bread.png"
  case "Carrot Banana Bread":
    return "/images/carrot-banana-bread.png"
  case "Peanut Crumble Banana Bread":
    return "/images/peanut-crumble-banana-bread.png"
  case "Whole Wheat Orange Cardamom Banana Bread":
    return "/images/whole-wheat-orange-cardamom-banana-bread.png"
  case "Vegan & Gluten-Free Coconut Crust Banana Bread":
    return "/images/vegan-gluten-free-coconut-crust-banana-bread.png"
  case "GF Oats & Raisin Cookies":
    return "/images/oats-raisin-cookies.png"
  case "Nutty Bowl":
    return "/images/natty-bowl-delight.png"
  case "Death by Chocolate":
    return "/images/death-by-chocolate-bowl-new.png"
  case "Carrot Cake Bowl":
    return "/images/carrot-cake-bowl-new.png"
  case "Vegan Cake Bowl":
    return "/images/vegan-cake-bowl-delight.png"
  case "Raw Organic Honey":
    return "/images/raw-honey.png"
  case "Date Syrup":
    return "/images/date-syrup.png"
  case "Extra Virgin Macadamia Oil":
    return "/images/macadamia-oil.png"
  case "Spiced Macadamia Chili Oil":
    return "/images/macadamia-chili-oil.png"
  case "Spicy Nuts":
    return "/images/spicy-nuts.png"
  case "GF Caramel Granola":
    return "/images/granola-pouch-display.png" // Updated image
  case "Sugar-Free Muesli":
    return "/images/italea-muesli-delight.png" // Updated image
  case "Salted Root Crisps":
    return "/images/root-crisps.png"
  case "Date & Moringa Protein Bar":
    return "/images/date-moringa-bar.png"
  case "Nut Butter Energy Balls":
    return "/images/energy-balls.png"
  case "GF Muesli Bar":
    return "/images/muesli-bar.png"
  case "GF Granola Bar":
    return "/images/granola-bar.png" // Updated image
  case "Whey Pre-Workout Smoothie":
    return "/images/pre-post-workout-smoothies.png"
  case "After Math Post-Workout Smoothie":
    return "/images/pre-post-workout-smoothies.png"
  case "All-in-One Breakfast Smoothie":
    return "/images/all-in-one-breakfast-smoothie-new.png"
  case "Garlic & Olive Focaccia":
    return "/images/garlic-olive-focaccia-new.png"
  case "GF Multi Seed Bread":
    return "/images/rustic-multiseed-bread-loaf.png" // Updated image
  case "Beetroot Hummus":
    return "/images/beetroot-hummus-new.png"
  case "Coriander Dip":
    return "/images/coriander-dip-new.png"
  case "Tamarind Dip":
    return "/images/tamarind-dip-new.png"
  case "Fermented Cabbage":
    return "/images/fermented-cabbage-new.png"
  case "Kimchi":
    return "/images/kimchi-new.png"
  case "Kefir Milk":
    return "/images/kefir-milk-new.png"
  case "Honey Infused Greek Yogurt":
    return "/images/honey-infused-greek-yogurt-new.png"
  default:
    return "/placeholder.svg?height=200&width=200"
}
}

export function ProductCard3D({ product, onSelect, index }: ProductCard3DProps) {
const imagePath = getProductImage(product.name)

return (
  <motion.div
    className="relative group cursor-pointer"
    onClick={() => onSelect(product)}
    initial={{ opacity: 0, y: 50, rotateX: -15 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
    whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5, z: 100 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <Card className="w-full h-full bg-white/80 border-stone-200 shadow-lg hover:shadow-xl transition-all duration-500 transform-gpu preserve-3d">
      <CardContent className="flex flex-col items-center justify-center p-4 text-center">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={imagePath || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            priority={index < 8} // Prioritize loading for the first few products
          />
        </div>
        <h4 className="text-lg font-semibold text-stone-800 mb-1">{product.name}</h4>
        <p className="text-sm text-stone-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: product.description }} />
      </CardContent>
    </Card>
  </motion.div>
)
}
