import { cn } from "@/lib/utils";
import { useControllableValue } from "ahooks";
import { Dispatch, SetStateAction, createContext, forwardRef, useEffect, useMemo, useState } from "react";

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

const Collapse = forwardRef<HTMLDivElement, CollapseProps>(function Collapse({ children, className, ...props }, ref) {
  const [open, setOpen] = useControllableValue(props, {
    defaultValue: false,
    valuePropName: "open",
    trigger: "onOpenChange",
  });

  return (
    <CollapseContext.Provider value={{ open, setOpen }}>
      <div
        ref={ref}
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
});

export default Collapse;
