import { useState, useRef, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const mediaQueryRef = useRef<MediaQueryList>();

  useEffect(() => {
    if (window) {
      mediaQueryRef.current = window.matchMedia(query);
    }
    listen();

    return () => {
      stopListen();
    };
  }, []);

  function handler(e: MediaQueryListEvent) {
    setMatches(e.matches);
  }

  function listen() {
    if (!mediaQueryRef.current) {
      return;
    }
    mediaQueryRef.current.addEventListener("change", handler);
  }

  function stopListen() {
    if (!mediaQueryRef.current) {
      return;
    }
    mediaQueryRef.current.removeEventListener("change", handler);
  }

  return matches;
}
