import { FormEvent, useEffect, useState } from "react";

export type InputEl = HTMLInputElement | HTMLTextAreaElement;

export function useInputState(state: string, setState: (text: string) => void) {
  const [text, setText] = useState(state);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // Sync with state
    setText(state);
  }, [state]);

  function onCompositionStart() {
    setTyping(true);
  }

  function onCompositionEnd(e: FormEvent<InputEl>) {
    if (!typing) {
      return;
    }
    setTyping(false);
    const value = e.currentTarget.value;
    setText(value);
    setState(value);
  }

  function onInput(e: FormEvent<InputEl>) {
    const value = e.currentTarget.value;
    setText(value);
    if (!typing) {
      setState(value);
    }
  }

  return {
    value: text,
    onInput,
    onCompositionStart,
    onCompositionEnd,
  };
}
