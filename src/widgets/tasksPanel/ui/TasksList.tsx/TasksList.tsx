import { useAppSelector } from "../../../../app/hooks";
import { Loader } from "../../../../shared/ui";
import { tasksModelSelectors } from "../../model/tasksModel";
import { TaskCard } from "../TaskCard/TaskCard";
import "./TasksList.scss";

export function TasksList() {
  const taskIds = useAppSelector(tasksModelSelectors.selectAllTaskIds);
  const loadingStatus = useAppSelector(tasksModelSelectors.getLoaingStatus);

  if (loadingStatus === "loading") {
    return <Loader />;
  }

  return (
    <div className="wt-tasks-list">
      {taskIds.map((id) => {
        return <TaskCard key={id} id={id} />;
      })}
    </div>
  );
}
