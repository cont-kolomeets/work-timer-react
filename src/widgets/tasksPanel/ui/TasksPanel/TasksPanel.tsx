import { appStore } from "../../../../app/appStore";
import { Panel } from "../../../../entities/panel";
import { fetchTasks } from "../../model/tasksSlice";
import { TasksList } from "../TasksList.tsx/TasksList";
import { TasksToolbar } from "../TasksToolbar/TasksToolbar";
import "./TasksPanel.scss";

export function TasksPanel() {
  const _loadTasks = () => {
    appStore.dispatch(fetchTasks());
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
