import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef, useContext } from "react";
import { CollapseContext } from "./collapse";

export interface CollapseContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CollapseContent = forwardRef<HTMLDivElement, CollapseContentProps>(function CollapseContent(
  { asChild = false, className, ...props },
  ref,
) {
  const { open } = useContext(CollapseContext);

  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={ref}
      className={`${cn(
        className,
        "transition-opacity ease-in-out duration-200",
        open ? "min-h-fit" : "opacity-0 min-h-0",
      )}`}
      {...props}></Comp>
  );
});

export default CollapseContent;
