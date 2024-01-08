import { useEffect, useState } from "react";
import { getTargetElement, type BasicTarget } from "@/lib/utils/dom";
import { useEventListener } from "ahooks";

export type PointerType = "mouse" | "touch" | "pen";

export type Position = {
  x: number;
  y: number;
};

export interface UseDraggableOptions {
  /**
   * Only start the dragging when click on the element directly
   *
   * @default false
   */
  exact?: boolean;

  /**
   * Prevent events defaults
   *
   * @default false
   */
  preventDefault?: boolean;

  /**
   * Prevent events propagation
   *
   * @default false
   */
  stopPropagation?: boolean;

  /**
   * Element to attach `pointermove` and `pointerup` events to.
   *
   * @default window
   */
  draggingElement?: BasicTarget<HTMLElement | SVGElement | Window | Document>;

  /**
   * Handle that triggers the drag event
   *
   * @default target
   */
  handle?: BasicTarget<HTMLElement | SVGElement>;

  /**
   * Pointer types that listen to.
   *
   * @default ['mouse', 'touch', 'pen']
   */
  pointerTypes?: PointerType[];

  /**
   * Initial position of the element.
   *
   * @default { x: 0, y: 0 }
   */
  initialValue?: Position;

  /**
   * Callback when the dragging starts. Return `false` to prevent dragging.
   */
  onStart?: (position: Position, event: PointerEvent) => void | false;

  /**
   * Callback during dragging.
   */
  onMove?: (position: Position, event: PointerEvent) => void;

  /**
   * Callback when dragging end.
   */
  onEnd?: (position: Position, event: PointerEvent) => void;
}

export default function useDraggable(
  target: BasicTarget<HTMLElement | SVGElement>,
  options: UseDraggableOptions = {},
): readonly [number, number, boolean] {
  const draggingElement = options.draggingElement;
  const draggingHandle = options.handle ?? target;

  const [position, setPosition] = useState<Position>(options.initialValue ?? { x: 0, y: 0 });

  useEffect(() => {
    setPosition(options.initialValue ?? { x: 0, y: 0 });
  }, [options.initialValue]);

  const [pressedDelta, setPressedDelta] = useState<Position>();

  const filterEvent = (e: PointerEvent) => {
    if (options.pointerTypes) {
      return options.pointerTypes.includes(e.pointerType as PointerType);
    }
    return true;
  };

  const handleEvent = (e: PointerEvent) => {
    if (options.preventDefault) {
      e.preventDefault();
    }
    if (options.stopPropagation) {
      e.stopPropagation();
    }
  };

  const start = (e: PointerEvent) => {
    const element = getTargetElement(target);
    if (!filterEvent(e) || !element) {
      return;
    }
    if (options.exact && e.target !== element) {
      return;
    }
    const rect = element.getBoundingClientRect();
    const pos = {
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    };
    if (options.onStart?.(pos, e) === false) {
      return;
    }
    setPressedDelta(pos);
    handleEvent(e);
  };

  const move = (e: PointerEvent) => {
    if (!filterEvent(e)) {
      return;
    }
    if (!pressedDelta) {
      return;
    }
    setPosition({
      x: e.pageX - pressedDelta.x,
      y: e.pageY - pressedDelta.y,
    });
    options.onMove?.(position, e);
    handleEvent(e);
  };

  const end = (e: PointerEvent) => {
    if (!filterEvent(e)) {
      return;
    }
    if (!pressedDelta) {
      return;
    }
    setPressedDelta(undefined);
    options.onEnd?.(position, e);
    handleEvent(e);
  };

  useEventListener("pointerdown", start, { target: draggingHandle, capture: true });
  useEventListener("pointermove", move, { target: draggingElement, capture: true });
  useEventListener("pointerup", end, { target: draggingElement, capture: true });

  return [position.x, position.y, !!pressedDelta] as const;
}
