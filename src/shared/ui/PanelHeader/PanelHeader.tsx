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
      <i
        className="bi bi-x wt-action-button wt-panel-header__close-button"
        onClick={onClose}
      ></i>
    </div>
  );
}
