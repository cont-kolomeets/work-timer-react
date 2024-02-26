import { useAppSelector } from "../../../../app/hooks";
import { Loader } from "../../../../shared/ui";
import { tasksModel } from "../../model/tasksModel";
import { TaskCard } from "../TaskCard/TaskCard";
import "./TasksList.scss";

export function TasksList() {
  const taskIds = useAppSelector(tasksModel.selectors.selectAllTaskIds);
  const loadingStatus = useAppSelector(tasksModel.selectors.getLoadingStatus);

  if (loadingStatus === "loading") {
    return <Loader />;
  }

  if (!taskIds.length) {
    return (
      <div className="wt-flex-row wt-flex-center wt-h-100pct">No tasks yet</div>
    );
  }

  return (
    <div className="wt-tasks-list">
      {taskIds.map((id) => {
        return <TaskCard key={id} id={id} />;
      })}
    </div>
  );
}
