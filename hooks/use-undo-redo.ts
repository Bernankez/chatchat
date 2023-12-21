import { useRef, useState } from "react";
import { useKeyCombo } from "./use-key-combo";

export interface UseUndoRedoOptions<E extends HTMLElement> {
  el?: E | null;
  undo?: () => void;
  redo?: () => void;
}

export function useUndoRedo<E extends HTMLElement>(options?: UseUndoRedoOptions<E>) {
  const { undo, redo, el } = options || {};
  const isUndoRef = useRef(false);
  const isRedoRef = useRef(false);
  const elRef = useRef(el);

  // Update current elRef
  elRef.current = el;

  isUndoRef.current = useKeyCombo("Meta + z", {
    preventDefault: true,
    filter: () => {
      if (elRef.current) {
        return document.activeElement === elRef.current;
      }
    },
    onPressedWithRepeat: (isPressed) => {
      if (isPressed) {
        if (isUndoRef.current && isRedoRef.current) {
          // If both redo and undo are true, it is considered a redo
          // Do nothing
        } else {
          undo?.();
        }
      }
    },
  });

  isRedoRef.current = useKeyCombo("Shift + Meta + z", {
    preventDefault: true,
    filter: () => {
      if (elRef.current) {
        return document.activeElement === elRef.current;
      }
    },
    onPressedWithRepeat: (isPressed) => {
      if (isPressed) {
        redo?.();
      }
    },
  });

  return {
    // If both redo and undo are true, it is considered a redo
    isUndo: isUndoRef.current && !(isUndoRef.current && isRedoRef.current),
    isRedo: isRedoRef.current,
  };
}
