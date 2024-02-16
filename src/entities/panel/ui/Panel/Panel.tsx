import { ReactNode, useState } from "react";
import { PanelHeader, PanelSideHeader } from "../../../../shared/ui";
import "./Panel.scss";

type PanelProps = {
  title: string;
  side: "left" | "right";
  className: string;
  children: ReactNode;
  onShown?(): void;
};

export function Panel({
  title,
  side,
  className,
  children,
  onShown,
}: PanelProps) {
  const [shown, setShown] = useState<"" | "shown" | "hidden">("");
  const _closePanel = () => {
    setShown("hidden");
  };
  const _openPanel = () => {
    setShown("shown");
    onShown?.();
  };

  return (
    <div className={`wt-panel  ${className} ${shown}`}>
      <PanelHeader
        title={title}
        onTitleClick={_closePanel}
        onClose={_closePanel}
      />
      <PanelSideHeader title={title} side={side} onOpen={_openPanel} />
      <div className="wt-panel__content wt-pad-12">{children}</div>
    </div>
  );
}
