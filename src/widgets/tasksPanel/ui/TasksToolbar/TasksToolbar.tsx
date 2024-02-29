import { useAppSelector } from "../../../../app/redux/hooks";
import { Button } from "../../../../shared/ui";
import { tasksModel } from "../../model/tasksModel";
import { useTasksToolbar } from "../../model/useTasksToolbar";
import "./TasksToolbar.scss";

export function TasksToolbar() {
  const tasks = useAppSelector(tasksModel.selectors.selectAllTasks);
  const { loading, editDialog, addNewTask, createReport } = useTasksToolbar();

  return (
    <div className="wt-tasks-toolbar wt-pad-b-end-12">
      <Button onClick={addNewTask}>Add task</Button>
      <Button onClick={createReport} disabled={!tasks.length} loading={loading}>
        Create report
      </Button>
      {editDialog}
    </div>
  );
}
