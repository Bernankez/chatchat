import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

export default function ChatSettings() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex items-start justify-between gap-3">
      <Textarea disabled={!editing} className="max-w-lg"></Textarea>
      <div className="flex items-center gap-3">
        {editing ? (
          <>
            <Button variant="outline" size="icon" onClick={() => setEditing(false)}>
              <Icon icon="lucide:x" width="1.1rem"></Icon>
            </Button>
            <Button size="icon" onClick={() => setEditing(false)}>
              <Icon icon="lucide:check" width="1.1rem"></Icon>
            </Button>
          </>
        ) : (
          <Button variant="outline" size="icon" className="shrink-0" onClick={() => setEditing(true)}>
            <Icon icon="lucide:list-filter" width="1.1rem"></Icon>
          </Button>
        )}
      </div>
    </div>
  );
}
