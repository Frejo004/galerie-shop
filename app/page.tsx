import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"
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
  { _id: 'mock1', title: 'Éveil du Silence No. 1',  slug: { current: 'mock-1' }, type: 'original',    support: 'Huile sur Toile',    year: '2024', price: 4200, currency: '€', images: [] },
  { _id: 'mock2', title: 'Texture Urbaine',          slug: { current: 'mock-2' }, type: 'derivative', support: 'Tirage Fine Art',    year: '2023', price: 350,  currency: '€', images: [] },
  { _id: 'mock3', title: 'Fragment de Mémoire',      slug: { current: 'mock-3' }, type: 'original',    support: 'Technique Mixte',   year: '2024', price: 2800, currency: '€', images: [] },
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
  { icon: '◆', label: 'Pièces uniques',      desc: 'Chaque œuvre est sélectionnée pour son unicité et sa qualité.' },
  { icon: '◈', label: 'Tirages Fine Art',     desc: 'Éditions limitées sur papier museum, signées par l\'artiste.' },
  { icon: '◉', label: 'Livraison sécurisée', desc: 'Emballage professionnel avec assurance transport incluse.' },
]

export default async function Home() {
  const artworks = await getFeaturedArtworks()

  return (
    <div className="flex flex-col">

      <EditorialHero />

      {/* ── Section sombre — Notre approche ───────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto dark-section px-8 sm:px-14 py-16 sm:py-24">
          <div className="grain-overlay" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
              <div>
                <span className="label-category text-[hsl(40,10%,60%)] block mb-3">Notre approche</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[hsl(40,10%,94%)] leading-tight">
                  L'art,{' '}
                  <em className="italic text-[hsl(28,90%,60%)]">simplement</em>
                </h2>
              </div>
              <Link href="/about" className="btn-ghost border-[hsl(40,10%,30%)] text-[hsl(40,10%,80%)] hover:border-[hsl(40,10%,60%)] hover:bg-[hsl(40,10%,92%)/0.05] shrink-0">
                En savoir plus <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {FEATURES.map((f, i) => (
                <div
                  key={f.label}
                  className={`space-y-4 reveal reveal-delay-${i + 1}`}
                >
                  <span className="text-[hsl(28,90%,55%)] text-xl">{f.icon}</span>
                  <h3 className="font-sans font-semibold text-[hsl(40,10%,92%)] text-base">{f.label}</h3>
                  <p className="text-sm text-[hsl(40,10%,55%)] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sélection d'œuvres ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="label-category block mb-3">Sélection</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-[hsl(24,10%,8%)]">
              Pièces{' '}
              <em className="italic text-[hsl(28,90%,50%)]">choisies</em>
            </h2>
          </div>
          <Link href="/galerie" className="btn-ghost self-start sm:self-auto">
            Voir tout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art, i) => (
            <Link
              key={art._id}
              href={`/artwork/${art.slug.current}`}
              className={`artwork-card group block reveal reveal-delay-${i + 1}`}
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-[hsl(40,10%,92%)]">
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
                    <span className="font-serif italic text-2xl text-[hsl(24,5%,60%)]">{art.year}</span>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-[hsl(24,10%,8%)] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-serif font-light text-base text-[hsl(24,10%,8%)] group-hover:text-[hsl(28,90%,50%)] transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-[0.7rem] text-[hsl(24,5%,52%)] mt-0.5 tracking-wide">{art.support}</p>
                  </div>
                  <span className="text-sm font-medium text-[hsl(24,10%,8%)] shrink-0">
                    {art.price.toLocaleString('fr-FR')} {art.currency}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="tag-pill">{art.type === 'original' ? 'Pièce unique' : 'Édition limitée'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Stats band ─────────────────────────────────────────── */}
      <section className="border-y border-[hsl(40,8%,86%)] py-10 mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: '180+', label: 'Œuvres' },
            { val: '12',   label: 'Artistes' },
            { val: '6+',   label: 'Années' },
            { val: '98%',  label: 'Satisfaction' },
          ].map(({ val, label }) => (
            <div key={label} className="reveal">
              <p className="font-serif text-4xl font-light text-[hsl(24,10%,8%)]">{val}</p>
              <p className="label-category mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="dark-section px-8 sm:px-16 py-16 sm:py-24 flex flex-col sm:flex-row items-center justify-between gap-10">
            <div className="grain-overlay" />
            <div className="relative z-10 space-y-4 max-w-xl">
              <span className="label-category text-[hsl(40,10%,50%)] block">Acquisitions</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[hsl(40,10%,94%)] leading-tight">
                Chaque œuvre attend<br />
                <em className="italic text-[hsl(28,90%,60%)]">son collectionneur</em>
              </h2>
              <div className="flex flex-wrap gap-4 pt-2">
                {['Certificat inclus', 'Livraison assurée', 'Paiement 3× sans frais'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-[0.65rem] tracking-[0.08em] uppercase text-[hsl(40,10%,55%)]">
                    <Check className="w-3 h-3 text-[hsl(28,90%,55%)]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative z-10 shrink-0">
              <Link href="/galerie" className="btn-primary bg-[hsl(40,15%,96%)] text-[hsl(24,10%,8%)] hover:bg-white text-base px-8 py-4">
                Accéder au catalogue <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
