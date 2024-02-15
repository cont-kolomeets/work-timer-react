import { Action } from "../Action/Action";
import "./PanelHeader.scss";

type PanelTitleProps = {
  title: string;
  onClose(): void;
};

export function PanelHeader({ title, onClose }: PanelTitleProps) {
  return (
    <div className="wt-panel-header wt-pad-8 wt-flex-row">
      {title}
      <div className="wt-flex-spacer"></div>
      <Action
        name="x"
        className="wt-panel-header__close-button"
        onClick={onClose}
      />
    </div>
  );
}
