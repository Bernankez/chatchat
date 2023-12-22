import { useRef } from "react";
import { useKeyCombo } from "./use-key-combo";
import { ENTER, SHIFT_ENTER, useKeys } from "./use-keys";

export interface UseSendWrap<E extends HTMLElement> {
  el?: E | null;
  send?: () => void;
  wrap?: () => void;
}

export default function useSendWrap<E extends HTMLElement>(options?: UseSendWrap<E>) {
  const { el, send, wrap } = options || {};
  const isSendRef = useRef(false);
  const isWrapRef = useRef(false);
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
          wrap?.();
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
          wrap?.();
        }
      }
    },
  });

  if (sendKey === SHIFT_ENTER) {
    isSendRef.current = se.isPressed;
    isWrapRef.current = e.isPressed;
  } else {
    isSendRef.current = e.isPressed;
    isWrapRef.current = se.isPressed;
  }

  return {
    isSend: isSendRef.current,
    isWrap: isWrapRef.current,
    isEnter: e.isPressed,
    isShiftEnter: se.isPressed,
  };
}
