"use client";

import { useSettingsStore } from "@/store/settings-store";
import { breakpointsTailwind, useBreakpoint } from "@/hooks/ui/use-breakpoint";
import { useMounted } from "@/hooks/use-mounted";
import { asideWidth } from "./Aside";
import FloatingButtons from "@/components/settings/floating-buttons";

export interface LayoutProps {
  children: JSX.Element[];
}

export default function Layout({ children }: LayoutProps) {
  const mounted = useMounted();
  const { settingsPanelOpen, wideScreenMode } = useSettingsStore();
  const { greaterOrEqual } = useBreakpoint(breakpointsTailwind);

  const [Header, Chat, Footer, Aside] = children;

  const pagePaddingRight = settingsPanelOpen && greaterOrEqual("lg") ? asideWidth : "0";

  return (
    <div className="flex ease-in-out duration-500 transition-[padding]" style={{ paddingRight: pagePaddingRight }}>
      {/* Main Content */}
      <main
        className={`min-h-[100dvh] py-24 px-6 w-full mx-auto ease-in-out duration-500 transition-[max-width_padding] ${
          mounted && wideScreenMode ? "max-w-full xl:px-24 2xl:px-40" : "max-w-[70ch]"
        }`}>
        {Header}
        <div className="mt-3">{Chat}</div>
        <div className="mt-3">{Footer}</div>
        <FloatingButtons></FloatingButtons>
      </main>
      {/* Settings Panel */}
      {Aside}
    </div>
  );
}
