import { CSSProperties } from "react";
import { Button } from "../ui/button";
import { useSettingsStore } from "@/store/settings-store";
import { useTranslation } from "react-i18next";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import ChatSendWrap from "../chat/chat-send-wrap";
import Language from "./language";
import Reset from "./reset";

export interface SettingsPanelProps {
  style?: CSSProperties;
  className?: string;
  onClose?: () => void;
}

// TODO fix column direction
export default function SettingsPanel(props: SettingsPanelProps) {
  const { onClose, className, style } = props;
  const { t } = useTranslation("settings");
  const { swapEnter, setSwapEnter, useSimpleInput, setUseSimpleInput, useClearButton, setUseClearButton } =
    useSettingsStore();

  return (
    <div className={`${className || ""} flex flex-col gap-4`} style={style}>
      <div>
        <div className="flex flex-col gap-2 text-center sm:text-start">
          <div className="text-lg font-semibold text-foreground">{t("panel.openAISettings")}</div>
          <div className="text-sm text-muted-foreground">
            Make changes to your profile here. Click save when you are done.
            <br />
            默认对话上下文长度
            <br />
            情感参数
          </div>
        </div>
        <div className="grid gap-4 py-4">Some openai settings</div>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
          <Button type="submit">Save changes</Button>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 text-center sm:text-start">
          <div className="text-lg font-semibold text-foreground">{t("panel.interfaceSettings")}</div>
        </div>
        <div className="grid gap-4 py-4">
          <Label className="flex items-center justify-between">
            <div>
              {t("panel.swapSendWrap")}
              <ChatSendWrap className="text-xs"></ChatSendWrap>
            </div>
            <Switch checked={swapEnter} onCheckedChange={setSwapEnter}></Switch>
          </Label>
          <Label className="flex items-center justify-between">
            <div>{t("panel.useSimpleInput")}</div>
            <Switch checked={useSimpleInput} onCheckedChange={setUseSimpleInput}></Switch>
          </Label>
          <Label className="flex items-center justify-between gap-3">
            <div>{t("panel.useClearButton")}</div>
            <Switch checked={useClearButton} onCheckedChange={setUseClearButton}></Switch>
          </Label>
          <div className="flex items-center justify-end gap-3">
            <Reset></Reset>
            <Language></Language>
          </div>
        </div>
      </div>
    </div>
  );
}
