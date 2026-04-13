'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <span className="label-category mb-6">Erreur</span>
      <h1 className="font-serif text-4xl sm:text-5xl font-light text-[hsl(24,10%,8%)] mb-4">
        Quelque chose s'est <em className="italic text-[hsl(28,90%,50%)]">mal passé</em>
      </h1>
      <p className="text-sm text-[hsl(24,5%,50%)] max-w-sm leading-relaxed mb-10">
        Une erreur inattendue est survenue. Vous pouvez réessayer ou retourner à l'accueil.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={reset} className="btn-primary">
          Réessayer
        </button>
        <Link href="/" className="btn-ghost flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
