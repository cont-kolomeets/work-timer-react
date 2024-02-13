import { formatDate } from "../../../utils/TimeConvertUtil";
import { selectTaskById, removeTask, updateTask } from "../tasksSlice";
import "./TaskCard.scss";
import { useSelector, useDispatch } from "react-redux";

type TaskCardProps = {
  id: string;
};

export default function TaskCard({ id }: TaskCardProps) {
  const { issueNumber, label, modified } = useSelector((state) =>
    selectTaskById(state, id)
  );
  const dispatch = useDispatch();

  function _editTask(): void {
    dispatch(
      updateTask({
        id,
        issueNumber,
        label,
        modified,
      })
    );
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
    </div>
  );
}
