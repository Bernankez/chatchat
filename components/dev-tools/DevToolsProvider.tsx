"use client";
import { isDev } from "@/lib/is";
import { DevState, useDevStore } from "@/store/dev-store";
import { createContext } from "react";

export const DevToolsContext = createContext<DevState | undefined>(undefined);

export default function DevToolsProvider({ children }: { children: React.ReactNode }) {
  const devStore = useDevStore();

  return isDev ? <DevToolsContext.Provider value={devStore}>{children}</DevToolsContext.Provider> : <>{children}</>;
}
