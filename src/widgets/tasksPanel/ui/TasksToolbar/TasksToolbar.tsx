import { useAppSelector } from "../../../../app/hooks";
import { Button } from "../../../../shared/ui";
import { tasksModel } from "../../model/tasksModel";
import { useTaskDialog } from "../../model/useTaskDialog";
import "./TasksToolbar.scss";

export function TasksToolbar() {
  const taskIds = useAppSelector(tasksModel.selectors.selectAllTaskIds);
  const { editDialog, setEditDialogShown } = useTaskDialog({ task: null });

  const _addNewTask = () => {
    setEditDialogShown(true);
  };

  const _createReport = () => {};

  return (
    <div className="wt-flex-row wt-tasks-toolbar wt-pad-b-end-12">
      <Button onClick={_addNewTask}>Add task</Button>
      <div className="wt-flex-spacer"></div>
      <Button onClick={_createReport} disabled={!taskIds.length}>
        Create report
      </Button>
      {editDialog}
    </div>
  );
}
