'use client'

import { useFilter, ArtworkTypeFilter, SupportFilter } from '@/lib/filter-store'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'

const TYPES: { label: string; value: ArtworkTypeFilter }[] = [
  { label: 'Toutes', value: 'all' },
  { label: 'Pièces uniques', value: 'original' },
  { label: 'Éditions limitées', value: 'derivative' },
]

const SUPPORTS: { label: string; value: SupportFilter }[] = [
  { label: 'Tous supports', value: 'all' },
  { label: 'Huile', value: 'huile' },
  { label: 'Acrylique', value: 'acrylique' },
  { label: 'Technique mixte', value: 'mixte' },
  { label: 'Fine Art', value: 'papier' },
]

export default function GalleryFilters() {
  const { type, support, searchQuery, setType, setSupport, setSearchQuery, reset } = useFilter()

  return (
    <div className="flex flex-col gap-6 mb-12">

      {/* Recherche */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher une œuvre…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border border-border py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Effacer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filtres type */}
      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => setType(t.value)}
            className={cn(
              'px-4 py-2 text-xs tracking-wide border transition-all duration-200',
              type === t.value
                ? 'bg-foreground text-background border-foreground'
                : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filtres support */}
      <div className="flex flex-wrap gap-2">
        {SUPPORTS.map((s) => (
          <button
            key={s.value}
            onClick={() => setSupport(s.value)}
            className={cn(
              'px-3 py-1.5 text-xs border transition-all duration-200',
              support === s.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:border-muted-foreground'
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

    </div>
  )
}
