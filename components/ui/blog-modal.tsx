"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, Clock, User, Share2, Heart } from "lucide-react"
import Image from "next/image"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  author: string
  content?: string
  tags: string[]
  image: string
}

interface BlogModalProps {
  post: BlogPost | null
  isOpen: boolean
  onClose: () => void
  blogContent: Record<string, string> // Added this prop
}

export function BlogModal({ post, isOpen, onClose, blogContent }: BlogModalProps) {
  // Destructure blogContent
  if (!post) return null

  const content = blogContent[post.id] || `<p class="text-stone-700">Content coming soon...</p>`

  const handleBackdropClick = () => {
    onClose()
  }

  const handleModalClick = (event: React.MouseEvent) => {
    if (event && event.stopPropagation) {
      event.stopPropagation()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={handleModalClick}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 p-6 z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <Badge className="bg-amber-600 text-white mb-3">{post.category}</Badge>
                  <h1 className="text-2xl md:text-3xl font-serif text-stone-800 mb-4 leading-tight">{post.title}</h1>

                  <div className="flex flex-wrap items-center text-stone-600 text-sm gap-4 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {post.author}
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="p-6">
                {/* Featured Image */}
                <div className="aspect-[16/9] rounded-xl mb-8 overflow-hidden relative bg-stone-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse" />
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover relative z-10"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAAcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    quality={85}
                    onLoad={(event) => {
                      if (event && event.target) {
                        const target = event.target as HTMLImageElement
                        target.style.opacity = "1"
                      }
                    }}
                    style={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
                  />
                </div>

                {/* Article Content */}
                <div
                  className="prose prose-lg prose-stone max-w-none
                    prose-headings:font-serif prose-headings:text-stone-800
                    prose-p:text-stone-700 prose-p:leading-relaxed
                    prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-amber-600 prose-blockquote:bg-amber-50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg
                    prose-ul:text-stone-700 prose-ol:text-stone-700
                    prose-strong:text-stone-800
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-stone-200">
                  <h3 className="text-lg font-semibold text-stone-800 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {(post.tags || []).map((tag, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
                        >
                          #{tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-8 pt-8 border-t border-stone-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-stone-800">Share this story</h3>
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-amber-100 hover:text-amber-600 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
