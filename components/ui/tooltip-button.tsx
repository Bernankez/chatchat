import { isDefined } from "@/lib/utils/is";
import { Button, ButtonProps } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { ReactNode, forwardRef } from "react";

export interface TooltipButtonProps extends ButtonProps {
  tooltip?: string | ReactNode;
  children?: React.ReactNode;
}

const TooltipButton = forwardRef<HTMLButtonElement, TooltipButtonProps>(function TooltipButton(
  { children, tooltip, ...props },
  ref,
) {
  if (isDefined(tooltip)) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button {...props} ref={ref}>
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button {...props} ref={ref}>
      {children}
    </Button>
  );
});

export default TooltipButton;
