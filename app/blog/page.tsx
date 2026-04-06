import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { projectId } from '@/sanity/env'

const MOCK_POSTS = [
  { _id: 'p1', title: 'Le Silence comme Matière', slug: { current: 'silence' }, publishedAt: new Date().toISOString(), tags: ['PHILOSOPHIE'], author: 'L\'Artiste' },
  { _id: 'p2', title: 'L\'Émotion face au Vide', slug: { current: 'vide' }, publishedAt: new Date().toISOString(), tags: ['PROCESSUS'], author: 'L\'Artiste' }
]

async function getPosts() {
  if (projectId === 'dummy-project-id') {
     return MOCK_POSTS;
  }

  try {
    return await client.fetch(
      groq`*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        body,
        tags,
        "author": author->name
      }`
    )
  } catch (err) {
    console.error('Sanity blog fetch error:', err)
    return MOCK_POSTS
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="pt-32 pb-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      <div className="flex flex-col items-center mb-20 sm:mb-32 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase mb-6 sm:mb-8">
          LES <span className="italic">STORIES</span>
        </h1>
        <p className="max-w-2xl text-muted-foreground text-[10px] uppercase tracking-[0.5em] leading-relaxed opacity-50">
          Réflexions sur l'art, le processus créatif et l'esthétique du vide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
        {posts.map((post: any) => (
          <Link 
            key={post._id} 
            href={`/blog/${post.slug.current}`}
            className="group block"
          >
            <div className="relative aspect-[16/9] mb-12 bg-neutral-900 border border-white/5 overflow-hidden">
               {/* Search for any image in the body or a cover image would be better */}
               <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity">
                  <span className="text-[10px] tracking-[1em] uppercase text-white font-bold">JOURNAL</span>
               </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 text-[9px] tracking-[0.3em] font-bold uppercase text-primary/60">
                 <span className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {new Date(post.publishedAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                 </span>
                 <span className="w-1 h-1 bg-white/20 rounded-full" />
                 <span>{post.tags?.[0] || 'ART'}</span>
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl font-light hover:text-primary transition-colors leading-tight">
                {post.title}
              </h2>
              
              <p className="text-white/40 text-xs leading-loose tracking-widest font-light uppercase line-clamp-3">
                 {/* Simple teaser would be better from Sanity */}
                 Explorer les profondeurs de la création contemporaine à travers le prisme de la Galerie.
              </p>

              <div className="pt-4 flex items-center gap-6 group-hover:gap-8 transition-all duration-700">
                 <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-white">Continuer La Lecture</span>
                 <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
           <div className="col-span-full py-20 text-center text-white/20 text-[10px] tracking-[0.4em] uppercase border border-white/5">
              Aucune story publiée pour le moment.
           </div>
        )}
      </div>
    </div>
  )
}
