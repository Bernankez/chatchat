"use client";

import { useSettingsStore } from "@/store/settings-store";
import { breakpointsTailwind, useBreakpoint } from "@/hooks/ui/use-breakpoint";
import { useMounted } from "@/hooks/use-mounted";
import { asideWidth } from "./Aside";
import clsx from "clsx";
import { useMemo } from "react";

export interface LayoutProps {
  children: JSX.Element[];
}

export default function Layout({ children }: LayoutProps) {
  const mounted = useMounted();
  const { settingsPanelOpen, wideScreenMode, useSimpleInput } = useSettingsStore();
  const { greaterOrEqual } = useBreakpoint(breakpointsTailwind);

  const [Header, Chat, Footer, Aside] = children;

  const pagePaddingRight = settingsPanelOpen && greaterOrEqual("lg") ? asideWidth : "0";

  const commonClassName = useMemo(
    () =>
      clsx(
        "mx-auto px-6 ease-in-out duration-500",
        mounted && wideScreenMode ? "max-w-full xl:px-24 2xl:px-40" : "max-w-[70ch]",
      ),
    [mounted, wideScreenMode, mounted],
  );

  const mainClassName = useMemo(
    () =>
      clsx(
        "min-h-[100dvh] pt-24 w-full transition-[max-width,_padding]",
        commonClassName,
        !mounted || useSimpleInput ? "pb-24" : "pb-80",
      ),
    [commonClassName, useSimpleInput, mounted],
  );

  const footerClassName = useMemo(
    () =>
      clsx(
        "fixed bottom-0 left-0 bg-background flex items-center transition-[max-width,_padding,_height,_right]",
        commonClassName,
        !mounted || useSimpleInput ? "h-24" : "h-80",
      ),
    [commonClassName, useSimpleInput, mounted],
  );

  return (
    <div className="flex ease-in-out duration-500 transition-[padding]" style={{ paddingRight: pagePaddingRight }}>
      {/* Main Content */}
      <main className={mainClassName}>
        {Header}
        <div className="mt-3">{Chat}</div>
      </main>
      {/* Fixed Footer Content */}
      <div className={footerClassName} style={{ right: pagePaddingRight }}>
        <div className="w-full">{Footer}</div>
      </div>
      {/* Settings Panel */}
      {Aside}
    </div>
  );
}
