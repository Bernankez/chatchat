import { Icon } from "@iconify/react";
import { useContext, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import Placeholder from "../ui/placeholder";
import TooltipButton from "../ui/tooltip-button";
import { useResizeObserver } from "@/hooks/ui/use-resize-observer";
import { useMounted } from "@/hooks/use-mounted";
import { useInputState } from "@/hooks/chat/use-input-state";
import { useUndoRedo } from "@/hooks/chat/use-undo-redo";
import useSendWrap from "@/hooks/chat/use-send-wrap";
import { ChatInputAreaContext } from "@/app/components/Footer";
import { useChat } from "@/hooks/chat/use-chat";
import { useSettingsStore } from "@/store/settings-store";

export interface ChatInputAreaSimpleProps {
  value: string;
  onInput: (text: string) => void;
}

export default function ChatInputAreaSimple(props: ChatInputAreaSimpleProps) {
  const mounted = useMounted();
  const { t } = useTranslation("chat");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { back, forward } = useContext(ChatInputAreaContext);
  const { onInput, ...textareaProps } = useInputState(props.value, props.onInput);
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

  function adjustInput(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  const main = useMemo(() => {
    if (mounted) {
      return document.querySelector("main");
    }
  }, [mounted]);

  useResizeObserver(main, () => {
    if (textareaRef.current) {
      adjustInput(textareaRef.current);
    }
  });

  function sendMessage() {
    if (!props.value) {
      return;
    }
    send(props.value);
    props.onInput("");
  }

  return (
    <div className="flex gap-3">
      <textarea
        data-ignore-focus="panel"
        ref={textareaRef}
        autoFocus
        rows={1}
        autoComplete="false"
        placeholder={t("sendPlaceholder")}
        className="resize-none py-4 px-6 bg-secondary min-h-[3.5rem] max-h-[9.5rem] focus:outline-none w-full rounded-md"
        onInput={(e) => {
          adjustInput(e.currentTarget);
          onInput(e);
        }}
        onKeyDown={(e) => {
          undoRedoKeyDown(e);
          sendWrapKeyDown(e);
        }}
        {...textareaProps}></textarea>
      <Placeholder skeleton="w-14 h-14 shrink-0">
        <TooltipButton
          variant="secondary"
          size="icon"
          className="shrink-0 w-14 h-14"
          tooltip={t("send")}
          onClick={sendMessage}>
          <Icon icon="gravity-ui:circle" width="1.5rem" color="#c14344"></Icon>
        </TooltipButton>
      </Placeholder>
      {useClearButton ? (
        <Placeholder skeleton="w-14 h-14 shrink-0">
          <TooltipButton
            variant="secondary"
            size="icon"
            className="shrink-0 w-14 h-14"
            tooltip={t("clear")}
            onClick={clear}>
            <Icon icon="gravity-ui:trash-bin" width="1.4rem"></Icon>
          </TooltipButton>
        </Placeholder>
      ) : (
        <Placeholder skeleton="w-14 h-14 shrink-0">
          <TooltipButton
            variant="secondary"
            size="icon"
            className="shrink-0 w-14 h-14"
            tooltip={t("archive")}
            onClick={() => {
              archive();
              clear();
            }}>
            <Icon icon="gravity-ui:archive" width="1.4rem"></Icon>
          </TooltipButton>
        </Placeholder>
      )}
    </div>
  );
}
