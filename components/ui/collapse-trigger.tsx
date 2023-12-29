import { Slot } from "@radix-ui/react-slot";
import { Button, ButtonProps } from "./button";
import { useContext } from "react";
import { CollapseContext } from "./collapse";
import { MouseEvent } from "react";

export interface CollapseTriggerProps extends ButtonProps {}

export default function CollapseTrigger({ asChild = false, onClick, ...props }: CollapseTriggerProps) {
  const { setOpen } = useContext(CollapseContext);

  function onCustomClick(e: MouseEvent<HTMLButtonElement>) {
    setOpen((open) => !open);
    onClick?.(e);
  }

  return asChild ? (
    <Slot onClick={onCustomClick} {...props} />
  ) : (
    <Button onClick={onCustomClick} {...props}>
      {props.children}
    </Button>
  );
}
