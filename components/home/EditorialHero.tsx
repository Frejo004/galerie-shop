'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowDownRight } from 'lucide-react'
import { useRef } from 'react'

const TEXT_MARQUEE = ['Œuvres Originales', 'Tirages Fine Art', 'Art Contemporain', 'Éditions Limitées', 'Certificat d\'Authenticité']

export default function EditorialHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y         = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity   = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden bg-[hsl(40,15%,96%)]">

      {/* ── Fond décoratif ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cercle ambre flottant */}
        <div className="absolute top-1/4 right-[8%] w-[340px] h-[340px] rounded-full"
             style={{ background: 'radial-gradient(circle, hsl(28 90% 55% / 0.12) 0%, transparent 70%)' }} />
        {/* Cercle sombre gauche */}
        <div className="absolute bottom-1/3 left-[5%] w-[260px] h-[260px] rounded-full"
             style={{ background: 'radial-gradient(circle, hsl(24 10% 8% / 0.06) 0%, transparent 70%)' }} />
        <div className="grain-overlay" style={{ opacity: 0.04 }} />
      </div>

      {/* ── Contenu principal ──────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-32 pb-20 max-w-6xl mx-auto w-full"
      >
        {/* Label pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[hsl(40,8%,82%)] bg-white/60 backdrop-blur-sm text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-[hsl(24,5%,40%)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(28,90%,55%)] animate-pulse" />
          Galerie d'art contemporain · Paris
        </motion.div>

        {/* Titre éditorial */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3rem,10vw,8rem)] font-light leading-[1.0] tracking-tight text-[hsl(24,10%,8%)]"
          >
            L'art qui{' '}
            <em className="italic" style={{ color: 'hsl(28 90% 50%)' }}>vous touche</em>
            {' '}—
            <br className="hidden sm:block" />
            <span className="font-sans font-bold">directement</span> chez vous.
          </motion.h1>
        </div>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-lg text-sm sm:text-base text-[hsl(24,5%,44%)] leading-relaxed mb-10"
        >
          Nous sélectionnons des œuvres originales et des tirages d'art de qualité muséale,
          pour les collectionneurs qui savent ce qu'ils cherchent.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-16"
        >
          <Link href="/galerie" className="btn-primary group">
            Explorer la galerie
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/about" className="btn-ghost">
            Notre approche
          </Link>
        </motion.div>

        {/* Social proof row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-6 text-[0.65rem] font-medium tracking-[0.1em] uppercase text-[hsl(24,5%,50%)]"
        >
          {['Œuvres authentifiées', 'Livraison sécurisée', 'Certificat inclus', 'Paiement sécurisé'].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[hsl(28,90%,55%)]" />
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Floating stat cards ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute right-8 top-1/3 hidden xl:flex flex-col gap-3"
      >
        {[
          { number: '180+', label: 'Œuvres' },
          { number: '12', label: 'Artistes' },
          { number: '98%', label: 'Satisfaction' },
        ].map(({ number, label }) => (
          <div key={label} className="glass rounded-2xl px-5 py-4 text-right shadow-sm">
            <p className="font-serif text-2xl font-light text-[hsl(24,10%,8%)]">{number}</p>
            <p className="text-[0.65rem] tracking-[0.12em] uppercase text-[hsl(24,5%,50%)]">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="relative z-10 pb-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-[hsl(24,5%,50%)] to-transparent"
        />
        <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[hsl(24,5%,50%)]">Découvrir</span>
      </motion.div>

      {/* ── Marquee strip ───────────────────────────────────── */}
      <div className="border-t border-[hsl(40,8%,86%)] py-4 overflow-hidden">
        <div className="marquee-wrap">
          <div className="marquee-inner">
            {[...TEXT_MARQUEE, ...TEXT_MARQUEE].map((t, i) => (
              <span key={i} className="text-[0.65rem] tracking-[0.18em] uppercase text-[hsl(24,5%,48%)] flex items-center gap-3">
                {t} <span className="text-[hsl(28,90%,55%)] text-base leading-none">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
