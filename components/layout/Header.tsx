'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart-store'
import { cn } from '@/lib/utils'
import CartDrawer from '@/components/cart/CartDrawer'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const items = useCart((state) => state.items)
  
  const totalCount = items.reduce((acc: number, item: any) => acc + item.quantity, 0)


  useEffect(() => {
    setIsHydrated(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500",
      isScrolled ? "glass-nav h-16 shadow-xl shadow-black/5" : "bg-transparent h-24"
    )}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.2em] font-bold leading-none uppercase text-black"
        >
          GALERIE
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12 font-sans tracking-widest text-[10px] uppercase font-black text-black/40">
          <Link
            href="/galerie"
            className="hover:text-primary transition-colors hover:tracking-[0.4em]"
          >
            Galerie
          </Link>
          <Link
            href="/collections"
            className="hover:text-primary transition-colors hover:tracking-[0.4em]"
          >
            Collections
          </Link>
          <Link
            href="/blog"
            className="hover:text-primary transition-colors hover:tracking-[0.4em]"
          >
            Stories
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button 
            className="relative group p-2 transition-transform hover:scale-105"
            onClick={() => setIsCartOpen(true)}
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag strokeWidth={1} className="w-6 h-6 text-black group-hover:text-primary transition-colors" />
            {isHydrated && totalCount > 0 && (
              <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-in fade-in zoom-in duration-500">
                {totalCount}
              </span>
            )}
          </button>
          
          <button 
            className="md:hidden p-2 text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X strokeWidth={1} className="w-6 h-6" /> : <Menu strokeWidth={1} className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Cart Side Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Menu */}

      <div className={cn(
        "fixed inset-0 bg-white/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center gap-12 transition-transform duration-1000 ease-in-out md:hidden",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <Link 
          href="/galerie" 
          onClick={() => setMobileMenuOpen(false)}
          className="font-serif text-5xl font-bold uppercase tracking-tighter text-black hover:text-primary"
        >
          Galerie
        </Link>
        <Link 
          href="/collections" 
          onClick={() => setMobileMenuOpen(false)}
          className="font-serif text-5xl font-bold uppercase tracking-tighter text-black hover:text-primary"
        >
          Collections
        </Link>
        <Link 
          href="/blog" 
          onClick={() => setMobileMenuOpen(false)}
          className="font-serif text-5xl font-bold uppercase tracking-tighter text-black hover:text-primary"
        >
          Stories
        </Link>
        
        <div className="mt-20 pt-12 border-t border-black/5 w-1/2 flex flex-col items-center gap-4 text-[10px] tracking-widest text-black/30 uppercase font-black">
          <span>Inquiry</span>
          <span>Instagram</span>
        </div>
      </div>
    </header>
  )
}
