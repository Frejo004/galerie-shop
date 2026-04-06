'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ShoppingBag, Trash2, ArrowRight, Loader2 } from 'lucide-react'
import { useCart } from '@/lib/cart-store'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { items, removeItem, totalPrice, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const router = useRouter()

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
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

      const { url } = await response.json()
      if (url) window.location.href = url
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Une erreur est survenue lors de l\'initialisation du paiement.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:max-w-md bg-[#0a0a0a] border-l border-white/5 z-[101] transition-transform duration-700 ease-in-out px-6 sm:px-8 py-10 sm:py-12 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <ShoppingBag strokeWidth={1} className="w-6 h-6" />
            <h2 className="font-serif text-3xl font-light uppercase tracking-widest">Panier</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:text-primary transition-colors">
            <X strokeWidth={1} className="w-8 h-8" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-white/20">Votre panier est vide</p>
              <button 
                onClick={onClose}
                className="text-[10px] uppercase font-bold tracking-widest border-b border-primary text-primary pb-1"
              >
                Découvrir la Galerie
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-6 pb-6 border-b border-white/5">
                <div className="relative w-20 aspect-[3/4] bg-neutral-900 overflow-hidden border border-white/5">
                  {item.image && (
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif text-lg font-light leading-none mb-2">{item.title}</h3>
                    <p className="text-[10px] tracking-widest text-white/30 uppercase">{item.type} • {item.support}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-primary tracking-widest">{item.price} {item.currency}</span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-white/20 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 strokeWidth={1} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-8 space-y-8">
            <div className="flex justify-between items-end border-t border-white/10 pt-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Total Estimation</span>
              <span className="font-serif text-3xl font-light">{totalPrice()} €</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-white text-black py-6 flex items-center justify-center gap-4 group hover:bg-primary transition-all duration-700 disabled:opacity-50"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> 
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Initialisation...</span>
                </>
              ) : (
                <>
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Procéder au Paiement</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>

            <p className="text-[9px] text-center uppercase tracking-widest text-white/20 leading-relaxed">
              TVA incluse • Livraison calculée à l'étape suivante • Paiement sécurisé via Stripe
            </p>
          </div>
        )}
      </div>
    </>
  )
}
