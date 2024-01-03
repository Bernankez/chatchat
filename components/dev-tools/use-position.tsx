import { type RefObject, useMemo, useState, useEffect } from "react";
import useDraggable from "@/hooks/use-draggable";
import { useEventListener } from "ahooks";

export type Side = "top" | "bottom" | "left" | "right";

export interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

function useXY(target: RefObject<HTMLElement>) {
  const [_x, _y, isDragging] = useDraggable(target);
  const [{ x: realtimeX, y: realtimeY }, setXY] = useState({ x: 0, y: 0 });
  const [x, y] = useMemo(() => {
    if (isDragging) {
      return [_x, _y];
    }
    return [realtimeX, realtimeY];
  }, [isDragging, _x, _y, realtimeX, realtimeY]);

  return [x, y, isDragging, setXY] as const;
}

export function usePosition(target: RefObject<HTMLElement>) {
  const [x, y, isDragging, setXY] = useXY(target);
  const [{ w, h }, setWH] = useState({ w: 0, h: 0 });
  const [side, setSide] = useState<Side>("top");
  useEffect(() => {
    setWH({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  useEventListener("resize", () => {
    setWH({ w: window.innerWidth, h: window.innerHeight });
  });

  const position = useMemo(() => {
    const bounded = bound(x, y);
    const sticked = sticky(...bounded);
    const [_x, _y, side] = sticked;
    setXY({ x: _x, y: _y });
    setSide(side);
    console.log({ x, y, side });
    const positioned = transformPosition(...sticked);
    const percented = transformPercent(positioned);
    return percented;
  }, [x, y]);

  function bound(x: number, y: number): [number, number] {
    if (target.current) {
      const { width, height } = target.current.getBoundingClientRect();
      return [Math.min(Math.max(0, x), w - width), Math.min(Math.max(0, y), h - height)];
    }
    return [x, y];
  }

  function sticky(x: number, y: number): [number, number, Side] {
    if (target.current) {
      const left = x;
      const top = y;
      const right = w - left - target.current.offsetWidth;
      const bottom = h - top - target.current.offsetHeight;
      const min = Math.min(left, top, right, bottom);
      switch (min) {
        case left:
          return [0, y, "left"];
        case top:
          return [x, 0, "top"];
        case right:
          return [w - target.current.offsetWidth, y, "right"];
        case bottom:
          return [x, h - target.current.offsetHeight, "bottom"];
      }
    }
    return [x, y, "top"];
  }

  function transformPosition(x: number, y: number, side: Side): Position {
    switch (side) {
      case "top":
        return { top: 0, left: x };
      case "bottom":
        return { bottom: 0, left: x };
      case "left":
        return { left: 0, top: y };
      case "right":
        return { right: 0, top: y };
    }
  }

  function transformPercent(position: Position) {
    const { top, bottom, left, right } = position;
    if (w === 0 || h === 0) {
      return { bottom: "0", left: "48%" };
    }
    const percent: Partial<Record<keyof Position, string>> = {};
    if (top !== undefined) {
      percent.top = `${(top / h) * 100}%`;
    }
    if (bottom !== undefined) {
      percent.bottom = `${(bottom / h) * 100}%`;
    }
    if (left !== undefined) {
      percent.left = `${(left / w) * 100}%`;
    }
    if (right !== undefined) {
      percent.right = `${(right / w) * 100}%`;
    }
    return percent;
  }

  return { ...position, isDragging, side };
}
