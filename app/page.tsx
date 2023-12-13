"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { modelList } from "@/lib/const";
import ModelSelect from "@/components/common/model-select";
import ThemeToggle from "@/components/theme/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import ConversationSettings from "@/components/common/conversation-settings";
import Settings from "@/components/common/settings";
import SettingsPanel from "@/components/common/settings-panel";
import { useSettingsStore } from "@/store/settings-store";
import { useBreakpoint } from "../hooks/use-breakpoint";
import ConversationList from "@/components/common/conversation-list";

export default function Home() {
  const [model, setModel] = useState(modelList[0]);
  const [mounted, setMounted] = useState(false);
  const { settingsPanelOpen, setSettingsPanelOpen } = useSettingsStore();
  const { greaterOrEqual } = useBreakpoint();

  const asideWidth = "24rem";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex">
      <main className="min-h-[100dvh] py-24 px-6 max-w-[70ch] w-full mx-auto">
        <div className="flex items-start justify-between">
          {mounted ? (
            <Icon icon="gravity-ui:ghost" color="#c14344" width="3rem" />
          ) : (
            <Skeleton className="w-12 h-12"></Skeleton>
          )}
          <div className="flex gap-3">
            <Settings></Settings>
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
        <div className="font-bold text-4xl bg-gradient-to-r from-0% from-orange-500 to-30% to-orange-300 bg-clip-text text-transparent">
          chatchat
        </div>
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground shrink-0">Based on OpenAI API</div>
          <ModelSelect value={model} onValueChange={setModel}></ModelSelect>
        </div>
        <div>
          <ConversationSettings></ConversationSettings>
        </div>
        <ConversationList></ConversationList>
      </main>
      {mounted && greaterOrEqual("xl") && (
        <aside
          style={{ width: asideWidth }}
          className={`shrink-0 transition-[max-width] duration-500 ease-in-out ${
            settingsPanelOpen ? "max-w-sm" : "max-w-0"
          }`}>
          <div style={{ width: asideWidth }} className="relative p-6">
            <button
              type="button"
              className="absolute rounded-sm right-4 top-4 transition-opacity opacity-70 hover:opacity-100 hover:cursor-pointer data-[state=open]:bg-secondary"
              onClick={() => setSettingsPanelOpen(false)}>
              <Icon icon="lucide:x"></Icon>
            </button>
            <SettingsPanel></SettingsPanel>
          </div>
        </aside>
      )}
    </div>
  );
}
