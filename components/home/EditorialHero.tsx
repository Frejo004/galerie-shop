'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function EditorialHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden">

      {/* Glow décoratif bas */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[200px] h-[200px] bg-violet-400/15 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">

        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="label-category animate-fade-up"
        >
          Galerie d'art contemporain
        </motion.span>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-foreground"
        >
          L'art qui{' '}
          <em className="font-serif font-normal italic text-primary not-italic" style={{ fontStyle: 'italic' }}>
            vous touche
          </em>
          .{' '}
          <br className="hidden sm:block" />
          Directement chez vous.
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          Nous sélectionnons des œuvres originales et des tirages d'art de qualité muséale —
          pour les collectionneurs qui savent ce qu'ils cherchent.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
        >
          <Link href="/galerie" className="btn-primary text-base px-6 py-3">
            Explorer la galerie <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/about" className="btn-ghost text-base px-6 py-3">
            Notre approche
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-muted-foreground mt-2"
        >
          Œuvres authentifiées · Livraison sécurisée · Certificat d'authenticité inclus
        </motion.p>
      </div>
    </section>
  )
}
