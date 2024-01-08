import { KeyboardEvent } from "react";
import { InputEl } from "./use-input-state";
import { ENTER, SHIFT_ENTER, useKeys } from "./use-keys";

export interface UseSendWrap {
  send?: () => void;
  wrap?: () => void;
}

// It's hard to handle scroll when enter shift+enter
// So use native enter event
export default function useSendWrap(options?: UseSendWrap) {
  const { send, wrap } = options || {};
  const { send: sendKey, wrap: wrapKey } = useKeys();

  function onKeyDown(e: KeyboardEvent<InputEl>) {
    if (e.key === "Enter" && e.shiftKey) {
      // shift_enter
      if (sendKey === SHIFT_ENTER) {
        e.preventDefault();
        send?.();
      } else if (wrapKey === SHIFT_ENTER) {
        wrap?.();
      }
    } else if (e.key === "Enter") {
      // enter
      if (sendKey === ENTER) {
        e.preventDefault();
        send?.();
      } else if (wrapKey === ENTER) {
        wrap?.();
      }
    }
  }

  return {
    onKeyDown,
  };
}
