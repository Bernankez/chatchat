import { Icon } from "@iconify/react";
import TooltipButton from "../ui/tooltip-button";
import { useSettingsStore } from "@/store/settings-store";
import { useTranslation } from "react-i18next";

export default function Reset() {
  const { t } = useTranslation("settings");
  const { resetInterfaceSettings } = useSettingsStore();

  return (
    <TooltipButton
      variant="ghost"
      size="icon"
      tooltip={t("panel.resetInterfaceSettings")}
      onClick={resetInterfaceSettings}>
      <Icon icon="lucide:rotate-cw" width="1.1rem"></Icon>
    </TooltipButton>
  );
}
