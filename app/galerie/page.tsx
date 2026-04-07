import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import MasonryGrid from '@/components/gallery/MasonryGrid'
import GalleryFilters from '@/components/gallery/GalleryFilters'
import { projectId } from '@/sanity/env'

export const metadata = {
  title: 'Galerie · Œuvres originales et tirages',
  description: 'Explorez la collection complète d\'œuvres de la GALERIE.',
}

const MOCK_ARTWORKS = [
  { _id: 'mock1', title: 'Éveil du Silence No. 1', slug: { current: 'mock-1' }, type: 'original',    support: 'Huile sur Toile',         year: '2024', price: 4200, currency: '€', images: [] },
  { _id: 'mock2', title: 'Texture Urbaine',         slug: { current: 'mock-2' }, type: 'derivative', support: 'Tirage Fine Art',         year: '2023', price: 350,  currency: '€', images: [] },
  { _id: 'mock3', title: 'Fragment de Mémoire',     slug: { current: 'mock-3' }, type: 'original',    support: 'Technique Mixte',        year: '2024', price: 2800, currency: '€', images: [] },
  { _id: 'mock4', title: 'Silence Éphémère',        slug: { current: 'mock-4' }, type: 'original',    support: 'Acrylique sur Toile',    year: '2024', price: 3100, currency: '€', images: [] },
  { _id: 'mock5', title: 'Lumière Intérieure',      slug: { current: 'mock-5' }, type: 'derivative', support: 'Tirage Fine Art',         year: '2023', price: 420,  currency: '€', images: [] },
  { _id: 'mock6', title: 'Géographie du Vide',      slug: { current: 'mock-6' }, type: 'original',    support: 'Huile sur Toile',         year: '2023', price: 5800, currency: '€', images: [] },
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
    <div className="min-h-screen bg-[hsl(40,15%,96%)]">

      {/* ── En-tête ─────────────────────────────────────────── */}
      <div className="pt-36 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="border-b border-[hsl(40,8%,86%)] pb-12 mb-12">
          <span className="label-category block mb-4 animate-fade-up">Collection</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1 className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-light tracking-tight text-[hsl(24,10%,8%)] leading-[1.0] animate-fade-up animate-fade-up-1">
              La <em className="italic text-[hsl(28,90%,50%)]">Galerie</em>
            </h1>
            <p className="text-sm text-[hsl(24,5%,46%)] max-w-xs leading-relaxed animate-fade-up animate-fade-up-2">
              {artworks.length} œuvres disponibles — <br className="hidden sm:block" />
              originaux et éditions limitées
            </p>
          </div>
        </div>

        <GalleryFilters />
        <MasonryGrid artworks={artworks} />
      </div>
    </div>
  )
}
