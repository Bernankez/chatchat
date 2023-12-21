import { Icon } from "@iconify/react";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import Placeholder from "../ui/placeholder";
import TooltipButton from "../ui/tooltip-button";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import { useMounted } from "@/hooks/use-mounted";
import { useInputState } from "@/hooks/use-input-state";
import { useUndoRedo } from "@/hooks/use-undo-redo";

export interface ChatInputAreaSimpleProps {
  value: string;
  onInput: (text: string) => void;
}

export default function ChatInputAreaSimple(props: ChatInputAreaSimpleProps) {
  const mounted = useMounted();
  const { t } = useTranslation("chat");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { onInput, ...textareaProps } = useInputState(props.value, props.onInput);
  useUndoRedo({
    el: textareaRef.current,
    redo: () => {
      console.log("redo");
    },
    undo: () => {
      console.log("undo");
    },
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

  return (
    <div className="flex gap-3">
      <textarea
        ref={textareaRef}
        autoFocus
        rows={1}
        autoComplete="false"
        placeholder={t("sendPlaceholder")}
        className="resize-none p-4 bg-secondary min-h-[3.5rem] max-h-[9.5rem] focus:outline-none w-full rounded-md"
        onInput={(e) => {
          adjustInput(e.currentTarget);
          onInput(e);
        }}
        {...textareaProps}></textarea>
      <Placeholder skeleton="w-14 h-14 shrink-0">
        <TooltipButton variant="secondary" size="icon" className="shrink-0 w-14 h-14" tooltip={t("send")}>
          <Icon icon="simple-icons:ghost" width="1.5rem" color="#c14344"></Icon>
        </TooltipButton>
      </Placeholder>
      <Placeholder skeleton="w-14 h-14 shrink-0">
        <TooltipButton variant="secondary" size="icon" className="shrink-0 w-14 h-14" tooltip={t("clear")}>
          <Icon icon="lucide:paintbrush" width="1.4rem"></Icon>
        </TooltipButton>
      </Placeholder>
    </div>
  );
}
