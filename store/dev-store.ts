import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface DevState {
  mounted: boolean;
  setMounted: (mounted: boolean) => void;
}

export const useDevStore = create<DevState>()(
  devtools(
    immer((set) => ({
      mounted: true,
      setMounted: (mounted) => {
        set((state) => {
          state.mounted = mounted;
        });
      },
    })),
  ),
);
