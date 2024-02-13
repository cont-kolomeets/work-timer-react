import "./Panel.scss";
import { ReactNode, useState } from "react";
import PanelHeader from "../PanelHeader/PanelHeader";
import PanelSideHeader from "../PanelSideHeader/PanelSideHeader";

type PanelProps = {
  title: string;
  side: "left" | "right";
  className: string;
  children: ReactNode;
  onShown?(): void;
};

export default function Panel({
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
      <PanelHeader title={title} onClose={_closePanel} />
      <PanelSideHeader title={title} side={side} onOpen={_openPanel} />
      <div className="wt-panel-content wt-pad-12">{children}</div>
    </div>
  );
}
