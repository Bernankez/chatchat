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
import { Button, ButtonProps } from "../ui/button";
import { createStore } from "@/store/storage";
import { clear } from "idb-keyval";
import { toast } from "sonner";
import { forwardRef } from "react";

export interface ClearCacheButtonProps extends ButtonProps {
  onConfirm?: () => void;
}

const ClearCacheButton = forwardRef<HTMLButtonElement, ClearCacheButtonProps>(function ClearCacheButton(
  { onConfirm, ...props },
  ref,
) {
  const { t } = useTranslation(["settings", "ui"]);

  const storage = createStore();

  function clearAllCache() {
    clear(storage);
    onConfirm?.();
    toast(t("panel.clearAllCacheSucceed"), {
      duration: Infinity,
      action: {
        label: t("refresh", { ns: "ui" }),
        onClick: () => {
          window.location.reload();
        },
      },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props} ref={ref}>
          {t("panel.clearAllCache")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>{t("panel.clearAllCacheTip")}</AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel", { ns: "ui" })}</AlertDialogCancel>
          <AlertDialogAction onClick={clearAllCache}>{t("continue", { ns: "ui" })}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default ClearCacheButton;
