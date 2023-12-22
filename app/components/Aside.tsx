import { Icon } from "@iconify/react";
import SettingsPanel from "@/components/settings/settings-panel";
import { useSettingsStore } from "@/store/settings-store";
import { breakpointsTailwind, useBreakpoint } from "@/hooks/use-breakpoint";
import { useMounted } from "@/hooks/use-mounted";

export const asideWidth = "24rem";

export default function Aside() {
  const mounted = useMounted();
  const { settingsPanelOpen, setSettingsPanelOpen } = useSettingsStore();
  const { greaterOrEqual } = useBreakpoint(breakpointsTailwind);

  return (
    mounted &&
    greaterOrEqual("lg") && (
      <aside
        style={{ width: asideWidth }}
        className={`bg-background fixed right-0 top-0 bottom-0 shrink-0 transition-[max-width] duration-500 ease-in-out ${
          settingsPanelOpen ? "max-w-sm" : "max-w-0"
        }`}>
        <div style={{ width: asideWidth }} className="relative p-6">
          <button
            type="button"
            className="absolute rounded-sm right-4 top-4 transition-opacity opacity-70 hover:opacity-100 hover:cursor-pointer data-[state=open]:bg-secondary"
            onClick={() => setSettingsPanelOpen(false)}>
            <Icon icon="lucide:x"></Icon>
          </button>
          <SettingsPanel></SettingsPanel>
        </div>
      </aside>
    )
  );
}
