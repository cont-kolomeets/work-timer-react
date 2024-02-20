import { useAppDispatch } from "../../../../app/hooks";
import { Panel } from "../../../../entities/panel";
import { tasksModel } from "../../model/tasksModel";
import { TasksList } from "../TasksList.tsx/TasksList";
import { TasksToolbar } from "../TasksToolbar/TasksToolbar";
import "./TasksPanel.scss";

export function TasksPanel() {
  const dispatch = useAppDispatch();

  const _loadTasks = () => {
    dispatch(tasksModel.actions.fetchTasks());
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
