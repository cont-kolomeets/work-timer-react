import "./TasksPanel.scss";
import Panel from "../shared/Panel/Panel";
import TasksList from "./TasksList.tsx/TasksList";

export default function TasksPanel() {
  return (
    <Panel className="wt-tasks-panel" title="Tasks" side="right">
      <TasksList />
    </Panel>
  );
}
