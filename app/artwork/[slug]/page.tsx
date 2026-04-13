import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { urlForImage } from '@/sanity/lib/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArtworkPresentation from './ArtworkPresentation'
import { projectId } from '@/sanity/env'
import { MOCK_ARTWORK_DETAIL } from '@/lib/mock-data'
import type { Artwork } from '@/lib/types'

type Props = { params: Promise<{ slug: string }> }

async function getArtwork(slug: string): Promise<Artwork | null> {
  if (projectId === 'dummy-project-id' || slug.startsWith('mock-')) {
    return MOCK_ARTWORK_DETAIL[slug] ?? MOCK_ARTWORK_DETAIL['mock-1']
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
  const { slug } = await params
  const artwork = await getArtwork(slug)
  if (!artwork) return {}

  const imageUrl = artwork.images?.[0]
    ? urlForImage(artwork.images[0]).width(1200).height(630).url()
    : ''

  return {
    title: `${artwork.title} (${artwork.year})`,
    description: `Oeuvre d'art : ${artwork.title}. Support : ${artwork.support}. Par GALERIE.`,
    openGraph: { images: imageUrl ? [imageUrl] : [] },
  }
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params
  const artwork = await getArtwork(slug)
  if (!artwork) notFound()

  return (
    <div className="pt-32 pb-40 min-h-screen">
      <ArtworkPresentation artwork={artwork} />
    </div>
  )
}
