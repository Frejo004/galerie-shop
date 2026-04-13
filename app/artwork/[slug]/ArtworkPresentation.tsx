'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { useCart } from '@/lib/cart-store'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { PortableText } from '@portabletext/react'
import { Check, ShoppingBag, Mail, ArrowLeft, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { Artwork } from '@/lib/types'

const SUPPORT_LABELS: Record<string, string> = {
  huile: 'Huile sur toile',
  acrylique: 'Acrylique sur toile',
  mixte: 'Technique mixte',
  papier: 'Papier Fine Art',
  numerique: 'Numérique',
}

interface Props {
  artwork: Artwork & { collection?: string; story?: unknown[] }
}

export default function ArtworkPresentation({ artwork }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCart((state) => state.addItem)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: artwork._id,
      title: artwork.title,
      price: artwork.price,
      currency: artwork.currency,
      image: artwork.images?.[0] ? urlForImage(artwork.images[0]).url() : undefined,
      quantity: 1,
      type: artwork.type,
      support: artwork.support,
    })
    setTimeout(() => setIsAdding(false), 2200)
  }

  const currentImage = artwork.images?.[selectedImage]

  return (
    <div className="min-h-screen bg-[hsl(40,15%,96%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-24">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center gap-3"
        >
          <Link
            href="/galerie"
            className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.1em] uppercase font-medium text-[hsl(24,5%,50%)] hover:text-[hsl(24,10%,8%)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Galerie
          </Link>
          <span className="text-[hsl(40,8%,78%)]">/</span>
          <span className="text-[0.7rem] tracking-[0.1em] uppercase font-medium text-[hsl(24,10%,8%)] truncate max-w-[200px]">
            {artwork.title}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* ── Images ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            {/* Image principale */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[hsl(40,10%,92%)] group">
              {currentImage ? (
                <Zoom>
                  <Image
                    src={urlForImage(currentImage).url()}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    priority
                  />
                </Zoom>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-serif italic text-2xl text-[hsl(24,5%,55%)]">
                    {artwork.title}
                  </span>
                </div>
              )}

              {/* Hint zoom */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-3 h-3 text-[hsl(24,10%,8%)]" />
                <span className="text-[0.6rem] font-medium tracking-[0.08em] uppercase text-[hsl(24,10%,8%)]">Zoomer</span>
              </div>
            </div>

            {/* Thumbnails */}
            {artwork.images?.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {artwork.images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      'relative w-14 sm:w-16 aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all duration-300',
                      selectedImage === idx
                        ? 'border-[hsl(28,90%,55%)] opacity-100'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    )}
                  >
                    <Image
                      src={urlForImage(img).width(120).url()}
                      alt={`Vue ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Blocs éditoriaux */}
            <div className="mt-4 pt-8 border-t border-[hsl(40,8%,86%)] grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { label: 'Processus',    text: 'Recherche de l\'équilibre entre tension et silence.' },
                { label: 'Authenticité', text: 'Certificat signé par l\'artiste inclus.' },
                { label: 'Provenance',   text: 'Directement issu de l\'atelier de l\'artiste.' },
              ].map(({ label, text }) => (
                <div key={label} className="space-y-2">
                  <span className="label-category">{label}</span>
                  <p className="text-sm text-[hsl(24,5%,48%)] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            {/* Narration */}
            {artwork.story && (
              <div className="mt-4 pt-8 border-t border-[hsl(40,8%,86%)]">
                <h3 className="font-serif text-2xl font-light mb-6 text-[hsl(24,10%,8%)]">
                  <em>La narration</em>
                </h3>
                <div className="prose prose-sm max-w-none text-[hsl(24,5%,48%)] leading-relaxed">
                  <PortableText value={artwork.story} />
                </div>
              </div>
            )}
          </motion.div>

          {/* ── Infos & achat ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 self-start lg:sticky lg:top-28 space-y-8"
          >
            {/* Titre & prix */}
            <div className="space-y-5 pb-8 border-b border-[hsl(40,8%,86%)]">
              <span className="label-category">
                {artwork.collection || 'Portfolio'} · {artwork.year}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-light leading-tight text-[hsl(24,10%,8%)]">
                {artwork.title}
              </h1>
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-3xl font-light text-[hsl(24,10%,8%)]">
                  {artwork.price?.toLocaleString('fr-FR')} {artwork.currency}
                </span>
                <span className="text-xs text-[hsl(24,5%,52%)] tracking-wide">Financement disponible</span>
              </div>
            </div>

            {/* Caractéristiques */}
            <div className="space-y-0 divide-y divide-[hsl(40,8%,88%)]">
              {[
                { label: 'Type',          value: artwork.type === 'original' ? 'Pièce unique' : 'Édition limitée' },
                { label: 'Support',       value: SUPPORT_LABELS[artwork.support] ?? artwork.support },
                { label: 'Format',        value: artwork.format || '—' },
                {
                  label: 'Disponibilité',
                  value: artwork.inStock ? 'Disponible' : 'Vendu',
                  className: artwork.inStock ? 'text-emerald-700' : 'text-red-500',
                },
              ].map(({ label, value, className }) => (
                <div key={label} className="flex justify-between py-3.5 text-sm">
                  <span className="text-[hsl(24,5%,50%)]">{label}</span>
                  <span className={cn('text-[hsl(24,10%,8%)] font-medium', className)}>{value}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!artwork.inStock || isAdding}
                className={cn(
                  'btn-primary w-full justify-center py-4 text-sm disabled:opacity-40 disabled:cursor-not-allowed',
                  isAdding && 'bg-emerald-800 hover:bg-emerald-800 border-emerald-800'
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isAdding ? (
                    <motion.span
                      key="adding"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Ajouté au panier
                    </motion.span>
                  ) : artwork.inStock ? (
                    <motion.span
                      key="buy"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag strokeWidth={1.5} className="w-4 h-4" />
                      Acquérir l'œuvre
                    </motion.span>
                  ) : (
                    <motion.span key="unavailable">Indisponible</motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button className="btn-outline w-full justify-center py-4 text-sm">
                <Mail className="w-4 h-4" /> Demander des détails
              </button>
            </div>

            {/* Livraison */}
            <div className="rounded-xl border border-[hsl(40,8%,86%)] p-5 space-y-3 bg-white/50">
              {[
                'Livraison sécurisée avec assurance (DHL/FedEx)',
                'Expédition sous 5 jours ouvrés',
                'Emballage museum professionnel',
                'Retour accepté sous 14 jours',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 text-[hsl(28,90%,55%)] shrink-0 mt-0.5" />
                  <p className="text-xs text-[hsl(24,5%,48%)] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
