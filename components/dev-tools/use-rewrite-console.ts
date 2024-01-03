import { DevLog, useDevStore } from "@/store/dev-store";
import { useLatest } from "ahooks";
import { useEffect } from "react";

const __rewrite__ = Symbol("rewriteConsole");

export function useRewriteConsole() {
  const { log: _log, setLog } = useDevStore();
  const log = useLatest(_log);

  function addLog(type: DevLog["type"], content: any) {
    setLog([...log.current, { type, content }]);
  }

  function rewriteConsole() {
    if (!window) {
      return;
    }
    if ((window.console as any).__rewrite__ === __rewrite__) {
      return;
    }
    const originConsole = window.console;
    window.console = {
      ...originConsole,
      __rewrite__,
      log: (...args: any[]) => {
        addLog("log", args);
        originConsole.log(...args);
      },
      warn: (...args: any[]) => {
        addLog("warn", args);
        originConsole.warn(...args);
      },
      error: (...args: any[]) => {
        addLog("error", args);
        originConsole.error(...args);
      },
    } as any;
  }

  useEffect(() => {
    rewriteConsole();
  }, []);
}
