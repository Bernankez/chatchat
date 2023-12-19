import { Icon } from "@iconify/react";
import { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import Placeholder from "../ui/placeholder";
import TooltipButton from "../ui/tooltip-button";

export default function ConversationSend() {
  const { t } = useTranslation("chat");

  function onInput(e: FormEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  return (
    <div className="flex gap-3">
      <textarea
        autoFocus
        rows={1}
        autoComplete="false"
        placeholder={t("sendPlaceholder")}
        className="resize-none bg-secondary focus:outline-none p-4 min-h-[3.5rem] w-full box-border rounded-md"
        onInput={onInput}></textarea>
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
