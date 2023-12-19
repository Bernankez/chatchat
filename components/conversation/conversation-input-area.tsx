import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useKeys } from "@/hooks/use-keys";
import TooltipButton from "../ui/tooltip-button";
import { cloneElement, useMemo } from "react";
import { useMounted } from "@/hooks/use-mounted";
import Placeholder from "../ui/placeholder";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";

export default function ConversationInputArea() {
  const mounted = useMounted();
  const { t, i18n } = useTranslation("chat");
  const lng = i18n.resolvedLanguage;
  const { send, warp } = useKeys();
  const { resolvedTheme } = useTheme();

  const shiftIcon = <Icon icon="lucide:arrow-big-up"></Icon>;
  const enterIcon = <Icon icon="lucide:corner-down-left"></Icon>;

  const locale = useMemo(() => {
    switch (lng) {
      case "en": {
        return "en";
      }
      case "zh-CN": {
        return "zh";
      }
      default: {
        return lng;
      }
    }
  }, [lng]);

  function getIcon(key: string) {
    if (!mounted) {
      return null;
    }
    return key.split("_").map((k) => {
      switch (k) {
        case "shift": {
          return cloneElement(shiftIcon, { key: k });
        }
        case "enter": {
          return cloneElement(enterIcon, { key: k });
        }
        default: {
          return null;
        }
      }
    });
  }

  return (
    <div className="flex flex-col gap-3 py-4 w-full bg-background border border-border border-solid rounded-md">
      <div className="flex items-center gap-1 px-3.5">
        <Popover>
          <PopoverTrigger asChild>
            <Placeholder skeleton="w-10 h-10">
              <TooltipButton variant="ghost" size="icon">
                <Icon icon="lucide:smile-plus" width="1.3rem"></Icon>
              </TooltipButton>
            </Placeholder>
          </PopoverTrigger>
          <PopoverContent className="w-full border-0 p-0">
            <Picker
              data={data}
              theme={resolvedTheme}
              locale={locale}
              skinTonePosition="search"
              onEmojiSelect={console.log}></Picker>
          </PopoverContent>
        </Popover>
        2000/1222
      </div>
      <textarea
        rows={6}
        className="resize-none bg-transparent px-6 focus:outline-none w-full"
        placeholder={t("sendPlaceholder")}></textarea>
      <div className="px-6 flex items-center gap-3 justify-end">
        <div className="flex items-center text-sm text-muted-foreground cursor-default select-none">
          {getIcon(send)}
          {t("send")} / {getIcon(warp)}
          {t("warp")}
        </div>
        <TooltipButton size="icon" tooltip={t("send")}>
          <Icon icon="simple-icons:ghost" width="1.1rem" color="#c14344"></Icon>
        </TooltipButton>
      </div>
    </div>
  );
}
