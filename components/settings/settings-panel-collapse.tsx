import { useControllableValue } from "ahooks";
import Collapse from "../ui/collapse";
import CollapseTrigger from "../ui/collapse-trigger";
import CollapseContent from "../ui/collapse-content";
import { CSSProperties, forwardRef } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

export interface SettingsPanelCollapseProps {
  defaultValue?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  icon?: string | React.ReactNode;
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const SettingsPanelCollapse = forwardRef<HTMLDivElement, SettingsPanelCollapseProps>(
  function SettingsPanelCollapse(props, ref) {
    const { open, onOpenChange, icon, title, children, defaultValue, ...divProps } = props;
    const [_open, _setOpen] = useControllableValue(props, {
      defaultValue: defaultValue ?? false,
      valuePropName: "open",
      trigger: "onOpenChange",
    });

    return (
      <Collapse open={_open} onOpenChange={_setOpen}>
        <CollapseTrigger asChild>
          <div>
            <div
              className={clsx(
                "flex items-center gap-2 text-center hover:text-foreground transition sm:text-start select-none cursor-default",
                [_open ? "text-foreground" : "text-muted-foreground"],
              )}>
              <Icon
                icon="lucide:chevron-right"
                width="1.4rem"
                className={clsx("transition", [_open ? "rotate-90" : ""])}></Icon>
              {typeof icon === "string" ? <Icon icon={icon} width="1.1rem"></Icon> : null}
              <div className="text-lg font-semibold">{title}</div>
            </div>
          </div>
        </CollapseTrigger>
        <CollapseContent>
          <div {...divProps} ref={ref}>
            {children}
          </div>
        </CollapseContent>
      </Collapse>
    );
  },
);

export default SettingsPanelCollapse;
