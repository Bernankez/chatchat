import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface DevLog {
  type: "log" | "error" | "warn";
  content: any;
}

export interface DevState {
  mounted: boolean;
  setMounted: (mounted: boolean) => void;
  log: DevLog[];
  setLog: (log: DevLog[]) => void;
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
      log: [],
      setLog: (log) => {
        set((state) => {
          state.log = log;
        });
      },
    })),
  ),
);
