import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";
import { projectId } from "@/sanity/env";
import EditorialHero from "@/components/home/EditorialHero";

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
  {
    _id: 'mock1',
    title: 'Éveil du Silence No. 1',
    slug: { current: 'mock-1' },
    type: 'original',
    support: 'Huile sur Toile',
    year: '2024',
    price: 4200,
    currency: '€',
    images: [] // Placeholder handling in components
  },
  {
    _id: 'mock2',
    title: 'Texture Urbaine (Étude)',
    slug: { current: 'mock-2' },
    type: 'derivative',
    support: 'Tirage Fine Art',
    year: '2023',
    price: 350,
    currency: '€',
    images: []
  },
  {
    _id: 'mock3',
    title: 'Fragment de Mémoire',
    slug: { current: 'mock-3' },
    type: 'original',
    support: 'Technique Mixte',
    year: '2024',
    price: 2800,
    currency: '€',
    images: []
  }
]

async function getFeaturedArtworks(): Promise<Artwork[]> {
  if (projectId === 'dummy-project-id') {
     return MOCK_ARTWORKS;
  }
  
  try {
    const data = await client.fetch(
      groq`*[_type == "artwork" && inStock == true][0...3] | order(_createdAt desc) {
        _id,
        title,
        slug,
        type,
        support,
        price,
        currency,
        images
      }`
    );
    return data?.length > 0 ? data : MOCK_ARTWORKS;
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return MOCK_ARTWORKS;
  }
}


export default async function Home() {
  const artworks = await getFeaturedArtworks();

  return (
    <div className="flex flex-col bg-[#f0f4f8] transition-colors duration-700">
      {/* Editorial Hero (OBSCURA Inspired) */}
      <EditorialHero artworks={artworks} />

      {/* Featured Section (Light Theme) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-32 md:py-48 w-full border-t border-black/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="space-y-8 max-w-2xl">
            <h2 className="font-serif text-4xl md:text-7xl font-bold leading-tight tracking-tighter text-black text-gradient">
              Pièces <span className="italic font-normal">Sélectionnées</span>
            </h2>
            <p className="text-black/40 text-[10px] leading-loose max-w-md tracking-[0.5em] font-black uppercase">
              Une curation rigoureuse explorant l'équilibre fragile entre la brutalité des textures et la pureté du vide.
            </p>
          </div>
          <Link href="/galerie" className="px-10 py-5 bg-white border border-black/5 text-[10px] tracking-[0.5em] font-black uppercase rounded-full hover:bg-black hover:text-white transition-all shadow-xl shadow-black/5">
            Voir Tout Le Catalogue
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artworks.map((art) => (
            <Link 
              key={art._id} 
              href={`/artwork/${art.slug.current}`} 
              className="group glass-card rounded-[2.5rem] p-4 flex flex-col items-center justify-center transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl"
            >
              <div className="aspect-[4/5] w-full bg-neutral-100 rounded-[2rem] relative overflow-hidden transition-all duration-700 group-hover:scale-[0.98]">
                 {art.images?.[0] ? (
                   <Image 
                    src={urlForImage(art.images[0]).url()} 
                    alt={art.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                   />
                 ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(209,176,107,0.1)_0%,_transparent_70%)] flex items-center justify-center">
                       <span className="text-[10px] tracking-[0.6em] font-black text-black/10 uppercase font-serif italic">Edition</span>
                    </div>
                 )}
              </div>
              <div className="mt-8 mb-4 w-full px-4 flex justify-between items-center">
                <div className="space-y-2">
                   <h3 className="font-serif text-2xl font-bold tracking-tight text-black group-hover:text-primary transition-colors">{art.title}</h3>
                   <p className="text-[8px] tracking-[0.4em] text-black/30 uppercase font-black">{art.support}</p>
                </div>
                <p className="font-serif italic text-lg text-black/60">{art.price} €</p>
              </div>
            </Link>
          ))}
          {artworks.length === 0 && [1,2,3].map(i => (
             <div key={i} className="aspect-[3/4] bg-white border border-black/5 rounded-[2.5rem] animate-pulse" />
          ))}
        </div>
      </section>

      {/* Final CTA (Light Theme) */}
      <section className="py-24 sm:py-32 md:py-48 bg-white border-y border-black/5 flex items-center justify-center relative overflow-hidden">
         <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[80%] h-80 bg-primary/20 blur-[150px] opacity-20 pointer-events-none" />
         <div className="max-w-4xl mx-auto px-6 text-center z-10">
            <p className="text-[10px] tracking-[1em] text-black/20 font-black uppercase mb-10 sm:mb-16">Acquisitions Immédiates</p>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-12 sm:mb-20 text-black uppercase leading-none opacity-80">
                L'ART <br/> <span className="italic font-normal">À VOUS</span>
            </h2>
            <Link 
              href="/galerie" 
              className="inline-block px-16 py-8 bg-black text-white text-[11px] font-black tracking-[0.5em] uppercase rounded-full hover:bg-primary transition-all duration-700 shadow-2xl shadow-black/20"
            >
              Accéder au Catalogue
            </Link>
         </div>
      </section>
    </div>
  );
}


