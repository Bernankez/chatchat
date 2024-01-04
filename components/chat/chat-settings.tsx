import { Icon } from "@iconify/react";
import { Textarea } from "../ui/textarea";
import { useEffect, useMemo, useState } from "react";
import Collapse from "../ui/collapse";
import CollapseTrigger from "../ui/collapse-trigger";
import CollapseContent from "../ui/collapse-content";
import { useTranslation } from "react-i18next";
import TooltipButton from "../ui/tooltip-button";
import Placeholder from "../ui/placeholder";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import useSendWrap from "@/hooks/use-send-wrap";
import { useChat } from "@/hooks/use-chat";
import { Skeleton } from "../ui/skeleton";
import ModelSelect from "../common/model-select";
import { Model } from "@/lib/types";
import { useChatStore } from "@/store/chat-store";

export default function ChatSettings() {
  const { t } = useTranslation(["chat", "ui"]);
  const { setIsEditing } = useChatStore();
  const { conversation, historyList, setConversation } = useChat();
  const [open, setOpen] = useState(false);
  const [prompts, setPrompts] = useState("");
  const [model, setModel] = useState<Model>(conversation.model);
  const [temperature, setTemperature] = useState([0.6]);
  const textareaProps = useSendWrap({
    send() {
      onConfirm(false);
    },
  });

  useEffect(() => {
    setIsEditing(open);
  }, [open]);

  const promptList = useMemo(() => {
    const res = historyList.filter((con) => !!con.prompts);
    const set = new Set<string>();
    return res.filter((con) => {
      if (set.has(con.prompts!)) {
        return false;
      }
      set.add(con.prompts!);
      return true;
    });
  }, [historyList]);

  function onConfirm(open: boolean) {
    if (!open) {
      // Confirm
      setConversation({
        ...conversation,
        temperature: temperature[0],
        prompts: prompts.trim(),
        model,
      });
    } else {
      setPrompts(conversation.prompts || "");
      setTemperature([conversation.temperature]);
      setModel(conversation.model);
    }
    setOpen(open);
  }

  useEffect(() => {
    setPrompts(conversation.prompts || "");
  }, [conversation]);

  function adjustInput(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  return (
    <Placeholder
      skeleton={
        <div className="mt-3 flex items-center justify-between">
          <Skeleton className="w-52 h-10"></Skeleton>
          <Skeleton className="w-10 h-10"></Skeleton>
        </div>
      }>
      <Collapse open={open} onOpenChange={setOpen}>
        {/* this div is necessary to avoid shaking */}
        <div>
          <div className="mt-2 flex justify-between items-center gap-3 text-sm">
            <div className="w-0 flex-1 flex gap-2">
              <div className="shrink-0 flex items-center gap-2 p-1 rounded-sm cursor-default">
                <Icon icon="lucide:box" className="shrink-0"></Icon>
                {conversation.model}
              </div>
              {conversation.prompts && (
                <div className="truncate flex items-center gap-2 p-1 rounded-sm cursor-default">
                  <Icon icon="lucide:messages-square" className="shrink-0"></Icon>
                  <span className="truncate">{conversation.prompts}</span>
                </div>
              )}
              <div className="flex items-center gap-2 p-1 rounded-sm cursor-default">
                <Icon icon="lucide:dices" className="shrink-0"></Icon>
                {conversation.temperature}
              </div>
            </div>
            {open && (
              <TooltipButton
                variant="ghost"
                size="icon"
                tooltip={t("cancel", { ns: "ui" })}
                onClick={() => setOpen(false)}>
                <Icon icon="lucide:x" width="1.1rem"></Icon>
              </TooltipButton>
            )}
            <CollapseTrigger asChild>
              <TooltipButton
                variant="ghost"
                size="icon"
                tooltip={open ? t("complete", { ns: "ui" }) : t("conversation.settings")}
                onClick={() => onConfirm(!open)}>
                <Icon icon={open ? "lucide:check" : "lucide:settings-2"} width="1.1rem"></Icon>
              </TooltipButton>
            </CollapseTrigger>
          </div>
        </div>
        <CollapseContent>
          <div className="flex flex-col gap-3 py-3 pb-2 px-2">
            <div>
              <Label>{t("conversation.model")}</Label>
              <ModelSelect className="ml-3 w-fit" value={model} onValueChange={setModel}></ModelSelect>
            </div>
            <div>
              <Label>{t("conversation.prompts")}</Label>
              <Textarea
                className="resize-none mt-3 outline outline-1 outline-border border-none min-h-[5rem] max-h-[7.5rem]"
                rows={3}
                value={prompts}
                onInput={(e) => {
                  adjustInput(e.currentTarget);
                  setPrompts(e.currentTarget.value);
                }}
                {...textareaProps}></Textarea>
            </div>
            {promptList.length > 0 && (
              <div className="flex">
                {promptList.slice(0, 5).map((con) => (
                  <div
                    key={con.id}
                    className="w-full text-sm rounded-sm py-2 px-3 hover:bg-muted transition cursor-default"
                    onClick={() => setPrompts(con.prompts!)}>
                    <div className="line-clamp-4">{con.prompts}</div>
                  </div>
                ))}
              </div>
            )}
            <div>
              <Label>
                <div className="flex justify-between items-center">
                  <span>{t("conversation.temperature")}</span>
                  <span>{temperature}</span>
                </div>
              </Label>
              <Slider className="mt-3" value={temperature} onValueChange={setTemperature} max={1} step={0.1}></Slider>
            </div>
          </div>
        </CollapseContent>
      </Collapse>
    </Placeholder>
  );
}
