import MasonryGrid from '@/components/gallery/MasonryGrid'
import GalleryFilters from '@/components/gallery/GalleryFilters'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { projectId } from '@/sanity/env'

export const metadata = {
  title: 'Galerie · Œuvres originales et tirages',
  description: 'Explorez la collection complète d\'œuvres de la GALERIE.',
}

const MOCK_ARTWORKS = [
  { _id: 'mock1', title: 'Éveil du Silence No. 1', slug: { current: 'mock-1' }, type: 'original', support: 'Huile sur Toile', year: '2024', price: 4200, currency: '€', images: [] },
  { _id: 'mock2', title: 'Texture Urbaine', slug: { current: 'mock-2' }, type: 'derivative', support: 'Tirage Fine Art', year: '2023', price: 350, currency: '€', images: [] },
  { _id: 'mock3', title: 'Fragment de Mémoire', slug: { current: 'mock-3' }, type: 'original', support: 'Technique Mixte', year: '2024', price: 2800, currency: '€', images: [] },
  { _id: 'mock4', title: 'Silence Éphémère', slug: { current: 'mock-4' }, type: 'original', support: 'Acrylique sur Toile', year: '2024', price: 3100, currency: '€', images: [] },
]

async function getArtworks() {
  if (projectId === 'dummy-project-id') return MOCK_ARTWORKS
  try {
    const data = await client.fetch(
      groq`*[_type == "artwork"] | order(_createdAt desc) {
        _id, title, slug, type, support, year, price, currency, images
      }`
    )
    return data?.length > 0 ? data : MOCK_ARTWORKS
  } catch {
    return MOCK_ARTWORKS
  }
}

export default async function GaleriePage() {
  const artworks = await getArtworks()

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

      {/* En-tête */}
      <div className="mb-16 sm:mb-20 border-b border-border pb-10">
        <span className="label-category block mb-4">Collection</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-foreground">
          La <em className="text-primary">Galerie</em>
        </h1>
      </div>

      <GalleryFilters />
      <MasonryGrid artworks={artworks} />
    </div>
  )
}
