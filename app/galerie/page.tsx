import MasonryGrid from '@/components/gallery/MasonryGrid'
import GalleryFilters from '@/components/gallery/GalleryFilters'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export const metadata = {
  title: 'Galerie • Oeuvres d\'art originales et tirages',
  description: 'Explorez la collection complète d\'oeuvres d\'art de la GALERIE. Filtrez par collection, format et support.',
}

const MOCK_ARTWORKS = [
  {
    _id: 'mock1', title: 'Éveil du Silence No. 1', slug: { current: 'mock-1' }, type: 'original', support: 'Huile sur Toile', year: '2024', price: 4200, currency: '€', images: []
  },
  {
    _id: 'mock2', title: 'Texture Urbaine (Étude)', slug: { current: 'mock-2' }, type: 'derivative', support: 'Tirage Fine Art', year: '2023', price: 350, currency: '€', images: []
  },
  {
    _id: 'mock3', title: 'Fragment de Mémoire', slug: { current: 'mock-3' }, type: 'original', support: 'Technique Mixte', year: '2024', price: 2800, currency: '€', images: []
  },
  {
    _id: 'mock4', title: 'Silence Éphémère', slug: { current: 'mock-4' }, type: 'original', support: 'Acrylique sur Toile', year: '2024', price: 3100, currency: '€', images: []
  }
]

import { projectId } from "@/sanity/env"

async function getArtworks() {
  if (projectId === 'dummy-project-id') {
     return MOCK_ARTWORKS;
  }

  try {
    const data = await client.fetch(
      groq`*[_type == "artwork"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        type,
        support,
        year,
        price,
        currency,
        images
      }`
    )
    return data?.length > 0 ? data : MOCK_ARTWORKS
  } catch (err) {
    console.error('Sanity fetch error:', err)
    return MOCK_ARTWORKS 
  }
}

export default async function GaleriePage() {
  const artworks = await getArtworks()

  return (
    <div className="pt-32 pb-40 max-w-7xl mx-auto px-6 lg:px-12 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,_rgba(209,176,107,0.03)_0%,_transparent_70%)] pointer-events-none -z-10" />
      
      <div className="flex flex-col items-center mb-16 text-center">
        <h1 className="font-serif text-5xl md:text-8xl font-light tracking-[-0.05em] text-white uppercase mb-8 leading-none">
          LA <span className="italic font-normal text-primary">GALERIE</span>
        </h1>
        <p className="max-w-2xl text-muted-foreground text-[10px] uppercase tracking-[0.5em] leading-relaxed opacity-50">
          Exploration des textures brutales et du minimalisme cinématique.
        </p>
      </div>


      <GalleryFilters />

      <MasonryGrid artworks={artworks} />
    </div>
  )
}

