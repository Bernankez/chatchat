import { useSettingsStore } from "@/store/settings-store";
import { useMemo } from "react";

export const SHIFT_ENTER = "shift_enter";
export const ENTER = "enter";

export function useKeys() {
  const { swapEnter } = useSettingsStore();

  const send = useMemo(() => (swapEnter ? SHIFT_ENTER : ENTER), [swapEnter]);
  const warp = useMemo(() => (swapEnter ? ENTER : SHIFT_ENTER), [swapEnter]);

  return {
    send,
    warp,
  };
}
