import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArtworkPresentation from './ArtworkPresentation'
import { projectId } from '@/sanity/env'

interface Props {
  params: { slug: string }
}

const MOCK_DATA: Record<string, any> = {
  'mock-1': { _id: 'mock1', title: 'Éveil du Silence No. 1', slug: { current: 'mock-1' }, year: '2024', type: 'original', support: 'Huile sur Toile', price: 4200, currency: '€', images: [], inStock: true },
  'mock-2': { _id: 'mock2', title: 'Texture Urbaine (Étude)', slug: { current: 'mock-2' }, year: '2023', type: 'derivative', support: 'Tirage Fine Art', price: 350, currency: '€', images: [], inStock: true },
}

async function getArtwork(slug: string) {
  if (projectId === 'dummy-project-id' || slug.startsWith('mock-')) {
     return MOCK_DATA[slug] || MOCK_DATA['mock-1'];
  }

  try {
    return await client.fetch(
      groq`*[_type == "artwork" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        year,
        "collection": collection->name,
        images,
        type,
        format,
        support,
        price,
        currency,
        story,
        inStock,
        stripeProductId
      }`,
      { slug }
    )
  } catch (err) {
    console.error('Sanity fetch error:', err)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artwork = await getArtwork(params.slug)
  if (!artwork) return {}

  const imageUrl = artwork.images?.[0] ? urlForImage(artwork.images[0]).width(1200).height(630).url() : ''

  return {
    title: `${artwork.title} (${artwork.year})`,
    description: `Oeuvre d'art : ${artwork.title}. Support : ${artwork.support}. Par GALERIE.`,
    openGraph: {
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function ArtworkPage({ params }: Props) {
  const artwork = await getArtwork(params.slug)
  if (!artwork) notFound()

  return (
    <div className="pt-32 pb-40 min-h-screen">
      <ArtworkPresentation artwork={artwork} />
    </div>
  )
}
