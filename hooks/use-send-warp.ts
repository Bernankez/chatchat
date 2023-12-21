import { useRef } from "react";
import { useKeyCombo } from "./use-key-combo";
import { ENTER, SHIFT_ENTER, useKeys } from "./use-keys";

export interface UseSendWarp<E extends HTMLElement> {
  el?: E | null;
  send?: () => void;
  warp?: () => void;
}

export default function useSendWarp<E extends HTMLElement>(options?: UseSendWarp<E>) {
  const { el, send, warp } = options || {};
  const isSendRef = useRef(false);
  const isWarpRef = useRef(false);
  const { send: sendKey } = useKeys();
  const elRef = useRef(el);

  // Update current elRef
  elRef.current = el;

  const se = useKeyCombo("Shift > Enter", {
    preventDefault: true,
    filter: () => {
      if (elRef.current) {
        return document.activeElement === elRef.current;
      }
    },
    onPressedWithRepeat(isPressed) {
      if (isPressed) {
        if (sendKey === SHIFT_ENTER) {
          send?.();
        } else {
          warp?.();
        }
      }
    },
  });

  const e = useKeyCombo("Enter", {
    preventDefault: true,
    filter: () => {
      if (elRef.current) {
        return document.activeElement === elRef.current;
      }
    },
    onPressedWithRepeat(isPressed) {
      if (isPressed) {
        if (sendKey === ENTER) {
          send?.();
        } else {
          warp?.();
        }
      }
    },
  });

  if (sendKey === SHIFT_ENTER) {
    isSendRef.current = se.isPressed;
    isWarpRef.current = e.isPressed;
  } else {
    isSendRef.current = e.isPressed;
    isWarpRef.current = se.isPressed;
  }

  return {
    isSend: isSendRef.current,
    isWarp: isWarpRef.current,
    isEnter: e.isPressed,
    isShiftEnter: se.isPressed,
  };
}
