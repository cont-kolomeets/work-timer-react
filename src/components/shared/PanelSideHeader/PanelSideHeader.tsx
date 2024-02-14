import "./PanelSideHeader.scss";

type PanelTitleProps = {
  title: string;
  side: "left" | "right";
  onOpen(): void;
};

export default function PanelSideHeader({
  title,
  side,
  onOpen,
}: PanelTitleProps) {
  return (
    <div className={`wt-panel-side-header wt-pad-8 wt-flex-column ${side}`}>
      <i
        className={`bi bi-chevron-double-${
          side === "left" ? "right" : "left"
        } wt-action-button wt-panel-side-header__open-button`}
        onClick={onOpen}
      ></i>
      <div className="header-text-container">
        <div className="header-text-container__header-text">{title}</div>
      </div>
    </div>
  );
}
