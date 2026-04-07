'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react'
import { useCart } from '@/lib/cart-store'
import { cn } from '@/lib/utils'
import CartDrawer from '@/components/cart/CartDrawer'

const NAV_LINKS = [
  { href: '/galerie', label: 'Galerie' },
  { href: '/collections', label: 'Collections' },
  { href: '/blog', label: 'Journal' },
  { href: '/about', label: 'À propos' },
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
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isScrolled ? 'nav-scrolled py-3' : 'bg-transparent py-5'
      )}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="font-serif text-xl font-semibold tracking-tight text-foreground shrink-0">
            GALERIE
          </Link>

          {/* Nav pills — centre */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="nav-pill">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="nav-pill-link">
                  {link.label} <ArrowUpRight className="w-3 h-3 opacity-40" />
                </Link>
              ))}
            </div>
          </div>

          {/* Actions droite */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag strokeWidth={1.5} className="w-5 h-5" />
              {isHydrated && totalCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-primary text-white text-[9px] font-semibold rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <Link href="/contact" className="btn-primary hidden md:inline-flex text-sm py-2 px-4">
              Nous contacter <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fermer' : 'Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X strokeWidth={1.5} className="w-5 h-5" /> : <Menu strokeWidth={1.5} className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile menu */}
      <div className={cn(
        'fixed inset-0 z-40 flex flex-col bg-background transition-transform duration-400 ease-in-out md:hidden',
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="flex items-center justify-between px-4 h-16 border-b border-border">
          <Link href="/" className="font-serif text-xl font-semibold" onClick={() => setMobileMenuOpen(false)}>GALERIE</Link>
          <button onClick={() => setMobileMenuOpen(false)}><X strokeWidth={1.5} className="w-5 h-5" /></button>
        </div>
        <nav className="flex flex-col px-6 pt-10 gap-6">
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
        <div className="mt-auto px-6 pb-10">
          <Link href="/contact" className="btn-primary w-full justify-center" onClick={() => setMobileMenuOpen(false)}>
            Nous contacter <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
