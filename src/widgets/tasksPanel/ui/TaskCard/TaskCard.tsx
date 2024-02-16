import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../shared/lib";
import { Action } from "../../../../shared/ui";
import { removeTask, selectTaskById } from "../../model/tasksSlice";
import { useTaskDialog } from "../../model/useTaskDialog";
import "./TaskCard.scss";

type TaskCardProps = {
  id: string;
};

export function TaskCard({ id }: TaskCardProps) {
  const task = useSelector((state) => selectTaskById(state, id));
  const { issueNumber, label, modified } = task;
  const dispatch = useDispatch();
  const { editDialog, setEditDialogShown } = useTaskDialog({ task });

  function _editTask(): void {
    setEditDialogShown(true);
  }

  function _deleteTask(): void {
    dispatch(removeTask(id));
  }

  return (
    <div className="wt-task-card">
      <div className="wt-flex-row wt-m-b-12">
        <div className="wt-task-card__issue">#{issueNumber}</div>
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
