"use client";

import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import TooltipButton from "../ui/tooltip-button";

export default function DarkToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return <Skeleton className="w-10 h-10"></Skeleton>;
  }

  return (
    <TooltipButton
      variant="outline"
      size="icon"
      className="capitalize"
      onClick={toggleTheme}
      tooltip={<span className="capitalize">{theme}</span>}>
      <Icon icon={icon} width="1.1rem"></Icon>
    </TooltipButton>
  );
}
