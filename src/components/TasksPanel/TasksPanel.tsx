import "./TasksPanel.scss";
import Panel from "../shared/Panel/Panel";
import TasksList from "./TasksList.tsx/TasksList";
import { fetchTasks } from "./store/tasksSlice";
import AppStore from "../../store/AppStore";
import TasksToolbar from "./TasksToolbar";

export default function TasksPanel() {
  const _loadTasks = () => {
    AppStore.dispatch(fetchTasks());
  };

  return (
    <Panel
      className="wt-tasks-panel"
      title="Tasks"
      side="right"
      onShown={_loadTasks}
    >
      <TasksToolbar />
      <TasksList />
    </Panel>
  );
}
