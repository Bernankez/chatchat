import { cn } from "@/lib/utils";
import { useControllableValue } from "ahooks";
import { Dispatch, SetStateAction, createContext, useEffect, useMemo, useState } from "react";

export interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface CollapseContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const CollapseContext = createContext<CollapseContextProps>({
  open: false,
  setOpen: () => {},
});

export default function Collapse({ children, className, ...props }: CollapseProps) {
  const [open, setOpen] = useControllableValue(props, {
    defaultValue: false,
    valuePropName: "open",
    trigger: "onOpenChange",
  });

  useEffect(() => {
    console.log(open);
  }, [open]);

  return (
    <CollapseContext.Provider value={{ open, setOpen }}>
      <div
        className={`${cn(
          className,
          "grid overflow-hidden rounded-sm",
          "transition-[grid-template-rows] ease-in-out duration-200",
          open ? "grid-rows-[auto_1fr]" : "grid-rows-[auto_0fr]",
        )}`}>
        {children}
      </div>
    </CollapseContext.Provider>
  );
}
