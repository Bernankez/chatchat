import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import { useSettingsStore } from "@/store/settings-store";
import { useMemo } from "react";
import { asideWidth } from "@/app/components/Aside";
import { useScrollTopBottom } from "@/hooks/use-scroll-top-bottom";

export default function FloatingButtons() {
  const { settingsPanelOpen, setSettingsPanelOpen } = useSettingsStore();
  const { scrollToBottom, scrollToTop, isBottom, isTop } = useScrollTopBottom();

  const style = useMemo(() => {
    if (settingsPanelOpen) {
      return {
        right: `calc(1.5rem + ${asideWidth})`,
      };
    }
    return {
      right: "1.5rem",
    };
  }, [settingsPanelOpen]);

  return (
    <div className="fixed bottom-6 flex flex-col gap-3 transition-[right] duration-500 ease-in-out" style={style}>
      <Toggle asChild pressed={settingsPanelOpen} onPressedChange={setSettingsPanelOpen}>
        <Button data-ignore="panel" variant="ghost" size="icon">
          <Icon icon="lucide:settings" width="1.1rem"></Icon>
        </Button>
      </Toggle>
      <div className="w-fit flex flex-col rounded-md overflow-hidden">
        {/* TODO fix when no scroll bar exists */}
        <Button
          className={`rounded-none transition duration-250 ${isTop ? "opacity-0" : ""}`}
          variant="ghost"
          size="icon"
          onClick={scrollToTop}>
          <Icon icon="lucide:arrow-up" width="1.1rem"></Icon>
        </Button>
        <Button
          className={`rounded-none transition duration-250 ${isBottom ? "opacity-0" : ""}`}
          variant="ghost"
          size="icon"
          onClick={scrollToBottom}>
          <Icon icon="lucide:arrow-down" width="1.1rem"></Icon>
        </Button>
      </div>
    </div>
  );
}
