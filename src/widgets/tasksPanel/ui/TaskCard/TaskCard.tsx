import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../shared/lib";
import { removeTask, selectTaskById, updateTask } from "../../model/tasksSlice";
import { TaskDialog } from "../TaskDialog/TaskDialog";
import "./TaskCard.scss";

type TaskCardProps = {
  id: string;
};

export function TaskCard({ id }: TaskCardProps) {
  const task = useSelector((state) => selectTaskById(state, id));
  const { issueNumber, label, modified } = task;
  const dispatch = useDispatch();
  const [editDialogShown, setEditDialogShown] = useState(false);

  const editDialog = editDialogShown ? (
    <TaskDialog
      task={task}
      onSave={(task) => {
        dispatch(updateTask(task));
      }}
      onClosed={() => {
        setEditDialogShown(false);
      }}
    ></TaskDialog>
  ) : null;

  function _editTask(): void {
    setEditDialogShown(true);
  }

  function _deleteTask(): void {
    dispatch(removeTask(id));
  }

  return (
    <div className="wt-task-card">
      <div className="wt-flex-row wt-margin-block-12">
        <div className="wt-task-card__issue">#{issueNumber}</div>
        <div className="wt-flex-spacer"></div>
        <div className="wt-task-card__modified">{formatDate(modified)}</div>
        <i
          className="bi bi-pencil-square wt-task-card__editButton wt-margin-inline-start-12"
          onClick={_editTask}
        ></i>
        <i
          className="bi bi-trash-fill wt-task-card__deleteButton wt-margin-inline-start-12"
          onClick={_deleteTask}
        ></i>
      </div>
      <div className="wt-flex-row wt-margin-block-12">
        <div className="wt-task-card__label">{label}</div>
      </div>
      {editDialog}
    </div>
  );
}
