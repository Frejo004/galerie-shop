'use client'

import ReactMasonry from 'react-masonry-css'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'
import { useFilter } from '@/lib/filter-store'

interface Props {
  artworks: any[]
}

const breakpointCols = { default: 3, 1024: 2, 640: 1 }

export default function MasonryGrid({ artworks }: Props) {
  const { type, support, searchQuery } = useFilter()

  const filtered = artworks?.filter((art) => {
    const matchType = type === 'all' || art.type === type
    const matchSupport = support === 'all' || art.support === support
    const matchSearch =
      !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.support.toLowerCase().includes(searchQuery.toLowerCase())
    return matchType && matchSupport && matchSearch
  })

  if (!filtered?.length) {
    return (
      <div className="py-24 text-center border border-border">
        <p className="text-sm text-muted-foreground mb-4">Aucune œuvre ne correspond à vos critères.</p>
        <button
          onClick={() => useFilter.getState().reset()}
          className="text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>
    )
  }

  return (
    <ReactMasonry
      breakpointCols={breakpointCols}
      className="flex -ml-6 w-auto"
      columnClassName="pl-6 bg-clip-padding"
    >
      {filtered.map((art) => (
        <div key={art._id} className="mb-6 group">
          <Link href={`/artwork/${art.slug.current}`} className="block">

            <div className="artwork-card relative overflow-hidden bg-muted">
              <div className="aspect-[3/4] relative">
                {art.images?.[0] ? (
                  <Image
                    src={urlForImage(art.images[0]).url()}
                    alt={art.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="font-serif italic text-sm text-muted-foreground/40">
                      {art.title}
                    </span>
                  </div>
                )}

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
              </div>
            </div>

            <div className="mt-4 flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-serif text-base font-light text-foreground group-hover:text-primary transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-muted-foreground tracking-wide">
                  {art.support} · {art.year}
                </p>
              </div>
              <p className="text-sm text-muted-foreground shrink-0 ml-4">
                {art.price?.toLocaleString('fr-FR')} {art.currency}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </ReactMasonry>
  )
}
