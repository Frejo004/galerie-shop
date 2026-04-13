export type ArtworkSupport = 'huile' | 'acrylique' | 'mixte' | 'papier' | 'numerique'
export type ArtworkType = 'original' | 'derivative'

export interface ArtworkFormat {
  width: number
  height: number
  unit: string
}

export interface Artwork {
  _id: string
  title: string
  slug: { current: string }
  type: ArtworkType
  support: ArtworkSupport
  year: string
  price: number
  currency: string
  images: SanityImage[]
  collection?: string
  format?: ArtworkFormat
  story?: unknown[]
  inStock?: boolean
  stripeProductId?: string
}

export interface SanityImage {
  _key?: string
  asset: { _ref: string; _type: string }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  tags?: string[]
  author?: string
  teaser?: string
}

export interface CartItem {
  id: string
  title: string
  price: number
  currency: string
  image?: string
  quantity: number
  type: ArtworkType
  support?: string
}
