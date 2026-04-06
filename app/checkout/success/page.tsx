'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cart-store'

export default function SuccessPage() {
  const clearCart = useCart((state) => state.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center py-24">

      {/* Icône minimaliste */}
      <div className="w-16 h-16 border border-primary flex items-center justify-center mb-10">
        <div className="w-2 h-2 bg-primary rounded-full" />
      </div>

      <span className="label-category mb-4">Confirmation</span>

      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground mb-6">
        Acquisition confirmée
      </h1>

      <div className="divider mx-auto mb-8" />

      <p className="max-w-md text-sm text-muted-foreground leading-relaxed mb-12">
        Merci pour votre confiance. Vous recevrez un email de confirmation avec les détails de livraison et votre certificat d'authenticité numérique.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <Link href="/galerie" className="btn-primary flex-1 justify-center">
          Retour à la galerie <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/" className="btn-outline flex-1 justify-center">
          Accueil
        </Link>
      </div>

      <p className="mt-16 text-xs text-muted-foreground">
        Une question ? <a href="mailto:contact@galerie.art" className="underline underline-offset-4 hover:text-foreground transition-colors">contact@galerie.art</a>
      </p>
    </div>
  )
}
