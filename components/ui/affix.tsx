import { useResizeObserver } from "@/hooks/ui/use-resize-observer";
import clsx from "clsx";
import React from "react";

const TRIGGER_EVENTS = ["resize", "scroll", "touchstart", "touchmove", "touchend", "pageshow", "load"] as const;

function getDefaultTarget() {
  return typeof window !== "undefined" ? window : null;
}

// Affix
export interface AffixProps {
  /** Triggered when the specified offset is reached from the top of the window */
  offsetTop?: number;
  /** Triggered when the specified offset is reached from the bottom of the window */
  offsetBottom?: number;
  style?: React.CSSProperties;
  /** Callback function triggered when fixed state changes */
  onChange?: (affixed?: boolean) => void;
  /** Set the element that Affix needs to listen to its scroll event, the value is a function that returns the corresponding DOM element */
  target?: () => Window | HTMLElement | null;
  className?: string;
  rootClassName?: string;
  children: React.ReactNode;
}

enum AffixStatus {
  None,
  Prepare,
}

interface AffixState {
  affixStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  status: AffixStatus;
  lastAffix: boolean;
  prevTarget: Window | HTMLElement | null;
}

export interface AffixRef {
  updatePosition: ReturnType<typeof throttleByAnimationFrame>;
}

const Affix = React.forwardRef<AffixRef, AffixProps>((props, ref) => {
  const { style, offsetTop, offsetBottom, className, rootClassName, children, target, onChange } = props;

  const [lastAffix, setLastAffix] = React.useState(false);
  const [affixStyle, setAffixStyle] = React.useState<React.CSSProperties>();
  const [placeholderStyle, setPlaceholderStyle] = React.useState<React.CSSProperties>();

  const status = React.useRef<AffixStatus>(AffixStatus.None);

  const prevTarget = React.useRef<Window | HTMLElement | null>(null);
  const prevListener = React.useRef<EventListener>();

  const placeholderNodeRef = React.useRef<HTMLDivElement>(null);
  const fixedNodeRef = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const targetFunc = target ?? getDefaultTarget;

  const internalOffsetTop = offsetBottom === undefined && offsetTop === undefined ? 0 : offsetTop;

  // =================== Measure ===================
  const measure = () => {
    if (status.current !== AffixStatus.Prepare || !fixedNodeRef.current || !placeholderNodeRef.current || !targetFunc) {
      return;
    }

    const targetNode = targetFunc();
    if (targetNode) {
      const newState: Partial<AffixState> = {
        status: AffixStatus.None,
      };
      const placeholderRect = getTargetRect(placeholderNodeRef.current);

      if (
        placeholderRect.top === 0 &&
        placeholderRect.left === 0 &&
        placeholderRect.width === 0 &&
        placeholderRect.height === 0
      ) {
        return;
      }

      const targetRect = getTargetRect(targetNode);
      const fixedTop = getFixedTop(placeholderRect, targetRect, internalOffsetTop);
      const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom);

      if (fixedTop !== undefined) {
        newState.affixStyle = {
          position: "fixed",
          top: fixedTop,
          width: placeholderRect.width,
          height: placeholderRect.height,
        };
        newState.placeholderStyle = {
          width: placeholderRect.width,
          height: placeholderRect.height,
        };
      } else if (fixedBottom !== undefined) {
        newState.affixStyle = {
          position: "fixed",
          bottom: fixedBottom,
          width: placeholderRect.width,
          height: placeholderRect.height,
        };
        newState.placeholderStyle = {
          width: placeholderRect.width,
          height: placeholderRect.height,
        };
      }

      newState.lastAffix = !!newState.affixStyle;

      if (lastAffix !== newState.lastAffix) {
        onChange?.(newState.lastAffix);
      }

      status.current = newState.status!;
      setAffixStyle(newState.affixStyle);
      setPlaceholderStyle(newState.placeholderStyle);
      setLastAffix(newState.lastAffix);
    }
  };

  const prepareMeasure = () => {
    status.current = AffixStatus.Prepare;
    measure();
    if (process.env.NODE_ENV === "test") {
      (props as any)?.onTestUpdatePosition?.();
    }
  };

  const updatePosition = throttleByAnimationFrame(() => prepareMeasure());
  useResizeObserver(placeholderNodeRef.current, updatePosition);

  const lazyUpdatePosition = throttleByAnimationFrame(() => {
    // Check position change before measure to make Safari smooth
    if (targetFunc && affixStyle) {
      const targetNode = targetFunc();
      if (targetNode && placeholderNodeRef.current) {
        const targetRect = getTargetRect(targetNode);
        const placeholderRect = getTargetRect(placeholderNodeRef.current);
        const fixedTop = getFixedTop(placeholderRect, targetRect, internalOffsetTop);
        const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom);

        if (
          (fixedTop !== undefined && affixStyle.top === fixedTop) ||
          (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
        ) {
          return;
        }
      }
    }

    // Directly call prepare measure since it's already throttled.
    prepareMeasure();
  });

  const addListeners = () => {
    const listenerTarget = targetFunc?.();
    if (!listenerTarget) {
      return;
    }
    TRIGGER_EVENTS.forEach((eventName) => {
      if (prevListener.current) {
        prevTarget.current?.removeEventListener(eventName, prevListener.current);
      }
      listenerTarget?.addEventListener(eventName, lazyUpdatePosition);
    });
    prevTarget.current = listenerTarget;
    prevListener.current = lazyUpdatePosition;
  };

  const removeListeners = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    const newTarget = targetFunc?.();
    TRIGGER_EVENTS.forEach((eventName) => {
      newTarget?.removeEventListener(eventName, lazyUpdatePosition);
      if (prevListener.current) {
        prevTarget.current?.removeEventListener(eventName, prevListener.current);
      }
    });
    updatePosition.cancel();
    lazyUpdatePosition.cancel();
  };

  React.useImperativeHandle(ref, () => ({ updatePosition }));

  // mount & unmount
  React.useEffect(() => {
    // [Legacy] Wait for parent component ref has its value.
    // We should use target as directly element instead of function which makes element check hard.
    timer.current = setTimeout(addListeners);
    return () => removeListeners();
  }, []);

  React.useEffect(() => {
    addListeners();
  }, [target, affixStyle]);

  React.useEffect(() => {
    updatePosition();
  }, [target, offsetTop, offsetBottom]);

  return (
    <div style={style} className={className} ref={placeholderNodeRef}>
      {affixStyle && <div style={placeholderStyle} aria-hidden="true" />}
      <div className={clsx(rootClassName, className)} ref={fixedNodeRef} style={affixStyle}>
        {children}
      </div>
    </div>
  );
});

if (process.env.NODE_ENV !== "production") {
  Affix.displayName = "Affix";
}

export default Affix;

function throttleByAnimationFrame(fn: () => void) {
  let req = 0;
  const later = () => {
    fn();
    req = 0;
  };
  const throttled = () => {
    req = requestAnimationFrame(later);
  };
  throttled.cancel = () => {
    if (req) {
      cancelAnimationFrame(req);
      req = 0;
    }
  };
  return throttled;
}

type BindElement = HTMLElement | Window | null | undefined;

function getTargetRect(target: BindElement): DOMRect {
  return target !== window
    ? (target as HTMLElement).getBoundingClientRect()
    : ({ top: 0, bottom: window.innerHeight } as DOMRect);
}

function getFixedTop(placeholderRect: DOMRect, targetRect: DOMRect, offsetTop?: number) {
  if (offsetTop !== undefined && targetRect.top > placeholderRect.top - offsetTop) {
    return offsetTop + targetRect.top;
  }
  return undefined;
}

function getFixedBottom(placeholderRect: DOMRect, targetRect: DOMRect, offsetBottom?: number) {
  if (offsetBottom !== undefined && targetRect.bottom < placeholderRect.bottom + offsetBottom) {
    const targetBottomOffset = window.innerHeight - targetRect.bottom;
    return offsetBottom + targetBottomOffset;
  }
  return undefined;
}
