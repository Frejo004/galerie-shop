'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-store'

export default function SuccessPage() {
  const clearCart = useCart((state) => state.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center px-6">
      <div className="mb-12 animate-in fade-in zoom-in duration-1000">
        <CheckCircle2 strokeWidth={0.5} className="w-32 h-32 text-primary mx-auto" />
      </div>
      
      <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light tracking-tight text-white mb-6 uppercase">
        Acquisition Confirmée
      </h1>
      
      <p className="max-w-xl text-muted-foreground text-sm uppercase tracking-[0.3em] leading-relaxed mb-16 opacity-70">
        Merci pour votre confiance. Vous recevrez un email de confirmation contenant les détails de la livraison et votre certificat d'authenticité numérique sous peu.
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-md">
        <Link
          href="/galerie"
          className="flex-1 bg-white text-black py-5 flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-primary transition-all duration-500"
        >
          Retour à la Galerie <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="flex-1 border border-white/10 text-white py-5 flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-white/5 transition-all duration-500"
        >
          Page d'Accueil
        </Link>
      </div>

      <div className="mt-32 pt-16 border-t border-white/5 w-full max-w-2xl text-[10px] tracking-[0.4em] uppercase text-white/20">
        Une question ? Contactez notre concierge à <span className="text-white/40 group cursor-pointer hover:text-primary transition-colors">concierge@galerie.art</span>
      </div>
    </div>
  )
}
