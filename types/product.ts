export interface Product {
  name: string
  category: string
  description: string
}

export interface NutritionalInfo {
  ingredients: string
  allergens: string[]
  glycemicIndex: string
  healthBenefits: string[]
  notes?: string[]
}
