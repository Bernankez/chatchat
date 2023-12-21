import ChatInputAreaSimple from "@/components/chat/chat-input-area-simple";
import ChatInputArea from "@/components/chat/chat-input-area";
import { useStateWithHistory } from "react-use";

export default function Footer() {
  const [state, setState, stateHistory] = useStateWithHistory("", 100);

  const { back, forward } = stateHistory;

  return (
    <>
      <ChatInputAreaSimple value={state} onInput={setState}></ChatInputAreaSimple>
      <ChatInputArea value={state} onInput={setState}></ChatInputArea>
    </>
  );
}
