"use client"

import React from "react"

import type { ReactElement } from "react"
import { Facebook, Twitter } from "lucide-react"

import { useState, useEffect, useCallback, useRef, useTransition } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Instagram, Clock, Leaf, Sprout, Heart } from "lucide-react"
import { FloatingNav } from "@/components/ui/floating-nav"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { HoneyDripAnimation } from "@/components/ui/honey-drip-animation"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ProductCard3D } from "@/components/ui/product-card-3d"
import { ProductInfoModal } from "@/components/ui/product-info-modal"
import type { Product } from "@/types/product"
import { nutritionalData } from "@/lib/nutritional-data"
import Image from "next/image"
import { joinNewsletter, joinWishlist } from "@/app/actions"

export default function Italea(): ReactElement {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBlogPost, setSelectedBlogPost] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [heroFormState, setHeroFormState] = useState<{ success: boolean; message: string } | null>(null)
  const [newsletterFormState, setNewsletterFormState] = useState<{ success: boolean; message: string } | null>(null)
  const [footerFormState, setFooterFormState] = useState<{ success: boolean; message: string } | null>(null)

  const [isHeroFormPending, startHeroTransition] = useTransition()
  const [isNewsletterFormPending, startNewsletterTransition] = useTransition()
  const [isFooterFormPending, startFooterTransition] = useTransition()

  const handleHeroFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startHeroTransition(async () => {
      try {
        const result = await joinNewsletter(null, formData)
        setHeroFormState(result)
      } catch (error) {
        setHeroFormState({ success: false, message: "An error occurred. Please try again." })
      }
    })
  }

  const handleNewsletterFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startNewsletterTransition(async () => {
      try {
        const result = await joinNewsletter(null, formData)
        setNewsletterFormState(result)
      } catch (error) {
        setNewsletterFormState({ success: false, message: "An error occurred. Please try again." })
      }
    })
  }

  const handleFooterFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startFooterTransition(async () => {
      try {
        const result = await joinWishlist(null, formData)
        setFooterFormState(result)
      } catch (error) {
        setFooterFormState({ success: false, message: "An error occurred. Please try again." })
      }
    })
  }

  // Add global error handler at the very beginning
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      if (error && error.message && error.message.includes("destructure")) {
        console.warn("Caught destructuring error:", error.message)
        if (error.preventDefault) {
          error.preventDefault()
        }
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event && event.reason && typeof event.reason === "string" && event.reason.includes("destructure")) {
        console.warn("Caught promise rejection with destructuring error:", event.reason)
        if (event.preventDefault) {
          event.preventDefault()
        }
      }
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Optimized image preloading
  useEffect(() => {
    const criticalImages = [
      "/images/hero-flat-lay.png",
      "/images/uji-power-bowl.png",
      "/images/plantain-porridge-bowl.png",
      "/images/chocolate-chip-scones.png",
      "/images/vegan-brownie-variety.png",
      "/images/date-moringa-bar.png",
      "/images/carrot-cake-bowl.png",
      "/images/macadamia-chili-oil.png",
      "/images/spicy-nuts.png",
      "/images/overnight-oats-parfait.png",
      "/images/oats-raisin-cookies.png",
      "/images/death-by-chocolate-bowl.png",
      "/images/matcha-drinks.png",
      "/images/vegan-cake-bowl.png", // Added new image
      "/images/double-choco-banana-bread.png", // Added new image
      "/images/carrot-banana-bread.png", // Added new image
      "/images/peanut-crumble-banana-bread.png", // Added new image
      "/images/whole-wheat-orange-cardamom-banana-bread.png", // Added new image
      "/images/vegan-gluten-free-coconut-crust-banana-bread.png", // Added new image
      "/images/beetroot-hummus.png", // Added new image
      "/images/oat-parfait-ingredients.jpeg", // New image
      "/images/granola-bowl-assembly.jpeg", // New image
      "/images/natty-bowl-assembly.jpeg", // New image
      "/images/orange-cardamom-banana-bread.jpeg", // New image
      "/images/peanut-crumble-banana-bread.jpeg", // New image
      "/images/vegan-cake-bowl-assembly.jpeg", // New image
      "/images/natty-bowl-delight.png", // New image
      "/images/colorful-granola-bowl.png", // New image
      "/images/vegan-cake-bowl-delight.png", // New image
      "/images/death-by-chocolate-bowl-new.png", // New image
      "/images/ginger-dawa-shot.png",
      "/images/beetroot-energy-shot.png",
      "/images/moringa-detox-shot.png",
      "/images/collagen-glow-shot.png",
      "/images/soul-coffee.png",
      "/images/soul-tea.png",
      "/images/coriander-dip.png",
      "/images/tamarind-dip.png",
      "/images/fermented-cabbage.png",
      "/images/kimchi.png",
      "/images/kefir-milk.png",
      "/images/honey-infused-greek-yogurt.png",
      "/images/whey-pre-workout-smoothie.png",
      "/images/after-math-post-workout-smoothie.png",
      "/images/all-in-one-breakfast-smoothie.png",
      "/images/italea-muesli-delight.png", // New image
      "/images/granola-pouch-display.png", // New image
      "/images/rustic-multiseed-bread-loaf.png", // New image
      "/images/chocolate-caramel-oouui.png", // New image
      "/images/mama-jrs-uji.png", // New image
    ]

    // Preload critical images with staggered loading
    criticalImages.forEach((src, index) => {
      setTimeout(() => {
        try {
          const img = new Image()
          img.src = src
          const link = document.createElement("link")
          link.rel = "preload"
          link.as = "image"
          link.href = src
          document.head.appendChild(link)
        } catch (error) {
          console.warn("Error preloading image:", src, error)
        }
      }, index * 50)
    })

    // Preload external images
    const externalImages = [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250801_2136_Ginger%20Dawa%20Shots_remix_01k1kendb4emargsk4y06zpzet-VEwAFp5XIetjh6iwsTFzpAz5qzKPPnz.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250801_2140_Ginger%20Juice%20with%20Ginger_remix_01k1kevhw0eey955gwmkxte1xe-mCkUQkAE53MnntA4EfqXLIOzv1w92a.png",
    ]

    externalImages.forEach((src, index) => {
      setTimeout(() => {
        try {
          const img = new Image()
          img.src = src
        } catch (error) {
          console.warn("Error preloading external image:", src, error)
        }
      }, index * 100)
    })
  }, [])

  const wellnessPillars = ["Plant-based", "Sugar-free", "Keto", "Gluten-free", "Fun", "Flavor", "Community"]

  const hotBeverageNote = "Available black, with milk (dairy or plant-based), or served iced."

  const productCategories = [
    {
      name: "Wellness Drinks",
      items: [
        {
          name: "Ginger Dawg",
          description: `Fiery, zesty, and unapologetically bold — Ginger Dawg brings together fresh ginger, oranges, lemon, dark honey syrup, cayenne pepper, mint, and apple cider vinegar. This shot is your immunity warrior, metabolism booster, and anti-inflammatory kickstarter — perfect for when your system needs a spicy reset with flavor.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Beetroot Energy",
          description: `An earthy-sweet power blend made with beetroot, carrot, lemon, ginger, apple, cucumber, and honey. Perfect for boosting circulation, stamina, and natural energy, this deep red elixir supports both workout warriors and brainy grinders alike.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Moringa Detox",
          description: `A green machine for your gut and glow. This detox blend fuses moringa, cucumber, apple, ginger, activated charcoal, honey, and leafy greens like spinach or kale. High in antioxidants and plant-based power, it’s designed to help cleanse, alkalize, and fuel your day — the Italea way.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Collagen Shot",
          description: `Glow from the inside out with this beauty-meets-performance shot. Collagen peptides, orange and lemon juice, honey, maca powder, turmeric, grapes, and a crack of black pepper come together for a powerhouse combo that supports skin, joints, mood, and hormonal balance. Tastes like citrus, hits like radiance.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
      ],
    },
    {
      name: "Hot Beverages",
      items: [
        {
          name: "Soul Coffee",
          description: `A bold, aromatic brew spiced with cloves, cinnamon, and a whisper of fresh mint, this isn’t just coffee — it’s presence in a cup. Smooth, spiced, and beautifully grounding. <span class='block text-xs text-stone-500 mt-1'>${hotBeverageNote}</span><span class='block text-xs text-green-600 mt-1'>✅ Keto-Friendly</span><span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Soul Tea",
          description: `A refreshing herbal infusion made with lemongrass, ginger, and a hint of mint, crafted to clear the mind, settle the belly, and warm the spirit — one slow sip at a time. <span class='block text-xs text-stone-500 mt-1'>${hotBeverageNote}</span><span class='block text-xs text-green-600 mt-1'>✅ Keto-Friendly</span><span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Much Soul",
          description: `Stone-ground ceremonial matcha served hot or iced, whisked to velvety perfection. Earthy, energizing, and mood-lifting — the kind of green that gets you glowing from within. <span class='block text-xs text-stone-500 mt-1'>${hotBeverageNote}</span><span class='block text-xs text-green-600 mt-1'>✅ Keto-Friendly</span><span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Chocolate & Caramel Oouui",
          description: `Comfort meets indulgence in this rich hot chocolate layered with a smooth caramel drizzle. It’s warm, sweet, and unapologetically feel-good — a hug in a cup. <span class='block text-xs text-stone-500 mt-1'>${hotBeverageNote}</span>`,
        },
        {
          name: "Relax a Little",
          description: `A gentle, calming infusion made with dried chamomile flowers, soothing lavender buds, a hint of lemon balm, and lightly sweetened with natural dried apple bits and a touch of vanilla bean. <span class='block text-xs text-stone-500 mt-1'>${hotBeverageNote}</span><span class='block text-xs text-green-600 mt-1'>✅ Keto-Friendly</span><span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
      ],
    },
    {
      name: "Porridges",
      items: [
        {
          name: "Uji Power",
          description: `You know that kind of breakfast that makes you feel like you could till a whole shamba, then build a house before lunch? This is it. A rich, grounding blend of sweet potato, cassava, arrowroot, and peanuts, gently swirled with milk, vanilla, and a kiss of honey. It’s gluten-free, slow-burning, and sneakily satisfying — the kind of fuel that keeps you going and going (wink). Ask around… they’ll tell you this porridge has energy in all the right departments.`,
        },
        {
          name: "Jamaican Plantain Porridge",
          description: `Smooth, sultry, and just a little bit spicy — this Caribbean-style bowl blends ripe plantain with creamy coconut milk, oats, roasted peanuts, cinnamon, and nutmeg. It’s dairy-free, gluten-free, and naturally sweetened with honey and vanilla. But here’s the not-so-secret: plantain’s been whispered about for generations for boosting vitality, and let’s just say… the rumors aren’t wrong. Take a sip, and see why this one’s got fans saying, “I feel like a Jamaican badman”`,
        },
        {
          name: "Mama Jr's Uji",
          description: `Passed down from Mama herself, this is not your average uji — it’s the one that raised a household. A hearty, multigrain blend of cassava, purple sweet potato, bananas, millet, sorghum, amaranth (terere), and even thabai (stinging nettle) for that iron hit. Sweetened only with nature and thick enough to stand a spoon in. Packed with fiber, minerals, and a whole lotta love — now ready to be shared with the world 🌎<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
      ],
    },
    {
      name: "Breakfast Bowls",
      items: [
        {
          name: "Granola Fruit Bowl",
          description: `Crunchy, fruity, fresh, and just sweet enough. This one’s for the balance seekers. Whether you go dairy or plant-based, you’re getting a hit of live cultures, seasonal vitamins, fibre, and natural sugars that don’t spike and crash. Gluten-free options available, and chia seeds bring the Omega-3s to the party. Healthy never looked this sexy.`,
        },
        {
          name: "Oats Parfait",
          description: `Think slow-steeped overnight oats layered with a parfait attitude. This one’s gut-friendly, low GI, and rich in prebiotics from oats and fruit — meaning you’ll stay full and fuelled without the mid-morning slump. Completely eggless, customizable to be dairy-free, and sweetened with just dates and fruit. Feels like comfort food, functions like a wellness coach.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>' },
],
},
{
name: "Baked Items",
items: [
{ name: "Eggless Scones", description: \`Flaky, tender, and unapologetically soft — these scones are proof that eggs aren’t the main character. Available in chocolate chip, ginger spice, and candabon (our cinnamon-cardamom twist), they’re a morning ritual waiting to happen. Lightly sweet, perfect with tea, and completely egg-free for the conscious baker in all of us.`,
        },
        {
          name: "Vegan Sweet Potato Brownie",
          description: `Fudgy, rich, and secretly packed with plant power — this brownie doesn’t just taste good, it feels good. Made with real sweet potato and zero animal products, it’s got the gooey center and crackly top we all crave… but without the guilt trip. A clean, chocolatey pleasure with soul.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Double Choco Banana Bread",
          description: `Deep, rich, and melt-in-your-mouth indulgent — this one’s for the unapologetic cocoa lovers. Think moist banana cake meets dark chocolate obsession, minus the nut drama. Superpower: completely nut-free, so you can love it fearlessly.`,
        },
        {
          name: "Carrot Banana Bread",
          description: `A warm, spiced classic gets a plant-based glow-up. The natural sweetness of banana meets soft grated carrot for a cake that’s cozy, moist, and shockingly guilt-free. Superpower: it’s 100% vegan — no eggs, no dairy, no compromise.`,
        },
        {
          name: "Peanut Crumble Banana Bread",
          description: `Crunchy, creamy, and packed with peanut flavor, this one delivers all the nostalgia with none of the sugar crash. Sweetened naturally and topped with a golden crumble that’s dangerously good. Superpower: it’s completely sugar-free, without tasting like it.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Whole Wheat Orange Cardamom Banana Bread",
          description: `Bright citrus meets warm spice in this earthy, elegant loaf. Subtle cardamom and orange zest turn each bite into a fragrant experience. Superpower: made with whole wheat flour and zero refined sugar — proof that wholesome can still be wildly delicious.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Vegan & Gluten-Free Coconut Crust Banana Bread",
          description: `Tropical, toasty, and soft on the inside with a golden coconut crust that crackles just right. This one’s a crowd-pleaser for the sensitive stomach gang and flavor chasers alike. Superpower: it’s both gluten-free and vegan — the plant-powered upgrade your breakfast has been waiting for<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "GF Oats & Raisin Cookies",
          description: `Old-school comfort, minus the wheat. These chewy cookies are made with gluten-free oats, sweet raisins, and just enough spice to keep things interesting. A go-to snack for the gluten-sensitive — or anyone who appreciates a cookie that respects digestion.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
      ],
    },
    {
      name: "Cake Bowl Combos",
      items: [
        {
          name: "Nutty Bowl",
          description: `This bowl doesn’t whisper protein… it shouts it from the rooftops. With a base powered by peanut banana bread and natural yoghurt (dairy or non-dairy depending on your choice), it’s stacked with healthy fats, fibre, and satiety-loving crunch. A great post-workout pick-me-up, or an all-day fuel bowl. Also: crunchy peanut sauce? Life-changing.`,
        },
        {
          name: "Death by Chocolate",
          description: `So intense, it’s practically a relationship. But underneath the triple-chocolate drama is a surprisingly balanced, protein-rich, antioxidant-packed bowl that’s as nourishing as it is indulgent. this one’s for the plant-based chocoholics who want mood-lifting magnesium with every bite. The kind of bowl that makes you question whether you’re nourishing yourself or seducing your tastebuds. Spoiler alert: it’s both.`,
        },
        {
          name: "Carrot Cake Bowl",
          description: `A fibre-rich glow bowl dressed up like dessert. This one delivers on cozy spiced flavors with a fresh crunch from grated carrots and fruit, layered over a vegan or whole grain base. It’s loaded with beta-carotene, antioxidants, and natural sweetness — with zero dairy, minimal sugar, and maximum nourishment. Tastes like a hug from the farm.`,
        },
        {
          name: "Vegan Cake Bowl",
          description: `This is what happens when indulgence gets a conscience. Rich cocoa, dairy-free creaminess, and sweet, tangy notes all layered into a bowl that’s 100% vegan, eggless, and gluten-free (depending on the base). Perfect for the lactose-intolerant sweet tooth or anyone looking to treat their gut like royalty without giving up dessert energy. It’s basically cake with a PhD in nourishment.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
      ],
    },
    {
      name: "Retail Items",
      items: [
        {
          name: "Raw Organic Honey",
          description:
            "Unprocessed, enzyme-rich honey from local beekeepers<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly (in moderation)</span>",
        },
        {
          name: "Date Syrup",
          description:
            "Natural liquid sweetener from premium dates<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly (in moderation)</span>",
        },
        {
          name: "Extra Virgin Macadamia Oil",
          description:
            "Cold-pressed, heart-healthy cooking oil<span class='block text-xs text-green-600 mt-1'>✅ Keto-Friendly</span><span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>",
        },
        {
          name: "Spiced Macadamia Chili Oil",
          description:
            "Artisan infused oil with perfect heat balance<span class='block text-xs text-green-600 mt-1'>✅ Keto-Friendly</span><span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>",
        },
        {
          name: "Spicy Nuts",
          description: `These nuts bite back. A fiery mix of seeds, spice, and crunch. Warning: highly snackable, may result in tongue-tingling, endorphin-kicking joy.<span class='block text-xs text-green-600 mt-1'>✅ Keto-Friendly</span><span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "GF Caramel Granola",
          description: `Caramel, but clean. This granola is sweetened naturally, gluten-free, and stupidly addictive. One bite and you'll be sprinkling it on everything—including your life decisions.`,
        },
        {
          name: "Sugar-Free Muesli",
          description: `Born in the Swiss Alps but reborn in our Italea kitchen, this naturally sweetened blend of grains, seeds, and fruit is light, clean, and loaded with fiber. Perfect for slow mornings, fast smoothies, or anything in between. No added sugar — because real food knows how to speak for itself.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Salted Root Crisps",
          description: `Crunchy, earthy, salty magic. Think cassava, sweet potato, beetroot and friends—air-kissed and sea-salted. Your potato crisps just got schooled.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
      ],
    },
    {
      name: "Functional Snacks",
      items: [
        {
          name: "Date & Moringa Protein Bar",
          description: `The superfood duo you didn’t know you needed. Dates bring the sweetness, moringa brings the ancient magic. Plant-based protein, iron, and good vibes in every bar.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Nut Butter Energy Balls",
          description: `One bite, and boom—protein party. These little spheres are smooth, rich, and totally satisfying. Perfect for a 3PM pick-me-up or pre-run mini rocket fuel. May cause energy spikes and smug grins.<span class='block text-xs text-green-600 mt-1'>✅ Keto-Friendly (in moderation)</span><span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "GF Muesli Bar",
          description: `Oaty, nutty, and surprisingly filling. Our take on the classic muesli blend—pressed into an anytime snack bar. It's slow-burning, heart-hugging fuel.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "GF Granola Bar",
          description: `Crunchy, chewy, and not here to bloat you. Perfect for the gluten-sensitive grazer. This bar delivers clean energy, steady sweetness, and serious crunch without the wheat drama.`,
        },
      ],
    },
    {
      name: "Smoothies",
      items: [
        {
          name: "Whey Pre-Workout Smoothie",
          description: `A creamy, clean fuel-up designed to pump you up—not weigh you down. Powered by whey, potassium, slow-release carbs, chia seeds, flax seeds, ashwagandha, and peanut flour. Spoiler alert: You’ll probably PR.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "After Math Post-Workout Smoothie",
          description: `For when the squats were squatting and your body needs to reboot. This smoothie is a muscle-soothing, inflammation-fighting, protein-packing thank-you note to your body, now with added chia seeds, flax seeds, ashwagandha, and peanut flour for enhanced recovery.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "All-in-One Breakfast Smoothie",
          description: `No time? No problem. This smoothie is the morning multitasker—protein, fiber, fruits, and flair in one go. Basically a balanced breakfast wearing sunglasses.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
      ],
    },
    {
      name: "Breads",
      items: [
        {
          name: "Garlic & Olive Focaccia",
          description: `A nod to the rustic kitchens of Italy, our focaccia is soft, herby, and generously laced with roasted garlic and olives. It’s got that perfect chew and golden crust that begs to be dipped, torn, or devoured as-is. Tradition baked with a little extra soul.`,
        },
        {
          name: "GF Multi Seed Bread",
          description: `This loaf doesn’t come to play. Made for the gluten-sensitive and the gut-respecting, it’s nutty, dense, and deeply satisfying. Packed with omega-rich seeds and no fluff (literally), it’s bread with benefits.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
      ],
    },
    {
      name: "Sides",
      items: [
        {
          name: "Beetroot Hummus",
          description: `Bold. Earthy. Beautiful. This magenta goddess is more than a pretty face—packed with fiber, folate, and anti-inflammatory beet power. Great for your gut, your glow-up, and your Instagram feed.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Coriander Dip",
          description: `Green, clean, and packing a zing! This herby number brings freshness to any bowl or plate. Coriander is great for digestion and detox, but let’s be honest—you’re here for the flavor kick.<span class='block text-xs text-green-600 mt-1'>✅ Keto-Friendly (with dairy-free yogurt)</span><span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
        {
          name: "Tamarind Dip",
          description: `Tangy, sticky, sassy. A flavor slap in the best way possible. Tamarind is packed with antioxidants and natural digestive enzymes. Pairs best with bold tastebuds and good vibes.<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>`,
        },
      ],
    },
    {
      name: "Probiotics & Gut Health",
      items: [
        {
          name: "Fermented Cabbage",
          description:
            "Traditional lacto-fermented cabbage rich in beneficial probiotics<span class='block text-xs text-green-600 mt-1'>✅ Keto-Friendly</span><span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>",
        },
        {
          name: "Kimchi",
          description:
            "Spicy Korean fermented vegetables packed with gut-friendly bacteria<span class='block text-xs text-green-600 mt-1'>✅ Keto-Friendly</span><span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>",
        },
        {
          name: "Kefir Milk",
          description:
            "Creamy cultured milk drink teeming with diverse probiotic strains<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly</span>",
        },
        {
          name: "Honey Infused Greek Yogurt",
          description:
            "Rich Greek yogurt enhanced with raw honey and live cultures<span class='block text-xs text-green-600 mt-1'>✅ Diabetic-Friendly (in moderation)</span>",
        },
      ],
    },
  ]

  // Safe event handlers with comprehensive error handling
  const handleMenuToggle = () => {
    try {
      setIsMenuOpen((prev) => !prev)
    } catch (error) {
      console.warn("Menu toggle error:", error)
    }
  }

  const handleProductSelect = useCallback((product: Product | null) => {
    try {
      setSelectedProduct(product)
    } catch (error) {
      console.warn("Product selection error:", error)
    }
  }, [])

  const handleSearchChange = useCallback((event?: React.ChangeEvent<HTMLInputElement> | null) => {
    try {
      const value = event?.target?.value || ""
      setSearchTerm(value)
    } catch (error) {
      console.warn("Search change error:", error)
      setSearchTerm("")
    }
  }, [])

  const handleCategoryChange = useCallback((category: string) => {
    try {
      setSelectedCategory(category || "All")
    } catch (error) {
      console.warn("Category change error:", error)
      setSelectedCategory("All")
    }
  }, [])

  const handleBlogPostSelect = useCallback((post: any) => {
    try {
      setSelectedBlogPost(post || null)
    } catch (error) {
      console.warn("Blog post selection error:", error)
    }
  }, [])

  const handleAudioToggle = useCallback(() => {
    try {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
      }
    } catch (error) {
      console.warn("Audio toggle error:", error)
    }
  }, [isPlaying])

  const handleMuteToggle = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.muted = !isMuted
        setIsMuted(!isMuted)
      }
    } catch (error) {
      console.warn("Mute toggle error:", error)
    }
  }, [isMuted])

  useEffect(() => {
    try {
      // Safe audio initialization
      if (typeof window !== "undefined" && audioRef.current) {
        audioRef.current.volume = 0.3
      }
    } catch (error) {
      console.warn("Audio initialization error:", error)
    }
  }, [])

  const categories = ["All", ...new Set(productCategories.map((c) => c.name))]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100 overflow-x-hidden">
      <FloatingNav />

      {/* Hero Section with Optimized Images */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-stone-900/40 z-10"
          style={{ opacity: heroOpacity }}
        />
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <div className="w-full h-full bg-gradient-to-br from-amber-100 via-stone-100 to-amber-200 relative">
            <Image
              src="/images/hero-flat-lay.png"
              alt="Italea wellness products and ingredients beautifully arranged"
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAAcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxOQCdABmX/9k="
            />
          </div>
        </motion.div>

        <motion.div
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
                <Leaf className="w-8 h-8 text-amber-600 mr-2" aria-hidden="true" />
              </motion.div>
              <motion.h1
                className="text-6xl md:text-8xl font-serif text-stone-800 tracking-tight"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                italea
              </motion.h1>
              <motion.div
                className="w-4 h-4 bg-amber-600 rounded-full ml-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                aria-hidden="true"
              />
            </div>
            <motion.p
              className="text-stone-700 text-lg md:text-xl font-light tracking-widest uppercase"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Guilt-Free Indulgence
            </motion.p>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-serif text-stone-800 mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Welcome to Italea — <br />
            <motion.span className="text-amber-700" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              Guilt-Free Indulgence
            </motion.span>{" "}
            Starts Here
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-stone-700 mb-8 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Wellness is not homework. It's flavor, soul, and community.
          </motion.p>

          <form
            onSubmit={handleHeroFormSubmit}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-md mx-auto"
          >
            <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                className="bg-white/90 border-stone-300 text-stone-800 placeholder:text-stone-500 backdrop-blur-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                aria-label="Email address for updates"
                required
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                disabled={isHeroFormPending}
              >
                {isHeroFormPending ? "Submitting..." : "Get Updates"}
              </Button>
            </motion.div>
          </form>
          {heroFormState && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-sm ${heroFormState?.success ? "text-green-600" : "text-red-600"}`}
            >
              {heroFormState?.message}
            </motion.div>
          )}
          <p className="text-stone-500 text-xs mt-2">You can unsubscribe anytime.</p>
        </motion.div>

        <HoneyDripAnimation />
      </section>

      {/* About Italea */}
      <ParallaxSection className="py-20 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">About Italea</h2>
            <p className="text-xl text-stone-700 max-w-3xl mx-auto font-light leading-relaxed">
              Italea is not your usual bakery. We're a bold grab-and-go concept rooted in the Ital lifestyle—think
              organic, wholesome, and functional foods made fun. From sugar-free banana breads to wellness shots and
              grain bowls, everything is crafted with real ingredients and zero fuss. No dine-in, just nourishing,
              flavour-packed bites for everyday living. At Italea, healthy isn't a trend—it's a vibe, served with love
              and purpose.
            </p>
          </ScrollReveal>

          {/* Three Roots Philosophy */}
          <div className="mb-20">
            <ScrollReveal delay={0.2}>
              <h3 className="text-3xl font-serif text-stone-800 text-center mb-12">Three Roots, One Soul</h3>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Leaf,
                  title: "Ital (Rastafarian)",
                  description: "Natural, plant-based nourishment that honors the earth and our bodies",
                  color: "green",
                },
                {
                  icon: Sprout,
                  title: "Italian (Italea)",
                  description: "Young sprout, new beginnings—fresh perspectives on traditional flavors",
                  color: "amber",
                },
                {
                  icon: Heart,
                  title: "Swahili (Italea)",
                  description: "'It will nurture'—food that feeds both body and soul with intention",
                  color: "stone",
                },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={0.3 + index * 0.1}>
                  <motion.div whileHover={{ y: -10, rotateY: 5 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                    <Card className="bg-white/80 border-stone-200 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
                      <CardContent className="p-8 text-center">
                        <motion.div
                          className={`w-16 h-16 ${
                            item.color === "green"
                              ? "bg-green-100"
                              : item.color === "amber"
                                ? "bg-amber-100"
                                : "bg-stone-100"
                          }`}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {React.createElement(item.icon, {
                            className: `w-8 h-8 ${
                              item.color === "green"
                                ? "text-green-700"
                                : item.color === "amber"
                                  ? "text-amber-700"
                                  : "text-stone-700"
                            }`,
                            "aria-hidden": true,
                          })}
                        </motion.div>
                        <h4 className="text-xl font-serif text-stone-800 mb-4">{item.title}</h4>
                        <p className="text-stone-600 leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Why Guilt-Free Indulgence */}
          <ScrollReveal delay={0.4}>
            <motion.div
              className="bg-gradient-to-r from-amber-100 to-stone-100 rounded-3xl p-8 md:p-12 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-serif text-stone-800 mb-6">Why Guilt-Free Indulgence?</h3>
              <p className="text-lg text-stone-700 mb-8 leading-relaxed">
                No more bland diets. Our treats are functional—packed with goodness, never guilt. Every bite is crafted
                to nourish your body while delighting your senses.
              </p>

              <div className="flex flex-wrap gap-3">
                {wellnessPillars.map((pillar, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-white/80 text-stone-700 px-4 py-2 text-sm font-medium border border-stone-200 hover:bg-white transition-colors duration-200"
                    >
                      {pillar}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </ParallaxSection>

      {/* New Wellness Categories Introduction */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">Wellness That Loves You Back</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Whether you’re watching carbs, lactose intolerant, allergic to gluten or minding sugar, Italea offers
              snacks that love you back. Explore our Keto-Friendly, Gluten-Free, and Diabetic-Friendly options — clean,
              conscious, and full of flavor.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Products Section with Optimized Images */}
      <section id="menu" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">Our Pre-Opening Menu</h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Handcrafted with love, rooted in wellness, bursting with flavor
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {productCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.05 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ScrollReveal delay={categoryIndex * 0.05}>
                  <div className="text-center">
                    <motion.h3
                      className="text-2xl md:text-3xl font-serif text-stone-800 mb-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.name}
                    </motion.h3>
                    <motion.div
                      className="w-16 h-0.5 bg-amber-600 mx-auto"
                      initial={{ width: 0 }}
                      whileInView={{ width: 64 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    />
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <ProductCard3D
                      key={`${categoryIndex}-${itemIndex}`}
                      product={item}
                      onSelect={handleProductSelect}
                      index={categoryIndex * 10 + itemIndex}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <ScrollReveal delay={0.4} className="text-center mt-16">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-stone-50 rounded-2xl p-6"
            >
              <p className="text-stone-500 text-sm mb-4">All smoothies available in sugar-free & dairy-free options</p>
              <p className="text-stone-500 text-sm">Many baked items available in sugar-free & gluten-free options</p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Coming Soon Section */}
      <ParallaxSection className="py-20 px-4 bg-gradient-to-br from-stone-800 to-amber-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="mb-12">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                <Clock className="w-16 h-16 mx-auto mb-6 text-amber-300" aria-hidden="true" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6">
                Opening Soon at{" "}
                <a
                  href="https://www.google.com/maps/search/Highway+Mall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:underline"
                >
                  Highway Mall
                </a>
              </h2>
              <p className="text-xl text-amber-100 mb-8 leading-relaxed">
                Pre-opening, but already starting a movement. Get ready for guilt-free indulgence like never before.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <motion.div
              className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-serif mb-4">Join the Movement</h3>
              <p className="text-amber-100 mb-6 leading-relaxed">
                Be the first to experience guilt-free indulgence. Sign up for early-bird discounts and secret menu
                previews.
              </p>

              <form
                onSubmit={handleNewsletterFormSubmit}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-md mx-auto"
              >
                <motion.div className="w-full" whileHover={{ scale: 1.02 }}>
                  <Input
                    type="email"
                    placeholder="Your email address"
                    name="email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200"
                    aria-label="Email address for waitlist"
                    required
                  />
                </motion.div>
                <Button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full transition-all duration-200 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                  disabled={isNewsletterFormPending}
                >
                  {isNewsletterFormPending ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
              {newsletterFormState && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-sm ${newsletterFormState?.success ? "text-green-200" : "text-red-200"}`}
                >
                  {newsletterFormState?.message}
                </motion.div>
              )}
              <p className="text-amber-100 text-xs mt-2">You can unsubscribe anytime.</p>
            </motion.div>
          </ScrollReveal>
        </div>
      </ParallaxSection>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
                <Leaf className="w-8 h-8 text-amber-500 mr-2" aria-hidden="true" />
              </motion.div>
              <h3 className="text-4xl font-serif">italea</h3>
              <motion.div
                className="w-3 h-3 bg-amber-500 rounded-full ml-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                aria-hidden="true"
              />
            </div>
            <p className="text-xl text-stone-300 font-light italic leading-relaxed">
              Rooted, evolving, crafted for conscious, joyful nourishment.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: MapPin,
                  title: "Location",
                  content: [
                    <a
                      key="map-link-1"
                      href="https://www.google.com/maps/search/Highway+Mall"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-500 hover:underline"
                    >
                      Highway Mall. Ground Floor Shop 11.
                    </a>,
                    <a
                      key="map-link-2"
                      href="https://www.google.com/maps/search/Highway+Mall"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-500 hover:underline"
                    >
                      Along Uhuru Highway.
                    </a>,
                  ],
                },
                { icon: Mail, title: "Email", content: ["info@italea.africa"] },
                { icon: Instagram, title: "Instagram", content: ["@italea_bakery"] },
              ].map((item, index) => (
                <motion.div key={index} className="text-center" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    {React.createElement(item.icon, {
                      className: "w-6 h-6 mx-auto mb-3 text-amber-500",
                      "aria-hidden": true,
                    })}
                  </motion.div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  {item.content.map((line, i) => (
                    <p key={i} className="text-stone-300">
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex justify-center space-x-6 mb-8">
              {[
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/italea_bakery?igsh=aW82NGs0amswMjFz&utm_source=qr",
                  label: "Instagram",
                },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
              ].map((socialItem, index) => (
                <motion.a
                  key={index}
                  href={socialItem.href}
                  target={socialItem.href.startsWith("http") ? "_blank" : undefined}
                  rel={socialItem.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  aria-label={socialItem.label}
                  className="focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-900 rounded-full p-1"
                >
                  <socialItem.Icon className="w-6 h-6 text-stone-400 hover:text-amber-500 cursor-pointer transition-colors duration-200" />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="text-center">
              <motion.div
                className="bg-white/10 rounded-2xl p-6 max-w-md mx-auto"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-semibold mb-3">Stay Connected</h4>
                <form onSubmit={handleFooterFormSubmit} className="flex gap-2">
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
                    <Input
                      type="email"
                      placeholder="Your email"
                      name="email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200"
                      aria-label="Email address for newsletter"
                      required
                    />
                  </motion.div>
                  <Button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 px-6 transition-all duration-200 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                    disabled={isFooterFormPending}
                  >
                    {isFooterFormPending ? "Submitting..." : "Subscribe"}
                  </Button>
                </form>
                {footerFormState && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 text-sm ${footerFormState?.success ? "text-green-200" : "text-red-200"}`}
                  >
                    {footerFormState?.message}
                  </motion.div>
                )}
                <p className="text-stone-400 text-xs mt-2">You can unsubscribe anytime.</p>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-400">
              <p>&copy; 2025 Italea Ltd. All rights reserved. Quality Goods By Thee Baked Baker.</p>
            </div>
          </ScrollReveal>
        </div>
      </footer>

      {/* Product Info Modal */}
      <ProductInfoModal
        product={selectedProduct}
        nutritionalInfo={selectedProduct ? nutritionalData[selectedProduct.name] : null}
        isOpen={!!selectedProduct}
        onClose={() => handleProductSelect(null)}
      />
    </div>
  )
}
