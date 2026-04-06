import { create } from 'zustand'

export type ArtworkTypeFilter = 'all' | 'original' | 'derivative'
export type SupportFilter = 'all' | 'huile' | 'acrylique' | 'mixte' | 'papier' | 'numerique'

interface FilterStore {
  type: ArtworkTypeFilter
  support: SupportFilter
  searchQuery: string
  setType: (type: ArtworkTypeFilter) => void
  setSupport: (support: SupportFilter) => void
  setSearchQuery: (query: string) => void
  reset: () => void
}

export const useFilter = create<FilterStore>((set) => ({
  type: 'all',
  support: 'all',
  searchQuery: '',
  setType: (type) => set({ type }),
  setSupport: (support) => set({ support }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  reset: () => set({ type: 'all', support: 'all', searchQuery: '' }),
}))
