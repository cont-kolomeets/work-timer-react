import "./PanelTitle.scss";

type PanelTitleProps = {
  title: string;
};

export default function PanelTitle({ title }: PanelTitleProps) {
  return <div className="wt-panel-title">{title}</div>;
}
