import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { urlForImage } from "@/sanity/lib/image"
import { projectId } from "@/sanity/env"
import EditorialHero from "@/components/home/EditorialHero"

interface Artwork {
  _id: string
  title: string
  slug: { current: string }
  type: 'original' | 'derivative'
  support: string
  year: string
  price: number
  currency: string
  images: any[]
}

const MOCK_ARTWORKS: Artwork[] = [
  { _id: 'mock1', title: 'Éveil du Silence No. 1', slug: { current: 'mock-1' }, type: 'original', support: 'Huile sur Toile', year: '2024', price: 4200, currency: '€', images: [] },
  { _id: 'mock2', title: 'Texture Urbaine', slug: { current: 'mock-2' }, type: 'derivative', support: 'Tirage Fine Art', year: '2023', price: 350, currency: '€', images: [] },
  { _id: 'mock3', title: 'Fragment de Mémoire', slug: { current: 'mock-3' }, type: 'original', support: 'Technique Mixte', year: '2024', price: 2800, currency: '€', images: [] },
]

async function getFeaturedArtworks(): Promise<Artwork[]> {
  if (projectId === 'dummy-project-id') return MOCK_ARTWORKS
  try {
    const data = await client.fetch(
      groq`*[_type == "artwork" && inStock == true][0...3] | order(_createdAt desc) {
        _id, title, slug, type, support, price, currency, images
      }`
    )
    return data?.length > 0 ? data : MOCK_ARTWORKS
  } catch {
    return MOCK_ARTWORKS
  }
}

export default async function Home() {
  const artworks = await getFeaturedArtworks()

  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <EditorialHero artworks={artworks} />

      {/* ── Sélection ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 sm:py-32 w-full">

        {/* En-tête section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <span className="label-category">Sélection</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground">
              Pièces <em>choisies</em>
            </h2>
          </div>
          <Link href="/galerie" className="btn-outline self-start sm:self-auto whitespace-nowrap">
            Voir le catalogue
          </Link>
        </div>

        {/* Grille œuvres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
          {artworks.map((art) => (
            <Link
              key={art._id}
              href={`/artwork/${art.slug.current}`}
              className="artwork-card group bg-card block"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                {art.images?.[0] ? (
                  <Image
                    src={urlForImage(art.images[0]).url()}
                    alt={art.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif italic text-sm text-muted-foreground/40">
                      {art.year}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-light text-foreground group-hover:text-primary transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-muted-foreground tracking-wide">{art.support}</p>
                </div>
                <p className="font-serif text-base text-muted-foreground shrink-0 ml-4">
                  {art.price.toLocaleString('fr-FR')} {art.currency}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Séparateur éditorial ──────────────────────────────── */}
      <div className="border-t border-border" />

      {/* ── CTA final ────────────────────────────────────────── */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 flex flex-col items-center text-center gap-10">
        <div className="space-y-3 max-w-xl">
          <span className="label-category">Acquisitions</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-foreground">
            Chaque œuvre<br />
            <em>attend son collectionneur</em>
          </h2>
        </div>
        <div className="divider" />
        <Link href="/galerie" className="btn-primary">
          Accéder au catalogue <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  )
}
