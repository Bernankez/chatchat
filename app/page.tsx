"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { modelList } from "@/lib/const";

export default function Home() {
  const [model, setModel] = useState(modelList[0]);

  return (
    <main className="min-h-[100dvh] py-24 px-12 max-w-[70ch] mx-auto">
      <div>
        <div>
          <Icon icon="fluent-emoji:robot" width="3.5rem" />
          <div></div>
        </div>
        <div className="font-bold text-4xl bg-gradient-to-r from-0% from-orange-500 to-30% to-orange-300 bg-clip-text text-transparent">
          chatchat
        </div>
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground shrink-0">Based on OpenAI API</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-muted-foreground">
                {model}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                {modelList.map((model) => (
                  <DropdownMenuRadioItem value={model} key={model}>
                    {model}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </main>
  );
}
