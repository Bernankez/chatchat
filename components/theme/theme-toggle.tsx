"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function DarkToggle() {
  const { theme, setTheme } = useTheme();

  const icon = useMemo(() => {
    if (theme === "dark") {
      return "lucide:moon";
    } else if (theme === "light") {
      return "lucide:sun";
    } else if (theme === "system") {
      return "lucide:monitor";
    }
    return "";
  }, [theme]);

  function toggleTheme() {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Icon icon={icon}></Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{theme}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
