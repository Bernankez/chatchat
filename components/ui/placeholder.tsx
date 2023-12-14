import { useMounted } from "@/hooks/use-mounted";
import { Skeleton } from "./skeleton";

export interface PlaceholderProps {
  children?: React.ReactNode;
  skeleton?: string | React.ReactNode;
}

export default function Placeholder({ children, skeleton }: PlaceholderProps) {
  const mounted = useMounted();

  if (mounted) {
    return children;
  }

  if (typeof skeleton !== "string") {
    return skeleton;
  }

  return <Skeleton className={skeleton}></Skeleton>;
}
