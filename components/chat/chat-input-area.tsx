import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import TooltipButton from "../ui/tooltip-button";
import { useContext, useMemo, useRef, useState } from "react";
import Placeholder from "../ui/placeholder";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";
import { useClickAway } from "ahooks";
import { useInputState } from "@/hooks/use-input-state";
import { useUndoRedo } from "@/hooks/use-undo-redo";
import useSendWrap from "@/hooks/use-send-wrap";
import { ChatInputAreaContext } from "@/app/components/Footer";
import ChatSendWrap from "./chat-send-wrap";

export interface ChatInputAreaProps {
  value: string;
  onInput: (text: string) => void;
}

export default function ChatInputArea(props: ChatInputAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const { t, i18n } = useTranslation("chat");
  const lng = i18n.resolvedLanguage;
  const { resolvedTheme } = useTheme();
  const [clickOutside, setClickOutside] = useState(false);
  const { back, forward } = useContext(ChatInputAreaContext);
  const textareaProps = useInputState(props.value, props.onInput);
  useUndoRedo({
    el: textareaRef.current,
    redo: () => {
      forward();
    },
    undo: () => {
      back();
    },
  });
  const { onKeyDown } = useSendWrap({
    send: () => {
      console.log("send");
    },
    wrap: () => {
      console.log("wrap");
    },
  });

  useClickAway((e) => {
    if (e.target !== document.querySelector("em-emoji-picker") && !emojiButtonRef.current?.contains(e.target as Node)) {
      setClickOutside(true);
    }
  }, textareaRef);

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

  function insertEmoji(emoji: string) {
    if (!clickOutside) {
      textareaRef.current?.setRangeText(
        emoji,
        textareaRef.current.selectionStart,
        textareaRef.current.selectionEnd,
        "end",
      );
      const inputEvent = new Event("input", {
        bubbles: true,
        cancelable: true,
      });
      const changeEvent = new Event("change", {
        bubbles: true,
        cancelable: true,
      });
      textareaRef.current?.dispatchEvent(inputEvent);
      textareaRef.current?.dispatchEvent(changeEvent);
      textareaRef.current?.blur();
      textareaRef.current?.focus();
    }
  }

  return (
    <div className="flex flex-col gap-3 py-4 w-full bg-secondary rounded-md">
      <div className="flex items-center gap-1 px-3.5">
        <Popover>
          <PopoverTrigger asChild>
            <Placeholder skeleton="w-10 h-10">
              <TooltipButton ref={emojiButtonRef} variant="ghost" size="icon" tooltip="Emoji">
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
              onEmojiSelect={(picked: any) => insertEmoji(picked.native)}></Picker>
          </PopoverContent>
        </Popover>
        2000/1222
      </div>
      <textarea
        data-ignore-focus="panel"
        ref={textareaRef}
        rows={6}
        autoFocus
        className="resize-none bg-transparent px-6 focus:outline-none w-full"
        placeholder={t("sendPlaceholder")}
        onFocus={() => {
          setClickOutside(false);
        }}
        onKeyDown={onKeyDown}
        {...textareaProps}></textarea>

      <div className="px-6 flex items-center gap-3 justify-end">
        <ChatSendWrap></ChatSendWrap>
        <TooltipButton variant="secondary" size="icon" tooltip={t("send")}>
          <Icon icon="simple-icons:ghost" width="1.4rem" color="#c14344"></Icon>
        </TooltipButton>
        <TooltipButton variant="secondary" size="icon" tooltip={t("clear")}>
          <Icon icon="lucide:paintbrush" width="1.4rem"></Icon>
        </TooltipButton>
      </div>
    </div>
  );
}
