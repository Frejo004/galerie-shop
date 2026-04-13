'use client'

import * as Toast from '@radix-ui/react-toast'
import { X } from 'lucide-react'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface ToastData {
  id: number
  title: string
  description?: string
  variant?: 'default' | 'error'
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const toast = useCallback((data: Omit<ToastData, 'id'>) => {
    setToasts((prev) => [...prev, { ...data, id: Date.now() }])
  }, [])

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast.Provider swipeDirection="right" duration={4000}>
        {children}
        {toasts.map((t) => (
          <Toast.Root
            key={t.id}
            onOpenChange={(open) => { if (!open) remove(t.id) }}
            className={`
              flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg
              bg-[hsl(40,15%,97%)] border-[hsl(40,8%,84%)]
              data-[state=open]:animate-fade-up
              data-[state=closed]:opacity-0
              ${t.variant === 'error' ? 'border-red-200 bg-red-50' : ''}
            `}
          >
            <div className="flex-1 space-y-0.5">
              <Toast.Title className={`text-sm font-medium ${t.variant === 'error' ? 'text-red-700' : 'text-[hsl(24,10%,8%)]'}`}>
                {t.title}
              </Toast.Title>
              {t.description && (
                <Toast.Description className="text-xs text-[hsl(24,5%,50%)]">
                  {t.description}
                </Toast.Description>
              )}
            </div>
            <Toast.Close className="text-[hsl(24,5%,50%)] hover:text-[hsl(24,10%,8%)] transition-colors mt-0.5">
              <X className="w-3.5 h-3.5" />
            </Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]" />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
