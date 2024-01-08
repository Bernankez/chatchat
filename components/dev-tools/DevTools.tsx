"use client";
import { Fragment, useRef, useState } from "react";
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
import { useRewriteConsole } from "./use-rewrite-console";
import { Separator } from "../ui/separator";
import { IdGenerator } from "@/lib/utils";

export default function DevTools() {
  const [open, setOpen] = useState(false);
  const { mounted, setMounted, log, rewriteConsole, setRewriteConsole } = useDevStore();
  useRewriteConsole(rewriteConsole);
  const divRef = useRef<HTMLDivElement>(null);
  // TODO fix position after resizing
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

  function format(...params: string[]) {
    const [f, ...args] = params;
    let i = 0;
    const len = args.length;
    return f.replace(/%[sdjf%]/g, (x) => {
      if (x === "%%") {
        return "%";
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]).toFixed(0);
        case "%f":
          return parseFloat(args[i++]).toString();
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (err) {
            return "[Circular]";
          }
        default:
          return x;
      }
    });
  }

  function handleLog(content: any[]) {
    try {
      if (content.length === 1) {
        const res = content[0];
        if (res instanceof Error) {
          return (
            <>
              <div>{res.message}</div>
              <div>{JSON.stringify(res)}</div>
            </>
          );
        } else if (typeof res === "string") {
          return <div>{res.trim()}</div>;
        } else {
          return <div>{res.toString()}</div>;
        }
      } else if (content.length > 0) {
        let strArr = true;
        for (const c in content) {
          if (typeof c !== "string") {
            strArr = false;
            break;
          }
        }
        if (strArr) {
          return <div>{format(...content)}</div>;
        }
        return (
          <div className="flex flex-col gap-1">
            {content.map((c) => (
              <div key={IdGenerator()}>{handleLog([c])}</div>
            ))}
          </div>
        );
      }
      return <div>{JSON.stringify(content)}</div>;
    } catch (e: any) {
      return (
        <div className="bg-red-50 text-red-500">
          [chatchat DevTools] Internal Error
          <div>{e.message}</div>
        </div>
      );
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
      <PopoverContent className="flex flex-col gap-3 w-[50rem]">
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
        <div className="flex items-center justify-between">
          <Label>Rewrite Console</Label>
          <Switch checked={rewriteConsole} onCheckedChange={setRewriteConsole}></Switch>
        </div>
        {rewriteConsole ? (
          <pre className="p-3 bg-muted rounded-sm">
            <div>Console</div>
            <div className="max-h-[20rem] overflow-y-auto">
              {log.map((l) => (
                <Fragment key={l.id}>
                  <Separator></Separator>
                  <div
                    className={clsx("break-word whitespace-pre-wrap", [
                      l.type === "error" ? "bg-red-50 text-red-500" : "",
                      l.type === "warn" ? "bg-yellow-50 text-yellow-500" : "",
                      l.type === "info" ? "bg-blue-50 text-blue-500" : "",
                    ])}>
                    {handleLog(l.content)}
                  </div>
                </Fragment>
              ))}
            </div>
          </pre>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
