import { DevToolsContext } from "@/components/dev-tools/DevToolsProvider";
import { useContext, useEffect, useState } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  const context = useContext(DevToolsContext);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (context) {
    return mounted && context.mounted;
  }

  return mounted;
}
