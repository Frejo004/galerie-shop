'use client'

import { useReveal } from '@/lib/use-reveal'

/**
 * Composant client minimal qui active les animations
 * .reveal et .reveal-left sur toutes les pages.
 * À placer dans le layout racine.
 */
export default function RevealObserver() {
  useReveal(0.1)
  return null
}
