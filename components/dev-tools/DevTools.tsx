"use client";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import useDraggable from "@/hooks/use-draggable";
import { useDevStore } from "@/store/dev-store";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export default function DevTools() {
  const [open, setOpen] = useState(false);
  const { mounted, setMounted } = useDevStore();
  const divRef = useRef<HTMLDivElement>(null);
  const [x, y, isDragging] = useDraggable(divRef, {
    onStart() {
      return false;
    },
    onMove() {},
    onEnd() {},
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          ref={divRef}
          style={{ left: x, top: y }}
          className={`z-999 fixed shadow-md px-2 py-1 rounded-sm bg-background touch-none select-none ${
            isDragging ? "cursor-move" : "cursor-pointer"
          }`}>
          DevTools
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Label className="flex items-center justify-between">
          Toggle Mounted
          <Switch checked={mounted} onCheckedChange={setMounted}></Switch>
        </Label>
      </PopoverContent>
    </Popover>
  );
}
