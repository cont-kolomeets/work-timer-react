import { useSelector } from "react-redux";
import { Loader } from "../../../../shared/ui";
import { getLoadingStatus, selectTaskIds } from "../../model/tasksSlice";
import { TaskCard } from "../TaskCard/TaskCard";
import "./TasksList.scss";

export function TasksList() {
  const taskIds = useSelector(selectTaskIds);
  const loadingStatus = useSelector(getLoadingStatus);

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
