import { DevLog, useDevStore } from "@/store/dev-store";
import { useLatest } from "ahooks";
import { useEffect, useRef } from "react";

const __rewrite__ = Symbol("rewriteConsole");

export function useRewriteConsole(enable = true) {
  const { log: _log, setLog } = useDevStore();
  const consoleRef = useRef<Console>();
  const consoleProxyRef = useRef<Console>();
  const log = useLatest(_log);

  function addLog(type: DevLog["type"], content: any[]) {
    if (content.length > 0 && typeof content[0] === "string" && content[0].includes("[chatchat DevTools]")) {
      return;
    }
    setLog([...log.current, { type, content }]);
  }

  function rewriteConsole() {
    if (!window) {
      return;
    }
    if ((window.console as any)[__rewrite__]) {
      return;
    }
    if (consoleProxyRef.current) {
      window.console = consoleProxyRef.current;
      return;
    }
    consoleRef.current = window.console;
    const proxy = new Proxy(window.console, {
      get(target, p, receiver) {
        if (p === __rewrite__) {
          return true;
        }
        if (typeof p === "string") {
          if (p === "log" || p === "warn" || p === "error" || p === "info") {
            const fn = Reflect.get(target, p, receiver);
            return (...args: any[]) => {
              addLog(p, args);
              fn(...args);
            };
          }
        }
        return Reflect.get(target, p, receiver);
      },
    });
    consoleProxyRef.current = proxy;
    window.console = proxy;
  }

  function restoreConsole() {
    if (consoleRef.current) {
      window.console = consoleRef.current;
      setLog([]);
    }
  }

  useEffect(() => {
    if (enable) {
      rewriteConsole();
      console.log(
        "[chatchat DevTools] Console has been taken over by chatchat DevTools. If you need the origin console, please turn off 'Rewrite Console' in DevTools.",
      );
    } else {
      restoreConsole();
      console.log("[chatchat DevTools] Console has been restored.");
    }

    return () => {
      restoreConsole();
    };
  }, [enable]);
}
