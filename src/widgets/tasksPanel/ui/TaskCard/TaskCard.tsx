import { useAppSelector } from "../../../../app/redux/hooks";
import {
  formatTotal,
  isToday,
  issueNumberFromLink,
} from "../../../../shared/lib";
import { Action } from "../../../../shared/ui";
import { tasksModel } from "../../model/tasksModel";
import { useTaskCard } from "../../model/useTaskCard";
import "./TaskCard.scss";

type TaskCardProps = {
  taskId: string;
};

export function TaskCard({ taskId }: TaskCardProps) {
  const task = useAppSelector((state) =>
    tasksModel.selectors.selectTaskById(state, taskId)
  );
  const { link, label, time, type } = task;
  const { editTask, deleteTask, editTaskDialog, confirmationDialog } =
    useTaskCard(task);

  const typeChip = (
    <div
      className={`wt-m-i-start-12 wt-task-card__chip wt-task-card__chip--${
        type || "unset"
      }`}
    >
      {type === "bug" ? "Bug" : type === "task" ? "Task" : "Unset"}
    </div>
  );

  const todayChip = isToday(task.created || task.modified) ? (
    <div
      className={`wt-m-i-start-12 wt-task-card__chip wt-task-card__chip--today`}
    >
      Today
    </div>
  ) : null;

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
        {typeChip}
        {todayChip}
        <div className="wt-flex-spacer"></div>
        <Action
          name="pencil-square"
          className="wt-m-i-start-12"
          size="16"
          onClick={editTask}
        />
        <Action
          name="trash"
          className="wt-m-i-start-12"
          size="16"
          onClick={deleteTask}
        />
      </div>
      <div className="wt-flex-row wt-m-b-12">
        <div className="wt-task-card__label">{label}</div>
      </div>
      {editTaskDialog}
      {confirmationDialog}
    </div>
  );
}
