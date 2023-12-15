import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { FormEvent } from "react";

export default function ConversationSend() {
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
        placeholder="Say something..."
        className="resize-none bg-secondary focus:outline-none p-4 min-h-[3.5rem] w-full box-border rounded-md"
        onInput={onInput}></textarea>
      <Button variant="secondary" size="icon" className="shrink-0 w-14 h-14">
        <Icon icon="simple-icons:ghost" width="1.5rem" color="#c14344"></Icon>
      </Button>
      <Button variant="secondary" size="icon" className="shrink-0 w-14 h-14">
        <Icon icon="lucide:paintbrush" width="1.4rem"></Icon>
      </Button>
    </div>
  );
}
