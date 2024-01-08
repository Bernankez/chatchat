import { Icon } from "@iconify/react";
import { useKeys } from "@/hooks/chat/use-keys";
import { useMounted } from "@/hooks/use-mounted";
import { cloneElement } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export interface ChatSendWrapProps {
  className?: string;
}

export default function ChatSendWrap({ className }: ChatSendWrapProps) {
  const { send, wrap } = useKeys();
  const { t } = useTranslation("chat");
  const mounted = useMounted();

  const shiftIcon = <Icon icon="lucide:arrow-big-up"></Icon>;
  const enterIcon = <Icon icon="lucide:corner-down-left"></Icon>;

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
    <div className={cn("flex items-center text-sm text-muted-foreground cursor-default select-none", className)}>
      {getIcon(send)}
      {t("send")} / {getIcon(wrap)}
      {t("wrap")}
    </div>
  );
}
