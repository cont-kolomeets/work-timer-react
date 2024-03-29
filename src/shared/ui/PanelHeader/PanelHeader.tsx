import { Action } from "../Action/Action";
import "./PanelHeader.scss";

type PanelTitleProps = {
  title: string;
  onTitleClick?(): void;
  onClose(): void;
};

export function PanelHeader({ title, onTitleClick, onClose }: PanelTitleProps) {
  return (
    <div className="wt-panel-header wt-pad-8 wt-flex-row">
      <div
        className={`wt-flex-spacer ${onTitleClick ? "wt-clickable" : ""}`}
        onClick={onTitleClick}
      >
        {title}
      </div>
      <Action
        name="x"
        className="wt-panel-header__close-button"
        size="20"
        onClick={onClose}
      />
    </div>
  );
}
