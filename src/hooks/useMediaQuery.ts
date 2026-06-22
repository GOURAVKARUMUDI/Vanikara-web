import { useState, useEffect } from "react";

/**
 * useMediaQuery: A client-safe React hook to evaluate CSS media queries.
 * Prevents Next.js SSR hydration mismatches by returning false until mounted.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query, matches]);

  return mounted ? matches : false;
}
