'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ShoppingBag, Trash2, ArrowRight, Loader2 } from 'lucide-react'
import { useCart } from '@/lib/cart-store'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/ToastProvider'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { items, removeItem, totalPrice } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: window.location.href,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Erreur inconnue')
      if (data.url) window.location.href = data.url
    } catch (err) {
      toast({
        title: 'Erreur de paiement',
        description: err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'error',
      })
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-foreground/30 z-[100] transition-opacity duration-400',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={cn(
        'fixed top-0 right-0 h-full w-full sm:max-w-md bg-background border-l border-border z-[101] transition-transform duration-500 ease-in-out flex flex-col',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag strokeWidth={1.5} className="w-5 h-5 text-foreground" />
            <h2 className="font-serif text-xl font-light tracking-wide">Panier</h2>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground transition-colors" aria-label="Fermer">
            <X strokeWidth={1.5} className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 sm:px-8 py-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-20">
              <ShoppingBag strokeWidth={1} className="w-10 h-10 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Votre panier est vide</p>
              <button onClick={onClose} className="text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors">
                Découvrir la galerie
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-6 border-b border-border last:border-0">
                <div className="relative w-16 aspect-[3/4] bg-muted overflow-hidden shrink-0">
                  {item.image && (
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <h3 className="font-serif text-base font-light text-foreground leading-snug">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 tracking-wide">{item.support}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">
                      {item.price.toLocaleString('fr-FR')} {item.currency}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                      aria-label="Supprimer"
                    >
                      <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 sm:px-8 py-6 border-t border-border space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-muted-foreground tracking-wide uppercase">Total estimé</span>
              <span className="font-serif text-2xl font-light">
                {totalPrice().toLocaleString('fr-FR')} €
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              {isCheckingOut ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Initialisation…</>
              ) : (
                <><span>Procéder au paiement</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-xs text-center text-muted-foreground">
              TVA incluse · Livraison calculée à l'étape suivante · Paiement sécurisé Stripe
            </p>
          </div>
        )}
      </div>
    </>
  )
}
