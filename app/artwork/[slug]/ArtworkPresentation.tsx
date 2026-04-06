'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { useCart } from '@/lib/cart-store'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { PortableText } from '@portabletext/react'
import { Check, ShoppingBag, ArrowRight, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  artwork: any
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
    setTimeout(() => setIsAdding(false), 2000)
  }

  const currentImage = artwork.images?.[selectedImage]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

        {/* ── Images ─────────────────────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col gap-4">

          {/* Image principale */}
          <div className="relative aspect-[4/5] bg-muted overflow-hidden">
            {currentImage ? (
              <Zoom>
                <Image
                  src={urlForImage(currentImage).url()}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  priority
                />
              </Zoom>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif italic text-muted-foreground/40">
                  {artwork.title}
                </span>
              </div>
            )}
            <span className="absolute bottom-4 right-4 text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60 pointer-events-none">
              Cliquer pour zoomer
            </span>
          </div>

          {/* Thumbnails */}
          {artwork.images?.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {artwork.images.map((img: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    'relative w-14 sm:w-16 aspect-[3/4] overflow-hidden border transition-all duration-300',
                    selectedImage === idx ? 'border-foreground' : 'border-border opacity-50 hover:opacity-100'
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

          {/* Détails éditoriaux */}
          <div className="mt-8 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { label: 'Processus', text: 'Recherche de l\'équilibre entre tension et silence.' },
              { label: 'Authenticité', text: 'Certificat signé par l\'artiste inclus.' },
              { label: 'Provenance', text: 'Directement issu de l\'atelier de l\'artiste.' },
            ].map(({ label, text }) => (
              <div key={label} className="space-y-2">
                <span className="label-category">{label}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Narration */}
          {artwork.story && (
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-serif text-2xl font-light mb-6 text-foreground">
                <em>La narration</em>
              </h3>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <PortableText value={artwork.story} />
              </div>
            </div>
          )}
        </div>

        {/* ── Infos & achat ──────────────────────────────────── */}
        <div className="lg:col-span-5 self-start lg:sticky lg:top-24 space-y-8">

          {/* Titre & prix */}
          <div className="space-y-4 pb-8 border-b border-border">
            <span className="label-category">{artwork.collection || 'Portfolio'} · {artwork.year}</span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-foreground">
              {artwork.title}
            </h1>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-light text-foreground">
                {artwork.price?.toLocaleString('fr-FR')} {artwork.currency}
              </span>
              <span className="text-xs text-muted-foreground">Financement disponible</span>
            </div>
          </div>

          {/* Caractéristiques */}
          <div className="space-y-0 divide-y divide-border">
            {[
              { label: 'Type', value: artwork.type === 'original' ? 'Pièce unique' : 'Édition limitée' },
              { label: 'Support', value: artwork.support },
              { label: 'Format', value: artwork.format || '—' },
              {
                label: 'Disponibilité',
                value: artwork.inStock ? 'Disponible' : 'Vendu',
                className: artwork.inStock ? 'text-green-700' : 'text-red-500',
              },
            ].map(({ label, value, className }) => (
              <div key={label} className="flex justify-between py-3.5 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className={cn('text-foreground font-medium', className)}>{value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={!artwork.inStock || isAdding}
              className={cn(
                'btn-primary w-full justify-center disabled:opacity-40',
                isAdding && 'bg-green-700 hover:bg-green-700'
              )}
            >
              {isAdding ? (
                <><Check className="w-4 h-4" /> Ajouté au panier</>
              ) : artwork.inStock ? (
                <><ShoppingBag strokeWidth={1.5} className="w-4 h-4" /> Acquérir l'œuvre</>
              ) : (
                'Indisponible'
              )}
            </button>

            <button className="btn-outline w-full justify-center">
              <Mail className="w-4 h-4" /> Demander des détails
            </button>
          </div>

          {/* Livraison */}
          <p className="text-xs text-muted-foreground leading-relaxed pt-2">
            Livraison sécurisée avec assurance via DHL/FedEx.<br />
            Expédié sous 5 jours ouvrés après confirmation.
          </p>
        </div>
      </div>
    </div>
  )
}
