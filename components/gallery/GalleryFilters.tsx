'use client'

import { useFilter, ArtworkTypeFilter, SupportFilter } from '@/lib/filter-store'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'

export default function GalleryFilters() {
  const { type, support, searchQuery, setType, setSupport, setSearchQuery, reset } = useFilter()

  const supports: { label: string; value: SupportFilter }[] = [
    { label: 'Tous Supports', value: 'all' },
    { label: 'Huile', value: 'huile' },
    { label: 'Acrylique', value: 'acrylique' },
    { label: 'Technique Mixte', value: 'mixte' },
    { label: 'Fine Art', value: 'papier' },
  ]

  const types: { label: string; value: ArtworkTypeFilter }[] = [
    { label: 'Toutes les Œuvres', value: 'all' },
    { label: 'Pièces Uniques', value: 'original' },
    { label: 'Éditions Limitées', value: 'derivative' },
  ]

  return (
    <div className="flex flex-col items-center gap-8 sm:gap-12 w-full max-w-4xl mx-auto mb-16 sm:mb-20 px-4 sm:px-6">
      
      {/* Search Input */}
      <div className="relative w-full max-w-md group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="RECHERCHER..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-12 text-[10px] tracking-[0.2em] font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all uppercase"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Filter Categories */}
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] uppercase font-bold tracking-[0.4em] text-white/30">
        {types.map((t) => (
          <button
            key={t.value}
            onClick={() => setType(t.value)}
            className={cn(
              "pb-1 transition-all duration-500 hover:text-white",
              type === t.value ? "text-primary border-b border-primary" : "border-b border-transparent"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sub Filter: Support */}
      <div className="flex flex-wrap justify-center gap-8">
        {supports.map((s) => (
          <button
            key={s.value}
            onClick={() => setSupport(s.value)}
            className={cn(
              "text-[9px] tracking-[0.2em] uppercase transition-all py-1 px-3 border",
              support === s.value 
                ? "bg-white/10 border-white/20 text-white" 
                : "border-transparent text-white/30 hover:text-white"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

    </div>
  )
}
