import "./TaskDialog.scss";
import PanelHeader from "../../shared/PanelHeader/PanelHeader";

export default function TaskDialog() {
  return (
    <div className="wt-task-dialog">
      <PanelHeader title="Add task" onClose={() => {}}></PanelHeader>
    </div>
  );
}
