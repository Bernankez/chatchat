import { modelList } from "@/lib/utils/const";
import { Button, ButtonProps } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface ModelSelectProps<T extends string> extends ButtonProps {
  value: T;
  onValueChange: (value: T) => void;
}

export default function ModelSelect<T extends string = string>(props: ModelSelectProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn("text-muted-foreground", props.className)}>
          {props.value}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={props.value} onValueChange={(value) => props.onValueChange(value as T)}>
          {modelList.map((model) => (
            <DropdownMenuRadioItem value={model} key={model}>
              {model}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
