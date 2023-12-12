"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { modelList } from "@/lib/const";
import ModelSelect from "@/components/common/model-select";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme/theme-toggle";

export default function Home() {
  const [model, setModel] = useState(modelList[0]);

  return (
    <main className="min-h-[100dvh] py-24 px-6 max-w-[70ch] mx-auto">
      <div>
        <div className="flex items-start justify-between">
          <Icon icon="fluent-emoji:robot" width="3.5rem" />
          <ThemeToggle></ThemeToggle>
        </div>
        <div className="font-bold text-4xl bg-gradient-to-r from-0% from-orange-500 to-30% to-orange-300 bg-clip-text text-transparent">
          chatchat
        </div>
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground shrink-0">Based on OpenAI API</div>
          <ModelSelect value={model} onValueChange={setModel}></ModelSelect>
        </div>
        <div>
          <Button variant="outline">Edit</Button>
          <Button variant="ghost">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </main>
  );
}
