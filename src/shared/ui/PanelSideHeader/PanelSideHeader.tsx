import { Action } from "../Action/Action";
import "./PanelSideHeader.scss";

type PanelTitleProps = {
  title: string;
  side: "left" | "right";
  onOpen(): void;
};

export function PanelSideHeader({ title, side, onOpen }: PanelTitleProps) {
  return (
    <div
      className={`wt-clickable wt-panel-side-header wt-pad-8 wt-flex-column ${side}`}
      onClick={onOpen}
    >
      <Action
        name={side === "left" ? "chevron-double-right" : "chevron-double-left"}
        className="wt-panel-side-header__open-button"
      />
      <div className="header-text-container">
        <div className="header-text-container__header-text">{title}</div>
      </div>
    </div>
  );
}
