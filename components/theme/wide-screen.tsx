import { Icon } from "@iconify/react";
import { Toggle } from "../ui/toggle";
import { useSettingsStore } from "@/store/settings-store";
import TooltipButton from "../ui/tooltip-button";
import Placeholder from "../ui/placeholder";

export default function WideScreen() {
  const { wideScreenMode, setWideScreenMode } = useSettingsStore();

  return (
    <Placeholder skeleton="w-10 h-10">
      <Toggle asChild pressed={wideScreenMode} onPressedChange={setWideScreenMode}>
        <TooltipButton variant="outline" size="icon" tooltip="Wide Screen Mode">
          <Icon icon="lucide:move-horizontal" width="1.1rem"></Icon>
        </TooltipButton>
      </Toggle>
    </Placeholder>
  );
}
