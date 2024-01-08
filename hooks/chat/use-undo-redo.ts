import { KeyboardEvent } from "react";
import { InputEl } from "./use-input-state";
import { isMacOS } from "@/lib/utils/is";

export interface UseUndoRedoOptions {
  undo?: () => void;
  redo?: () => void;
}

export function useUndoRedo(options?: UseUndoRedoOptions) {
  const { undo, redo } = options || {};

  function onKeyDown(e: KeyboardEvent<InputEl>) {
    if (e.key === "z") {
      if ((e.metaKey && isMacOS()) || (e.ctrlKey && !isMacOS())) {
        e.preventDefault();
        if (e.shiftKey) {
          // redo
          redo?.();
        } else {
          // undo
          undo?.();
        }
      }
    }
  }

  return { onKeyDown };
}
