'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart-store'
import { cn } from '@/lib/utils'
import CartDrawer from '@/components/cart/CartDrawer'

const NAV_LINKS = [
  { href: '/galerie', label: 'Galerie' },
  { href: '/collections', label: 'Collections' },
  { href: '/blog', label: 'Journal' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const items = useCart((state) => state.items)
  const totalCount = items.reduce((acc: number, item) => acc + item.quantity, 0)

  useEffect(() => {
    setIsHydrated(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        isScrolled ? 'nav-scrolled h-16' : 'bg-transparent h-20'
      )}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="font-serif text-xl tracking-[0.12em] text-foreground">
            GALERIE
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag strokeWidth={1.5} className="w-5 h-5" />
              {isHydrated && totalCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-foreground text-background text-[9px] font-medium rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen
                ? <X strokeWidth={1.5} className="w-5 h-5" />
                : <Menu strokeWidth={1.5} className="w-5 h-5" />
              }
            </button>
          </div>
        </nav>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Menu */}
      <div className={cn(
        'fixed inset-0 z-40 flex flex-col bg-background transition-transform duration-500 ease-in-out md:hidden',
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="flex items-center justify-between px-4 sm:px-6 h-20 border-b border-border">
          <Link href="/" className="font-serif text-xl tracking-[0.12em]" onClick={() => setMobileMenuOpen(false)}>
            GALERIE
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} aria-label="Fermer le menu">
            <X strokeWidth={1.5} className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-12 gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-3xl font-light text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 pb-12 flex flex-col gap-3 border-t border-border pt-8">
          <span className="label-category">Contact</span>
          <a href="mailto:contact@galerie.art" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            contact@galerie.art
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
        </div>
      </div>
    </>
  )
}
