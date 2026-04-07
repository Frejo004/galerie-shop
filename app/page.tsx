import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
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
        _id, title, slug, type, support, year, price, currency, images
      }`
    )
    return data?.length > 0 ? data : MOCK_ARTWORKS
  } catch {
    return MOCK_ARTWORKS
  }
}

const FEATURES = [
  { label: 'Pièces uniques', desc: 'Chaque œuvre est sélectionnée pour son unicité et sa qualité.' },
  { label: 'Tirages Fine Art', desc: 'Éditions limitées sur papier museum, signées par l\'artiste.' },
  { label: 'Livraison sécurisée', desc: 'Emballage professionnel avec assurance transport incluse.' },
]

export default async function Home() {
  const artworks = await getFeaturedArtworks()

  return (
    <div className="flex flex-col">

      <EditorialHero />

      {/* Section sombre encadrée — style Scalar */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto dark-section px-6 sm:px-10 py-16 sm:py-20">
          <div className="text-center mb-12">
            <span className="label-category text-white/40 block mb-3">Notre approche</span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              L'art, <em className="font-serif font-normal italic">simplement</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div key={f.label} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="font-semibold text-white text-sm">{f.label}</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sélection d'œuvres */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="label-category block mb-2">Sélection</span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight">
              Pièces <em className="font-serif font-normal italic text-primary">choisies</em>
            </h2>
          </div>
          <Link href="/galerie" className="btn-ghost self-start sm:self-auto">
            Voir tout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {artworks.map((art) => (
            <Link key={art._id} href={`/artwork/${art.slug.current}`} className="artwork-card group block">
              <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                {art.images?.[0] ? (
                  <Image src={urlForImage(art.images[0]).url()} alt={art.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif italic text-muted-foreground/30">{art.year}</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{art.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{art.support}</p>
                  </div>
                  <span className="text-sm font-medium text-foreground shrink-0">
                    {art.price.toLocaleString('fr-FR')} {art.currency}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="tag-pill">{art.type === 'original' ? 'Pièce unique' : 'Édition limitée'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="dark-section px-6 sm:px-16 py-16 sm:py-20 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-lg">
              <span className="label-category text-white/40 block">Acquisitions</span>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white leading-tight">
                Chaque œuvre attend<br />
                <em className="font-serif font-normal italic text-primary">son collectionneur</em>
              </h2>
            </div>
            <Link href="/galerie" className="btn-primary shrink-0 text-base px-6 py-3">
              Accéder au catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
