'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { useCart } from '@/lib/cart-store'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { PortableText } from '@portabletext/react'
import { Check, ShoppingBag, ArrowRight, Share2, Info } from 'lucide-react'
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
      support: artwork.support
    })
    
    setTimeout(() => {
      setIsAdding(false)
    }, 2000)
  }

  const currentImage = artwork.images?.[selectedImage]

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 bg-[#f0f4f8]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Side: Images */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="relative aspect-[4/5] md:aspect-[5/6] bg-white rounded-[3rem] border border-black/5 overflow-hidden group shadow-2xl shadow-black/5">
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
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(209,176,107,0.1)_0%,_transparent_70%)] flex flex-col items-center justify-center">
                 <div className="text-[12px] tracking-[1em] text-black/10 uppercase font-black font-serif italic">Edition Limitée</div>
              </div>
            )}
            <div className="absolute top-8 left-8 text-[10px] tracking-[0.4em] uppercase text-black/40 pointer-events-none group-hover:opacity-0 transition-opacity">
              Zoom Détails • Artist View
            </div>
          </div>

          {/* Thumbnails */}
          {artwork.images?.length > 1 && (
            <div className="flex gap-4">
              {artwork.images.map((img: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "relative w-24 aspect-[4/5] rounded-2xl overflow-hidden border transition-all duration-500",
                    selectedImage === idx ? "border-primary scale-110 shadow-lg" : "border-black/5 opacity-40 hover:opacity-100"
                  )}
                >
                  <Image
                    src={urlForImage(img).width(200).url()}
                    alt={`${artwork.title} view ${idx}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Detailed Story Section */}
          <div className="mt-16 md:mt-24 space-y-12">
             <div className="border-t border-black/5 pt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-black/60 uppercase text-[10px] tracking-[0.3em] font-black">
                <div className="space-y-4">
                  <h4 className="text-primary">Processus</h4>
                  <p className="leading-relaxed opacity-60">
                    Recherche de l'équilibre entre tension et silence.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-primary">Authenticité</h4>
                  <p className="leading-relaxed opacity-60">
                    Certificat signé par l'artiste inclus.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-primary">Provenance</h4>
                  <p className="leading-relaxed opacity-60">
                    Directement issu de l'atelier de l'artiste.
                  </p>
                </div>
             </div>

             <div className="prose prose-sm max-w-none text-black/70 tracking-widest leading-loose">
                <h3 className="font-serif text-3xl font-bold text-black mb-8 italic">La Narration</h3>
                <PortableText value={artwork.story} />
             </div>
          </div>
        </div>

        {/* Right Side: Info & Purchase (Sticky) */}
        <div className="lg:col-span-4 self-start lg:sticky lg:top-32 space-y-12">
          
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] tracking-[0.5em] uppercase text-black/30 font-black">
                {artwork.collection || 'Portfolio'} • {artwork.year}
              </p>
              <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tighter text-black leading-tight uppercase opacity-80">
                {artwork.title}
              </h1>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="font-serif italic text-4xl text-primary">{artwork.price} {artwork.currency}</span>
              <span className="text-[9px] tracking-[0.3em] text-black/30 uppercase font-black">Financement Disponible</span>
            </div>
            
            <div className="h-px bg-black/5 w-full" />
          </div>

          <div className="space-y-4 text-[9px] tracking-[0.4em] uppercase font-black">
            <div className="flex justify-between py-4 border-b border-black/5">
              <span className="text-black/30">Type</span>
              <span className="text-black">{artwork.type === 'original' ? 'Pièce Unique' : 'Tirage Limité'}</span>
            </div>
            <div className="flex justify-between py-4 border-b border-black/5">
              <span className="text-black/30">Support</span>
              <span className="text-black">{artwork.support}</span>
            </div>
            <div className="flex justify-between py-4 border-b border-black/5">
              <span className="text-black/30">Disponibilité</span>
              <span className={cn(artwork.inStock ? "text-green-600" : "text-red-500")}>
                {artwork.inStock ? 'Disponible' : 'Vendu'}
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={!artwork.inStock || isAdding}
              className={cn(
                "w-full py-8 flex items-center justify-center gap-4 transition-all duration-700 uppercase text-[11px] font-black tracking-[0.4em] rounded-full shadow-xl",
                isAdding 
                  ? "bg-green-600 text-white shadow-green-200" 
                  : "bg-black text-white hover:bg-primary shadow-black/20"
              )}
            >
              {isAdding ? (
                <>
                  <Check className="w-4 h-4" /> Dans Votre Bag
                </>
              ) : artwork.inStock ? (
                <>
                  <ShoppingBag strokeWidth={1.5} className="w-5 h-5" /> Acquérir l'Œuvre
                </>
              ) : (
                'Indisponible'
              )}
            </button>
            <button className="w-full py-5 border border-black/5 bg-white text-black/50 hover:text-black hover:border-black transition-all uppercase text-[9px] tracking-[0.5em] font-black rounded-full flex items-center justify-center gap-2">
               <Info className="w-3 h-3" /> Demander Détails
            </button>
          </div>

          <div className="pt-20 text-[9px] tracking-[0.2em] leading-relaxed uppercase text-white/20">
            <p>Livraison sécurisée avec assurance incluse via DHL/FedEx.</p>
            <p className="mt-1">Expédié sous 5 jours ouvrés après confirmation.</p>
          </div>

        </div>
      </div>
    </div>
  )
}
