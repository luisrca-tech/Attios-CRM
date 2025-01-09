'use client'

import { useEffect, useMemo, useState } from 'react'

export function useMediaQuery(query: string): boolean {
 const mediaQuery = useMemo(() => 
    typeof window !== 'undefined' ? window.matchMedia(query) : null
  , [query])

  const [matches, setMatches] = useState<boolean>(() => 
    mediaQuery ? mediaQuery.matches : false
  )

  useEffect(() => {
    if (!mediaQuery) return

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    mediaQuery.addEventListener('change', handler)
    
    return () => mediaQuery.removeEventListener('change', handler)
  }, [mediaQuery])

  return matches
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}