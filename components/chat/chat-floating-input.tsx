import { forwardRef, useMemo, useState } from "react";
import Affix, { AffixRef } from "../ui/affix";
import clsx from "clsx";

export interface ChatFloatingInputProps {
  floating?: boolean;
  children?: React.ReactNode;
}

const ChatFloatingInput = forwardRef<AffixRef, ChatFloatingInputProps>(function ChatFloatingInput(
  { floating = true, children },
  ref,
) {
  const [affixed, setAffixed] = useState(false);

  function onChange(affixed?: boolean) {
    setAffixed(!!affixed);
  }

  const className = useMemo(() => {
    if (affixed) {
      // color muted
      return "shadow-[0_-20px_15px_-20px_#a3a3a3]";
    }
    return "";
  }, [affixed]);

  return floating ? (
    <Affix ref={ref} onChange={onChange} offsetBottom={0}>
      <div className={clsx(className, "py-4 bg-background transition")}>{children}</div>
    </Affix>
  ) : (
    children
  );
});
export default ChatFloatingInput;
