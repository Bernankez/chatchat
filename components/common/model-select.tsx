import { modelList } from "@/lib/const";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export type ModelSelectProps<T extends string> = {
  value: T;
  onValueChange: (value: T) => void;
};

export default function ModelSelect<T extends string = string>(props: ModelSelectProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-muted-foreground">
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
