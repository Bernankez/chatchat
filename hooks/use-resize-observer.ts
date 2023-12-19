import { useEffect, useRef } from "react";

export function useResizeObserver(
  el: HTMLElement | undefined | null,
  cb: ResizeObserverCallback,
  options?: ResizeObserverOptions,
) {
  const observerRef = useRef<ResizeObserver | undefined>();

  useEffect(() => {
    if (observerRef.current) {
      return;
    }

    if (el) {
      observerRef.current = new ResizeObserver(cb);
      observerRef.current.observe(el, options);
    }

    return () => {
      if (el) {
        observerRef.current?.unobserve(el);
      }
    };
  }, [el]);
}
