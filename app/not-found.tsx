import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <span className="label-category mb-6">404</span>
      <h1 className="font-serif text-4xl sm:text-6xl font-light text-[hsl(24,10%,8%)] mb-4">
        Page <em className="italic text-[hsl(28,90%,50%)]">introuvable</em>
      </h1>
      <p className="text-sm text-[hsl(24,5%,50%)] max-w-sm leading-relaxed mb-10">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <Link href="/" className="btn-ghost flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Retour à l'accueil
      </Link>
    </div>
  )
}
