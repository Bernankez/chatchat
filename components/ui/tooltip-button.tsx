import { isDefined } from "@/lib/is";
import { Button, ButtonProps } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { ReactNode } from "react";

export interface TooltipButtonProps extends ButtonProps {
  tooltip?: string | ReactNode;
  children?: React.ReactNode;
}

export default function TooltipButton({ children, tooltip, ...props }: TooltipButtonProps) {
  if (isDefined(tooltip)) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button {...props}>{children}</Button>
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <Button {...props}>{children}</Button>;
}
