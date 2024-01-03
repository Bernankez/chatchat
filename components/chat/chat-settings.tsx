import { Icon } from "@iconify/react";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
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

export default function ChatSettings() {
  const { t } = useTranslation(["chat", "ui"]);
  const { conversation, historyList, setConversation } = useChat();
  const [open, setOpen] = useState(false);
  const [prompts, setPrompts] = useState("");
  const [temperature, setTemperature] = useState([0.6]);
  const textareaProps = useSendWrap({
    send() {
      setOpen(false);
    },
  });

  function onConfirm() {
    if (open) {
      // Confirm
      setConversation({
        ...conversation,
        temperature: temperature[0],
        prompts,
      });
    } else {
      setPrompts(conversation.prompts || "");
      setTemperature([conversation.temperature]);
    }
  }

  useEffect(() => {
    setPrompts(conversation.prompts || "");
  }, [conversation]);

  return (
    <Placeholder
      skeleton={
        <div className="flex items-center justify-between">
          <Skeleton className="w-52 h-10"></Skeleton>
          <Skeleton className="w-10 h-10"></Skeleton>
        </div>
      }>
      <Collapse open={open} onOpenChange={setOpen}>
        <div>
          <div className="flex justify-between items-center gap-3">
            <div className="w-0 flex-1 flex gap-2">
              <Icon icon="lucide:box"></Icon>
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
                onClick={onConfirm}>
                <Icon icon={open ? "lucide:check" : "lucide:settings-2"} width="1.1rem"></Icon>
              </TooltipButton>
            </CollapseTrigger>
          </div>
        </div>
        <CollapseContent>
          <div className="flex flex-col gap-3 py-3 pb-2 px-2">
            <Label>
              {t("conversation.prompts")}
              <Textarea
                className="mt-3"
                value={prompts}
                onInput={(e) => setPrompts(e.currentTarget.value)}
                {...textareaProps}></Textarea>
            </Label>
            {historyList.filter((con) => !!con.prompts).length && (
              <div className="flex">
                {historyList
                  .filter((con) => !!con.prompts)
                  .slice(0, 5)
                  .map((con) => (
                    <div
                      key={con.id}
                      className="w-full text-sm rounded-sm py-2 px-3 hover:bg-muted transition cursor-default"
                      onClick={() => setPrompts(con.prompts!)}>
                      <div className="line-clamp-4">{con.prompts}</div>
                    </div>
                  ))}
              </div>
            )}
            <Label>
              <div className="flex justify-between items-center">
                <span>{t("conversation.temperature")}</span>
                <span>{temperature}</span>
              </div>
              <Slider className="mt-3" value={temperature} onValueChange={setTemperature} max={1} step={0.1}></Slider>
            </Label>
          </div>
        </CollapseContent>
      </Collapse>
    </Placeholder>
  );
}
