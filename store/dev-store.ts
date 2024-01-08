import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface DevLog {
  id: string;
  type: "log" | "error" | "warn" | "info";
  content: any;
}

export interface DevState {
  mounted: boolean;
  setMounted: (mounted: boolean) => void;
  rewriteConsole: boolean;
  setRewriteConsole: (rewriteConsole: boolean) => void;
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
      rewriteConsole: true,
      setRewriteConsole: (rewriteConsole) => {
        set((state) => {
          state.rewriteConsole = rewriteConsole;
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
