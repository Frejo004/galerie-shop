'use client'

import { useFilter, ArtworkTypeFilter, SupportFilter } from '@/lib/filter-store'
import { cn } from '@/lib/utils'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

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
  const [filtersOpen, setFiltersOpen] = useState(false)

  const hasActive = type !== 'all' || support !== 'all' || !!searchQuery

  return (
    <div className="flex flex-col gap-5 mb-14">

      {/* ── Barre principale ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

        {/* Recherche */}
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(24,5%,50%)]" />
          <input
            type="text"
            placeholder="Rechercher une œuvre…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/70 border border-[hsl(40,8%,84%)] rounded-full py-2.5 pl-10 pr-10 text-sm text-[hsl(24,10%,8%)] placeholder:text-[hsl(24,5%,58%)] focus:outline-none focus:border-[hsl(24,10%,30%)] focus:bg-white transition-all duration-200"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[hsl(40,8%,86%)] flex items-center justify-center text-[hsl(24,5%,40%)] hover:text-[hsl(24,10%,8%)] transition-colors"
                aria-label="Effacer"
              >
                <X className="w-3 h-3" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Contrôles droite */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-medium tracking-[0.06em] uppercase transition-all duration-200',
              filtersOpen || hasActive
                ? 'bg-[hsl(24,10%,8%)] text-[hsl(40,15%,96%)] border-[hsl(24,10%,8%)]'
                : 'border-[hsl(40,8%,84%)] text-[hsl(24,5%,40%)] hover:border-[hsl(24,10%,30%)] hover:text-[hsl(24,10%,8%)]'
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filtres
            {hasActive && (
              <span className="w-4 h-4 rounded-full bg-[hsl(28,90%,55%)] text-white text-[9px] flex items-center justify-center font-bold">
                !
              </span>
            )}
          </button>

          {hasActive && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={reset}
              className="text-[0.65rem] tracking-[0.08em] uppercase font-medium text-[hsl(24,5%,50%)] hover:text-[hsl(24,10%,8%)] transition-colors underline underline-offset-4"
            >
              Réinit.
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Filtres dépliables ────────────────────────────────── */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 flex flex-col gap-5 rounded-2xl border border-[hsl(40,8%,84%)] p-5 bg-white/50">

              {/* Filtres type */}
              <div>
                <p className="label-category mb-3">Type</p>
                <div className="flex flex-wrap gap-2">
                  {TYPES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setType(t.value)}
                      className={cn(
                        'px-4 py-1.5 rounded-full text-[0.7rem] font-medium tracking-[0.06em] uppercase border transition-all duration-200',
                        type === t.value
                          ? 'bg-[hsl(24,10%,8%)] text-[hsl(40,15%,96%)] border-[hsl(24,10%,8%)] shadow-sm'
                          : 'border-[hsl(40,8%,84%)] text-[hsl(24,5%,45%)] hover:border-[hsl(24,10%,30%)] hover:text-[hsl(24,10%,8%)]'
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtres support */}
              <div>
                <p className="label-category mb-3">Support</p>
                <div className="flex flex-wrap gap-2">
                  {SUPPORTS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSupport(s.value)}
                      className={cn(
                        'px-3.5 py-1.5 rounded-full text-[0.7rem] font-medium tracking-[0.06em] uppercase border transition-all duration-200',
                        support === s.value
                          ? 'bg-[hsl(28,90%,55%)] text-white border-[hsl(28,90%,55%)] shadow-sm'
                          : 'border-[hsl(40,8%,84%)] text-[hsl(24,5%,45%)] hover:border-[hsl(24,10%,30%)] hover:text-[hsl(24,10%,8%)]'
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
