import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React, { useContext } from "react";
import { CollapseContext } from "./collapse";

export interface CollapseContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export default function CollapseContent({ asChild = false, className, ...props }: CollapseContentProps) {
  const { open } = useContext(CollapseContext);

  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={`${cn(
        className,
        "transition-opacity ease-in-out duration-200",
        open ? "min-h-fit" : "opacity-0 min-h-0",
      )}`}
      {...props}></Comp>
  );
}
