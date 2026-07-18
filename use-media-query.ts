"use client";

import { useEffect, useState } from "react";

/** Tracks whether a CSS media query currently matches, updating on resize. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/** Convenience hook: true when viewport is below the `lg` breakpoint. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 1023px)");
}
