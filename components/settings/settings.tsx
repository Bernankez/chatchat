import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Icon } from "@iconify/react";
import TooltipButton from "../ui/tooltip-button";
import SettingsPanel from "./settings-panel";
import { useSettingsStore } from "@/store/settings-store";
import { breakpointsTailwind, useBreakpoint } from "@/hooks/use-breakpoint";
import Placeholder from "../ui/placeholder";
import { Toggle } from "../ui/toggle";
import { useTranslation } from "react-i18next";
import { InputEl } from "@/hooks/use-input-state";

export default function Settings() {
  const { setSettingsPanelOpen, settingsPanelOpen } = useSettingsStore();
  const { smaller } = useBreakpoint(breakpointsTailwind);
  const { t } = useTranslation("settings");

  return (
    <Placeholder skeleton="w-10 h-10">
      <Sheet modal={false} open={settingsPanelOpen} onOpenChange={setSettingsPanelOpen}>
        <Toggle asChild pressed={settingsPanelOpen} onPressedChange={setSettingsPanelOpen}>
          <SheetTrigger asChild>
            <TooltipButton variant="outline" size="icon" tooltip={t("settings")}>
              <Icon icon="lucide:settings" width="1.1rem"></Icon>
            </TooltipButton>
          </SheetTrigger>
        </Toggle>
        {smaller("lg") && (
          <SheetContent
            className="w-screen"
            onInteractOutside={(e) => {
              // Do not close sheet when toggle `Simple Input` settings
              if (e.type.includes("focusOutside") && ["textarea", "input"].includes((e.target as InputEl).type)) {
                e.preventDefault();
              }
            }}>
            <SettingsPanel></SettingsPanel>
          </SheetContent>
        )}
      </Sheet>
    </Placeholder>
  );
}
