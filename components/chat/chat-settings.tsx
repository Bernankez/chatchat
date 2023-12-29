import { Icon } from "@iconify/react";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import Collapse from "../ui/collapse";
import CollapseTrigger from "../ui/collapse-trigger";
import CollapseContent from "../ui/collapse-content";
import { useTranslation } from "react-i18next";
import TooltipButton from "../ui/tooltip-button";
import Placeholder from "../ui/placeholder";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import useSendWrap from "@/hooks/use-send-wrap";

export default function ChatSettings() {
  const { t } = useTranslation("chat");
  const [open, setOpen] = useState(false);
  const [prompts, setPrompts] = useState("");
  const [temperature, setTemperature] = useState([0.6]);
  const textareaProps = useSendWrap({
    send() {
      setOpen(false);
    },
  });

  return (
    <Collapse open={open} onOpenChange={setOpen}>
      <div>
        <div className="flex justify-between items-center gap-3">
          <span className="w-0 flex-1 truncate">
            {prompts}
            <span>{temperature}</span>
          </span>
          <CollapseTrigger asChild>
            <Placeholder skeleton="w-10 h-10">
              <TooltipButton
                variant="ghost"
                size="icon"
                tooltip={open ? t("conversation.complete") : t("conversation.settings")}>
                <Icon icon={open ? "lucide:check" : "lucide:settings-2"} width="1.1rem"></Icon>
              </TooltipButton>
            </Placeholder>
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
  );
}
