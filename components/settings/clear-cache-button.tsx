import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { createStore } from "@/store/storage";
import { clear } from "idb-keyval";
import { toast } from "sonner";

export default function ClearCacheButton() {
  const { t: tSettings } = useTranslation("settings");
  const { t: tUi } = useTranslation("ui");

  const storage = createStore();

  function clearAllCache() {
    clear(storage);
    toast(tSettings("panel.clearAllCacheSucceed"), {
      duration: Infinity,
      action: {
        label: tUi("refresh"),
        onClick: () => {
          window.location.reload();
        },
      },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{tSettings("panel.clearAllCache")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>{tSettings("panel.clearAllCacheTip")}</AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tUi("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={clearAllCache}>{tUi("continue")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
