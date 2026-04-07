'use client'

import { useEffect } from 'react'

/**
 * Hook qui active les classes .reveal et .reveal-left
 * via IntersectionObserver dès que l'élément entre dans le viewport.
 */
export function useReveal(threshold = 0.12) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target) // one-shot
          }
        })
      },
      { threshold }
    )

    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
