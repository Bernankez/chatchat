import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { languages } from "@/lang/settings";
import i18next from "i18next";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import TooltipButton from "../ui/tooltip-button";
import Placeholder from "../ui/placeholder";

export default function Language() {
  const { t, i18n } = useTranslation("language");
  const lng = i18n.resolvedLanguage;
  const router = useRouter();

  function switchLanguage(lang: string) {
    i18next.changeLanguage(lang);
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Placeholder skeleton="w-10 h-10">
          <TooltipButton variant="outline" size="icon" className="text-muted-foreground" tooltip={t("lang")}>
            <Icon icon="lucide:languages" width="1.1rem"></Icon>
          </TooltipButton>
        </Placeholder>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-18 min-w-[unset]">
        <DropdownMenuRadioGroup value={lng} onValueChange={switchLanguage}>
          {languages.map((language) => (
            <DropdownMenuRadioItem value={language} key={language}>
              {t(language)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
