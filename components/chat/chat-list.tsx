import { MessageType, Role } from "@/lib/types";
import { Icon } from "@iconify/react";
import DecodeContent from "../common/decode-content";
import Placeholder from "../ui/placeholder";
import { useMemo } from "react";

export interface ChatListProps {
  response: string;
  className?: string;
  role?: Role;
  type?: MessageType;
}

export default function ChatList({ role = "assistant", response, className, type }: ChatListProps) {
  const Content = useMemo(() => {
    if (type === "error") {
      return <div className="bg-muted text-muted-foreground px-2 rounded-sm">{response}</div>;
    }
    return <DecodeContent content={response}></DecodeContent>;
  }, [type, response]);

  const Avatar = useMemo(() => {
    if (type === "error") {
      return (
        <Placeholder skeleton="w-7 h-7">
          <Icon icon="gravity-ui:face-neutral" width="1.75rem" color="gray"></Icon>
        </Placeholder>
      );
    }
    if (role === "user") {
      return (
        <Placeholder skeleton="w-7 h-7">
          <Icon icon="gravity-ui:circle" width="1.75rem" color="#c14344"></Icon>
        </Placeholder>
      );
    }
    return (
      <Placeholder skeleton="w-7 h-7">
        <Icon icon="gravity-ui:ghost" width="1.75rem" className="text-orange-500 dark:text-orange-400"></Icon>
      </Placeholder>
    );
  }, [role, type, response]);

  return (
    // TODO ability to resend message
    <div
      className={`flex items-start gap-3 w-full py-6 px-3 rounded-sm md:hover:bg-accent/30 transition ${
        role === "user" ? "flex-row-reverse" : ""
      } ${className || ""}`}>
      <div>{Avatar}</div>
      <div className={`break-words overflow-hidden ${role === "user" ? "pl-[2.75rem]" : "pr-[2.75rem]"}`}>
        {Content}
      </div>
    </div>
  );
}
