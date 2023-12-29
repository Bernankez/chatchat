import { Icon } from "@iconify/react";
import { useState } from "react";
import { modelList } from "@/lib/const";
import ModelSelect from "@/components/common/model-select";
import ThemeToggle from "@/components/theme/theme-toggle";
import Settings from "@/components/settings/settings";
import Placeholder from "@/components/ui/placeholder";
import ChatSettings from "@/components/chat/chat-settings";
import WideScreen from "@/components/settings/wide-screen";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [model, setModel] = useState(modelList[0]);
  const { t } = useTranslation("app");

  return (
    <>
      <div className="flex items-start justify-between">
        <Placeholder skeleton="w-12 h-12">
          <Icon icon="fluent-emoji:ghost" width="3rem" />
        </Placeholder>
        <div className="flex gap-3">
          <Settings></Settings>
          <WideScreen></WideScreen>
          <ThemeToggle></ThemeToggle>
        </div>
      </div>
      <div className="mt-2 font-bold text-4xl bg-gradient-to-r from-0% from-orange-500 to-30% to-orange-300 bg-clip-text text-transparent cursor-default">
        chatchat
      </div>
      <div className="flex items-center gap-3">
        <div className="text-muted-foreground shrink-0 cursor-default">{t("subTitle")}</div>
        <ModelSelect value={model} onValueChange={setModel}></ModelSelect>
      </div>
      <div>
        <ChatSettings></ChatSettings>
      </div>
    </>
  );
}
