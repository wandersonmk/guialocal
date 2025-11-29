export interface Store {
  id: string
  name: string
  slug: string
  category: string
  categorySlug: string
  description: string
  logo: string
  coverImage: string
  images: string[]
  videoUrl?: string
  address: string
  city: string
  latitude: number
  longitude: number
  phone: string
  whatsapp: string
  instagram?: string
  website?: string
  openNow: boolean
  openHours: string
  hasDelivery: boolean
  hasPickup: boolean
  rating: number
  reviewCount: number
  distance?: number
  products: Product[]
  promotions: Promotion[]
  isFavorite?: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
}

export interface Promotion {
  id: string
  title: string
  description: string
  discount: string
  validUntil: string
  image: string
  couponCode?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
}

export interface Banner {
  id: string
  title: string
  subtitle: string
  image: string
  link: string
}
