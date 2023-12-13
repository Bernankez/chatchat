import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";

export interface SettingsPanelProps {
  type?: "sheet" | "section";
}

export default function SettingsPanel(props: SettingsPanelProps) {
  const { type = "sheet" } = props;

  if (type === "sheet") {
    return (
      <SheetContent className="w-screen">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you are done.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4"></div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    );
  }

  return (
    <div className="max-w-sm p-6">
      <div className="flex flex-col space-y-2">
        <div className="text-lg font-semibold text-foreground">Edit profile</div>
        <div className="text-sm text-muted-foreground">
          Make changes to your profile here. Click save when you are done.
        </div>
      </div>
      <div className="grid gap-4 py-4"></div>
      <div className="flex justify-end space-x-2">
        <Button type="submit">Save changes</Button>
      </div>
    </div>
  );
}
