'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react'
import { useCart } from '@/lib/cart-store'
import { cn } from '@/lib/utils'
import CartDrawer from '@/components/cart/CartDrawer'
import { motion, AnimatePresence } from 'framer-motion'

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
  const pathname = usePathname()
  const items = useCart((state) => state.items)
  const totalCount = items.reduce((acc: number, item) => acc + item.quantity, 0)

  useEffect(() => {
    setIsHydrated(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ferme le menu mobile si la route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        isScrolled ? 'nav-scrolled py-3' : 'bg-transparent py-5'
      )}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl font-semibold tracking-tight text-[hsl(24,10%,8%)] shrink-0 relative group"
          >
            GALERIE
            <span className="absolute -bottom-px left-0 h-px w-0 bg-[hsl(28,90%,55%)] group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Nav pills — centre */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="nav-pill">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'nav-pill-link',
                      isActive && 'bg-[hsl(24,10%,8%)/0.08] text-[hsl(24,10%,8%)] font-semibold'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Actions droite */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-[hsl(24,5%,40%)] hover:text-[hsl(24,10%,8%)] hover:bg-[hsl(24,10%,8%)/0.06] transition-all duration-200"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag strokeWidth={1.5} className="w-5 h-5" />
              <AnimatePresence>
                {isHydrated && totalCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0.5 right-0.5 w-4 h-4 bg-[hsl(28,90%,55%)] text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              href="/contact"
              className="btn-primary hidden md:inline-flex text-[0.75rem] py-2 px-5"
            >
              Contact <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              className="md:hidden p-2.5 rounded-full text-[hsl(24,10%,8%)] hover:bg-[hsl(24,10%,8%)/0.06] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fermer' : 'Menu'}
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

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[hsl(40,15%,96%)] flex flex-col md:hidden"
          >
            {/* Header du menu */}
            <div className="flex items-center justify-between px-4 h-20 border-b border-[hsl(40,8%,86%)]">
              <Link href="/" className="font-serif text-xl font-semibold">GALERIE</Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-[hsl(24,10%,8%)/0.06] transition-colors"
              >
                <X strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </div>

            {/* Liens avec stagger */}
            <nav className="flex flex-col px-8 pt-12 gap-2 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between py-5 border-b border-[hsl(40,8%,86%)]"
                  >
                    <span className="font-serif text-3xl font-light text-[hsl(24,10%,8%)] group-hover:text-[hsl(28,90%,50%)] transition-colors">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-[hsl(24,5%,50%)] group-hover:text-[hsl(28,90%,50%)] transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-8 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/contact"
                  className="btn-primary w-full justify-center py-3.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Nous contacter <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
