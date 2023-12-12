import { modelList } from "@/lib/const";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export type ModelSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export default function ModelSelect(props: ModelSelectProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-muted-foreground">
          {props.value}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={props.value} onValueChange={props.onValueChange}>
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
