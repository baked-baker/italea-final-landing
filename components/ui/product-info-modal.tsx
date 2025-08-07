"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Info, Utensils, WheatOff, Heart, BookOpen } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import type { Product, NutritionalInfo } from "@/types/product"

interface ProductInfoModalProps {
  product: Product | null
  nutritionalInfo: NutritionalInfo | null
  isOpen: boolean
  onClose: () => void
}

export function ProductInfoModal({ product, nutritionalInfo, isOpen, onClose }: ProductInfoModalProps) {
  if (!isOpen || !product) return null

  const handleBackdropClick = () => {
    onClose()
  }

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
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
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={handleModalClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 p-6 z-10 flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h2
                  id="product-modal-title"
                  className="text-2xl md:text-3xl font-serif text-stone-800 mb-2 leading-tight"
                >
                  {product.name}
                </h2>
                <p className="text-stone-600 text-sm" dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>

              <motion.button
                onClick={onClose}
                className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close product information"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6 flex-grow">
              {nutritionalInfo ? (
                <div className="space-y-6 text-stone-700">
                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-stone-800 mb-3">
                      <Utensils className="w-5 h-5 mr-2 text-amber-600" aria-hidden="true" />
                      Ingredients
                    </h3>
                    <p>{nutritionalInfo.ingredients}</p>
                  </div>

                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-stone-800 mb-3">
                      <WheatOff className="w-5 h-5 mr-2 text-amber-600" aria-hidden="true" />
                      Allergens
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {nutritionalInfo.allergens.length > 0 ? (
                        nutritionalInfo.allergens.map((allergen, index) => (
                          <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                            {allergen}
                          </Badge>
                        ))
                      ) : (
                        <p>None specified</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-stone-800 mb-3">
                      <Info className="w-5 h-5 mr-2 text-amber-600" aria-hidden="true" />
                      Glycemic Index
                    </h3>
                    <p>{nutritionalInfo.glycemicIndex}</p>
                  </div>

                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-stone-800 mb-3">
                      <Heart className="w-5 h-5 mr-2 text-amber-600" aria-hidden="true" />
                      Health Benefits
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {nutritionalInfo.healthBenefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  {nutritionalInfo.notes && nutritionalInfo.notes.length > 0 && (
                    <div>
                      <h3 className="flex items-center text-lg font-semibold text-stone-800 mb-3">
                        <BookOpen className="w-5 h-5 mr-2 text-amber-600" aria-hidden="true" />
                        Important Notes
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-stone-600">
                        {nutritionalInfo.notes.map((note, index) => (
                          <li key={index}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    <p className="font-semibold mb-2">Safety & Medical Disclaimer:</p>
                    <p>
                      Always check individual ingredient labels and consult healthcare providers for specific dietary
                      needs or medical conditions. This information is for educational purposes and should not replace
                      professional medical advice.
                    </p>
                    <p className="mt-2">
                      <strong>Allergen Note:</strong> Cross-contamination may occur during preparation. Those with
                      severe allergies should exercise caution and verify all ingredients.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-stone-600">
                  <Info className="w-12 h-12 mx-auto mb-4 text-stone-400" aria-hidden="true" />
                  <p className="text-lg">Nutritional information not available for this product.</p>
                  <p className="text-sm mt-2">Please contact us for more details.</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
