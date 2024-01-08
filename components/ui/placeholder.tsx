import { useMounted } from "@/hooks/use-mounted";
import { Skeleton } from "./skeleton";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

export interface PlaceholderProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  skeleton?: string | React.ReactNode;
}

const Placeholder = forwardRef<HTMLButtonElement, PlaceholderProps>(function Placeholder({ skeleton, ...props }, ref) {
  const mounted = useMounted();

  if (mounted) {
    return <Slot ref={ref} {...props} />;
  }

  if (typeof skeleton !== "string") {
    return skeleton;
  }

  return <Skeleton className={skeleton} style={props.style}></Skeleton>;
});

export default Placeholder;
