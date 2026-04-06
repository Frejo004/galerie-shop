'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ArtworkCarousel from './ArtworkCarousel'
import { ArrowDown } from 'lucide-react'

interface Props {
  artworks: any[]
}

export default function EditorialHero({ artworks }: Props) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden bg-background">

      {/* Ligne décorative verticale */}
      <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 h-32 w-px bg-border hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">

        {/* Titre éditorial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 max-w-2xl"
        >
          <span className="label-category block mb-4">Collection 2024</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-foreground">
            L'art comme<br />
            <em className="text-primary">langage premier</em>
          </h1>
          <div className="divider mt-8" />
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArtworkCarousel artworks={artworks} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Défiler</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.div>
    </section>
  )
}
