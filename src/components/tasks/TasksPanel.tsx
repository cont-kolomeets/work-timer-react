import "./TaskPanel.scss";
import PanelTitle from "../shared/PanelTitle";

export default function TasksPanel() {
  return (
    <div className="wt-panel wt-tasks-panel">
      <PanelTitle title="Tasks"></PanelTitle>
      <div className="wt-panel-content"></div>
    </div>
  );
}
