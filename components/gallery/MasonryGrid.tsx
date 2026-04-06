'use client'

import ReactMasonry from 'react-masonry-css'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'
import { useFilter } from '@/lib/filter-store'

interface Props {
  artworks: any[]
}

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1
}

export default function MasonryGrid({ artworks }: Props) {
  const { type, support, searchQuery } = useFilter()

  const filteredArtworks = artworks?.filter((art) => {
    const matchType = type === 'all' || art.type === type
    const matchSupport = support === 'all' || art.support === support
    const matchSearch = 
      !searchQuery || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.support.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchType && matchSupport && matchSearch
  })

  if (!filteredArtworks?.length) {
    return (
      <div className="py-20 text-center text-white/30 text-xs uppercase tracking-widest min-h-[400px] flex flex-col items-center justify-center border border-white/5 bg-[#0a0a0a]">
        <p>Aucune œuvre ne correspond à vos critères.</p>
        <button 
          onClick={() => useFilter.getState().reset()}
          className="mt-6 text-primary hover:text-white transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>
    )
  }

  return (
    <ReactMasonry
      breakpointCols={breakpointColumnsObj}
      className="flex -ml-8 w-auto px-4 lg:px-0"
      columnClassName="pl-8 bg-clip-padding"
    >
      {filteredArtworks.map((art) => (

        <div key={art._id} className="mb-8 group">
          <Link href={`/artwork/${art.slug.current}`}>
            <div className="relative aspect-[3/4] bg-[#0d0d0d] border border-white/5 overflow-hidden transition-all duration-700 ease-in-out group-hover:scale-[1.02]">
              {art.images?.[0] ? (
                <Image
                  src={urlForImage(art.images[0]).url()}
                  alt={art.title}
                  fill
                  className="object-cover transition-opacity duration-700 group-hover:opacity-80"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(209,176,107,0.05)_0%,_transparent_70%)]">
                   <div className="text-[10px] tracking-[0.5em] text-primary/40 uppercase font-black opacity-20">GALERIE</div>
                </div>
              )}

              
              {/* Overlay on hover */}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <p className="text-[10px] tracking-[0.3em] text-primary uppercase mb-2">{art.type === 'original' ? 'Original' : 'Tirage D\'Art'}</p>
                <h3 className="font-serif text-xl font-light text-white">{art.title}</h3>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-start">
              <div>
                <h4 className="font-serif text-lg font-light group-hover:text-primary transition-colors">{art.title}</h4>
                <p className="text-[10px] tracking-widest text-white/30 uppercase mt-1">
                  {art.support} — {art.year}
                </p>
              </div>
              <p className="font-sans text-xs tracking-widest text-white/50 uppercase">
                {art.price} {art.currency}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </ReactMasonry>
  )
}
