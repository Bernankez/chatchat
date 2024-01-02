import ChatList from "@/components/chat/chat-list";
import Placeholder from "@/components/ui/placeholder";
import { Skeleton } from "@/components/ui/skeleton";
import { useChat } from "@/hooks/use-chat";

export default function Chat() {
  const { conversation } = useChat();

  return (
    <Placeholder
      skeleton={
        <div className="flex items-start gap-3 w-full py-6 px-3 rounded-sm">
          <Skeleton className="shrink-0 w-10 h-10 rounded-full"></Skeleton>
          <Skeleton className="h-32 w-full"></Skeleton>
        </div>
      }>
      <>
        {conversation.messages.map((message) => (
          <ChatList response={message.content} role={message.role} key={message.id} type={message.type}></ChatList>
        ))}
      </>
    </Placeholder>
  );
}
