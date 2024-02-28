import { useAppDispatch, useAppSelector } from "../../../../app/redux/hooks";
import { useConfirmationDialog } from "../../../../features/timeEditorDialog/model/useConfirmationDialog";
import {
  formatDate,
  formatTotal,
  issueNumberFromLink,
} from "../../../../shared/lib";
import { Action } from "../../../../shared/ui";
import { tasksModel } from "../../model/tasksModel";
import { useTaskDialog } from "../../model/useTaskDialog";
import "./TaskCard.scss";

type TaskCardProps = {
  taskId: string;
};

export function TaskCard({ taskId }: TaskCardProps) {
  const task = useAppSelector((state) =>
    tasksModel.selectors.selectTaskById(state, taskId)
  );
  const { link, label, modified, time } = task;
  const dispatch = useAppDispatch();
  const { editDialog, setEditDialogShown } = useTaskDialog({ task });
  const { confirmationDialog, openConfirmationDialog } =
    useConfirmationDialog();

  function _editTask(): void {
    setEditDialogShown(true);
  }

  function _deleteTask(): void {
    openConfirmationDialog({
      title: "Confirm delete",
      message: "Are you sure you want to delete this task?",
      onYes: () => {
        dispatch(tasksModel.actions.removeTask(taskId));
      },
      onNo: () => {},
    });
  }

  return (
    <div className="wt-task-card">
      <div className="wt-flex-row wt-m-b-12">
        <div className="wt-task-card__issue">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            style={{ color: "orange" }}
          >
            #{issueNumberFromLink(link)}
          </a>{" "}
          ({formatTotal(time, "h:m")})
        </div>
        <div className="wt-flex-spacer"></div>
        <div className="wt-task-card__modified">
          {formatDate(modified, "y/m/d")}
        </div>
        <Action
          name="pencil-square"
          className="wt-m-i-start-12"
          onClick={_editTask}
        />
        <Action
          name="trash"
          className="wt-m-i-start-12"
          onClick={_deleteTask}
        />
      </div>
      <div className="wt-flex-row wt-m-b-12">
        <div className="wt-task-card__label">{label}</div>
      </div>
      {editDialog}
      {confirmationDialog}
    </div>
  );
}
