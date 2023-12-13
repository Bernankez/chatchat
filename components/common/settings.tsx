import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Icon } from "@iconify/react";
import TooltipButton from "../ui/tooltip-button";
import { Skeleton } from "../ui/skeleton";
import SettingsPanel from "./settings-panel";
import { useSettingsStore } from "@/store/settings-store";
import { useBreakpoint } from "@/hooks/use-breakpoint";

export default function Settings() {
  const [mounted, setMounted] = useState(false);
  const { setSettingsPanelOpen, settingsPanelOpen } = useSettingsStore();
  const { smaller } = useBreakpoint();

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return <Skeleton className="w-10 h-10"></Skeleton>;
  }

  return (
    <Sheet modal={false} open={settingsPanelOpen} onOpenChange={setSettingsPanelOpen}>
      <SheetTrigger asChild>
        <TooltipButton
          variant="outline"
          size="icon"
          tooltip="Settings"
          onClick={() => setSettingsPanelOpen(!settingsPanelOpen)}>
          <Icon icon="lucide:settings" width="1.1rem"></Icon>
        </TooltipButton>
      </SheetTrigger>
      {smaller("xl") && (
        <SheetContent className="w-screen">
          <SettingsPanel></SettingsPanel>
        </SheetContent>
      )}
    </Sheet>
  );
}
