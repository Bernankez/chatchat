"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function Home() {
  const [model, setModel] = useState("");

  return (
    <main className="min-h-[100dvh] py-24 px-12 max-w-[70ch] mx-auto">
      <div>
        <div>
          <div>icon</div>
          <div></div>
        </div>
        <div className="font-bold text-4xl">chatchat</div>
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground shrink-0">Based on OpenAI API</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                <DropdownMenuRadioItem value="top">gpt-4-1106-preview</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </main>
  );
}
