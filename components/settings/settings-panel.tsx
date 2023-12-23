import { CSSProperties } from "react";
import { Button } from "../ui/button";
import { useSettingsStore } from "@/store/settings-store";
import { useTranslation } from "react-i18next";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export interface SettingsPanelProps {
  style?: CSSProperties;
  className?: string;
  onClose?: () => void;
}

export default function SettingsPanel(props: SettingsPanelProps) {
  const { onClose, className, style } = props;
  const { t } = useTranslation("settings");

  return (
    <div className={className} style={style}>
      <div className="flex flex-col gap-2 text-center sm:text-start">
        <div className="text-lg font-semibold text-foreground">Edit profile</div>
        <div className="text-sm text-muted-foreground">
          Make changes to your profile here. Click save when you are done.
          <br />
          默认对话上下文长度
          <br />
          情感参数
        </div>
      </div>
      <div className="grid gap-4 py-4"></div>
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
        <Button type="submit">Save changes</Button>
      </div>
      <div className="flex flex-col gap-2 text-center sm:text-start">
        <div className="text-lg font-semibold text-foreground">{t("panel.interfaceSettings")}</div>
      </div>
      <div className="grid gap-4 py-4">
        TODO upgrade shadcn
        <Label>
          Swap wrap and send
          <Switch></Switch>
        </Label>
      </div>
    </div>
  );
}
