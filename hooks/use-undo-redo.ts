import { useRef } from "react";
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

  const u = useKeyCombo("Meta + z", {
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
  isUndoRef.current = u.isPressed;

  const r = useKeyCombo("Shift + Meta + z", {
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
  isRedoRef.current = r.isPressed;

  return {
    // If both redo and undo are true, it is considered a redo
    isUndo: isUndoRef.current && !(isUndoRef.current && isRedoRef.current),
    isRedo: isRedoRef.current,
  };
}
