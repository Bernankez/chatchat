"use client";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDevStore } from "@/store/dev-store";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Icon } from "@iconify/react";
import { usePosition } from "./use-position";
import { Button } from "../ui/button";
import { createStore } from "@/store/storage";
import { clear } from "idb-keyval";
import { toast } from "sonner";
import clsx from "clsx";

export default function DevTools() {
  const [open, setOpen] = useState(false);
  const { mounted, setMounted } = useDevStore();
  const divRef = useRef<HTMLDivElement>(null);
  const { isDragging, side, ...position } = usePosition(divRef);

  function deleteDatabase() {
    const store = createStore();
    clear(store).then(() => {
      toast("Database deleted. Refresh to take effect.", {
        duration: Infinity,
        action: {
          label: "Refresh",
          onClick: () => {
            window.location.reload();
          },
        },
      });
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <div
          ref={divRef}
          style={position}
          className={clsx([
            `z-999 fixed shadow-lg p-2 rounded-full bg-background touch-none select-none cursor-pointer hover:opacity-100`,
            open || isDragging ? "opacity-100" : "opacity-50",
          ])}>
          <Icon icon="fluent-emoji:ghost" width="2rem" className="pointer-events-none"></Icon>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3">
        <div className="font-bold text-xl">chatchat DevTools</div>
        <div className="flex items-center justify-between">
          <Label>Toggle Mounted</Label>
          <Switch checked={mounted} onCheckedChange={setMounted}></Switch>
        </div>
        <div className="flex items-center justify-between">
          <Label>Delete Database</Label>
          <Button variant="destructive" size="sm" onClick={deleteDatabase}>
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
