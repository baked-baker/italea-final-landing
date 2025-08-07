"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Clock, User, Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import { FloatingNav } from "@/components/ui/floating-nav"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { BlogModal } from "@/components/ui/blog-modal"

const blogPosts = [
  {
    id: "moringa-superfood-guide",
    title: "Moringa: The Superfood That's Been Flexing on Your Kale",
    excerpt:
      "Picture this: You're scrolling through Instagram, and everyone's talking about the latest superfood that costs more than your monthly coffee budget. Meanwhile, in Kenya, my grandmother is literally sweeping moringa leaves off her doorstep because the tree won't stop dropping them. Talk about irony!",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/79ceae221b2f46a0ab93cb9b26768fae.jpg-fUtdCVUx1Vlz25uM1O2u0EAvipU53J.jpeg",
    author: "Beatrice Wanjiku",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Superfoods",
    featured: true,
    width: 800,
    height: 600,
  },
  {
    id: "ital-living-philosophy",
    title: "From Bob Marley's Playlist to Dubai's Kitchen: My Ital Journey",
    excerpt:
      "Let me tell you how a dreadhead from Kenya ended up understanding Jamaican culture better than some people who've never left the island. It all started with Bob Marley's 'Natural Mystic' playing on repeat and a career path that would take me 4,000 miles away from home to learn what 'Ital' really means.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b9fbbfdd39f1aada68a9cee2723d6cca.jpg-D5jVtnIKlI7MrZrMCwzfQxRWGxq6TX.jpeg",
    author: "Beatrice Wanjiku",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Philosophy",
    featured: true,
    width: 800,
    height: 600,
  },
  {
    id: "macadamia-oil-benefits",
    title: "Why Macadamia Oil is the Glow-Up Your Skin Didn't Know It Needed",
    excerpt:
      "Forget expensive serums with names you can't pronounce. The secret to glowing skin has been growing in Kenyan soil all along. Let's talk about macadamia oil – the unsung hero of both your kitchen and your skincare routine.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd1725b2a4c81e7fae39659beead344a.jpg-Bddg5bWugegCPt2uIjfMD2cTgzx2lq.jpeg",
    author: "Dr. Sarah Kimani",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Beauty & Wellness",
    featured: false,
    width: 800,
    height: 600,
  },
  {
    id: "beetroot-pre-workout",
    title: "Beetroot Shots: Nature's Pre-Workout That Actually Works",
    excerpt:
      "While everyone's chugging synthetic pre-workouts that taste like regret, smart athletes have discovered what Kenyan runners have known for years: beetroot is the ultimate natural performance enhancer.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/de57fb5fd8149a9ca67e2d62ea1b08ab.jpg-HPBrCEvAVseirSMZ9Gd9aKzEy5Tn5M.jpeg",
    author: "Coach Michael Kiprop",
    date: "2024-01-01",
    readTime: "7 min read",
    category: "Fitness",
    featured: false,
    width: 800,
    height: 600,
  },
  {
    id: "plantain-porridge-tradition",
    title: "Plantain Porridge: The Caribbean Comfort Food That Heals Your Soul",
    excerpt:
      "There's something magical about plantain porridge that goes beyond nutrition. It's comfort in a bowl, tradition in every spoonful, and proof that the best medicine often comes from the kitchen, not the pharmacy.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fca484625f0bbcc5b0838293cc41c4d6.jpg-VgbxvCmjgmunH9tzRQfvEj2QRMRULD.jpeg",
    author: "Chef Maria Santos",
    date: "2023-12-28",
    readTime: "5 min read",
    category: "Traditional Foods",
    featured: false,
    width: 800,
    height: 600,
  },
  {
    id: "date-syrup-natural-sweetener",
    title: "Date Syrup: The Sweet Truth About Nature's Candy",
    excerpt:
      "In a world obsessed with artificial sweeteners and sugar substitutes, date syrup stands as proof that nature got it right the first time. Sweet, complex, and packed with nutrients – it's everything refined sugar wishes it could be.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5b1e02bf44a930e189f7cb2fd5c68878.jpg-g6omZLX7Iu7HI9sr4xUP4ptBhnbD2B.jpeg",
    author: "Nutritionist Amina Hassan",
    date: "2023-12-20",
    readTime: "4 min read",
    category: "Natural Sweeteners",
    featured: false,
    width: 800,
    height: 600,
  },
  {
    id: "ginger-turmeric-immunity",
    title: "Ginger + Turmeric: The Dynamic Duo Your Immune System Craves",
    excerpt:
      "Long before immunity shots became trendy, Kenyan grandmothers were brewing ginger and turmeric concoctions that could cure everything from sniffles to broken hearts. Science is finally catching up to what they've always known.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b4d91c697059119d8e0017b187114203.jpg-xFfSOmV6kr0uXeAkimoFARDJ63w00I.jpeg",
    author: "Dr. James Mwangi",
    date: "2023-12-15",
    readTime: "6 min read",
    category: "Immunity",
    featured: false,
    width: 800,
    height: 600,
  },
  {
    id: "sustainable-sourcing-story",
    title: "From Farm to Table: The Real Story Behind Sustainable Sourcing",
    excerpt:
      "Sustainability isn't just a buzzword for us – it's a promise to the farmers who grow our ingredients and the communities that depend on them. Here's how we're building a food system that works for everyone.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5973e099147f06a5a14dbb3846fab840.jpg-ZO9MIct5Q9sAoFGRWLhhFqqVhY01t9.jpeg",
    author: "Samuel Kiprotich",
    date: "2023-12-10",
    readTime: "9 min read",
    category: "Sustainability",
    featured: false,
    width: 800,
    height: 600,
  },
  {
    id: "collagen-beauty-wellness",
    title: "Collagen Shots: Beauty from the Inside Out (No Filter Required)",
    excerpt:
      "While everyone's chasing the perfect filter, smart people are investing in collagen shots that give you that natural glow that no app can replicate. Here's why your skin will thank you.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0bfab7e18513d7b5997b6415fa78c84b.jpg-ikQHNlljE3BVyOIqmYduXRFHDpEj3s.jpeg",
    author: "Beauty Expert Lisa Wanjiru",
    date: "2023-12-05",
    readTime: "5 min read",
    category: "Beauty",
    featured: false,
    width: 800,
    height: 600,
  },
  {
    id: "uji-kenyan-tradition",
    title: "Uji Power: How a Humble Porridge Became Kenya's Ultimate Superfood",
    excerpt:
      "Before protein powders and superfood smoothies, there was uji. This traditional Kenyan porridge has been fueling bodies and souls for generations. Now it's time for the world to discover what we've always known – uji is the original power food.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6d89eec1b2755185f284855cc5b668f5.jpg-V8uXokOw6wVV65k80BVTDwXAfPKLrN.jpeg",
    author: "Beatrice Wairimu",
    date: "2023-12-01",
    readTime: "10 min read",
    category: "Traditional Foods",
    featured: false,
    width: 800,
    height: 600,
  },
  {
    id: "cassava-root-crisps",
    title: "Root Crisps: The Snack That's Actually Good for You",
    excerpt:
      "Forget potato chips that leave you feeling guilty and unsatisfied. Root crisps made from cassava, sweet potato, and beetroot are the crunchy, colorful snacks that prove healthy can be delicious.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250801_1931_Crisp%20Assortment%20Bowl_remix_01k1k7gxmdedwswad39mnfam5f-TfnEpU8QvbaRIs9TN5bapyLr0aNlY1.png",
    author: "Chef David Mutua",
    date: "2023-11-25",
    readTime: "4 min read",
    category: "Healthy Snacks",
    featured: false,
    width: 800,
    height: 600,
  },
  {
    id: "mindful-eating-practices",
    title: "Mindful Eating: How to Actually Taste Your Food (Revolutionary, I Know)",
    excerpt:
      "In a world of rushed meals and mindless munching, mindful eating is the radical act of actually paying attention to what you're putting in your mouth. Here's how to rediscover the joy of eating.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7998e7d7b3a14d88003c8fe237d466cb.jpg-6AT6aESnwIg2wsxzop5caBJ7E8imbR.jpeg",
    author: "Wellness Coach Grace Njeri",
    date: "2023-11-20",
    readTime: "7 min read",
    category: "Mindfulness",
    featured: false,
    width: 800,
    height: 600,
  },
  {
    id: "mama-jrs-uji-recipe",
    title: "Mama JR’s Uji: The Porridge That Raised a Chef",
    excerpt:
      "Growing up, Mama JR’s Uji wasn’t just breakfast; it was a warm embrace, a story told in every spoonful. My mother, Anne W. Muhika, a dedicated farmer, crafted this blend from the bounty of our land, weaving together tradition, nutrition, and love.",
    image: "/placeholder.svg?height=600&width=800",
    author: "Chef Anthony",
    date: "2024-08-04",
    readTime: "9 min read",
    category: "Traditional Foods",
    featured: true, // Setting as featured for prominence
    width: 800,
    height: 600,
  },
]

const categories = [
  "All",
  "Superfoods",
  "Philosophy",
  "Beauty & Wellness",
  "Fitness",
  "Traditional Foods",
  "Natural Sweeteners",
  "Immunity",
  "Sustainability",
  "Beauty",
  "Healthy Snacks",
  "Mindfulness",
]

const blogContent: Record<string, string> = {
  "moringa-superfood-guide": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: You're scrolling through Instagram, and everyone's talking about the latest superfood that costs more than your monthly coffee budget. Meanwhile, in Kenya, my grandmother is literally sweeping moringa leaves off her doorstep because the tree won't stop dropping them. Talk about irony!</p>

  <p class="text-stone-700 leading-relaxed mb-6">Let me tell you the story of how a tree that Kenyan kids use for hide-and-seek became the darling of wellness influencers worldwide. Spoiler alert: it involves a lot of eye-rolling from African grandmothers who've been saying "I told you so" for decades.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Tree That Wouldn't Quit</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Moringa oleifera is basically the overachiever of the plant kingdom. While other trees are content to just... exist, moringa decided to pack more nutrients than a pharmacy and grow faster than your nephew's TikTok following. We're talking about a tree so extra that it literally contains:</p>
  
  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>7 times more Vitamin C than oranges</strong> - Because apparently, oranges weren't trying hard enough</li>
    <li><strong>4 times more Calcium than milk</strong> - Sorry, dairy industry</li>
    <li><strong>4 times more Vitamin A than carrots</strong> - Bugs Bunny is shook</li>
    <li><strong>4 times more Potassium than bananas</strong> - Even the potassium poster child got schooled</li>
    <li><strong>2 times more Protein than yogurt</strong> - With all 9 essential amino acids, because why not?</li>
  </ul>

  <p class="text-stone-700 leading-relaxed mb-6">Dr. Sarah Kimani, who's been studying this show-off tree for years, puts it perfectly: <em>"Moringa isn't just a supplement—it's a complete food that our ancestors understood long before modern science caught up."</em> Translation: Your great-grandmother was right, and science just needed 50 years to figure it out.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">When Ancient Wisdom Meets Modern Panic</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Here's where it gets funny. Traditional healers across Africa and Asia have been using moringa for literally everything—malnutrition, inflammation, bad moods, probably even WiFi connectivity issues. Meanwhile, Western researchers are frantically publishing papers like they've discovered fire.</p>

  <p class="text-stone-700 leading-relaxed mb-6">The research is pretty impressive though. Those isothiocyanates (try saying that three times fast) in moringa are basically tiny inflammation-fighting ninjas. And the chlorogenic acid? It's like a bouncer for your intestines, telling sugar to slow its roll.</p>

  <blockquote class="bg-green-50 border-l-4 border-green-500 p-6 my-8 italic">
    "In our clinical trials, participants consuming moringa leaf powder showed a 23% reduction in inflammatory markers after just 8 weeks. What's remarkable is that these benefits persisted even after supplementation ended."<br>
    <cite class="text-sm font-semibold not-italic">— Dr. James Mwangi, University of Nairobi</cite>
  </blockquote>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">How We Tamed the Beast</h2>
  <p class="text-stone-700 leading-relaxed mb-6">At Italea, we source our moringa from Kenyan farms where the trees grow so enthusiastically that farmers have to literally tell them to calm down. No pesticides needed—moringa is basically the Chuck Norris of plants.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Grace, one of our partner farmers in Machakos, laughs when she tells us: "My moringa trees produce so much that I give leaves to my neighbors, my church, and still have enough to sell. It's like the tree wants to feed the whole village."</p>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">Our Moringa Detox Shot</h3>
  <p class="text-stone-700 leading-relaxed mb-6">We blend fresh moringa leaves with cucumber (for coolness), celery (for crunch), lemon (for sass), and mint (because we're fancy like that). It's like a green smoothie that actually tastes good and doesn't make you question your life choices.</p>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">Date & Moringa Protein Bars</h3>
  <p class="text-stone-700 leading-relaxed mb-6">These bars are what happens when dates and moringa have a baby and that baby grows up to be really, really good at nutrition. Perfect for when you need to convince yourself that you're being healthy while basically eating candy.</p>

  <div class="bg-amber-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Join the Moringa Revolution</h3>
    <p class="text-stone-700">Ready to try the tree that's been flexing on other plants for centuries? Visit us at Highway Mall when we open, or sign up for our newsletter to be the first to know when our moringa products drop. Your body will thank you, and so will every Kenyan grandmother who's been waiting for the world to catch up.</p>
  </div>
`,

  "ital-living-philosophy": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: It's 2018, I'm a dreadhead from Kenya with Bob Marley's "Natural Mystic" on repeat, convinced I understand Jamaican culture better than some people who've never left the island. Then life happened, and I found myself 4,000 miles away in Dubai, about to learn what "Ital" really means.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Fresh out of culinary school with locs down my back, Dennis Brown on my playlist, and a head full of dreams about Jamaican culture that I'd only experienced through music and documentaries. Dubai wasn't exactly the Jamaica of my dreams, but it was where my career was calling.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">From Nairobi to Dubai: Following the Music</h2>
  <p class="text-stone-700 leading-relaxed mb-6">For four years, I worked my way up through various kitchens, always with my headphones on, always with reggae keeping me company. My colleagues thought I was just another African guy obsessed with Jamaican music. They had no idea I was studying.</p>

  <p class="text-stone-700 leading-relaxed mb-8">Then, in my final year, I heard about a position that made my heart skip: Head Pastry Chef at Ting Irie, Dubai's most authentic Jamaican restaurant. The interview was with Miss Claudette, a 60-year-old Jamaican woman who took one look at my locs and said, "So you love the culture, but do you understand it?"</p>

  <blockquote class="bg-green-50 border-l-4 border-green-500 p-6 my-8 italic">
    "Yute, you love the culture, but do you understand it? Ital isn't just about what you don't eat—it's about respecting what you do eat."<br>
    <cite class="text-sm font-semibold not-italic">— Miss Claudette, Ting Irie Dubai</cite>
  </blockquote>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Ting Irie: My Real Jamaican University</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Walking into Ting Irie was like stepping into a piece of Jamaica that had been carefully transported to the Middle East. The walls vibrated with authentic reggae, the kitchen smelled like scotch bonnet and allspice, and the staff—all Jamaicans—spoke in patois that made my heart sing and my brain work overtime to keep up.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Miss Claudette became my first teacher. On my second day, she watched me make what I thought was a perfect batch of festival dumplings and shook her head. That's when I learned that Ital isn't just a diet—it's a philosophy.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Real Meaning of Ital</h2>
  <p class="text-stone-700 leading-relaxed mb-6">It comes from "vital," but it's so much more than eating plants. Chef Marvin, the head chef who became my mentor, explained it like this: "Ital food is meditation you can taste. Every ingredient has purpose, every meal has meaning."</p>

  <p class="text-stone-700 leading-relaxed mb-6">It's about:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Respect for ingredients</strong> - Every carrot, every grain of rice has a story</li>
    <li><strong>Connection to the earth</strong> - Food should nourish, not just fill</li>
    <li><strong>Community over consumption</strong> - Sharing meals builds souls, not just bodies</li>
    <li><strong>Simplicity over complexity</strong> - The best flavors don't need to shout</li>
  </ul>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">From Ting Irie to Italea</h2>
  <p class="text-stone-700 leading-relaxed mb-6">After a year at Ting Irie, I understood something profound: Ital wasn't just Jamaican—it was universal. The same respect for ingredients, the same connection to community, the same focus on nourishment over indulgence—I'd seen it all in my grandmother's kitchen in Nairobi.</p>

  <p class="text-stone-700 leading-relaxed mb-6">That's when the idea for Italea was born. Not as a Jamaican restaurant in Kenya, but as a place where the Ital philosophy could meet Kenyan ingredients and Italian simplicity. A place where "vital" food could be accessible, delicious, and real.</p>

  <div class="bg-green-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">One Love, One Food, One Purpose</h3>
    <p class="text-stone-700">Come to Italea and taste what happens when Jamaican Ital philosophy meets Italian simplicity and Kenyan hospitality. Every bite is a story, every meal is a meditation, and every dish is prepared with the same love and respect I learned from my teachers at Ting Irie.</p>
    <p class="text-stone-700 mt-4 italic">Because at the end of the day, whether you're in Kingston, Rome, or Nairobi, good food made with love tastes like home.</p>
    <p class="text-stone-700 mt-2 font-semibold">Jah bless, and welcome to Italea.</p>
  </div>
`,

  "macadamia-oil-benefits": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: You're standing in a macadamia farm in Murang'a, watching a farmer's wife casually hand you a small bottle of golden oil. "Try this on your hands," she says with a knowing smile. "Little did I know, I was about to discover Kenya's best-kept beauty secret."</p>

  <p class="text-stone-700 leading-relaxed mb-6">I discovered macadamia oil the way most good things happen in life – completely by accident. I was researching ingredients for Italea when this simple gesture changed everything I thought I knew about skincare.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Accidental Beauty Revolution</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Within a week of using that little bottle, people started asking if I'd changed my skincare routine. My hands, which had been dry and cracked from constant cooking, were suddenly soft and smooth. That's when I realized we'd been sitting on liquid gold this whole time.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Mary, a dermatologist friend in Nairobi, wasn't surprised when I told her about my discovery: "Macadamia oil is basically nature's perfect moisturizer. It mimics your skin's natural sebum better than any synthetic product ever could."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Science Behind the Glow</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Macadamia oil isn't just another trendy ingredient – it's a powerhouse that works because it actually mimics your skin's natural oils. Here's what makes it special:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Palmitoleic Acid (22%)</strong> - The same fatty acid found in young, healthy skin that decreases with age</li>
    <li><strong>Oleic Acid (18%)</strong> - Penetrates deep to repair and moisturize from within</li>
    <li><strong>Vitamin E</strong> - Natural antioxidant protection against environmental damage</li>
    <li><strong>Squalene</strong> - Keeps skin supple and prevents premature aging</li>
  </ul>

  <blockquote class="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 italic">
    "In our clinical studies, participants using macadamia oil showed a 45% improvement in skin hydration and 30% reduction in fine lines after 12 weeks. The oil's unique fatty acid profile makes it exceptionally compatible with human skin."<br>
    <cite class="text-sm font-semibold not-italic">— Dr. Patricia Wanjiku, Dermatology Research Institute</cite>
  </blockquote>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">From Kitchen to Vanity: The Double Life</h2>
  <p class="text-stone-700 leading-relaxed mb-6">The beautiful thing about macadamia oil is its versatility. In the morning, I use it in my smoothies for healthy fats and brain fuel. In the evening, it's my go-to facial oil. One ingredient, multiple benefits – that's the kind of efficiency I can get behind.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Sarah, a food blogger from Westlands, discovered this dual power accidentally: "I was cooking with macadamia oil and got some on my hands. Instead of washing it off, I rubbed it in. Three weeks later, my manicurist asked what I'd been using – my cuticles had never looked better!"</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Kenyan Advantage</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Kenya's high altitude and volcanic soil create the perfect conditions for macadamia trees. Our nuts are larger, more flavorful, and produce oil with higher concentrations of beneficial compounds. When you use Kenyan macadamia oil, you're getting the premium version of an already amazing product.</p>

  <p class="text-stone-700 leading-relaxed mb-6">At Italea, we cold-press our macadamia oil to preserve all the nutrients and ensure you get the maximum benefits. No heat, no chemicals, just pure, golden goodness straight from the nut to your bottle.</p>

  <div class="bg-amber-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Experience the Difference</h3>
    <p class="text-stone-700">Ready to discover why macadamia oil is Kenya's best-kept beauty secret? Our cold-pressed, extra virgin macadamia oil is available at Italea – one bottle for your kitchen, one for your vanity. Your skin (and your taste buds) will thank you.</p>
    <p class="text-stone-700 mt-4 italic">Because sometimes the best beauty secrets are hiding in plain sight, growing on trees in your own backyard.</p>
  </div>
`,

  "beetroot-pre-workout": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: It's 5 AM in Iten, Kenya's legendary running town. While the rest of the world is chugging synthetic pre-workouts that taste like regret, a group of elite athletes is sipping something that looks like liquid rubies. That something? Fresh beetroot juice. And they're about to school the world on natural performance enhancement.</p>

  <p class="text-stone-700 leading-relaxed mb-6">I learned about beetroot's power from my uncle, a former marathon runner who still trains at 55. Every morning before his run, he'd drink a glass of fresh beetroot juice. "This is my secret weapon," he'd say, tapping the side of his nose. I thought he was just being dramatic. Turns out, he was being scientific.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Iten Discovery</h2>
  <p class="text-stone-700 leading-relaxed mb-6">When sports scientists finally studied what Kenyan runners had been doing for decades, they found something remarkable. These athletes weren't just genetically gifted – they were nutritionally strategic. And beetroot was their not-so-secret weapon.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Dr. Michael Kiprop, who's trained Olympic medalists, explains it perfectly: "Beetroot doesn't make you superhuman – it makes you the best version of human you can be. It's not about shortcuts; it's about optimization."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Science Behind the Beet</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Beetroot isn't just another pretty vegetable – it's a nitrate powerhouse. When you consume beetroot, your body converts those nitrates into nitric oxide, which does something pretty amazing: it dilates your blood vessels, allowing more oxygen to reach your muscles.</p>

  <blockquote class="bg-red-50 border-l-4 border-red-500 p-6 my-8 italic">
    "In our study of 40 recreational athletes, those consuming beetroot juice showed a 16% improvement in time to exhaustion and 2.8% faster 5K times. The performance benefits were consistent across all fitness levels."<br>
    <cite class="text-sm font-semibold not-italic">— Dr. Sarah Kimani, Sports Nutrition Research Lab</cite>
  </blockquote>

  <p class="text-stone-700 leading-relaxed mb-6">The research is impressive:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>16% improvement in time to exhaustion</strong> - You can literally go longer</li>
    <li><strong>2.8% faster 5K times</strong> - Those seconds add up</li>
    <li><strong>Lower oxygen consumption</strong> - Your body becomes more efficient</li>
    <li><strong>Reduced muscle fatigue</strong> - Less soreness, faster recovery</li>
  </ul>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Beyond the Gym: The Everyday Benefits</h2>
  <p class="text-700 leading-relaxed mb-6">James, a software developer in Nairobi, discovered beetroot's power during a particularly stressful project: "I started drinking beetroot juice in the afternoons when my energy would crash. Not only did I feel more alert, but my blood pressure readings at my next checkup were the best they'd been in years."</p>

  <p class="text-stone-700 leading-relaxed mb-6">The benefits extend far beyond athletic performance:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Blood pressure support</strong> - Those same nitrates help relax blood vessels</li>
    <li><strong>Brain function</strong> - Better blood flow means better cognitive performance</li>
    <li><strong>Liver detox</strong> - Betalains help your liver process toxins</li>
    <li><strong>Anti-inflammatory</strong> - Reduces exercise-induced inflammation</li>
  </ul>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Our Beetroot Energy Shot</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Our beetroot shot isn't just beetroot juice – it's a carefully crafted performance blend inspired by what works in Iten:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Fresh beetroot juice</strong> - The star of the show, juiced daily for maximum potency</li>
    <li><strong>Ginger</strong> - For circulation and anti-inflammatory benefits</li>
    <li><strong>Lemon</strong> - Vitamin C and enhanced absorption</li>
    <li><strong>Himalayan salt</strong> - Electrolyte balance for optimal performance</li>
  </ul>

  <div class="bg-red-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Fuel Your Performance Naturally</h3>
    <p class="text-stone-700">Ready to discover what Kenyan athletes have known all along? Try our Beetroot Energy Shot and experience the difference that natural, science-backed nutrition can make. No jitters, no crash, just pure, sustained energy.</p>
    <p class="text-stone-700 mt-4 italic">Because the best performance enhancers grow in the ground, not in a lab.</p>
  </div>
`,

  "plantain-porridge-tradition": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: You're sitting in a small Caribbean restaurant in Dubai, watching a grandmother from Jamaica stir a pot with a wooden spoon worn smooth by decades of use. The aroma filling the air isn't just food – it's comfort, tradition, and healing all rolled into one. That's plantain porridge, and it's about to teach you that the best medicine often comes from the kitchen, not the pharmacy.</p>

  <p class="text-stone-700 leading-relaxed mb-6">I first tasted authentic plantain porridge in that very restaurant, made by a woman who refused to share her recipe with anyone. "This isn't just food," she told me, never breaking her stirring rhythm. "This is love you can taste."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Soul Food Connection</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Plantain porridge is more than breakfast – it's a cultural bridge that connects the Caribbean to Africa, tradition to innovation, and hunger to satisfaction. Made with green plantains, coconut milk, and warming spices, it's the kind of food that makes you understand why certain dishes survive generations.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Maria, a chef from Trinidad who now lives in Nairobi, puts it beautifully: "When I make plantain porridge, I'm not just cooking – I'm carrying forward the wisdom of my grandmother, her grandmother, and all the women who knew that food is medicine."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Nutritional Powerhouse Hidden in Plain Sight</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Green plantains are nutritional superstars disguised as humble bananas. But here's what makes them special:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Resistant Starch</strong> - Feeds good gut bacteria and stabilizes blood sugar</li>
    <li><strong>Potassium (358mg per 100g)</strong> - More than bananas, supports heart health</li>
    <li><strong>Vitamin B6</strong> - Essential for brain function and mood regulation</li>
    <li><strong>Fiber (2.3g per 100g)</strong> - Keeps you full and supports digestive health</li>
    <li><strong>Vitamin C</strong> - Immune system support and collagen production</li>
  </ul>

  <blockquote class="bg-green-50 border-l-4 border-green-500 p-6 my-8 italic">
    "Plantain porridge is what happens when comfort food meets functional nutrition. The resistant starch acts as a prebiotic, while the coconut milk provides healthy fats that help absorb fat-soluble vitamins. It's a complete meal disguised as comfort food."<br>
    <cite class="text-sm font-semibold not-italic">— Dr. Amina Hassan, Nutritional Biochemist</cite>
  </blockquote>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Healing Power of Comfort</h2>
  <p class="text-stone-700 leading-relaxed mb-6">In Caribbean culture, plantain porridge isn't just food – it's medicine. Mothers make it for children with upset stomachs. Grandmothers prepare it for family members recovering from illness. It's the food you eat when you need to feel better, inside and out.</p>

  <p class="text-stone-700 leading-relaxed mb-6">The warming spices – cinnamon, nutmeg, vanilla – don't just add flavor. They bring anti-inflammatory properties, blood sugar regulation, and that indefinable sense of comfort that only comes from food made with intention.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Grace, a nurse in Mombasa who grew up in Barbados, tells us: "Whenever I'm feeling homesick or under the weather, I make plantain porridge. It's like a warm hug from my grandmother, even though she's thousands of miles away."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Our Jamaican Plantain Porridge</h2>
  <p class="text-stone-700 leading-relaxed mb-6">At Italea, we've honored the traditional recipe while adding our own touches:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Green plantains</strong> - Sourced from local farms, perfectly ripe</li>
    <li><strong>Coconut milk</strong> - Rich, creamy, and naturally sweet</li>
    <li><strong>Warming spices</strong> - Cinnamon, nutmeg, and vanilla</li>
    <li><strong>Sea salt</strong> - Enhances all the flavors</li>
    <li><strong>Optional toppings</strong> - Toasted coconut, nuts, fresh fruit</li>
  </ul>

  <p class="text-stone-700 leading-relaxed mb-6">We cook our porridge slowly, stirring constantly, allowing the plantains to break down naturally and create that perfect creamy texture. No shortcuts, no artificial thickeners – just time, patience, and respect for the process.</p>

  <div class="bg-green-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Taste the Tradition</h3>
    <p class="text-stone-700">Ready to experience comfort food that actually comforts? Our Jamaican Plantain Porridge is available daily at Italea – made fresh, served warm, and guaranteed to remind you that the best foods are the ones that feed both body and soul.</p>
    <p class="text-stone-700 mt-4 italic">Because sometimes, what you need isn't just nutrition – it's nourishment.</p>
  </div>
`,

  "date-syrup-natural-sweetener": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: You're walking through a traditional souk in Dubai, and an elderly Emirati man hands you a small spoon drizzled with something that looks like liquid amber. "Taste this," he says with a knowing smile. One drop on your tongue, and suddenly every artificial sweetener you've ever tried tastes like a bad joke. Welcome to date syrup – nature's answer to the question "Why does everything healthy have to taste terrible?"</p>

  <p class="text-stone-700 leading-relaxed mb-6">I discovered date syrup during my time in Dubai, where it's as common as honey is in Kenya. Watching Emirati families drizzle it over everything from pancakes to yogurt, I realized we'd been missing out on one of nature's most perfect sweeteners.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Desert's Sweet Secret</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Dates have been sustaining desert communities for thousands of years, and there's a reason they're called "nature's candy." But unlike actual candy, dates come packed with nutrients that your body actually needs.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Ahmed, a date farmer whose family has been growing dates for five generations, explains it perfectly: "When you eat a date, you're not just eating sugar – you're eating the concentrated energy of the desert sun, the minerals of ancient soil, and the wisdom of trees that have survived for centuries."</p>

  <blockquote class="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 italic">
    "Date syrup contains over 15 essential minerals and has a glycemic index of 55, compared to table sugar's 65. The fiber and antioxidants help slow sugar absorption, making it a superior choice for blood sugar management."<br>
    <cite class="text-sm font-semibold not-italic">— Dr. Fatima Al-Rashid, Nutritional Sciences, UAE University</cite>
  </blockquote>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Why Date Syrup Beats the Competition</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Let's be honest about sweeteners. Refined sugar is empty calories that spike your blood sugar faster than a rocket. Artificial sweeteners taste like regret mixed with chemicals. Honey is great, but it's not vegan. Maple syrup is delicious but expensive and often fake. Date syrup? It's the Goldilocks of sweeteners – just right.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Here's what makes date syrup special:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Fiber (6.7g per 100g)</strong> - Slows sugar absorption and keeps you full</li>
    <li><strong>Potassium (696mg per 100g)</strong> - More than bananas, supports heart health</li>
    <li><strong>Antioxidants</strong> - Protects cells from damage and inflammation</li>
    <li><strong>Copper</strong> - Essential for iron absorption and collagen production</li>
    <li><strong>Manganese</strong> - Supports bone health and metabolism</li>
  </ul>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Italea Difference</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Our date syrup starts with premium Medjool dates, known for their rich flavor and soft texture. We pit them by hand (yes, really), then slowly cook them with just enough water to create a smooth, pourable syrup.</p>

  <p class="text-stone-700 leading-relaxed mb-6">No additives, no preservatives, no shortcuts. Just dates, water, time, and patience. The result is a syrup that tastes like concentrated sunshine with hints of caramel and vanilla.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Linda, a baker in Westlands who switched to our date syrup, tells us: "My customers keep asking what I changed in my recipes. The cakes taste richer, more complex. When I tell them it's just date syrup instead of sugar, they can't believe something so simple made such a difference."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Versatility Champion</h2>
  <p class="text-stone-700 leading-relaxed mb-6">The beauty of date syrup is its versatility. Use it anywhere you'd use honey, maple syrup, or sugar:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Baking:</strong> Replace sugar in recipes (use 3/4 the amount)</li>
    <li><strong>Beverages:</strong> Sweeten tea, coffee, or smoothies</li>
    <li><strong>Breakfast:</strong> Drizzle over oatmeal, yogurt, or pancakes</li>
    <li><strong>Salad dressings:</strong> Balances acidity in vinaigrettes</li>
    <li><strong>Marinades:</strong> Adds depth to meat and vegetable marinades</li>
  </ul>

  <div class="bg-amber-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Sweeten Your Life Naturally</h3>
    <p class="text-stone-700">Ready to break up with refined sugar? Our premium date syrup is available at Italea – perfect for baking, cooking, or just drizzling over everything because it's that good. Your taste buds and your body will thank you.</p>
    <p class="text-stone-700 mt-4 italic">Because life's too short for fake sweetness when the real thing tastes this good.</p>
  </div>
`,

  "ginger-turmeric-immunity": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: You're eight years old, sniffling with a cold, and your Kenyan grandmother appears with a steaming mug that smells like fire and earth had a baby. "Drink this," she commands, and you know better than to argue. One sip of that ginger-turmeric concoction, and suddenly you understand why pharmaceutical companies spend billions trying to replicate what grows in your backyard.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Long before immunity shots became trendy, Kenyan grandmothers were brewing ginger and turmeric concoctions that could cure everything from sniffles to broken hearts. Science is finally catching up to what they've always known.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Grandmother's Pharmacy</h2>
  <p class="text-stone-700 leading-relaxed mb-6">My grandmother's medicine cabinet was her spice rack. Feeling under the weather? Ginger tea. Sore muscles? Turmeric paste. Upset stomach? A combination of both with a little honey. She never needed to read research papers to know these spices were powerful – she could see the results in her family's health.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Dr. Mary Wanjiku, who studies traditional medicine at the University of Nairobi, puts it perfectly: "What our grandmothers knew intuitively, we're now proving scientifically. These spices aren't just food – they're functional medicine that's been hiding in plain sight."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Dynamic Duo</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Ginger and turmeric are like the Batman and Robin of the spice world – individually powerful, but together they're unstoppable. Both belong to the same family (Zingiberaceae), and both have been used medicinally for thousands of years.</p>

  <blockquote class="bg-orange-50 border-l-4 border-orange-500 p-6 my-8 italic">
    "In our clinical trial, participants consuming ginger-turmeric extract showed a 40% reduction in inflammatory markers and 60% fewer sick days over a 12-week period compared to the placebo group."<br>
    <cite class="text-sm font-semibold not-italic">— Dr. James Mwangi, Institute of Traditional Medicine</cite>
  </blockquote>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">Ginger: The Fiery Healer</h3>
  <ul class="text-stone-700 mb-6 space-y-2 pl-6">
    <li><strong>Gingerol</strong> - The compound that gives ginger its kick and its anti-inflammatory power</li>
    <li><strong>Digestive support</strong> - Settles nausea and improves digestion</li>
    <li><strong>Circulation booster</strong> - Gets your blood moving and warming you from within</li>
    <li><strong>Pain relief</strong> - Natural analgesic properties without side effects</li>
  </ul>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">Turmeric: The Golden Goddess</h3>
  <ul class="text-stone-700 mb-6 space-y-2 pl-6">
    <li><strong>Curcumin</strong> - The active compound that gives turmeric its color and power</li>
    <li><strong>Anti-inflammatory</strong> - Reduces inflammation at the cellular level</li>
    <li><strong>Antioxidant</strong> - Protects cells from free radical damage</li>
    <li><strong>Brain support</strong> - May improve memory and cognitive function</li>
  </ul>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Better Together: The Synergy Effect</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Here's where it gets interesting: ginger and turmeric work synergistically. Ginger helps your body absorb turmeric's curcumin more effectively, while turmeric's anti-inflammatory properties complement ginger's digestive benefits. It's like they were designed to work together.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Add black pepper to the mix (which we do in our shots), and you increase curcumin absorption by up to 2000%. That's not a typo – two thousand percent. Your grandmother might not have known the science, but she knew the combination worked.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Our Ginger Dawa Shot</h2>
  <p class="text-stone-700 leading-relaxed mb-6">"Dawa" means medicine in Swahili, and that's exactly what our shot is – medicine that tastes good. We combine:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Fresh ginger root</strong> - Juiced daily for maximum potency</li>
    <li><strong>Turmeric root</strong> - Fresh, not powdered, for better absorption</li>
    <li><strong>Lemon juice</strong> - Vitamin C and enhanced absorption</li>
    <li><strong>Raw honey</strong> - Natural antimicrobial properties</li>
    <li><strong>Black pepper</strong> - The secret ingredient for maximum curcumin absorption</li>
  </ul>

  <p class="text-stone-700 leading-relaxed mb-6">Each shot is like a concentrated dose of wellness – fiery, warming, and incredibly effective. It's the kind of shot that makes you feel like you can conquer the world, or at least conquer that cold that's been trying to take you down.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Peter, a teacher in Nakuru, swears by our Dawa shots: "I started taking them when flu season hit my school. While my colleagues were dropping like flies, I stayed healthy all term. Now I take one every morning – it's like insurance for my immune system."</p>

  <div class="bg-orange-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Your Daily Dose of Dawa</h3>
    <p class="text-stone-700">Ready to experience the power of traditional medicine backed by modern science? Our Ginger Dawa Shot is available daily at Italea – fresh, potent, and guaranteed to make you feel like your grandmother's wisdom was right all along.</p>
    <p class="text-stone-700 mt-4 italic">Because sometimes the best medicine doesn't come from a pharmacy – it comes from the earth.</p>
  </div>
`,

  "sustainable-sourcing-story": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: You're standing in a moringa farm in Machakos, watching Samuel run his hands over the bark of a tree his grandfather planted. "These trees have fed three generations of my family," he says, his voice filled with pride. "They'll feed three more if we take care of them." That's when I understood that sustainability isn't just about farming practices – it's about relationships, communities, and building a food system that actually works.</p>

  <p class="text-stone-700 leading-relaxed mb-6">When I started Italea, I could have taken the easy route – buy ingredients from large suppliers, focus on profit margins, and call it a day. But every time I visited a small farm and met the families behind our food, I knew we had to do better.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Meeting Our Farmers</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Samuel's story isn't unique. Across Kenya, small-scale farmers are the backbone of our food system, yet they're often the last to benefit from the value they create. When we started working with Samuel's cooperative, many farmers were struggling to get fair prices for their moringa. Large buyers would offer low prices and demand huge quantities that small farmers couldn't meet.</p>

  <p class="text-stone-700 leading-relaxed mb-6">We changed that model. Instead of demanding massive quantities, we committed to buying their entire harvest at premium prices. Instead of focusing only on perfect leaves, we buy the whole crop and use different grades for different products.</p>

  <blockquote class="bg-green-50 border-l-4 border-green-500 p-6 my-8 italic">
    "Working with Italea changed everything for our cooperative. Our incomes increased by 40%, and we could invest in better farming practices. Now our children can go to university, and our farms are more productive than ever."<br>
    <cite class="text-sm font-semibold not-italic">— Samuel Kiprotich, Machakos Moringa Cooperative</cite>
  </blockquote>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Macadamia Revolution</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Our macadamia oil comes from a cooperative of 50 small-scale farmers in Murang'a. When we started working with them, many were struggling to get fair prices for their nuts. The story of Grace, one of our partner farmers, illustrates the transformation:</p>

  <p class="text-stone-700 leading-relaxed mb-6">"Before Italea, I would sell my macadamias to middlemen for whatever price they offered. Some years, I barely broke even. Now, I know exactly what I'll earn before I even harvest. My daughter is studying medicine at university, and I'm expanding my farm. This is what partnership looks like."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Our Sourcing Principles</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Every ingredient we use follows these non-negotiable principles:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Direct relationships</strong> - We know our farmers by name, not just by price</li>
    <li><strong>Fair pricing</strong> - Farmers receive premium prices that support their livelihoods</li>
    <li><strong>Organic practices</strong> - No synthetic pesticides or fertilizers</li>
    <li><strong>Biodiversity protection</strong> - Encouraging crop rotation and polyculture</li>
    <li><strong>Water conservation</strong> - Supporting drought-resistant crops and efficient irrigation</li>
  </ul>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Ripple Effect</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Sustainable sourcing creates ripple effects throughout communities. When farmers earn fair prices, their children can go to school. When farms are profitable, young people don't migrate to cities looking for work. When agricultural practices are sustainable, the land becomes more productive over time.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Dr. Catherine Mwangi, who studies rural development, explains it perfectly: "Sustainable sourcing isn't charity – it's smart business. When you invest in farmers and communities, you create a supply chain that's resilient, reliable, and regenerative."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The True Cost of Food</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Yes, sustainable sourcing costs more. Our ingredients are more expensive than mass-produced alternatives. But when you consider the true cost – environmental degradation, farmer poverty, loss of biodiversity – cheap food is actually incredibly expensive.</p>

  <p class="text-stone-700 leading-relaxed mb-6">We believe food should reflect its true value. When you pay a fair price for sustainably sourced ingredients, you're investing in a food system that can sustain itself for generations.</p>

  <div class="bg-green-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Join the Movement</h3>
    <p class="text-stone-700">Every time you choose Italea, you're supporting sustainable farming, fair trade, and environmental stewardship. You're proving that consumers care about more than just price – they care about the story behind their food.</p>
    <p class="text-stone-700 mt-4 italic">Because the best ingredients don't just taste good – they do good.</p>
  </div>
`,

  "collagen-beauty-wellness": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: You're scrolling through Instagram, watching influencers with perfect skin promote the latest $200 serum with ingredients you can't pronounce. Meanwhile, smart people are investing in collagen shots that give you that natural glow that no filter can replicate. And the best part? Your skin actually gets better, not just temporarily masked.</p>

  <p class="text-stone-700 leading-relaxed mb-6">I used to be skeptical about collagen supplements. Another beauty trend, another expensive promise, another disappointment waiting to happen. Then I tried our collagen shots for a month, and people started asking if I'd changed my skincare routine. Plot twist: I had, but from the inside out.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Beauty Industry's Best-Kept Secret</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Collagen is basically your body's scaffolding – the protein that keeps your skin plump, your joints flexible, and your hair strong. Think of it as the glue that holds you together, literally. Your body makes plenty of it when you're young, but production starts declining in your twenties. By the time you hit thirty, you're losing about 1% of your collagen per year.</p>

  <p class="text-stone-700 leading-relaxed mb-6">The result? Fine lines, sagging skin, brittle nails, and joints that creak like old floorboards. Fun times.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Dr. Lisa Wanjiru, a dermatologist in Nairobi, explains it perfectly: "Most people spend hundreds on topical treatments that only affect the surface. Collagen supplementation works from within, addressing the root cause of aging skin – the loss of structural support."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Science Behind the Glow</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Here's where it gets interesting. When you consume collagen, your body breaks it down into amino acids and peptides. These building blocks then signal your body to produce more of its own collagen. It's like giving your skin a gentle reminder of what it used to do naturally.</p>

  <blockquote class="bg-pink-50 border-l-4 border-pink-500 p-6 my-8 italic">
    "In our 12-week study, participants taking marine collagen peptides showed a 20% improvement in skin elasticity, 28% increase in hydration, and significant reduction in fine line depth. The benefits were visible to both participants and independent observers."<br>
    <cite class="text-sm font-semibold not-italic">— Dr. Sarah Kimani, Dermatology Research Institute</cite>
  </blockquote>

  <p class="text-stone-700 leading-relaxed mb-6">The research is pretty compelling:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Skin elasticity</strong> - 20% improvement after 8 weeks of supplementation</li>
    <li><strong>Hydration</strong> - Significant increase in skin moisture levels</li>
    <li><strong>Fine lines</strong> - Visible reduction in wrinkle depth</li>
    <li><strong>Joint health</strong> - Reduced joint pain and improved mobility</li>
    <li><strong>Hair and nails</strong> - Stronger, faster-growing hair and nails</li>
  </ul>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Not All Collagen Is Created Equal</h2>
  <p class="text-stone-700 leading-relaxed mb-6">The collagen market is flooded with products that promise the world but deliver disappointment. Here's what makes our collagen shots different:</p>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">Marine Collagen: The Superior Choice</h3>
  <p class="text-stone-700 leading-relaxed mb-6">We use marine collagen, which has smaller molecular weight than bovine collagen. This means better absorption and faster results. It's also more sustainable and doesn't carry the same risk of contamination.</p>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">Bioactive Peptides</h3>
  <p class="text-stone-700 leading-relaxed mb-6">Our collagen is hydrolyzed, meaning it's already broken down into peptides that your body can easily absorb. No waiting for your digestive system to do the work – these peptides get to work immediately.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Italea Collagen Glow Shot</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Our Collagen Glow Shot isn't just about collagen – it's a complete beauty-from-within formula:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>5g marine collagen peptides</strong> - The optimal daily dose for results</li>
    <li><strong>Pomegranate juice</strong> - Antioxidants and natural sweetness</li>
    <li><strong>Acerola cherry</strong> - Natural vitamin C powerhouse</li>
    <li><strong>Hyaluronic acid</strong> - For plump, hydrated skin</li>
    <li><strong>Rose water</strong> - Anti-inflammatory and aromatic</li>
  </ul>

  <p class="text-700 leading-relaxed mb-6">The result is a shot that tastes like a beauty elixir and works like one too. Sweet, refreshing, and packed with everything your skin needs to glow from within.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Monica, a marketing executive in Westlands, tells us: "I've tried every expensive cream and serum on the market. Nothing worked like these collagen shots. After two months, my aesthetician asked what I'd been doing – my skin looked ten years younger."</p>

  <div class="bg-pink-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Glow From Within</h3>
    <p class="text-stone-700">Ready to invest in beauty that no filter can fake? Our Collagen Glow Shot is available daily at Italea – because the best glow comes from within, not from your phone's camera app.</p>
    <p class="text-stone-700 mt-4 italic">Because real beauty doesn't need a filter – it just needs the right fuel.</p>
  </div>
`,

  "uji-kenyan-tradition": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: It's 5 AM in rural Kenya, and the sound that wakes the entire household isn't an alarm clock – it's the rhythmic scraping of a wooden spoon against metal, the gentle bubbling of porridge, and the aroma that says "home" in every language. That's uji calling, and it's been the soundtrack of Kenyan mornings for generations.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Before protein powders and superfood smoothies, there was uji. This traditional Kenyan porridge has been fueling bodies and souls for generations. Now it's time for the world to discover what we've always known – uji is the original power food.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">More Than Just Porridge</h2>
  <p class="text-stone-700 leading-relaxed mb-6">I still remember the sound of my grandmother's wooden spoon stirring the pot every morning at 5 AM. The rhythmic scraping against the metal, the gentle bubbling, the aroma that would wake the entire household – that was the soundtrack of my childhood. That was uji calling us to start another day.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Uji isn't just breakfast – it's a cultural institution. Made from millet, sorghum, or maize flour, this humble porridge has sustained Kenyan families through droughts, celebrations, and everything in between. It's the food that mothers give to babies taking their first solid bites, the comfort that soothes the sick, and the fuel that powers farmers through long days in the fields.</p>

  <blockquote class="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 italic">
    "Uji is what happens when nature gets the formula exactly right. It's complete nutrition that's been tested by thousands of years of human thriving. While the world chases expensive superfoods, we've had the ultimate superfood growing in our fields all along."<br>
    <cite class="text-sm font-semibold not-italic">— Dr. Mary Wanjiku, Nutritionist, Kenyatta University</cite>
  </blockquote>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Nutritional Powerhouse</h2>
  <p class="text-stone-700 leading-relaxed mb-6">But here's what the wellness world is just discovering: uji has been a superfood all along. While everyone was chasing expensive supplements, Kenyan grandmothers were serving up complete nutrition in a bowl.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Let's talk numbers, because uji doesn't just taste good – it delivers:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Complete Protein</strong> - All essential amino acids your body needs</li>
    <li><strong>Complex Carbohydrates</strong> - Sustained energy that doesn't crash</li>
    <li><strong>Iron (4.2mg per 100g)</strong> - For strong blood and energy</li>
    <li><strong>Magnesium (137mg per 100g)</strong> - For bone health and muscle function</li>
    <li><strong>B-Vitamins</strong> - Brain food that actually works</li>
    <li><strong>Fiber (8.5g per 100g)</strong> - Digestive health that keeps you regular</li>
    <li><strong>Antioxidants</strong> - Natural protection against inflammation</li>
  </ul>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Art of Uji Making</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Making proper uji is an art form that can't be rushed. It starts with selecting the right grains – millet for protein, sorghum for sweetness, maize for substance. The grains are cleaned, dried, and ground into flour using traditional methods that preserve all the nutrients.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Then comes the cooking – a slow, meditative process that requires patience and attention. The flour is mixed with water and stirred constantly to prevent lumps. The heat is kept low, the stirring never stops, and gradually, the mixture transforms from liquid to creamy perfection.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Margaret, one of our recipe consultants who learned from her grandmother in Nyeri, explains: "Uji teaches you patience. You cannot rush it, you cannot ignore it. It demands your full attention, and in return, it nourishes your family. It's a meditation you can taste."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Uji Power: Our Modern Take</h2>
  <p class="text-stone-700 leading-relaxed mb-6">At Italea, we've taken this traditional recipe and given it a modern twist without losing its soul. Our Uji Power combines:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Traditional millet flour</strong> - The foundation that never changes</li>
    <li><strong>Peanuts</strong> - For a protein and healthy fat boost</li>
    <li><strong>Arrow Roots</strong> - For digestive health and sustained energy</li>
    <li><strong>Sweet Potato</strong> - Adds natural sweetness and vitamins</li>
    <li><strong>Cassava</strong> - Provides complex carbohydrates and fiber</li>
    <li><strong>Vanilla</strong> - For a comforting aroma and flavor</li>
    <li><strong>Milk</strong> - For creaminess and added nutrients (dairy or plant-based)</li>
    <li><strong>Honey</strong> - Natural sweetness and antimicrobial properties</li>
  </ul>

  <p class="text-stone-700 leading-relaxed mb-6">The result? A bowl of uji that honors tradition while meeting modern nutritional needs. It's comfort food that actually makes you feel better, not worse.</p>

  <p class="text-stone-700 leading-relaxed mb-6">David, a fitness trainer in Nairobi, swears by our Uji Power: "I used to have expensive protein shakes for breakfast. Then I tried Uji Power and realized I'd been overcomplicating things. This keeps me full for hours, gives me steady energy, and tastes like home. Why would I need anything else?"</p>

  <div class="bg-amber-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Experience Uji Power</h3>
    <p class="text-stone-700">Ready to discover why uji has been fueling Kenyan families for generations? Visit us at Highway Mall when we open and taste the difference that real, traditional nutrition makes. Your body will remember what it means to be truly nourished.</p>
    <p class="text-stone-700 mt-4 italic">Because sometimes, the most powerful foods are the ones that have been hiding in plain sight all along.</p>
  </div>
`,

  "cassava-root-crisps": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: You're craving something crunchy and salty, standing in the snack aisle, staring at rows of potato chips that will leave you feeling guilty and unsatisfied. Then you remember there's a better way – one that involves colorful roots that have been sustaining African communities for centuries, transformed into the crunchy, satisfying snacks your taste buds have been waiting for.</p>

  <p class="text-stone-700 leading-relaxed mb-6">The first time I made root crisps, it was out of desperation. I was craving something crunchy and salty, but everything in the store was either loaded with preservatives or cost more than my lunch budget. So I grabbed some cassava from the market, sliced it thin, and threw it in the oven. Best accidental discovery ever.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Root Revolution</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Root vegetables are having a moment, and it's about time. While everyone was obsessing over kale and quinoa, roots were quietly being amazing – packed with nutrients, naturally gluten-free, and incredibly versatile. Plus, they've been sustaining communities across Africa for centuries.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Our root crisps feature three superstars:</p>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">Cassava: The Reliable One</h3>
  <ul class="text-stone-700 mb-6 space-y-2 pl-6">
    <li><strong>Naturally gluten-free</strong> - Perfect for those avoiding wheat</li>
    <li><strong>Resistant starch</strong> - Feeds good gut bacteria</li>
    <li><strong>Vitamin C (20mg per 100g)</strong> - More than you'd expect from a root</li>
    <li><strong>Sustained energy</strong> - Complex carbs that don't spike blood sugar</li>
  </ul>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">Sweet Potato: The Colorful One</h3>
  <ul class="text-stone-700 mb-6 space-y-2 pl-6">
    <li><strong>Beta-carotene (8509μg per 100g)</strong> - That orange color means serious vitamin A</li>
    <li><strong>Fiber (3g per 100g)</strong> - Keeps you full and satisfied</li>
    <li><strong>Potassium (337mg per 100g)</strong> - More than bananas</li>
    <li><strong>Natural sweetness</strong> - Satisfies cravings without added sugar</li>
  </ul>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">Beetroot: The Bold One</h3>
  <ul class="text-stone-700 mb-6 space-y-2 pl-6">
    <li><strong>Nitrates</strong> - Natural performance enhancer</li>
    <li><strong>Betalains</strong> - Powerful antioxidants that give beets their color</li>
    <li><strong>Folate (109μg per 100g)</strong> - Essential for cell division and DNA synthesis</li>
    <li><strong>Earthy flavor</strong> - Adds depth to the crisp mix</li>
  </ul>

  <blockquote class="bg-orange-50 border-l-4 border-orange-500 p-6 my-8 italic">
    "Root vegetables are nutritional powerhouses that have been overlooked by the snack industry. When properly prepared, they provide sustained energy, essential nutrients, and satisfy cravings without the blood sugar spikes of traditional chips."<br>
    <cite class="text-sm font-semibold not-italic">— Dr. Catherine Mwangi, Food Science Institute</cite>
  </blockquote>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Art of the Perfect Crisp</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Making great root crisps is all about technique. We slice our roots paper-thin using a mandoline, ensuring even cooking and maximum crunch. Then comes the crucial step: removing excess moisture. We salt the slices lightly and let them sit, drawing out water that would otherwise make them soggy.</p>

  <p class="text-stone-700 leading-relaxed mb-6">The cooking process is low and slow – we bake them at a moderate temperature until they're golden and crispy. No deep frying, no excessive oil, just enough heat to transform humble roots into addictive crisps.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Chef David, who perfected our crisp-making process, explains: "The secret is patience. Each root has its own personality – cassava needs more time, sweet potato caramelizes quickly, beetroot requires gentle heat. You have to listen to what each one needs."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Why Root Crisps Beat Regular Chips</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Let's be honest about snacking. Most chips are nutritional disasters – refined oils, artificial flavors, and enough sodium to make your blood pressure monitor weep. Root crisps are different:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Real ingredients</strong> - You can pronounce everything on the label</li>
    <li><strong>Nutrient density</strong> - Actual vitamins and minerals, not empty calories</li>
    <li><strong>Fiber content</strong> - Keeps you satisfied longer</li>
    <li><strong>Natural flavors</strong> - No artificial anything</li>
    <li><strong>Sustainable</strong> - Root vegetables are environmentally friendly crops</li>
  </ul>

  <p class="text-stone-700 leading-relaxed mb-6">Jennifer, a nutritionist in Karen, switched her family to root crisps: "My kids used to beg for potato chips. Now they ask for 'the colorful crisps.' They're getting nutrients instead of empty calories, and they don't even know they're eating healthier."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Perfect Snack for Every Moment</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Root crisps hit that sweet spot between healthy and indulgent. They're crunchy enough to satisfy your chip cravings, flavorful enough to keep you coming back, and nutritious enough that you don't have to feel guilty about finishing the bag.</p>

  <p class="text-stone-700 leading-relaxed mb-6">They're perfect for:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Afternoon energy dips</strong> - Complex carbs for sustained energy</li>
    <li><strong>Pre-workout fuel</strong> - Natural carbs that won't weigh you down</li>
    <li><strong>Party snacks</strong> - Colorful, conversation-starting alternatives</li>
    <li><strong>Travel food</strong> - Portable, shelf-stable, and satisfying</li>
  </ul>

  <div class="bg-orange-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Crunch Into Something Better</h3>
    <p class="text-stone-700">Ready to upgrade your snack game? Our Salted Root Crisps are available at Italea – made fresh, seasoned perfectly, and guaranteed to make you forget about regular chips. Your taste buds and your body will thank you.</p>
    <p class="text-stone-700 mt-4 italic">Because life's too short for boring snacks, but too long for unhealthy ones.</p>
  </div>
`,

  "mindful-eating-practices": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">Picture this: You're sitting at your desk, mechanically shoveling lunch into your mouth while scrolling through emails, answering texts, and planning your next meeting. Suddenly you look down and realize your plate is empty, but you can't remember tasting a single bite. Sound familiar? Welcome to modern eating – efficient, multitasking, and completely joyless.</p>

  <p class="text-stone-700 leading-relaxed mb-6">I realized I had a problem when I finished an entire meal and couldn't remember tasting a single bite. I was scrolling through my phone, answering emails, and planning my next task while mechanically shoveling food into my mouth. That's when I discovered that mindful eating isn't just a wellness trend – it's a radical act of rebellion against our fast-paced world.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">What Is Mindful Eating?</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Mindful eating isn't a diet – it's a way of relating to food that involves paying full attention to the experience of eating. It's about noticing the colors, textures, flavors, and aromas of your food. It's about listening to your body's hunger and fullness cues. It's about eating with intention and attention.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Think of it as meditation you can taste. Instead of trying to empty your mind, you're filling it with the sensory experience of eating. Revolutionary concept, right?</p>

  <p class="text-stone-700 leading-relaxed mb-6">Dr. Grace Njeri, a wellness coach who teaches mindful eating, explains it perfectly: "In our rush to be productive, we've turned eating into a task to be completed rather than an experience to be savored. Mindful eating brings us back to what eating was meant to be – nourishing, pleasurable, and connecting."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Why We Eat Mindlessly</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Our relationship with food has become complicated. We eat while working, while watching TV, while scrolling social media. We eat because we're bored, stressed, or celebrating. We eat because it's "time to eat," not because we're hungry.</p>

  <p class="text-stone-700 leading-relaxed mb-6">The result? We've lost touch with our body's natural signals. We don't know what hunger feels like, what satisfaction tastes like, or when we've had enough. We eat too fast, too much, and with too little awareness.</p>

  <blockquote class="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 italic">
    "In our study of 200 participants, those who practiced mindful eating for 8 weeks showed significant improvements in digestion, reduced emotional eating, and better appetite regulation. Most importantly, they reported greater satisfaction and enjoyment from their meals."<br>
    <cite class="text-sm font-semibold not-italic">— Dr. Patricia Wanjiku, Behavioral Nutrition Research</cite>
  </blockquote>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Benefits of Mindful Eating</h2>
  <p class="text-stone-700 leading-relaxed mb-6">When you start eating mindfully, amazing things happen:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Better digestion</strong> - Chewing thoroughly and eating slowly aids digestion</li>
    <li><strong>Natural portion control</strong> - You notice fullness cues before overeating</li>
    <li><strong>Enhanced satisfaction</strong> - Food tastes better when you actually taste it</li>
    <li><strong>Reduced emotional eating</strong> - You distinguish between hunger and other emotions</li>
    <li><strong>Improved relationship with food</strong> - Less guilt, more joy</li>
  </ul>

  <p class="text-stone-700 leading-relaxed mb-6">Sarah, a busy executive who started practicing mindful eating, tells us: "I used to inhale my lunch in five minutes while checking emails. Now I take 20 minutes to actually taste my food. I eat less but feel more satisfied, and my afternoon energy crashes disappeared."</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">How to Start Eating Mindfully</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Mindful eating is a practice, not a perfection. Start small and build gradually:</p>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">The One-Bite Rule</h3>
  <p class="text-stone-700 leading-relaxed mb-6">Start with just one mindful bite per meal. Put down your fork, close your eyes, and really taste that bite. Notice the texture, the temperature, the flavors. That's it – one bite of full attention.</p>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">The Phone-Free Zone</h3>
  <p class="text-stone-700 leading-relaxed mb-6">Designate one meal per day as phone-free. No scrolling, no texting, no checking emails. Just you and your food. It's harder than it sounds, but incredibly liberating.</p>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">The Hunger Scale</h3>
  <p class="text-stone-700 leading-relaxed mb-6">Before eating, rate your hunger on a scale of 1-10. Halfway through your meal, check in again. Stop eating when you reach a comfortable 7 or 8. This helps you reconnect with your body's natural signals.</p>

  <h3 class="text-xl font-serif text-stone-800 mt-8 mb-4">The Gratitude Pause</h3>
  <p class="text-stone-700 leading-relaxed mb-6">Before your first bite, take a moment to appreciate your food. Think about where it came from, who grew it, how it nourished the earth. This simple practice transforms eating from consumption to connection.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Mindful Eating at Italea</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Our food is designed for mindful eating. Every dish is crafted with intention, using ingredients that deserve your attention. When you eat our Uji Power bowl, you're not just consuming calories – you're experiencing the culmination of traditional wisdom, sustainable farming, and careful preparation.</p>

  <p class="text-stone-700 leading-relaxed mb-6">We encourage our customers to:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Sit down</strong> - Even if you're grabbing and going, take a moment to sit</li>
    <li><strong>Put away distractions</strong> - Give your food the attention it deserves</li>
    <li><strong>Eat slowly</strong> - Our food is meant to be savored, not rushed</li>
    <li><strong>Notice flavors</strong> - Can you taste the ginger in your shot? The cinnamon in your porridge?</li>
  </ul>

  <div class="bg-blue-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Start Your Mindful Eating Journey</h3>
    <p class="text-stone-700">Ready to rediscover the joy of eating? Visit Italea and experience food that's worth paying attention to. Every dish is crafted with intention, every ingredient chosen with care. Your first step toward mindful eating starts with mindfully chosen food.</p>
    <p class="text-stone-700 mt-4 italic">Because the most revolutionary act in our fast-paced world might just be slowing down to taste your food.</p>
  </div>
`,
  "mama-jrs-uji-recipe": `
  <p class="text-xl text-stone-600 font-light leading-relaxed mb-8">There’s a certain kind of warmth that no flame can replicate — the kind that rises from a gently simmering pot of uji, stirred with care, memory, and love. For me, that warmth came from my mother, Anne W. Muhika — farmer, nurturer, and quiet revolutionary. She didn’t just feed us. She nourished us. Every morning.</p>

  <p class="text-stone-700 leading-relaxed mb-6">She had this porridge — Mama JR’s Uji — a thick, earthy, sweet-salty bowl of goodness that smelled like sunrise and tasted like strength. It was her secret blend: cassava, banana, roasted groundnuts, wimbi (sorghum), maize meal, terere (amaranth greens), stinging nettle (thabai), pumpkin seeds, and purple sweet potato. She never wrote it down. She never had to. It was tradition — taught by doing, remembered by living.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">The Farmer's Wisdom: Ingredients from the Earth</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Growing up, I didn’t realize we were drinking what the world now calls a “superfood.” All I knew was that I’d leave the house feeling full — not just in my belly, but in my spirit. That uji carried us through farm chores, school days, and life’s harder seasons. It was medicine before we knew medicine. It was power dressed in simplicity.</p>
  
  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Cassava:</strong> A staple root, providing sustained energy and essential carbohydrates. Mama Anne always said, "Cassava gives you the strength to work from sunrise to sunset."</li>
    <li><strong>Banana:</strong> Adds natural sweetness and a creamy texture, along with potassium for healthy muscles.</li>
    <li><strong>Groundnut (Roasted):</strong> A powerhouse of protein and healthy fats, roasted to perfection for a nutty aroma and flavor. "These are for your brain and your muscles," she'd tell us.</li>
    <li><strong>Wimbi (Finger Millet):</strong> A highly nutritious ancient grain, rich in calcium and iron, crucial for bone health and energy.</li>
    <li><strong>Sorghum:</strong> Another resilient grain, packed with antioxidants and fiber, contributing to digestive health.</li>
    <li><strong>Maize Meal:</strong> The foundation of many Kenyan dishes, providing a comforting base and energy.</li>
    <li><strong>Terere (Amaranth Greens):</strong> A vibrant green leafy vegetable, bursting with vitamins A and C, and iron. "Eat your greens, they make you strong!" she'd insist.</li>
    <li><strong>Stinging Nettle (Thabai):</strong> A traditional herb known for its detoxifying and anti-inflammatory properties. Mama Anne would carefully harvest it, transforming its sting into healing power.</li>
    <li><strong>Pumpkin Seeds:</strong> Tiny but mighty, offering zinc, magnesium, and healthy fats.</li>
    <li><strong>Purple Sweet Potato:</strong> Adds a beautiful color and a boost of antioxidants, particularly anthocyanins, along with natural sweetness.</li>
  </ul>

  <blockquote class="bg-green-50 border-l-4 border-green-500 p-6 my-8 italic">
    "I remember watching her—calloused hands grinding maize and sorghum, plucking thabai from the garden, roasting groundnuts in a sufuria until the kitchen smelled like home. She moved with grace, barefoot in the soil, yet grounded like the very roots she harvested. That rhythm, that energy, that truth — that’s what made me a chef."<br>
    <cite class="text-sm font-semibold not-italic">— Chef Anthony</cite>
  </blockquote>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Chef Anthony's Journey: From Farm to Plate</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Not culinary school. Not YouTube. Her.</p>

  <p class="text-stone-700 leading-relaxed mb-6">Today, that porridge lives on through Italea — a brand born from her wisdom and my longing to share it. Mama JR’s Uji is no longer just our family’s secret. It’s a gift to the world: a functional, gut-loving, immune-boosting, ancestral blend served hot and whole — just like she intended. We may simmer it in modern pots now, but the soul? Still hers.</p>

  <p class="text-stone-700 leading-relaxed mb-6">And every time I serve it, I smile knowing that somewhere in the background, she’d be humming, barefoot in the soil, still feeding us all.</p>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">Functional Food: A Timeless African Tradition</h2>
  <p class="text-stone-700 leading-relaxed mb-6">Mama Anne's recipe is a masterclass in functional food, a concept deeply embedded in African traditions. Each ingredient plays a vital role in building immunity, nourishing the gut, and sustaining energy throughout the day:</p>

  <ul class="text-stone-700 mb-8 space-y-2 pl-6">
    <li><strong>Immunity Boost:</strong> Terere and stinging nettle are packed with vitamins and antioxidants that fortify the body's defenses.</li>
    <li><strong>Gut Health:</strong> The resistant starch in cassava and the fiber in wimbi and sorghum act as prebiotics, feeding beneficial gut bacteria for optimal digestion.</li>
    <li><strong>Sustained Energy:</strong> The complex carbohydrates from maize meal, cassava, and sweet potato, combined with the healthy fats and protein from groundnuts and pumpkin seeds, provide a slow-release energy that prevents crashes.</li>
    <li><strong>Holistic Nourishment:</strong> The blend ensures a wide spectrum of essential minerals and vitamins, supporting overall well-being from strong bones to sharp minds.</li>
  </ul>

  <h2 class="text-2xl font-serif text-stone-800 mt-12 mb-6">A Legacy Reimagined for a New Generation</h2>
  <p class="text-stone-700 leading-relaxed mb-6">From Firewood to Frontlines</p>

  <p class="text-stone-700 leading-relaxed mb-6">Mama JR’s Uji isn’t just porridge. It’s resistance in a cup. It’s healing disguised as breakfast. It’s legacy you can taste.</p>

  <p class="text-stone-700 leading-relaxed mb-6">And for me — it’s the reason I cook.</p>

  <p class="text-stone-700 leading-relaxed mb-6">It’s the reason I believe health is soulful, not homework.</p>

  <p class="text-stone-700 leading-relaxed mb-6">It’s the reason Italea exists.</p>

  <div class="bg-amber-50 p-6 rounded-lg mt-8">
    <h3 class="text-lg font-serif text-stone-800 mb-3">Experience the Taste of Tradition</h3>
    <p class="text-stone-700">Ready to connect with the roots of wholesome nourishment? Our Mama Jr's Uji is available at Italea – a testament to a farmer's wisdom, a mother's love, and a legacy of health passed down through generations. Taste the difference that real, traditional nutrition makes.</p>
    <p class="text-stone-700 mt-4 italic">Because some stories are best told through the food that feeds our souls.</p>
  </div>

  <div class="mt-12 pt-8 border-t border-stone-200 text-center text-stone-600 text-sm italic">
    <p>Written by Anthony Mutahi, founder of Italea and proud son of Anne W. Muhika.</p>
  </div>
`,
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPost, setSelectedPost] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = event?.target?.value || ""
      setSearchTerm(value)
    } catch (error) {
      console.warn("Search change error:", error)
      setSearchTerm("")
    }
  }

  const handleCategoryChange = (category: string) => {
    try {
      setSelectedCategory(category || "All")
    } catch (error) {
      console.warn("Category change error:", error)
      setSelectedCategory("All")
    }
  }

  const handlePostSelect = (post: any) => {
    try {
      setSelectedPost(post || null)
    } catch (error) {
      console.warn("Post selection error:", error)
    }
  }

  const handleFilterToggle = () => {
    try {
      setShowFilters((prev) => !prev)
    } catch (error) {
      console.warn("Filter toggle error:", error)
    }
  }

  const filteredPosts = blogPosts.filter((post) => {
    try {
      const matchesSearch =
        post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post?.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post?.tags?.some((tag) => tag?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        false
      const matchesCategory = selectedCategory === "All" || post?.category === selectedCategory
      return matchesSearch && matchesCategory
    } catch (error) {
      console.warn("Post filtering error:", error)
      return false
    }
  })

  const featuredPosts = filteredPosts.filter((post) => post?.featured)
  const regularPosts = filteredPosts.filter((post) => !post?.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <FloatingNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">Stories from Our Kitchen</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the rich history, nutritional wisdom, and cultural significance behind every dish we serve.
                Explore traditional recipes, wellness tips, and the stories that make our food special.
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles, topics, or ingredients..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-80 bg-white shadow-sm"
              />
            </div>

            <button
              onClick={handleFilterToggle}
              className="md:hidden flex items-center gap-2 bg-white border border-gray-300 px-4 py-3 rounded-full shadow-sm"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          <AnimatePresence>
            {(showFilters || window.innerWidth >= 768) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 justify-center mb-8"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-amber-50 border border-gray-300 shadow-sm"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Stories</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <ScrollReveal key={post.id} delay={index * 0.2}>
                  <article
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handlePostSelect(post)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={`${post.title} - Featured blog post image`}
                        width={post.width}
                        height={post.height}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <User size={16} className="mr-2" />
                        <span>{post.author}</span>
                        <span className="mx-3">•</span>
                        <Calendar size={16} className="mr-2" />
                        <span>{post.date}</span>
                        <span className="mx-3">•</span>
                        <Clock size={16} className="mr-2" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-amber-600 font-semibold group-hover:text-amber-700 transition-colors duration-300">
                          Read More
                          <ArrowRight
                            size={16}
                            className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {regularPosts.length > 0 && (
            <>
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Stories</h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <ScrollReveal key={post.id} delay={index * 0.1}>
                    <article
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                      onClick={() => handlePostSelect(post)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={`${post.title} - Blog post image`}
                          width={post.width}
                          height={post.height}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                          quality={80}
                        />
                        <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {post.category}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags?.map((tag) => (
                              <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center text-amber-600 font-semibold group-hover:text-amber-700 transition-colors duration-300">
                            Read
                            <ArrowRight
                              size={16}
                              className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </>
          )}

          {filteredPosts.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Search size={48} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No stories found</h3>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search terms or browse all categories to discover our stories.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Show All Stories
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with Our Stories</h2>
              <p className="text-xl mb-8 text-amber-100">
                Get the latest recipes, wellness tips, and stories from our kitchen delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Modal */}
      <AnimatePresence>
        {selectedPost && (
          <BlogModal
            post={selectedPost}
            isOpen={!!selectedPost}
            onClose={() => handlePostSelect(null)}
            blogContent={blogContent}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
