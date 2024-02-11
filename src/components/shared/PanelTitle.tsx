import "./PanelTitle.scss";

type PanelTitleProps = {
  title: string;
};

function PanelTitle({ title }: PanelTitleProps) {
  return <div className="wt-panel-title">{title}</div>;
}

export default PanelTitle;
