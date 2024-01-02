import type { MutableRefObject } from "react";
import { useEffect, useState } from "react";
import { isBrowser, isFunction } from "./is";

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document | EventTarget;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
  if (!isBrowser) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue<T>;

  if (isFunction(target)) {
    targetElement = target();
  } else if ("current" in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}

export function useLatestElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
  const [latestElement, setLatestElement] = useState(getTargetElement(target, defaultElement));

  useEffect(() => {
    setLatestElement(getTargetElement(target, defaultElement));
  }, [target, defaultElement]);

  return latestElement;
}
