export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-05'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Valeur par défaut pour éviter le plantage lors du développement local sans .env
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id'

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined && process.env.NODE_ENV === 'production') {
    throw new Error(errorMessage)
  }

  return (v || '') as unknown as T
}
