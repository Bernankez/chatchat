import { isDefined } from "@/lib/utils/is";
import { increaseWithUnit } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useMounted } from "../use-mounted";

export const breakpointsTailwind = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536,
};

export type Breakpoints<K extends string = string> = Record<K, number | string>;

export function useBreakpoint<K extends string>(breakpoints: Breakpoints<K>) {
  const [width, setWidth] = useState(0);
  const mounted = useMounted();

  function handler() {
    requestAnimationFrame(() => {
      setWidth(window.innerWidth);
    });
  }

  useEffect(() => {
    if (mounted) {
      window.addEventListener("resize", handler);
    }
    () => {
      if (mounted) {
        window.removeEventListener("resize", handler);
      }
    };
  }, [mounted]);

  function getValue(k: K, delta?: number) {
    let v = breakpoints[k];
    if (isDefined(delta)) {
      v = increaseWithUnit(v, delta);
    }
    if (typeof v === "number") {
      v = `${v}px`;
    }
    return v;
  }

  function match(query: string) {
    if (!mounted) {
      return false;
    }
    return window.matchMedia(query).matches;
  }

  function greaterOrEqual(k: K) {
    return match(`(min-width: ${getValue(k)})`);
  }

  function greater(k: K) {
    return match(`(min-width: ${getValue(k, 0.1)})`);
  }

  function smallerOrEqual(k: K) {
    return match(`(max-width: ${getValue(k)})`);
  }

  function smaller(k: K) {
    return match(`(max-width: ${getValue(k, -0.1)})`);
  }

  return {
    width,
    greaterOrEqual,
    greater,
    smallerOrEqual,
    smaller,
  };
}
