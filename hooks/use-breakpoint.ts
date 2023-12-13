import { createBreakpoint } from "react-use";

const originUseBreakpoint = createBreakpoint({
  "sm": 0,
  "md": 640,
  "lg": 768,
  "xl": 1024,
  "2xl": 1280,
});

const breakpointSort = ["sm", "md", "lg", "xl", "2xl"] as const;
export type Breakpoint = (typeof breakpointSort)[number];

export function useBreakpoint() {
  const bp = originUseBreakpoint() as Breakpoint;

  function greaterOrEqual(breakpoint: Breakpoint) {
    return breakpointSort.indexOf(breakpoint) <= breakpointSort.indexOf(bp);
  }

  function greater(breakpoint: Breakpoint) {
    return breakpointSort.indexOf(breakpoint) < breakpointSort.indexOf(bp);
  }

  function smallerOrEqual(breakpoint: Breakpoint) {
    return breakpointSort.indexOf(breakpoint) >= breakpointSort.indexOf(bp);
  }

  function smaller(breakpoint: Breakpoint) {
    return breakpointSort.indexOf(breakpoint) > breakpointSort.indexOf(bp);
  }

  return {
    breakpoint: bp,
    greater,
    greaterOrEqual,
    smaller,
    smallerOrEqual,
  };
}
