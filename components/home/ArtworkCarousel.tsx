'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'

interface Props {
  artworks: any[]
}

export default function ArtworkCarousel({ artworks }: Props) {
  const [index, setIndex] = useState(0)

  if (!artworks || artworks.length === 0) return null

  const next = () => setIndex((prev) => (prev + 1) % artworks.length)
  const prev = () => setIndex((prev) => (prev - 1 + artworks.length) % artworks.length)

  const activeArt = artworks[index]

  // Indices for neighbors
  const getIndex = (offset: number) => (index + offset + artworks.length) % artworks.length

  return (
    <div className="w-full flex flex-col items-center">
      {/* Carousel Wrapper */}
      <div className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] flex items-center justify-center overflow-hidden px-4">
        <AnimatePresence mode="popLayout">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const artIndex = getIndex(offset)
            const art = artworks[artIndex]
            if (!art) return null

            const isActive = offset === 0
            const isNear = Math.abs(offset) === 1

            return (
              <motion.div
                key={`${art._id}-${offset}`}
                initial={{ opacity: 0, x: offset * 100, scale: 0.5 }}
                animate={{
                  opacity: isActive ? 1 : isNear ? 0.35 : 0,
                  x: offset * (isActive ? 0 : isNear ? 220 : 400),
                  scale: isActive ? 1 : isNear ? 0.72 : 0.5,
                  zIndex: 10 - Math.abs(offset),
                  rotateY: offset * 20,
                  filter: isActive ? 'blur(0px)' : 'blur(2px)',
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="absolute w-[220px] sm:w-[280px] md:w-[380px] lg:w-[450px] aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white shadow-2xl border border-white/20 cursor-pointer"
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
                    <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex flex-col items-center justify-center p-8">
                       <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-black/5 rounded-[2rem]">
                          <span className="text-[10px] tracking-[0.5em] font-black text-black/20 uppercase font-serif italic">Edition</span>
                       </div>
                    </div>
                  )}
                  {/* Overlay for inactive */}
                  {!isActive && <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />}
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Info & Controls */}
      <div className="mt-8 md:mt-12 text-center space-y-6 max-w-lg px-6 w-full">
        <motion.div
          key={activeArt._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-black">
            {activeArt.title}
          </h2>
          <div className="flex flex-col gap-2">
             <p className="text-[10px] tracking-[0.4em] uppercase font-black text-black/40">
                {activeArt.type === 'original' ? 'Original' : 'Tirage Fine Art'} — {activeArt.price} {activeArt.currency || '€'}
             </p>
             <p className="text-xs text-black/60 leading-relaxed max-w-xs mx-auto">
                Accroche artistique explorant l'équilibre fragile entre la perception et la réalité matérielle.
             </p>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex gap-4 items-center justify-center mt-12">
           <button 
            onClick={prev}
            className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-xl shadow-black/5 group"
           >
              <ArrowLeft strokeWidth={1.5} className="w-5 h-5 group-active:scale-90 transition-transform" />
           </button>
           
           <div className="flex gap-2 mx-8">
              {artworks.map((_, i) => (
                <div 
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-primary shadow-sm shadow-primary/40' : 'w-1.5 bg-black/10'}`}
                />
              ))}
           </div>

           <button 
            onClick={next}
            className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-xl shadow-black/5 group"
           >
              <ArrowRight strokeWidth={1.5} className="w-5 h-5 group-active:scale-90 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  )
}
