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
import { useInputState } from "@/hooks/chat/use-input-state";
import { useUndoRedo } from "@/hooks/chat/use-undo-redo";
import useSendWrap from "@/hooks/chat/use-send-wrap";
import { ChatInputAreaContext } from "@/app/components/Footer";
import ChatSendWrap from "./chat-send-wrap";
import { useChat } from "@/hooks/chat/use-chat";
import { useSettingsStore } from "@/store/settings-store";

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
  const { back, forward, tokens } = useContext(ChatInputAreaContext);
  const textareaProps = useInputState(props.value, props.onInput);
  const { useClearButton } = useSettingsStore();
  const { send, clear, archive } = useChat();
  const { onKeyDown: undoRedoKeyDown } = useUndoRedo({
    redo: () => {
      forward();
    },
    undo: () => {
      back();
    },
  });
  const { onKeyDown: sendWrapKeyDown } = useSendWrap({
    send: sendMessage,
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
    if (!textareaRef.current) {
      return;
    }
    if (!clickOutside) {
      textareaRef.current?.setRangeText(
        emoji,
        textareaRef.current.selectionStart,
        textareaRef.current.selectionEnd,
        "end",
      );
    } else {
      textareaRef.current.value += emoji;
    }
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

  function sendMessage() {
    if (!props.value) {
      return;
    }
    send(props.value);
    props.onInput("");
  }

  return (
    <div className="flex flex-col gap-3 py-4 w-full bg-secondary rounded-md">
      <div className="flex items-center gap-1 px-3.5">
        <Popover>
          <PopoverTrigger asChild>
            <Placeholder skeleton="w-10 h-10">
              <TooltipButton ref={emojiButtonRef} variant="ghost" size="icon" tooltip="Emoji">
                <Icon icon="lucide:smile-plus" width="1.5rem"></Icon>
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
        {tokens.current.count}/{tokens.total.count}
        Price:
        {tokens.current.price}/{tokens.total.price}
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
        onKeyDown={(e) => {
          undoRedoKeyDown(e);
          sendWrapKeyDown(e);
        }}
        {...textareaProps}></textarea>
      <div className="px-6 flex items-center gap-3 justify-end">
        <ChatSendWrap></ChatSendWrap>
        <TooltipButton variant="secondary" size="icon" tooltip={t("send")} onClick={sendMessage}>
          <Icon icon="lucide:circle" width="1.4rem" color="#c14344"></Icon>
        </TooltipButton>
        {useClearButton ? (
          <TooltipButton variant="secondary" size="icon" tooltip={t("clear")} onClick={clear}>
            <Icon icon="lucide:trash-2" width="1.4rem"></Icon>
          </TooltipButton>
        ) : (
          <TooltipButton
            variant="secondary"
            size="icon"
            tooltip={t("archive")}
            onClick={() => {
              archive();
              clear();
            }}>
            <Icon icon="lucide:archive" width="1.4rem"></Icon>
          </TooltipButton>
        )}
      </div>
    </div>
  );
}
