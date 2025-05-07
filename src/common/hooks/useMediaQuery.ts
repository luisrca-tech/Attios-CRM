"use client";

import { useEffect, useRef, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));
  const matchMediaRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      matchMediaRef.current = window.matchMedia(query);
      setMatches(matchMediaRef.current.matches);

      const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
      matchMediaRef.current.addEventListener("change", handler);

      return () =>
        matchMediaRef.current?.removeEventListener("change", handler);
    }
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 1023px)");
}

export function useIsLargeScreen(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
