import { CSSProperties, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSettingsStore } from "@/store/settings-store";
import { useTranslation } from "react-i18next";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import ChatSendWrap from "../chat/chat-send-wrap";
import Language from "./language";
import Reset from "./reset";
import ClearCacheButton from "./clear-cache-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { modelList } from "@/lib/const";
import { Model } from "@/lib/types";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";

export interface SettingsPanelProps {
  style?: CSSProperties;
  className?: string;
  onClose?: () => void;
}

// TODO fix column direction
// TODO accordion, only one save button
export default function SettingsPanel(props: SettingsPanelProps) {
  const { className, style } = props;
  const { t } = useTranslation("settings");
  const { settingsPanelOpen, setSettingsPanelOpen } = useSettingsStore();
  const {
    useStream,
    setUseStream,
    defaultModel,
    setDefaultModel,
    defaultPrompts,
    setDefaultPrompts,
    defaultTemperature,
    setDefaultTemperature,
    resetDefaultSettings,
    swapEnter,
    setSwapEnter,
    useSimpleInput,
    setUseSimpleInput,
    useClearButton,
    setUseClearButton,
  } = useSettingsStore();
  const [model, setModel] = useState<Model>(defaultModel);
  const [prompts, setPrompts] = useState(defaultPrompts);
  const [temperature, setTemperature] = useState([defaultTemperature]);
  const [stream, setStream] = useState(useStream);

  useEffect(() => {
    if (settingsPanelOpen) {
      setModel(defaultModel);
      setPrompts(defaultPrompts);
      setTemperature([defaultTemperature]);
      setStream(useStream);
    }
  }, [settingsPanelOpen]);

  function saveOpenAISettings() {
    setUseStream(stream);
    setSettingsPanelOpen(false);
  }

  function saveDefaultSettings() {
    setDefaultModel(model);
    setDefaultPrompts(prompts);
    setDefaultTemperature(temperature[0]);
    setSettingsPanelOpen(false);
  }

  return (
    <div className={`${className || ""} flex flex-col gap-4`} style={style}>
      <div>
        <div className="flex flex-col gap-2 text-center sm:text-start">
          <div className="text-lg font-semibold text-foreground">{t("panel.openAISettings")}</div>
        </div>
        <div className="grid gap-4 py-4">
          <Label className="flex items-center justify-between">
            <div>{t("panel.useStream")}</div>
            <Switch checked={stream} onCheckedChange={setStream}></Switch>
          </Label>
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
          <Button type="submit" onClick={saveOpenAISettings}>
            {t("panel.saveChanges")}
          </Button>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 text-center sm:text-start">
          <div className="text-lg font-semibold text-foreground">{t("panel.defaultSettings")}</div>
        </div>
        <div className="grid gap-4 py-4">
          <Label className="flex items-center justify-between">
            <div>{t("panel.defaultModel")}</div>
            <Select value={model} onValueChange={(val) => setModel(val as Model)}>
              <SelectTrigger className="max-w-[12rem]">
                <SelectValue></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {modelList.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>
          <Label className="flex items-center justify-between">
            <div>{t("panel.defaultPrompts")}</div>
            <Textarea
              value={prompts}
              onInput={(e) => setPrompts(e.currentTarget.value)}
              rows={1}
              className="max-w-[12rem] min-h-0"></Textarea>
          </Label>
          <Label className="flex items-center justify-between">
            <div>{t("panel.defaultTemperature")}</div>
            <div className="flex gap-3 max-w-[12rem] w-full">
              <Slider value={temperature} onValueChange={setTemperature} max={1} step={0.1}></Slider>
              <div className="w-6 text-end">{temperature}</div>
            </div>
          </Label>
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
          <Button variant="secondary" onClick={resetDefaultSettings}>
            {t("panel.resetDefaultSettings")}
          </Button>
          <Button type="submit" onClick={saveDefaultSettings}>
            {t("panel.saveChanges")}
          </Button>
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
      <div className="flex justify-end">
        <ClearCacheButton></ClearCacheButton>
      </div>
    </div>
  );
}
