import { isDefined } from "@/lib/is";
import { bindKey, unbindKey } from "@rwh/react-keystrokes";
import { useEffect, useState } from "react";

export type FilterFn = (event?: KeyboardEvent) => boolean | void;
export type OnPressedWithRepeatFn = (isPressed: boolean) => void;

export interface UseKeyOptions {
  preventDefault?: boolean;
  filter?: FilterFn;
  onPressedWithRepeat?: OnPressedWithRepeatFn;
}

export function useKey(key: string, options?: UseKeyOptions | FilterFn) {
  const [isPressed, setIsPressed] = useState(false);
  let preventDefault: boolean, filter: FilterFn | undefined, onPressedWithRepeat: OnPressedWithRepeatFn | undefined;
  if (isDefined(options)) {
    if (typeof options === "function") {
      preventDefault = false;
      filter = options;
    } else {
      preventDefault = options.preventDefault || false;
      filter = options.filter;
      onPressedWithRepeat = options.onPressedWithRepeat;
    }
  }

  const _onPressedWithRepeat: Parameters<typeof bindKey>[1] = ({ originalEvent }) => {
    const event = originalEvent;
    if (preventDefault) {
      event?.preventDefault();
    }
    let _isPressed: boolean;
    if (isDefined(filter)) {
      _isPressed = !!filter(event);
    } else {
      _isPressed = true;
    }
    onPressedWithRepeat?.(_isPressed);
    setIsPressed(_isPressed);
  };

  const _onReleased: Parameters<typeof bindKey>[1] = () => {
    setIsPressed(false);
  };

  const handler: Parameters<typeof bindKey>[1] = {
    onPressedWithRepeat: _onPressedWithRepeat,
    onReleased: _onReleased,
  };

  useEffect(() => {
    // Set listeners on specific elements may cause some problems, so just use global key events here
    bindKey(key, handler);
    return () => {
      unbindKey(key, handler);
    };
  }, []);

  return { isPressed, unbind: () => unbindKey(key, handler) };
}
