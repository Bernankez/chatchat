import { Icon } from "@iconify/react";
import { FormEvent, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Placeholder from "../ui/placeholder";
import TooltipButton from "../ui/tooltip-button";
import { useEvent } from "react-use";

export default function ConversationSend() {
  const { t } = useTranslation("chat");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function adjustInput(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  useEvent("resize", () => {
    if (textareaRef.current) {
      adjustInput(textareaRef.current);
    }
  });

  return (
    <div className="flex gap-3">
      <textarea
        ref={textareaRef}
        autoFocus
        rows={1}
        autoComplete="false"
        placeholder={t("sendPlaceholder")}
        className="resize-none bg-secondary focus:outline-none p-4 min-h-[3.5rem] w-full box-border rounded-md"
        onInput={(e) => adjustInput(e.currentTarget)}></textarea>
      <Placeholder skeleton="w-14 h-14">
        <TooltipButton variant="secondary" size="icon" className="shrink-0 w-14 h-14" tooltip={t("send")}>
          <Icon icon="simple-icons:ghost" width="1.5rem" color="#c14344"></Icon>
        </TooltipButton>
      </Placeholder>
      <Placeholder skeleton="w-14 h-14">
        <TooltipButton variant="secondary" size="icon" className="shrink-0 w-14 h-14" tooltip={t("clear")}>
          <Icon icon="lucide:paintbrush" width="1.4rem"></Icon>
        </TooltipButton>
      </Placeholder>
    </div>
  );
}
