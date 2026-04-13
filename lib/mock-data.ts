import type { Artwork, Post } from './types'

export const MOCK_ARTWORKS: Artwork[] = [
  {
    _id: 'mock1',
    title: 'Éveil du Silence No. 1',
    slug: { current: 'mock-1' },
    type: 'original',
    support: 'huile',
    year: '2024',
    price: 4200,
    currency: '€',
    images: [],
    inStock: true,
  },
  {
    _id: 'mock2',
    title: 'Texture Urbaine',
    slug: { current: 'mock-2' },
    type: 'derivative',
    support: 'papier',
    year: '2023',
    price: 350,
    currency: '€',
    images: [],
    inStock: true,
  },
  {
    _id: 'mock3',
    title: 'Fragment de Mémoire',
    slug: { current: 'mock-3' },
    type: 'original',
    support: 'mixte',
    year: '2024',
    price: 2800,
    currency: '€',
    images: [],
    inStock: true,
  },
  {
    _id: 'mock4',
    title: 'Silence Éphémère',
    slug: { current: 'mock-4' },
    type: 'original',
    support: 'acrylique',
    year: '2024',
    price: 3100,
    currency: '€',
    images: [],
    inStock: true,
  },
  {
    _id: 'mock5',
    title: 'Lumière Intérieure',
    slug: { current: 'mock-5' },
    type: 'derivative',
    support: 'papier',
    year: '2023',
    price: 420,
    currency: '€',
    images: [],
    inStock: true,
  },
  {
    _id: 'mock6',
    title: 'Géographie du Vide',
    slug: { current: 'mock-6' },
    type: 'original',
    support: 'huile',
    year: '2023',
    price: 5800,
    currency: '€',
    images: [],
    inStock: true,
  },
]

export const MOCK_ARTWORK_DETAIL: Record<string, Artwork> = {
  'mock-1': { ...MOCK_ARTWORKS[0] },
  'mock-2': { ...MOCK_ARTWORKS[1], title: 'Texture Urbaine (Étude)' },
}

export const MOCK_POSTS: Post[] = [
  {
    _id: 'p1',
    title: 'Le Silence comme Matière',
    slug: { current: 'silence' },
    publishedAt: new Date().toISOString(),
    tags: ['PHILOSOPHIE'],
    author: "L'Artiste",
    teaser:
      "Une exploration du silence comme composante plastique fondamentale de l'œuvre contemporaine.",
  },
  {
    _id: 'p2',
    title: "L'Émotion face au Vide",
    slug: { current: 'vide' },
    publishedAt: new Date().toISOString(),
    tags: ['PROCESSUS'],
    author: "L'Artiste",
    teaser:
      "Comment le vide devient matière et la matière s'efface dans l'espace de la contemplation.",
  },
]
