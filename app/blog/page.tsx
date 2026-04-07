import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { projectId } from '@/sanity/env'

export const metadata = {
  title: 'Journal · Stories & Réflexions',
  description: 'Réflexions sur l\'art, le processus créatif et l\'esthétique du vide.',
}

const MOCK_POSTS = [
  { _id: 'p1', title: 'Le Silence comme Matière', slug: { current: 'silence' }, publishedAt: new Date().toISOString(), tags: ['PHILOSOPHIE'], author: 'L\'Artiste', teaser: 'Une exploration du silence comme composante plastique fondamentale de l\'œuvre contemporaine.' },
  { _id: 'p2', title: 'L\'Émotion face au Vide',  slug: { current: 'vide' },    publishedAt: new Date().toISOString(), tags: ['PROCESSUS'],   author: 'L\'Artiste', teaser: 'Comment le vide devient matière et la matière s\'efface dans l\'espace de la contemplation.' },
]

async function getPosts() {
  if (projectId === 'dummy-project-id') return MOCK_POSTS
  try {
    return await client.fetch(
      groq`*[_type == "post"] | order(publishedAt desc) {
        _id, title, slug, publishedAt, tags,
        "author": author->name,
        "teaser": array::join(string::split(pt::text(body), "")[0..180], "") + "…"
      }`
    )
  } catch {
    return MOCK_POSTS
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-[hsl(40,15%,96%)]">

      {/* ── En-tête ─────────────────────────────────────────── */}
      <div className="pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <span className="label-category block mb-5 animate-fade-up">Journal</span>
        <h1 className="font-serif text-[clamp(3rem,9vw,7rem)] font-light tracking-tight text-[hsl(24,10%,8%)] leading-[1.0] animate-fade-up animate-fade-up-1">
          Les <em className="italic text-[hsl(28,90%,50%)]">Stories</em>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-sm text-[hsl(24,5%,46%)] leading-relaxed animate-fade-up animate-fade-up-2">
          Réflexions sur l'art, le processus créatif et l'esthétique du vide.
        </p>
      </div>

      {/* ── Grille articles ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-32">

        {posts.length === 0 && (
          <div className="py-24 text-center border border-[hsl(40,8%,86%)] rounded-2xl">
            <p className="text-sm text-[hsl(24,5%,50%)]">Aucune story publiée pour le moment.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {posts.map((post: any, i: number) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className={`group block reveal reveal-delay-${(i % 2) + 1}`}
            >
              {/* Image placeholder */}
              <div className="relative aspect-[16/10] mb-8 overflow-hidden rounded-2xl bg-[hsl(40,10%,90%)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="label-category text-[hsl(24,5%,60%)]">Journal</span>
                </div>
                {/* Gradient hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(24,10%,8%)/0.3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Tag en bas */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-[hsl(24,10%,8%)]">
                    {post.tags?.[0] || 'Art'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Meta */}
                <div className="flex items-center gap-4 text-[0.65rem] tracking-[0.12em] uppercase text-[hsl(24,5%,52%)]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.publishedAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[hsl(40,8%,78%)]" />
                  <span>{post.author || 'GALERIE'}</span>
                </div>

                {/* Titre */}
                <h2 className="font-serif text-2xl md:text-3xl font-light text-[hsl(24,10%,8%)] group-hover:text-[hsl(28,90%,48%)] transition-colors leading-tight">
                  {post.title}
                </h2>

                {/* Extrait */}
                {post.teaser && (
                  <p className="text-sm text-[hsl(24,5%,48%)] leading-relaxed line-clamp-3">
                    {post.teaser}
                  </p>
                )}

                {/* CTA inline */}
                <div className="flex items-center gap-3 text-[0.7rem] tracking-[0.1em] uppercase font-semibold text-[hsl(24,10%,8%)] group-hover:gap-5 transition-all duration-400 pt-1">
                  <span>Continuer la lecture</span>
                  <ArrowRight className="w-4 h-4 text-[hsl(28,90%,55%)] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
