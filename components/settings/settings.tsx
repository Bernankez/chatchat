import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Icon } from "@iconify/react";
import TooltipButton from "../ui/tooltip-button";
import SettingsPanel from "./settings-panel";
import { useSettingsStore } from "@/store/settings-store";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import Placeholder from "../ui/placeholder";
import { Toggle } from "../ui/toggle";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { setSettingsPanelOpen, settingsPanelOpen } = useSettingsStore();
  const { smaller } = useBreakpoint();
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
        {smaller("xl") && (
          <SheetContent className="w-screen">
            <SettingsPanel></SettingsPanel>
          </SheetContent>
        )}
      </Sheet>
    </Placeholder>
  );
}
