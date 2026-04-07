'use client'

import ReactMasonry from 'react-masonry-css'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'
import { useFilter } from '@/lib/filter-store'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Props {
  artworks: any[]
}

const breakpointCols = { default: 3, 1100: 2, 640: 1 }

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

export default function MasonryGrid({ artworks }: Props) {
  const { type, support, searchQuery } = useFilter()

  const filtered = artworks?.filter((art) => {
    const matchType    = type === 'all' || art.type === type
    const matchSupport = support === 'all' || art.support === support
    const matchSearch =
      !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.support?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchType && matchSupport && matchSearch
  })

  if (!filtered?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-28 text-center border border-[hsl(40,8%,86%)] rounded-2xl bg-[hsl(40,10%,97%)]"
      >
        <p className="text-sm text-[hsl(24,5%,50%)] mb-5">Aucune œuvre ne correspond à vos critères.</p>
        <button
          onClick={() => useFilter.getState().reset()}
          className="text-xs tracking-[0.08em] uppercase font-medium underline underline-offset-4 text-[hsl(24,5%,50%)] hover:text-[hsl(24,10%,8%)] transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </motion.div>
    )
  }

  return (
    <ReactMasonry
      breakpointCols={breakpointCols}
      className="flex -ml-6 w-auto"
      columnClassName="pl-6 bg-clip-padding"
    >
      {filtered.map((art, i) => (
        <motion.div
          key={art._id}
          className="mb-6 group"
          custom={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Link href={`/artwork/${art.slug.current}`} className="block">

            {/* Image */}
            <div className="relative overflow-hidden rounded-xl bg-[hsl(40,10%,92%)]"
                 style={{ aspectRatio: i % 3 === 1 ? '4/5' : '3/4' }}>
              {art.images?.[0] ? (
                <Image
                  src={urlForImage(art.images[0]).url()}
                  alt={art.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-serif italic text-sm text-[hsl(24,5%,55%)]">
                    {art.title}
                  </span>
                </div>
              )}

              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-[hsl(24,10%,8%)] opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500" />

              {/* Badge type */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2.5 py-1 rounded-full text-[0.6rem] font-semibold tracking-[0.1em] uppercase bg-white/90 backdrop-blur-sm text-[hsl(24,10%,8%)]">
                  {art.type === 'original' ? 'Pièce unique' : 'Édition limitée'}
                </span>
              </div>

              {/* Flèche coin bas-droit */}
              <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 text-[hsl(24,10%,8%)]" />
              </div>
            </div>

            {/* Infos */}
            <div className="mt-4 flex justify-between items-start px-0.5">
              <div className="space-y-1 min-w-0">
                <h3 className="font-serif text-base font-light text-[hsl(24,10%,8%)] group-hover:text-[hsl(28,90%,50%)] transition-colors truncate">
                  {art.title}
                </h3>
                <p className="text-[0.7rem] text-[hsl(24,5%,52%)] tracking-wide">
                  {art.support} · {art.year}
                </p>
              </div>
              <p className="text-sm font-medium text-[hsl(24,10%,8%)] shrink-0 ml-4">
                {art.price?.toLocaleString('fr-FR')} {art.currency}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </ReactMasonry>
  )
}
