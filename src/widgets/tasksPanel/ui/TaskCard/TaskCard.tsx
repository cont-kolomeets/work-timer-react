import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { formatDate, formatTotal } from "../../../../shared/lib";
import { Action } from "../../../../shared/ui";
import { tasksModel } from "../../model/tasksModel";
import { useTaskDialog } from "../../model/useTaskDialog";
import "./TaskCard.scss";

type TaskCardProps = {
  id: number;
};

export function TaskCard({ id }: TaskCardProps) {
  const task = useAppSelector((state) =>
    tasksModel.selectors.selectTaskById(state, id)
  );
  const { issue, label, modified, time } = task;
  const dispatch = useAppDispatch();
  const { editDialog, setEditDialogShown } = useTaskDialog({ task });

  function _editTask(): void {
    setEditDialogShown(true);
  }

  function _deleteTask(): void {
    dispatch(tasksModel.actions.removeTask(id));
  }

  return (
    <div className="wt-task-card">
      <div className="wt-flex-row wt-m-b-12">
        <div className="wt-task-card__issue">
          #{issue} ({formatTotal(time, "h:m")})
        </div>
        <div className="wt-flex-spacer"></div>
        <div className="wt-task-card__modified">{formatDate(modified)}</div>
        <Action
          name="pencil-square"
          className="wt-m-i-start-12"
          onClick={_editTask}
        />
        <Action
          name="trash-fill"
          className="wt-m-i-start-12"
          onClick={_deleteTask}
        />
      </div>
      <div className="wt-flex-row wt-m-b-12">
        <div className="wt-task-card__label">{label}</div>
      </div>
      {editDialog}
    </div>
  );
}
