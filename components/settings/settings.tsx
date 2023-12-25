import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Icon } from "@iconify/react";
import TooltipButton from "../ui/tooltip-button";
import SettingsPanel from "./settings-panel";
import { useSettingsStore } from "@/store/settings-store";
import { breakpointsTailwind, useBreakpoint } from "@/hooks/use-breakpoint";
import Placeholder from "../ui/placeholder";
import { Toggle } from "../ui/toggle";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { setSettingsPanelOpen, settingsPanelOpen } = useSettingsStore();
  const { smaller } = useBreakpoint(breakpointsTailwind);
  const { t } = useTranslation("settings");

  return (
    <Placeholder skeleton="w-10 h-10">
      <Sheet modal={false} open={settingsPanelOpen} onOpenChange={setSettingsPanelOpen}>
        <Toggle asChild pressed={settingsPanelOpen}>
          <SheetTrigger asChild>
            <TooltipButton variant="outline" size="icon" tooltip={t("settings")}>
              <Icon icon="lucide:settings" width="1.1rem"></Icon>
            </TooltipButton>
          </SheetTrigger>
        </Toggle>
        {smaller("lg") && (
          <SheetContent
            className="w-full"
            onInteractOutside={(e) => {
              // Do not close sheet with data-ignore/data-ignore-focus/data-ignore-pointer
              const originEl = e.target as HTMLElement;
              const el = findElement(originEl, ["ignore", "ignoreFocus", "ignorePointer"]);
              if (!el) return;
              if (el.dataset.ignore === "" || el.dataset.ignore === "panel") {
                e.preventDefault();
              } else if (
                e.type.includes("focusOutside") &&
                (el.dataset.ignoreFocus === "" || el.dataset.ignoreFocus === "panel")
              ) {
                e.preventDefault();
              } else if (
                e.type.includes("pointerDownOutside") &&
                (el.dataset.ignorePointer === "" || el.dataset.ignorePointer === "panel")
              ) {
                e.preventDefault();
              }
            }}>
            <SettingsPanel></SettingsPanel>
          </SheetContent>
        )}
      </Sheet>
    </Placeholder>
  );
}

function findElement(el: HTMLElement, props: string[]) {
  const hasProp = props.some((item) => item in el.dataset);
  if (hasProp) {
    return el;
  }
  const parent = el.parentNode;
  if (!isHTMLElement(parent)) {
    return undefined;
  }
  return findElement(parent, props);
}

function isHTMLElement(el: any): el is HTMLElement {
  if (!el || typeof el !== "object") {
    return false;
  }
  if (!("cloneNode" in el) || !("nodeType" in el)) {
    return false;
  }
  const div = document.createElement("div");
  try {
    div.appendChild(el.cloneNode(true));
    return el.nodeType === 1;
  } catch (e) {
    return false;
  }
}
