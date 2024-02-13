import "./Panel.scss";
import { ReactNode, useState } from "react";
import PanelHeader from "../PanelHeader/PanelHeader";
import PanelSideHeader from "../PanelSideHeader/PanelSideHeader";

type PanelProps = {
  title: string;
  side: "left" | "right";
  className: string;
  children: ReactNode;
};

export default function Panel({
  title,
  side,
  className,
  children,
}: PanelProps) {
  const [shown, setShown] = useState(true);
  const _closePanel = () => {
    setShown(false);
  };
  const _openPanel = () => {
    setShown(true);
  };

  return (
    <div className={`wt-panel  ${className}${shown ? " shown" : " hidden"}`}>
      <PanelHeader title={title} onClose={_closePanel} />
      <PanelSideHeader title={title} side={side} onOpen={_openPanel} />
      <div className="wt-panel-content wt-pad-12">{children}</div>
    </div>
  );
}
