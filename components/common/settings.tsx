import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Icon } from "@iconify/react";
import TooltipButton from "../ui/tooltip-button";
import { Skeleton } from "../ui/skeleton";
import SettingsPanel from "./settings-panel";

export default function Settings() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return <Skeleton className="w-10 h-10"></Skeleton>;
  }

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <TooltipButton variant="outline" size="icon" tooltip="Settings">
          <Icon icon="lucide:settings" width="1.1rem"></Icon>
        </TooltipButton>
      </SheetTrigger>
      <SettingsPanel type="sheet"></SettingsPanel>
    </Sheet>
  );
}
