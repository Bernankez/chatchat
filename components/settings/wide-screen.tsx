import { Icon } from "@iconify/react";
import { Toggle } from "../ui/toggle";
import { useSettingsStore } from "@/store/settings-store";
import TooltipButton from "../ui/tooltip-button";
import Placeholder from "../ui/placeholder";
import { useTranslation } from "react-i18next";

export default function WideScreen() {
  const { wideScreenMode, setWideScreenMode } = useSettingsStore();
  const { t } = useTranslation("settings");

  return (
    <Placeholder skeleton="w-10 h-10">
      <Toggle asChild pressed={wideScreenMode} onPressedChange={setWideScreenMode}>
        <TooltipButton variant="ghost" size="icon" tooltip={t("wideScreenMode")}>
          <Icon icon="lucide:move-horizontal" width="1.1rem"></Icon>
        </TooltipButton>
      </Toggle>
    </Placeholder>
  );
}
