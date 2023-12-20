import ChatList from "@/components/chat/chat-list";

export default function Chat() {
  return (
    <>
      <ChatList></ChatList>
      <ChatList role="user"></ChatList>
    </>
  );
}
