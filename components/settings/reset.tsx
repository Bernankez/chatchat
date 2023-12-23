import { Icon } from "@iconify/react";
import TooltipButton from "../ui/tooltip-button";
import { useSettingsStore } from "@/store/settings-store";
import { useTranslation } from "react-i18next";

export default function Reset() {
  const { t } = useTranslation("settings");
  const { reset } = useSettingsStore();

  return (
    <TooltipButton variant="outline" size="icon" tooltip={t("panel.resetInterfaceSettings")} onClick={reset}>
      <Icon icon="lucide:history" width="1.1rem"></Icon>
    </TooltipButton>
  );
}
