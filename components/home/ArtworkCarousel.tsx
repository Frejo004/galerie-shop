'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'

interface Artwork {
  _id: string
  title: string
  slug: { current: string }
  type: 'original' | 'derivative'
  support: string
  price: number
  currency?: string
  images: any[]
}

interface Props {
  artworks: Artwork[]
}

export default function ArtworkCarousel({ artworks }: Props) {
  const [index, setIndex] = useState(0)

  if (!artworks?.length) return null

  const next = () => setIndex((prev) => (prev + 1) % artworks.length)
  const prev = () => setIndex((prev) => (prev - 1 + artworks.length) % artworks.length)
  const getIndex = (offset: number) => (index + offset + artworks.length) % artworks.length
  const activeArt = artworks[index]

  return (
    <div className="w-full flex flex-col gap-10">

      {/* Carousel */}
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          {[-1, 0, 1].map((offset) => {
            const art = artworks[getIndex(offset)]
            if (!art) return null
            const isActive = offset === 0

            return (
              <motion.div
                key={`${art._id}-${offset}`}
                animate={{
                  x: offset * (isActive ? 0 : 260),
                  scale: isActive ? 1 : 0.78,
                  opacity: isActive ? 1 : 0.45,
                  zIndex: isActive ? 10 : 5,
                  filter: isActive ? 'blur(0px)' : 'blur(1.5px)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="absolute w-[200px] sm:w-[260px] md:w-[320px] aspect-[3/4] overflow-hidden bg-muted cursor-pointer shadow-lg"
                onClick={() => {
                  if (offset === 1) next()
                  if (offset === -1) prev()
                }}
              >
                <Link href={`/artwork/${art.slug.current}`} className="block w-full h-full relative">
                  {art.images?.[0] ? (
                    <Image
                      src={urlForImage(art.images[0]).url()}
                      alt={art.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="font-serif italic text-sm text-muted-foreground/50">
                        {art.title}
                      </span>
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Info + contrôles */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-2">

        {/* Info œuvre active */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArt._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-center sm:text-left space-y-1"
          >
            <h2 className="font-serif text-xl sm:text-2xl font-light text-foreground">
              {activeArt.title}
            </h2>
            <p className="text-xs text-muted-foreground tracking-wide">
              {activeArt.type === 'original' ? 'Pièce unique' : 'Édition limitée'} — {activeArt.price.toLocaleString('fr-FR')} {activeArt.currency || '€'}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Contrôles */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={prev}
            className="w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200"
            aria-label="Précédent"
          >
            <ArrowLeft strokeWidth={1.5} className="w-4 h-4" />
          </button>

          <div className="flex gap-1.5">
            {artworks.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-px transition-all duration-400 ${i === index ? 'w-8 bg-foreground' : 'w-3 bg-border'}`}
                aria-label={`Aller à l'œuvre ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200"
            aria-label="Suivant"
          >
            <ArrowRight strokeWidth={1.5} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
