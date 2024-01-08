import { isDefined } from "@/lib/utils/is";
import { bindKeyCombo, unbindKeyCombo } from "@rwh/react-keystrokes";
import { useEffect, useState } from "react";

export type FilterFn = (event?: KeyboardEvent) => boolean | void;
export type OnPressedWithRepeatFn = (isPressed: boolean) => void;

export interface UseKeyComboOptions {
  preventDefault?: boolean;
  filter?: FilterFn;
  onPressedWithRepeat?: OnPressedWithRepeatFn;
}

export function useKeyCombo(keyCombo: string, options?: UseKeyComboOptions | FilterFn) {
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

  const _onPressedWithRepeat: Parameters<typeof bindKeyCombo>[1] = ({ finalKeyEvent }) => {
    const event = finalKeyEvent.originalEvent;
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

  const _onReleased: Parameters<typeof bindKeyCombo>[1] = () => {
    setIsPressed(false);
  };

  const handler: Parameters<typeof bindKeyCombo>[1] = {
    onPressedWithRepeat: _onPressedWithRepeat,
    onReleased: _onReleased,
  };

  useEffect(() => {
    // Set listeners on specific elements may cause some problems, so just use global key events here
    bindKeyCombo(keyCombo, handler);
    return () => {
      unbindKeyCombo(keyCombo, handler);
    };
  }, []);

  return { isPressed, unbind: () => unbindKeyCombo(keyCombo, handler) };
}
